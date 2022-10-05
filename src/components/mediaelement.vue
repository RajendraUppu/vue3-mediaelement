<template>
  <video :width="width" :height="height" :src="source" ref="video"></video>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import "mediaelement/full";
import "mediaelement/build/mediaelementplayer.min.css";
const props = defineProps({
  source: {
    type: String,
    required: true,
    default: "",
  },
  width: {
    type: String,
    required: false,
    default: "auto",
  },
  height: {
    type: String,
    required: false,
    default: "auto",
  },
  success: {
    type: Function,
    default() {
      return false;
    },
  },
  error: {
    type: Function,
    default() {
      return false;
    },
  },
});
const video = ref<String | null>(null);
let player = ref<any>(null);
onMounted(() => {
  player.value = new MediaElementPlayer(video.value, {
    shimScriptAccess: "always",
    success: function (mediaElement: any, originalNode: any, instance: any) {
      // if (props.autoplay) {
      //   mediaElement.addEventListener("canplay", function () {
      //     instance.play();
      //   });
      // }
    },
    error: function (e: any) {
      props.error(e);
    },
  });
});
watch(
  () => props.source,
  (newSource) => {
    player.value.setSrc(newSource);
    player.value.setPoster("");
    player.value.load();
  }
);
</script>
<style>
.mejs__container {
  min-width: auto !important;
}
.mejs__overlay-button {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
:not([style*="display: none"]).mejs__controls {
  background: none !important;
}
.mejs__controls div {
  display: inline-block;
}
.mejs__time-rail {
  width: 50%;
}
.mejs__fullscreen > button {
  background-position: -80px 0 !important;
}
mediaelementwrapper,
mediaelementwrapper > div {
  height: 100%;
  display: block;
}
mediaelementwrapper object {
  width: 100% !important;
  height: 100% !important;
}
</style>
