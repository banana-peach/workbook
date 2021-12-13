<template>
  <div>
    <div>文件二进制处理</div>
    <a id="h">点此进行下载</a>
    <canvas id="myCanvas" width="200" height="100"
            style="border:2px solid #333333;background: pink">
    </canvas>
    <button @click="clickMe">按钮</button>
    <button @click="change">change</button>
    {{ byteLength }}
  </div>
</template>

<script>
export default {
  name: "Files",
  data() {
    return {
      byteLength: 0
    };
  },
  mounted() {
    /*
    * canvas画图
    * */
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(95, 50, 40, 0, 2 * Math.PI);
    ctx.stroke();

    // 获取字符串字节长度
    // eslint-disable-next-line no-extend-native
    String.prototype.byteLength = function () {
      let count = 0;
      for (let i = 0, l = this.length; i < l; i++) {
        count += this.charCodeAt(i) <= 128 ? 1 : 2;
      }
      return count;
    };
    const str = ""
    console.log(str.byteLength());
    this.byteLength = str.byteLength();
  },
  methods: {
    /**
     * base64  to blob二进制
     */
    dataURItoBlob(dataURI) {
      const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0]; // mime类型
      const byteString = atob(dataURI.split(",")[1]); // base64 解码
      const arrayBuffer = new ArrayBuffer(byteString.length); // 创建缓冲数组
      const intArray = new Uint8Array(arrayBuffer); // 新建一个8位的整数类型数组，用来存放ASCII编码的字符串
      for (let i = 0; i < byteString.length; i++) {
        intArray[i] = byteString.charCodeAt(i); // String.charCodeAt 将UTF-8字符转变为ASCII格式, 一个一个字符改
      }
      // console.log(intArray);
      return new Blob([intArray], { type: mimeString });
    },
    clickMe() {
      const canvas = document.getElementById("myCanvas");
      const url = canvas.toDataURL("image/png");
      console.log(this.dataURItoBlob(url));
      const newBlob = this.dataURItoBlob(url)
        .slice(0, 100, "part");
      console.log(newBlob);
      const img = window.URL.createObjectURL(this.dataURItoBlob(url));
      const a = document.getElementById("h");
      a.download = "helloWorld.png";
      a.href = img;
    },
    change() {
      // ASCII码转字符串
      // [121, 111, 117] => you
      let dataString = "";
      const str = [121, 111, 117, 43, 44];
      const buff = new ArrayBuffer(str.length); // 生成 [0, 0, 0, 0]
      const char = new Uint8Array(buff);
      for (let i = 0; i < buff.byteLength; i++) {
        char[i] = str[i];
      } // 生成 [121, 111, 117, 43, 44]
      for (let n = 0; n < char.length; n++) {
        dataString += String.fromCharCode(char[n]); // String.fromCharCode 将ASCII字符转变UTF-16,  一个一个数字改
      } // 转换成  you+,
      console.log(dataString);
    },

  }
};
</script>

<style scoped>

</style>
