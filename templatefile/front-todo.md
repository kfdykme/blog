

- label

- var a = [].push(...[1, 2, 3]);
  - Array.push返回长度
  - Array.push([]) 插入一个
  - Array.push(...[]) 插入数组中每一个
    - 与concat区别， 数量太大push会超出限制
    - concat快很多
- js
  - 点点点
    - 可变参数
    - 扩展运算符
- var set = new Set([0, 2, 2, 0, 0, 5, 9, {}, {}, NaN, NaN]);
  - {} == {} //false
- os
  - 多批道
  - 分时系统
  - 操作系统基本特征
  - os时分复用码分复用
- 单向哈希表特征
- 面向对象程序设计的有点
- node环境执行自定义代码的安全隐患
  - 大量的同步计算造成进程卡死
  - 执行 process.exit(1) 造成进程直接退出
  - 执行 require('child_process').spwan()，直接调用系统程序，造成系统层面的危害
