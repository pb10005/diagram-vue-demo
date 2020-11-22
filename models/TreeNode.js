import Nullable from "~/lib/Nullable";

export default class TreeNode {
  constructor(id, value) {
    this.id = id;
    this.value = value;

    this.leftChild = null;
    this.rightChild = null;
    this.marked = false;
  }

  add(node) {
    if (node.value < this.value) {
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
    let result = null;
    if (this.value === value) {
      this.marked = true;
      return this;
    } else if (this.value > value) {
      result = Nullable.of(this.leftChild)
        .map((x) => x.search(value))
        .returnOr(null);
    } else {
      result = Nullable.of(this.rightChild)
        .map((x) => x.search(value))
        .returnOr(null);
    }
    this.marked = true;
    return result;
  }

  clearMarked() {
    this.marked = false;
    Nullable.of(this.leftChild).exec((x) => x.clearMarked());
    Nullable.of(this.rightChild).exec((x) => x.clearMarked());
  }
}
