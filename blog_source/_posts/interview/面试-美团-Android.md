---
title: 面试-美团-Android
date: 2020-03-30 16:38:20
tags:
- interview
---

# 美团 Android 一面
感觉问得有点奇怪

- 冒泡
  - 排序算法时间复杂度
  - 优化
- 哈夫曼 哈夫曼编码
  - 觉得我生成的结果反了
- 瀑布模型
- onclick
- 自定义view属性
- 点击渐变颜色
- 聊了一下快应用 rn 容器
- 看了下我的github的code
- 主要聊天了


冒泡可以优化，忘了还能这样优化
``` javascript

let sort = function (arr) {
    let change = true
    let t = 0
    while(change) {
        change = false
        for (let x = 0; x < arr.length-1; x++) {
            if (arr[x] > arr[x+1]) {
                t = arr[x]
                arr[x] = arr[x+1]
                arr[x+1] = t
                change = true
            }
        }
    }

    return arr
}

// 优化过
let sort2 = function (arr) {
    let change = true
    let t = 0
    let l = arr.length-1
    while(change && l >0) {
        change = false
        for (let x = 0; x < l ; x++) {
            if (arr[x] > arr[x+1]) {
                t = arr[x]
                arr[x] = arr[x+1]
                arr[x+1] = t
                change = true
            }
        }
        l--
    }

    return arr
}
```
