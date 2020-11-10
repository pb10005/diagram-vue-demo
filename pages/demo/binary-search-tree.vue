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
          <v-btn @click="add">ADD NODE</v-btn>
          <v-btn @click="clear">CLEAR TREE</v-btn>
          <v-btn @click="exportSVG">EXPORT SVG</v-btn>
        </v-form>
        <section
          class="pa-2 d-flex auto-scroll justify-center"
          width="100%"
          height="100%"
        >
          <Diagram
            ref="tree"
            :width="graph.width"
            :height="graph.height"
            :background="graph.background"
            :nodes="graph.nodes"
            :links="graph.links"
          />
        </section>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
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
      tree: {
        root: null,
      },
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
    this.updateView();
  },
  methods: {
    createID() {
      return Math.floor(Math.random() * 100000);
    },
    push(value) {
      if (this.tree.root === null) {
        this.tree.root = new TreeNode(value);
      } else {
        this.tree.root.add(new TreeNode(value));
      }
    },
    render(x, y, width, node) {
      if (node === null) return -1;
      const currentId = ++this.id;
      this.graph.nodes.push({
        id: currentId,
        content: { text: node.value, color: "white" },
        point: { x, y },
        width: 50,
        height: 50,
        stroke: "black",
        shape: "ellipse",
      });
      const leftId = this.render(x - width, y + 100, width / 2, node.leftChild);
      if (leftId > 0) {
        this.graph.links.push({
          id: this.createID(),
          source: currentId,
          destination: leftId,
          point: { x: x - width / 2 + 25, y: y + 75 },
          color: "black",
          shape: "straight",
          arrow: "dest",
        });
      }
      const rightId = this.render(
        x + width,
        y + 100,
        width / 2,
        node.rightChild
      );
      if (rightId > 0) {
        this.graph.links.push({
          id: this.createID(),
          source: currentId,
          destination: rightId,
          point: { x: x + width / 2 + 25, y: y + 75 },
          color: "black",
          shape: "straight",
          arrow: "dest",
        });
      }

      return currentId;
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
      this.tree.root = null;
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
  overflow: auto;
}
</style>
