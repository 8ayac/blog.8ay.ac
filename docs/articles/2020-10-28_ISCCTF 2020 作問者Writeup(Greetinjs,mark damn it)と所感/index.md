---
id:  writeup-and-review-of-iscctf-2020-by-the-author
title: ISCCTF 2020 作問者Writeup(Greetinjs/mark damn it) と所感
publishedAt: 2020-10-27T22:56:59.000Z
tags: [CTF, 作問, CVE, RCE, Ruby]
---

こんにちは、8ayacです🐝

今回は、2020/10/24(土)に開催した入門者向けCTF「ISCCTF 2020」で、私が作問した問題のWriteupを紹介しつつ、軽く所感とか振り返りを(軽く)書きました。

## [Web 100pts - 88.09% solves[^1]] Greetinjs

作問者Writeupは[こちら](https://github.com/IPFactory/ISCCTF2020/tree/main/web/Greetinjs/solution)

### 振り返り

CTFに馴染みがなくても解けるレベルの問題を目指しました。
もしかしたら、この手の問題は概出かもしれませんが、**入門者向け**CTFのwarmup問となると、被るのも仕方がないかな、と考えていました。

### 所感

あるWebページが読み込んでいるリソースまで注目するのは重要ですよね。

## [Web 475pts - 19.04% solves[^2]] mark damn it

作問者Writeupは[こちら](https://github.com/IPFactory/ISCCTF2020/tree/main/web/mark-damn-it/solution)

### 振り返り

mark damn itは、CVE-2020-14001を使ったRCEをテーマにした問題でした。
この脆弱性は、バージョン2.3.0以前の[Kramdown](https://kramdown.gettalong.org/)にあったRCEです。

筆者は、real-worldの脆弱性が好きなので、何かしらCVEをテーマにした問題を出したいと考えていました。
入門者向けとなると難しいなあ、と思っていたところ、Pwn/Rev/Misc作問担当の[@n01e0](https://twitter.com/n01e0)が、「[これ](https://www.feneshi.co/blog/CVE-2020-14001/)誰か使いませんか」と投げてくれたので、私が問題にした感じです。
Rubyを書いた経験はほとんどなかったので、Rubyの勉強になりました。

### 所感

MarkdownをHTMLに変換してレンダリングする機能には、脆弱性が作り込まれやすいイメージがあります。
ちなみに、筆者がバグバウンティで初めて報告した脆弱性は、そのような機能でのXSS[^3]でした。

## まとめ

これ、実質作問していないのでは...?

CTFの作問は楽しいので、もっとCTFに自分の問題を出してみたいなあ。

## 注釈

[^1]: 参加者のうち1点以上を獲得した84人中74人が正答
[^2]: 参加者のうち1点以上を獲得した84人中16人が正答
[^3]: <https://hackerone.com/reports/384255>
