<template>
  <div>
    <van-uploader :after-read="afterRead"/>
    <img :src="content" alt="">
    <button @click="getMe">点我</button>
    <div>{{ num }}</div>
  </div>
</template>

<script>
import { upload } from "@/api/upload";

export default {
  name: "Upload",
  data() {
    this.num = 1;
    return {
      content: "",
    };
  },
  methods: {
    getMe() {
      console.log("执行了getMe");
      console.log(this.num);
      this.num = 2;
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      this.content = file.content;
      upload(file)
        .then(res => {
          console.log(res);
        });

    }
  }
};
</script>

<style scoped>

</style>
