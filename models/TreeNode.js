import Nullable from "~/lib/Nullable";

export default class TreeNode {
  constructor(value) {
    this.value = value;

    this.leftChild = null;
    this.rightChild = null;
    this.marked = false;
  }

  add(node) {
    if (node.value <= this.value) {
      if (this.leftChild === null) {
        this.leftChild = node;
      } else {
        this.leftChild.add(node);
      }
    } else {
      if (this.rightChild === null) {
        this.rightChild = node;
      } else {
        this.rightChild.add(node);
      }
    }
  }

  search(value) {
    let found = false;
    if (this.value === value) {
      found = true;
    } else if (this.value > value) {
      found = Nullable.of(this.leftChild)
        .map((x) => x.search(value))
        .returnOr(false);
    } else {
      found = Nullable.of(this.rightChild)
        .map((x) => x.search(value))
        .returnOr(false);
    }
    this.marked = found;
    return found;
  }

  clearMarked() {
    this.marked = false;
    Nullable.of(this.leftChild).exec((x) => x.clearMarked());
    Nullable.of(this.rightChild).exec((x) => x.clearMarked());
  }
}
