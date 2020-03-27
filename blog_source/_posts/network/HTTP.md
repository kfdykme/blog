---
title: HTTP
date: 2020-03-22 21:59:16
tags:
- network
---
# HTTP

HTTP 超文本传输协议

## HTTP

## HTTPS
- 客户端请求https
- 服务端返回证书
- 客服端生成秘钥，并用证书公钥进行加密
- 服务端解密，获取秘钥

## HTTP 状态码

- 1 通知
  - 100
  - 101
  - 102
- 2xx 成功
  - 200 成功 OK
  - 201
  - 202
  - 203
  - 204
  - 205
  - 206 断点续传
- 3xx 重定向
  - 300
  - 301
    - Moved Permanently
  - 302
  - 303
  - 304
    - Not Modified
    - 相应实体主体为空
    - 客户端已有数据，没必要重复发生
  - 305
- 4 客户端错误
  - 400 Bad Request
  - 401 Unauthorized
  - 403 Forbidden
  - 404 Not found
  - 409 COnflict
  - 410 Gone
- 5 服务端错误
  - 500
    - Internal Server Error
  - 502 bad gateway
