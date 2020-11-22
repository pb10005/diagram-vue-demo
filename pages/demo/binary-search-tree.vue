<template>
  <v-container>
    <v-btn icon @click="$router.push('/')">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <h2>Binary Search Tree Generator</h2>
    <v-card>
      <v-card-text>
        <v-form>
          <v-text-field
            label="Value of new node"
            type="number"
            v-model="val"
          ></v-text-field>
          <v-btn @click="add">Add</v-btn>
          <v-btn @click="search">Search</v-btn>
          <v-btn @click="remove">Remove</v-btn>
          <v-btn @click="clear">CLEAR TREE</v-btn>
          <v-btn @click="exportSVG">EXPORT SVG</v-btn>
        </v-form>
        <section class="pa-2 d-flex justify-center">
          <section class="auto-scroll">
            <Diagram
              ref="tree"
              :width="graph.width"
              :height="graph.height"
              :background="graph.background"
              :nodes="graph.nodes"
              :links="graph.links"
              @nodeClicked="push(23)"
            />
          </section>
        </section>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import Nullable from "~/lib/Nullable";
import BinarySearchTree from "@/models/BinarySearchTree";
import TreeNode from "@/models/TreeNode";
import Diagram from "diagram-vue";
export default {
  components: {
    Diagram,
  },
  data() {
    return {
      id: 0,
      val: 0,
      tree: new BinarySearchTree(null),
      graph: {
        width: 800,
        height: 600,
        background: "#eee",
        nodes: [],
        links: [],
        showGrid: false,
      },
    };
  },
  mounted() {
    this.id = 0;
    this.push(10);
    this.push(2);
    this.push(20);
    this.push(6);
    this.push(4);
    this.push(8);
    this.push(5);
    this.push(13);
    this.push(18);
    this.push(23);

    this.updateView();
  },
  methods: {
    createID() {
      return Math.floor(Math.random() * 100000);
    },
    remove() {
      this.tree.removeNode(parseInt(this.val, 10));
      this.updateView();
    },
    push(value) {
      this.tree.addNode(new TreeNode(this.createID(), value));
    },
    search() {
      this.clearSearchResult();
      if (this.tree.root !== null) {
        const result = this.tree.root.search(parseInt(this.val, 10));
        alert(result !== null ? "Found" : "Not found");
        this.updateView();
      }
    },
    clearSearchResult() {
      Nullable.of(this.tree.root).exec((x) => x.clearMarked());
    },
    render(x, y, width, node) {
      if (node === null) return -1;
      const id = ++this.id;
      this.graph.nodes.push({
        id: id,
        content: { text: node.value, color: node.marked ? "pink" : "white" },
        point: { x, y },
        width: 50,
        height: 50,
        stroke: "black",
        shape: "ellipse",
      });
      const leftID = this.render(x - width, y + 100, width / 2, node.leftChild);
      if (leftID > 0) {
        this.graph.links.push({
          id: this.createID(),
          source: id,
          destination: leftID,
          point: { x: x - width / 2 + 25, y: y + 75 },
          color: "black",
          shape: "straight",
          arrow: "dest",
        });
      }
      const rightID = this.render(
        x + width,
        y + 100,
        width / 2,
        node.rightChild
      );
      if (rightID > 0) {
        this.graph.links.push({
          id: this.createID(),
          source: id,
          destination: rightID,
          point: { x: x + width / 2 + 25, y: y + 75 },
          color: "black",
          shape: "straight",
          arrow: "dest",
        });
      }
      return id;
    },
    updateView() {
      this.graph.nodes = [];
      this.graph.links = [];
      this.render(375, 25, 200, this.tree.root);
    },
    add() {
      this.push(parseInt(this.val, 10));
      this.updateView();
    },
    clear() {
      this.tree.clear();
      this.updateView();
    },
    exportSVG() {
      const blob = new Blob([this.$refs.tree.$el.innerHTML], {
        type: "image/svg+xml",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "image.svg";
      link.click();
    },
  },
};
</script>
<style>
.auto-scroll {
  overflow: scroll;
}
</style>
