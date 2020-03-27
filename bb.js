// 2、给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
// 示例:
// 输入: [-2,1,-3,4,-1,2,1,-5,4], 
// 输出: 6 
// 解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。

let arr = [-2,1,-3,4,-1,2,1,-5,4]

  let f = function (d) {
    let sum = 0
    let left = 0
    let max = -999
    let maxA = []
    let cA = []
    for (let x = left; x <d.length; x ++) {
      sum += d[x]
      cA.push(d[x])
      if (sum > max) {
        max = sum
        maxA = [].concat(cA)
      }

      if (x == d.length -1) {
        left ++
        x = left
        sum = 0
        cA = []
      }
    }


    return {
      max: max,
      arr: maxA
    }
  }
