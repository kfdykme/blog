  let arr = [1,2,2,3,5,6,7,8,9]

  let v = function (d, n) {
    let res = []
    let sum = 0
    let current = []
    let left = 0
    for(let x = 0; x < d.length; x++) {
      sum += d[x]
      console.info(x,sum,d[x])
      if (sum == n) {
        current.push(d[x])
        res.push(current)
        current = []
        left ++
        x  = left
        sum = 0
      } else if (sum > n) {
        left ++
        x = left
        current = []
        sum = 0
      } else if (sum < n) {
        current.push(d[x])
      }
    }

    return res
  }
