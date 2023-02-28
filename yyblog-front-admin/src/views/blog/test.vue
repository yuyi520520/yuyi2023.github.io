<template>
  <div>
    test
    <EditorHtml v-model="markdownContent">
        {{ markdownContent }}
    </EditorHtml>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const markdownContent=ref("# test");
</script>

<style lang="scss">
</style>
