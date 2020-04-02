  let dat = [
    ['A','B','C'],
    ['E','d','F'],
    ['G','H','i']
  ]


    let getString = function (str,source) {
      if (str.length == 0 ) return true
      let firstChar = str.charAt(0)
      let x= -1, y = -1
      source.map((r,ri) => {
        r.map((c,ci) => {
          console.info(c, firstChar)
          if (c == firstChar ) {
            x = ri
            y = ci
          }
        })
      })

      if (x == -1 || y == -1) return false


      return go(x,y,str,source)
    }

  let go = function (x,y, str, source) {
    if (str.length == 0) return true
    if (x < 0 || x >= source.length || y < 0 || y >= source[0].length) return false
    if (source[x][y] == str.charAt(0)) {
      source = source.
      source[x][y] = false
      console.info('go',x,y,str[0],source)
      return go(x+1,y, str.substring(1), source)
      || go(x-1,y, str.substring(1), source)
      || go(x,y-1, str.substring(1), source)
      || go(x,y+1, str.substring(1), source)
    } else return false
  }
