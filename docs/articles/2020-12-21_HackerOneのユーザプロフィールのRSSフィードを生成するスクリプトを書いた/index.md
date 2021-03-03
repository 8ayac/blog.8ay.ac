---
id: writing-a-script-to-generate-the-RSS-feed-of-user-profile-in-H1
title: HackerOneのユーザプロフィールのRSSフィードを生成するスクリプトを書いた
publishedAt: 2020-12-21T11:44:29.000Z
tags: [RSS, Python, 実装, Bugbounty]
---

**🎄本記事は [IPFactory Advent Calendar 2020 - Qiita](https://qiita.com/advent-calendar/2020/ipfactory) 21日目の記事です🎄**

<!-- ネタがライト過ぎて申し訳ないね -->

こんにちは、[8ayac](https://twitter.coem/8ayac)です。
今回は、最近書いたHackerOneのユーザプロフィールのRSSフィードを生成するスクリプトを紹介する記事です。

## 概要

HackerOneのユーザのプロフィール上にあるHacktivityのRSSフィードを生成するスクリプトをPythonで書きました。
ちなみに、筆者のHackerOneのユーザのプロフィールは[こちら](https://hackerone.com/8ayac)です。

## 背景

今回、RSSフィードを生成するスクリプトを自分で書くことになった経緯を説明します。

### [IPFacotry.github.io](https://ipfactory.github.io)について

IPFactoryでは、下図のようにメンバーのアウトプットを一覧表示する[ページ](https://ipfactory.github.io)を公開しています。
このページ自体は、[Team Blog Hub](https://github.com/catnose99/team-blog-hub)に自分たちで手を加えたものです。

![メンバーのアウトプットを一覧表示するページ](img/writing-a-script-to-generate-the-RSS-feed-of-user-profile-in-H1/ipfactory.github.io_toppage.png?w=1023&h=996)

各メンバーのアウトプット(基本的にはブログ)の更新情報は、毎日自動的に取得され、ページに反映されます。
各アウトプットについて、RSSフィードを配信しているURLを設定ファイルに適切に記述しておけば、それを元に更新情報が自動で取得されます。
更新情報の自動取得とページへの反映には、GitHub Actionsを利用しています。

### HackerOneのプロフィールページ

HackerOneのユーザのプロフィールページでは、下図のように、ユーザの脆弱性報告の履歴がHacktivityとして一覧で表示されています。

![筆者のHacktivity](img/writing-a-script-to-generate-the-RSS-feed-of-user-profile-in-H1/h1_profile.png?w=1212&h=862)

### 公式ではHacktivityのRSSフィードが配信されていない

筆者はバグバウンティが好きなので、[IPFactory.github.io](https://ipfactory.github.io/)に、自身のブログと同様に、Hacktivityの情報も掲載しています。
実際には、下図の赤枠で囲われた部分のような感じで掲載されています。

![BlogHubに筆者のHacktivityの情報が掲載されている様子](img/writing-a-script-to-generate-the-RSS-feed-of-user-profile-in-H1/ipfactory.github.io_8ayac.png?w=1082&h=981)

このように、Hacktivityの情報を掲載するには、HacktivityのRSSフィードが必要です。
しかしながら、どうやら、公式ではHacktivityのRSSフィードが用意されていませんでした。
このようにRSSフィードが公式に配信されていないページのRSSを取得する際、普段であれば、[Feed43](https://feed43.com/)というサービスを利用しています。
しかし、HackerOneのユーザプロフィールページは、JavaScriptを用いて動的にページを生成していたため、Feed43ではうまくRSSフィードを作成できませんでした。
このような事情で、自身でRSSフィードを生成するスクリプトを書くことになりました。

## 実際のスクリプト

実際のスクリプトは、下記の通りです。
[feedgen](https://pypi.org/project/feedgen/)という便利なライブラリを使っています。

```python
#!/usr/bin/env python3.9
import json
from argparse import Namespace
from datetime import datetime, timedelta, timezone

import requests
from feedgen.entry import FeedEntry
from feedgen.feed import FeedGenerator

USERNAME = '8ayac'
H1_USER_PROFILE = f'https://hackerone.com/{USERNAME}'


def utc_to_jst(utc_time: str) -> datetime:
    utc_time = datetime.fromisoformat(utc_time.replace('Z', '+00:00'))
    return utc_time.astimezone(timezone(timedelta(hours=9)))


def fetch_user_hacktivity_items(username: str) -> 'json_data':
    api_url = 'https://hackerone.com/graphql'
    gql = '{"operationName":"BetterUserProfileHacktivityQuery","variables":{"where":{"reporter":{"username":{"_eq":"' + USERNAME + '"}}},"orderBy":{"field":"popular","direction":"DESC"},"secureOrderBy":null,"count":25,"maxShownVoters":10},"query":"query BetterUserProfileHacktivityQuery($orderBy: HacktivityItemOrderInput, $secureOrderBy: FiltersHacktivityItemFilterOrder, $where: FiltersHacktivityItemFilterInput, $count: Int, $cursor: String, $maxShownVoters: Int) {\n  hacktivity_items(first: $count, after: $cursor, order_by: $orderBy, secure_order_by: $secureOrderBy, where: $where) {\n    ...HacktivityList\n    __typename\n  }\n  me {\n    id\n    __typename\n  }\n}\n\nfragment HacktivityList on HacktivityItemConnection {\n  total_count\n  pageInfo {\n    endCursor\n    hasNextPage\n    __typename\n  }\n  edges {\n    node {\n      ... on HacktivityItemInterface {\n        id\n        databaseId: _id\n        ...HacktivityItem\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment HacktivityItem on HacktivityItemUnion {\n  type: __typename\n  ... on HacktivityItemInterface {\n    id\n    votes {\n      total_count\n      __typename\n    }\n    voters: votes(last: $maxShownVoters) {\n      edges {\n        node {\n          id\n          user {\n            id\n            username\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    upvoted: upvoted_by_current_user\n    __typename\n  }\n  ... on Undisclosed {\n    id\n    ...HacktivityItemUndisclosed\n    __typename\n  }\n  ... on Disclosed {\n    id\n    ...HacktivityItemDisclosed\n    __typename\n  }\n  ... on HackerPublished {\n    id\n    ...HacktivityItemHackerPublished\n    __typename\n  }\n}\n\nfragment HacktivityItemUndisclosed on Undisclosed {\n  id\n  reporter {\n    id\n    username\n    ...UserLinkWithMiniProfile\n    __typename\n  }\n  team {\n    handle\n    name\n    medium_profile_picture: profile_picture(size: medium)\n    url\n    id\n    ...TeamLinkWithMiniProfile\n    __typename\n  }\n  latest_disclosable_action\n  latest_disclosable_activity_at\n  requires_view_privilege\n  total_awarded_amount\n  currency\n  __typename\n}\n\nfragment TeamLinkWithMiniProfile on Team {\n  id\n  handle\n  name\n  __typename\n}\n\nfragment UserLinkWithMiniProfile on User {\n  id\n  username\n  __typename\n}\n\nfragment HacktivityItemDisclosed on Disclosed {\n  id\n  reporter {\n    id\n    username\n    ...UserLinkWithMiniProfile\n    __typename\n  }\n  team {\n    handle\n    name\n    medium_profile_picture: profile_picture(size: medium)\n    url\n    id\n    ...TeamLinkWithMiniProfile\n    __typename\n  }\n  report {\n    id\n    title\n    substate\n    url\n    __typename\n  }\n  latest_disclosable_action\n  latest_disclosable_activity_at\n  total_awarded_amount\n  severity_rating\n  currency\n  __typename\n}\n\nfragment HacktivityItemHackerPublished on HackerPublished {\n  id\n  reporter {\n    id\n    username\n    ...UserLinkWithMiniProfile\n    __typename\n  }\n  team {\n    id\n    handle\n    name\n    medium_profile_picture: profile_picture(size: medium)\n    url\n    ...TeamLinkWithMiniProfile\n    __typename\n  }\n  report {\n    id\n    url\n    title\n    substate\n    __typename\n  }\n  latest_disclosable_activity_at\n  severity_rating\n  __typename\n}\n"}'

    res = requests.post(api_url, headers={'Content-Type': 'application/json'}, data=gql.replace('\n', '\\n'))
    return json.loads(res.text, object_hook=lambda d: Namespace(**d)).data.hacktivity_items.edges


def set_report_info(feed: FeedEntry, *,
                    report_id: int, published_at: datetime, reported_to: str, awarded_amount: int, currency: str,
                    url: str = H1_USER_PROFILE, report_title: str = f'{"▇" * 7}', content: str = None):
    feed_title = f'#{report_id} [{reported_to}] {report_title} ' \
                 f'- Bounty: {awarded_amount:,}({currency})'

    feed.id(str(report_id))
    feed.title(feed_title)
    feed.link(href=url)
    feed.published(published_at)

    lnk_html = f'<a href="{url}">{url}</a>'
    feed.content(f'{lnk_html}<br />{content}' if content else lnk_html)


if __name__ == '__main__':
    feed_generator = FeedGenerator()
    feed_generator.id(H1_USER_PROFILE)
    feed_generator.link(href=H1_USER_PROFILE)
    feed_generator.title('HackerOne')
    feed_generator.description(f'{USERNAME}\'s bug reports on HackerOne')

    user_hacktivity_items = fetch_user_hacktivity_items(USERNAME)
    for edge in user_hacktivity_items:
        report = edge.node

        database_id = int(report.databaseId)
        team = report.team.name
        reporter = report.reporter.username
        bounty = int(report.total_awarded_amount or '0')
        currency_str = report.currency

        feed = feed_generator.add_entry()
        if not report.type == 'Disclosed':
            set_report_info(feed,
                            report_id=database_id,
                            published_at=utc_to_jst(report.latest_disclosable_activity_at),
                            reported_to=team,
                            awarded_amount=bounty,
                            currency=currency_str)
        else:
            report_url = report.report.url
            set_report_info(feed,
                            report_id=database_id,
                            published_at=utc_to_jst(report.latest_disclosable_activity_at),
                            reported_to=team,
                            awarded_amount=bounty,
                            currency=currency_str,
                            url=report_url,
                            report_title=report.report.title,
                            content=requests.get(f'{report_url}.json').json()['vulnerability_information_html'])

    feed_generator.rss_file('h1_hacktivity_items_rss.xml')
```

### 使い方

1. コード内の`USERNAME`の値を、取得したいユーザのユーザ名にする。
2. 下記コマンドを実行する。

```shell-session
$ python3 --version 
Python 3.9.0

$ pip install feedgen
(snip)

$ python3 <スクリプトのパス>
```

うまく実行できていると、スクリプトがあるディレクトリ内に`h1_hacktivity_items_rss.xml`というファイル名のRSSフィードが生成されます。

## 余談(的な何か)

### フィード配信の自動化について

配信するフィードは、定期的かつ自動的に更新されることが理想的ですが、現在はそのようにはなっていません。
具体的には、ローカルで手動生成したフィードを自身のGitHub Page用のリポジトリに上げて、そのフィードがGitHub Pageで配信されている状態です。

最近、バグバウンティ活動をあまり頻繁に行っていないことも原因で、自動化の必要性も強く感じていませんでしたが、本記事を書いている際に「このスクリプトを少し改良すれば、お気に入りのバグハンターのHacktivityの更新情報をRSSリーダーで購読できるな」と気づいたので、近いうちにフィードの生成から配信までのフローは自動化します。

### 没ネタについて

実は、今回のアドカレでは、CTFの作問に使えそうな小ネタについて書く予定でした。

しかしながら、実際に書き始めたところ、「～というのがあり、～というケースでは、～というリスクが生じる。リアルワールドで使えるかはわからないが、CTFの問題を作るとしたら、こんな感じの問題が作れそう。完」という感じのツイートレベルのものにしかならなさそうだったため、ボツにしました。

個人的なメモをそのまま公開してしまおうかな、とも考えましたが、せっかくならちゃんとCTFの問題として出したいな、という気持ちになり、今回のネタに変更した次第です。

### 🎍

それでは、皆様、良いお年をお迎えください。
