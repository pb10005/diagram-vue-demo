<template>
  <v-container>
    <h1>diagram-vue</h1>
    <p>
      <strong>diagram-vue</strong> is a editable SVG-based diagram component for
      Vue.
    </p>
    <a target="_blank" href="https://github.com/pb10005/diagram-vue"
      >View on GitHub</a
    >
    <h2>Demos</h2>
    <v-row>
      <v-col cols="sm-4">
        <v-card class="ma-1">
          <v-img
            src="https://raw.githubusercontent.com/pb10005/diagram-vue/master/img/screenshot.svg"
          ></v-img>
          <v-card-title>Ready-to-use diagram editor</v-card-title>
          <v-card-actions>
            <v-btn text @click="$router.push('/demo/editor')"
              >GET STARTED</v-btn
            >
          </v-card-actions></v-card
        >
      </v-col>
      <v-col cols="sm-4">
        <v-card class="ma-1">
          <v-img
            src="https://raw.githubusercontent.com/pb10005/diagram-vue/master/img/bst.svg"
          ></v-img>
          <v-card-title> Binary Search Tree Generator </v-card-title>
          <v-card-actions>
            <v-btn text @click="$router.push('/demo/binary-search-tree')">
              GET STARTED</v-btn
            ></v-card-actions
          >
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
