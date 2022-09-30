<template>
  <video :width="width" :height="height" ref="video">
    <source :src="source" />
  </video>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import "mediaelement/full";
import "mediaelement/build/mediaelementplayer.min.css";
const props = defineProps({
  source: {
    type: String,
  },
  width: {
    type: String,
  },
  height: {
    type: String,
  },
});
const video = ref(null);
onMounted(() => {
  let player = new MediaElementPlayer(video.value, {
    success: function (mediaElement: any, originalNode: any, instance: any) {
      console.log(mediaElement, originalNode, instance);
    },
  });
});
</script>
