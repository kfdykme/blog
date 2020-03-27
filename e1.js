
// 题目2（算法）：合并两个从小到大链表的链表，使用的算法越快越好。
// 比如：L1={1,3,5}, L2={2,4}, L1.merge(L2)后，L1={1,2,3,4,5}, L2={}
// class LinkNode {
//   private int val;
//   private LinkNode next;
//   public void merge(LinkNode node) {
//     // TODO 请完成实现部分
//   }
// }
//


function LinkNode  () {

  this.val  = 0;
  this.next = null
  this.merge = function (node) {
    let head = new LinkNode()
    let res = head
    let l1 = node
    let l2 = this

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
  }

  this.insert = function (node) {
    let nex = this.next
    // let nodex = node.next
    this.next = node
    node.next = nex
    // node = nodex
  }
}
