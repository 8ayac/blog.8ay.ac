---
id: prototype-object-in-javascript
title: JavaScriptのPrototypeオブジェクトについて
publishedAt: 2018-08-20T01:44:39.000Z
tags: [セキュリティ, Web, 翻訳, JavaScript]
---

> この記事は、[dharani jayakanthan](https://dev.to/danny)氏の[Intro To Prototype - JS](https://dev.to/danny/intro-to-prototype---js-35a)の翻訳記事です。

## Prototype

JavaScriptで関数を作ると、JavaScriptエンジンが2つのオブジェクトを作ります。

JSエンジンが関数を処理するときに作られる2つのオブジェクトは、

- その関数自体を呼び出す`Function`オブジェクト
- `Prototype`オブジェクト

## `prototype`とは

JSの`prototype`とは、主に継承のために利用され、関数の`prototype`プロパティにメソッドやプロパティを追加して、それらのメソッドとプロパティをその関数のインスタンスで利用できるようにします。

```js
function foo() {
    console.log("Hello!!");
}
// foo.prototype
```

JSエンジンが`prototype`オブジェクトを作ると、プロパティも同時に作られます。関数内のこの`prototype`プロパティを使用して、その関数用に作られた`prototype`オブジェクトにアクセスできます。

例えば、`prototype`オブジェクトを指す`prototype`という呼ばれるプロパティを持つ`foo`関数を見てきました。`prototype`オブジェクトを使用するには、`new`というキーワードを使用してオブジェクトを作成します。

```js
var myObj = new foo();
// myObj
```

`myObj`オブジェクトを作ると、JSエンジンはデフォルトで"`__proto__`"というオブジェクトを持つオブジェクトを作ります。これは、関数によって作られた最初の`prototype`オブジェクトを指します。

## `__proto__`を使ってみる

オブジェクトを生成すると、JSエンジンが`__proto__`オブジェクトを作ることがわかったので、それがどのように機能するかを見るために、`myObj`オブジェクト内に`Hi from myObj itself`という値を持つ`say`プロパティを作ってみましょう。

```js
function foo() {}
var myObj = new foo();
myObj.say = "Hi from myObj itself";
```

`myObj.say`にアクセスすると`"Hi from myObj itself"`という値が返されることがわかります。値の異なる同じ名前のプロパティを`__proto__`オブジェクトに作ります。

```js
function foo() {}
var myObj = new foo();
myObj.__proto__.say = "Hi from proto object";
```

> `myObj.__proto__.say`にアクセスすると、`"Hi from proto object"`が返されます。

```js
function foo(){}
var myObj = new foo();
myObj.say = "Hi from myObj itself";
// Hi from myObj itself
myObj.__proto__.say = "Hi from proto object";
// Hi from proto object
delete myObj.say;
// true
myObj.say
// Hi from proto object
```

しかし、`myObj.say`を削除してから、それにアクセスしたとき、JSエンジンは`say`というプロパティが存在するかを確認するために、`__proto__`オブジェクトを調べます。そして、`"Hi from proto object"`という値を持つプロパティ`myObj.__proto__.say`が発見され、その値が返されます。

> オブジェクトを作ると、JSエンジンは必ず`prototype`と呼ばれる別のオブジェクトを作ります。その`prototype`には、`.prototype`というキーワードを使用することでアクセスできます。しかし、`new`というキーワードを使ってオブジェクトを使ってオブジェクトを作った場合には、JSは`prototype`オブジェクトを指す`__proto__`を作ります。
>
> オブジェクト内のプロパティを探すと、JSエンジンがオブジェクト自体の中にそれを発見した場合、それが返されます。もし、そのようなプロパティが存在しない場合は、JSエンジンは`prototype`オブジェクトを調べます。
