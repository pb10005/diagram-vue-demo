<template>
  <v-container>
    <v-btn icon @click="$router.push('/')">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <h2>Ready-to-use Diagram Editor</h2>
    <v-card>
      <v-card-text>
        <section class="auto-scroll" width="100%">
          <diagram-editor :graph="graph" />
        </section>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import { DiagramEditor } from "diagram-vue";
import "diagram-vue/dist/diagram.css";
export default {
  components: {
    DiagramEditor,
  },
  data() {
    return {
      graph: {
        nodes: [],
        links: [],
      },
    };
  },
};
</script>
