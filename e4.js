// class TreeNode {
//     int value;
//     TreeNode left, right;
// };
//
// class Problem3 {
//   TreeNode find(TreeNode root) {
//     // TODO 请完成实现部分
//     if (root
//   }
// }


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
