
let a = Array.from(new Array(100), (x, index)=>{
    return index
})

let b = Array.from(new Array(50), (x, index)=>{
    return index+index + 1
})
console.info(a,b)
var c= a.concat(b);
let start = new Date().getTime()
for(var i=0;i<c.length;i++){
	for(var j=i+1;j<c.length;j++){
		if(c[i]==c[j]){
			c.splice(j,1);
			j--;
		}
	}
}

c.sort();
let end = new Date().getTime()
console.log(c);
console.info('time :' , end-start)

 start = new Date().getTime()

 i =0;
 j =0;
var r = [];
while (a[i] != undefined) {
  while(b[j] != undefined) {
    if (a[i] < b[j]) {
      r.push(a[i])
      i++
    } else if (a[i] > b[j]) {
      r.push(b[j])
      j++
    } else {
      r.push(a[i])
      i++
      j++
    }
  }
}

 end = new Date().getTime()

console.info(r)
console.info('time ', end-start)
