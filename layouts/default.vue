<template>
  <v-app>
    <v-main>
      <nuxt />
    </v-main>
    <v-footer class="font-weight-medium">
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} —
        <a target="_blank" href="https://github.com/pb10005"
          ><strong>pb10005</strong></a
        >
      </v-col>
    </v-footer>
  </v-app>
</template>
