// 45分钟

题目1（js基础）: 阅读下面代码，写出结果
let data = { "a": 1, "b": 101 }
function read(readUseTime) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({...data})
    }, readUseTime)
  })
}

function write(value, writeUseTime) {
  console.info('write ',value)
  return new Promise(resolve => {
    setTimeout(() => {
      data = value
      resolve()
    }, writeUseTime)
  })
}

async function readAndWrite(key, value, readUseTime = 0, writeUseTime = 0) {
  let d = await read(readUseTime)
  d[key] = value
  await write(d, writeUseTime)
}

;(() => {
  setTimeout(readAndWrite, 0, 'a', 2)
  setTimeout(readAndWrite, 0, 'b', 102)
  setTimeout(() => {
    // 输出结果
    console.log(data)
  }, 1000)
})()
{ "a": 1, "b": 102 }

进一步问：必需输出的是 { "a": 2, "b": 102 }，怎么修改function readAndWrite

var isdo = null
async function readAndWrite(key, value, readUseTime = 0, writeUseTime = 0) {
  if (isdo != null)
  	await isdo;

  isdo = new Promise(async (resolve,reject)=>{
  	 let d = await read(readUseTime)
  	d[key] = value
    resolve(d)
  }).then((res)=> {
    return new Promise(async (resolve, reject)=>{

  			await write(res, writeUseTime)
      	isdo = false
    	  resolve()
    })
  })

}

var h = setTimeout(() => { h = null; }, 1000)
if (h == undefined) { }
isdo = new Promise


;(() => {
  setTimeout(readAndWrite, 0, 'a', 2)

  setTimeout(readAndWrite, 0, 'b', 102)
  setTimeout(() => {
    // 输出结果
    console.log(data)
  }, 1000)
})()
题目2（算法）：合并两个从小到大链表的链表，使用的算法越快越好。
比如：L1={1,3,5}, L2={2,4}, L1.merge(L2)后，L1={1,2,3,4,5}, L2={}
class LinkNode {
  private int val;
  private LinkNode next;
  public void merge(LinkNode node) {
    // TODO 请完成实现部分
  }
}


function LinkNode  () {

  this.val  = 0;
  this.next = null
  this.merge = function (node) {
    let head = new LinkNode()
    let res = head
    let l1 = node
    let l2 = this

    //if

    while(l1 != null || l2 != null) {
      let nex
      if (l1.val < l2.val) {
        res.insert(l1)
        l1 = l1.next
        res = res.next
      } else if (l1.val > l2.val) {
        res.insert(l2)
        l2 = l2.next
        res = res.next
      }
    }

    if (l1 != null) {
      res = l1
    } else {
      res = l2
    }
    this.next = head.next
    this.val = head.val
  }

  this.insert = function (node) {
    let nex = this.next
    // let nodex = node.next
    this.next = node
    node.next = nex
    // node = nodex
  }
}

//bu yong new node
function LinkNode  () {

  this.val  = 0;
  this.next = null
  this.merge = function (node) {

    let res = null
    let l1 = node
    let l2 = this



    let head = l1.val <= l2.val? l1:l2
    res = head
    //if
    if(head.val == l1.val) l1 = l1.next
    else l2 = l2.next

    while(l1 != null || l2 != null) {
      if (l1.val < l2.val) {
        l1.insert(l2)
        l1 = l1.next

      } else if (l1.val > l2.val) {
        l2 = l2.next
      }
    }

    if (l1 != null) {
      res = l1
    } else {
      res = l2
    }

  }

  this.insert = function (node) {
    let nex = this.next
    // let nodex = node.next
    this.next = node
    node.next = nex
    // node = nodex
  }
}



题目3（算法）：给定一个递增循环整数数组，从里面找出最小的元素，使用的算法越快越好。特别地，最小的元素可能出现在数组中间。比如：50, 52, 63, 90, 3, 8, 15, 44。
class Problem2 {
  int findmin(int[] array) {
    // TODO 请完成实现部分

  }
}


var findMin = function (arr) {
  return arr.sort((b,a) => b-a)[0]
}

var findMin = function (arr ) {
	let l =0
  let m = parseInt(arr.length/2)
  let r = arr.length-1
  if (arr.length==2) return Math.min(arr[0],arr[1])
  if (arr.length==1) return arr[0]
  console.info(arr)
  if (arr[l] <= arr[m]){
    return Math.min(arr[l],findMin(arr.slice(m+1)))
  }else {
    return Math.min(arr[m],findMin(arr.slice(0,m)))
  }
}


题目4（算法）：在二叉排序树上面找出第3大的节点。注意：不能把二叉树全量存储到另外的存储空间，比如存储到数组中，然后取出数组的第三个元素。
class TreeNode {
    int value;
    TreeNode left, right;
};

class Problem3 {
  TreeNode find(TreeNode root) {
    // TODO 请完成实现部分

  }
}

var res = []
var find = function (root) {
  findMax(root)
  return res[0]
}
var add = function add(arr, v) {
  if (arr.length >2) {
    arr[0] = arr[1]
    arr[1] = arr[2]
    arr[2] = v
  }
  else {
    arr.push(v)
  }
  return arr
}
var finMax = function (root) {
  if (root.left != null) {
    res = add(res,root.left.value)
  }

  res = add(res,root.value)
  if (root.right != null) {
    return findMax(root.right)
  }
}



题目5（java多线程）：阅读下面代码，在2线程环境下，设计一个方案，判断无限数据流(Stream)每个正整数是否素数，越快越好
interface Stream {
  long get(); // 获取下一个需判断的整数
  void put(boolean result); // 返回整数是否素数的结果
  static boolean isPrimeNumber(long num) { // 判断一个整数是否素数
    if (num < 2) return false;
    for (long i = 2, s = (long) Math.sqrt(num); i <= s; i++) {
      if (num % i == 0) return false;
    }
    return true;
  }
  static Stream getInstance() {
    try {
      return (Stream) Class.forName("StreamImpl").newInstance(); // 运行环境保证不会异常
    } catch (Exception e) {
      return null;
    }
  }
}
比如：Stream={1,2,3,4,...}, Result={false,true,true,false,...}，注意输出顺序。
public class Problem5 {
  private Stream stream = Stream.getInstance();
	private long t1;
  public void thread1() throws InterruptedException {
    assert Thread.currentThread().getName() == "thread1";
    // TODO 请完成实现部分
    long t = stream.get()
    boolean b = Stream.isPrimeNumber(t)

    stream.notify()
    t1
    stream.put(

    )
    stream.wait();
  }
  public void thread2() throws InterruptedException {
    assert Thread.currentThread().getName() == "thread2";

    long t = stream.get()
    boolean b = Stream.isPrimeNumber(t)
    stream.wait();
    stream.put(
      Stream.isPrimeNumber(stream.get())
    )
    stream.notify()
  }
  // TODO 请完成实现部分

	public static void main(String[] args) {
    Problem5 p5 = new Problem5()
    new Thread(new Runnable() {
      @Override
			void run() {

      try {
        p5.thread1();
      } catch (Exception e) {

      }
  	},"thread1").start();

    new Thread(new Runnable() {
      @Override
			void run() {
      try {
        p5.thread2();
      } catch (Exception e) {

      }
  	},"thread2").start();

  }
}


js基础：js模块化有哪些
引用js模块
require
require('xxx.js')
import A from 'hjk.js'
import AC from 'jjj.vue'

一个得到的是引用
一个得到的是一个对象

import 大部分时候通过 babel 实现

node不支持直接使用import

为了支持es6 有一个新的js运行环境 deno ？



electron基础：Main进程，Renderer进程如何通信


ipcMain

ipcMain.on('xxx-event',(event,arg) =>{
 //do some
  event.sender.send('')
}

ipcRender.send

-- remote



build.gradle
task complieJs (type: Exec, group: 'custom') {
    workingDir '.'
    commandLine 'kotlinc-js', '-output', 'node-publish/lib/kfmd.js' , "build/source", '-module-kind', 'commonjs'
}
// A problem occurred starting process 'command 'kotlinc-js''

var core = kfmd.Core()
var html = core.setContainorClass('demo').trans(a)


Android