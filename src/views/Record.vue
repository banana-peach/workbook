<template>
  <div>
    <div>录音功能</div>
    <div>
      <van-uploader v-model="fileList" accept=".mp3" :after-read="playMusic">
        <van-button icon="plus" type="primary">上传文件</van-button>
      </van-uploader>
      <audio :src="audioSrc" autoplay controls/>
    </div>
    <div id="container"></div>
    <div style="width: 100%;background: pink;height:2px"></div>
    <div>
      <button @click="record">开始录音</button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "Record",
  setup() {
    const fileList = ref([]);
    return { fileList };
  },
  data() {
    return {
      // fileList: null
      audioSrc: ""
    };
  },
  methods: {
    record() {
      //  录音
      window.navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 44100, // 采样率
          channelCount: 2, // 声道
          volume: 1.0 // 音量
        }
      })
        .then((mediaStream) => {
          console.log(mediaStream);
          this.beginRecord(mediaStream);
        })
        .catch(err => {
          // 如果用户电脑没有麦克风设备或者用户拒绝了，或者连接出问题了等
          // 这里都会抛异常，并且通过err.name可以知道是哪种类型的错误
          console.error(err);
        });
    },
    beginRecord(mediaStream) {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const mediaNode = audioContext.createMediaStreamSource(mediaStream);
      // 这里connect之后就会自动播放了
      console.log(audioContext.destination);
      mediaNode.connect(audioContext.destination);
    },
    playMusic() {
      console.log("收到音乐");
      const audio = this.fileList[0].file;
      console.log(audio);
      // const B = new Blob(audio, { type: "audio/mpeg" });
      this.audioSrc = URL.createObjectURL(audio);
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(audio);
      fileReader.onload = function () {
        const uint8 = new Uint8Array(this.result);
        const newBlob = new Blob(uint8);
        const ele = document.createElement("a");
        ele.download = "wulao.mp3";
        console.log(URL.createObjectURL(newBlob));
        ele.href = URL.createObjectURL(newBlob);
        ele.className = "wo";
        const container = document.getElementById("container");
        ele.style.height = "10px";
        ele.style.width = "10px";
        container.append(ele);

        ele.click();
        console.log(ele);
      };
    }
  }
};
</script>

<style scoped>

</style>
