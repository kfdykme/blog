---
title: 提起ES6-我知道什么
date: 2020-03-25 09:58:41
tags:
- javascript
---

# 提起ES6-我知道什么

首先，es6是什么呢？

> ECMAScript 6.0（以下简称ES6）是JavaScript语言的下一代标准，已经在2015年6月正式发布了。它的目标，是使得JavaScript语言可以用来编写复杂的大型应用程序，成为企业级开发语言。


## let var const

``` JavaScript
let ii = 4
let ii = 3
// error

var a = 4
var a = 3
//ok

const o = {}

o.a = 'b'
//ok

const v = 0
v =1
//error



for(let i = 0 ; i < 3; i++){
  setTimeout(() => {
    console.info(i, new Date().getTime())
  },1000)
}

for(var i = 0 ; i < 3; i++){
  setTimeout(() => {
    console.info(i, new Date().getTime())
  },1000)
}

```

## Promise

## async await


## symbol
