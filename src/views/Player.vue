<template>
  <div>
    <video id="videoElement" controls autoplay muted width="300" height="200"/>
    <button @click="play">播放</button>
    <button @click="stop">暂停</button>
  </div>
</template>
<script>
import flvjs from "flv.js";

export default {
  data() {
    return {
      flvPlayer: null
    };
  },
  mounted() {
    if (flvjs.isSupported()) {
      const videoElement = document.getElementById("videoElement");
      this.flvPlayer = flvjs.createPlayer({
        type: "flv",
        isLive: true,
        hasAudio: true,
        hasVideo: true, // 是否有视频
        url: "http://47.115.82.41:8080/live?app=live&stream=111",
      }, {
        autoCleanupMinBackwardDuration: true, // 清除缓存 对 SourceBuffer 进行自动清理
      });
      this.flvPlayer.attachMediaElement(videoElement);
      this.flvPlayer.load();
      this.flvPlayer.play();
    }
  },
  methods: {
    play() {
      console.log("play");
      this.flvPlayer.play();
    },
    stop() {
      console.log("stop");
      this.flvPlayer.pause();
    }
  }
};
</script>
