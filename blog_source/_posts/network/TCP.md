---
title: TCP
date: 2020-03-22 17:20:11
tags:
- network
---

# TCP

- 滑动窗口 （流量控制）
- 拥塞控制
  - 拥塞避免算法
- 网络模型
- 3次握手
- 4次挥手
  - timeout

## 滑动窗口

- Client
  - send ack
  - send not ACK
  - not send, ready to receive
  - not send, not ready to  receive
- Server
  - rec, ack, not send to process
  - rec not ACK
  - not rec

## 拥塞控制
防止过多数据注入到网络，可以使网络中的路由器或链路不过载

### 常用方法
- 慢开始， 拥塞控制
- 快重传，快恢复


#### 慢开始 慢启动
- 发送方维持一个 拥塞窗口， 拥塞窗口和接收方共同决定发送窗口
- 先发送1字节的试探报文
- 当收到第一个字节的确认后，发送2字节报文
- 2 ack， send 4 bit data. 2^n
- 达到慢开始门限
  - cwnd < ssthresh 慢开始算法
  - cwnd > ssthresh ,停止慢开始算法，改用拥塞避免算法
  - cwnd = ssthresh 都可以

#### 拥塞避免算法
- 每经过一个往返时间rtt则把发送方拥塞窗口+1
- 网络拥塞时（李儒丢包），
  - 慢开始门限设为原先一半
  - cwnd = 1
  - 执行慢开始算法

#### 快重传 快回复

- 快重传
  - 接收方 丢失包
    - 后续包继续发送针对该包的重传请求
  - 发送方
    - 接收到3个一样的确认 就知道该包出现错误，立刻重传该包
- 快恢复
  - 慢开始门限减半
  - cwnd设为门限减半后的数值
  - 拥塞避免算法（高起点，线性增长）

## 网络模型

### OSI模型

- 应用层
- 表示层
- 会话层
- 网络层
- 传输层
- 链路层
- 物理层


### TCP/IP模型

- 应用层 报文 message
- 传输层 报文段 segment
- 网络层 分组 packet
- 链路层 帧 frame
- 物理层 PDU bit

## 3次握手

Three way handshake ， 建立tcp连接

- 客户端发送 SYN包，进入SYN-SEND状态，等待服务器确认
- 服务器 收到SYN包，确认客户的sYN，自己也发送一个SYN-ACK包，进入SYN-RECV状态
- 客户端收到 SYN-ACK包，发生ACK包，发送完毕，客服端和服务器进入ESTABLISHED状态，完成3次握手，

### SYN攻击

Server发送SYN-ACK后，收到client的ACK之前的TCP连接称为TCP半连接 half-open connect

- server
  - SYN-RECV

等待client确认， 需要不断重发超时，导致正常的SYN因为队列满而被丢弃

## 4次挥手

Four-way wavehand。
- Client send FIN ,Client => FIN_WAIT_1
- Server get FIN ,send ACK, Server => CLOSE_WAIT
- Server send FIN, Server => LAST_ACK
- Client get FIN, Client => TIME_WAIT, send ACK , Server => CLOSED

##为什么建立连接是三次握手，而关闭连接却是四次挥手呢？

## 为什么TIME_WAIT状态需要经过2MSL(最大报文段生存时间)才能返回到CLOSE状态

一、保证TCP协议的全双工连接能够可靠关闭
二、保证这次连接的重复数据段从网络中消失


参考：
[1](https://www.jianshu.com/p/ef892323e68f)
[2](https://zhuanlan.zhihu.com/p/33889997)
