<template>
  <div class="home">
    <div>
      初始化
    </div>
    <div>
      <van-button type="primary" @click="getPort">连接</van-button>
      <van-button type="success" @click="closePort">关闭</van-button>
      <div>{{ id }}</div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  data() {
    return {
      port: null,
      id: "",
      reader: null
    };
  },
  mounted() {
    // this.getPort()
  },
  methods: {
    // async closePort() {
    //   this.reader.releaseLock();
    //   await this.port.close()
    // },
    async closePort() {
      // eslint-disable-next-line no-unmodified-loop-condition
      const reader = this.port.readable.getReader();
      reader.releaseLock();
      await this.port.close();
    },

    uint8Array(uint8Array) {
      return Array.prototype.map.call(uint8Array, (x) => ("00" + x.toString(16)).slice(-2))
        .join("");
    },
    async getPort() {
      console.log("准备获得端口");
      /** butConnect listener below ***/
      let keepReading = true;
      let reader;
      // all data parsed are stored in a list ordered by received time of the data frame.
      // let receivedframe = [];
      if ("serial" in navigator) {
        const port = await navigator.serial.requestPort();
        await port.open({ baudRate: 115200 });
        keepReading = true;

        reader = port.readable.getReader();
        this.reader = reader;
        this.port = await port;
        console.log(port);
        // const writeInt = setInterval(async () => {
        // eslint-disable-next-line no-unmodified-loop-condition
        while (port.readable && keepReading) {
          try {
            // eslint-disable-next-line no-constant-condition
            while (true) {
              const {
                value,
                done
              } = await reader.read();
              if (done) {
                // Allow the serial port to be closed later.
                reader.releaseLock();
                break;
              }
              if (value) {
                /** TODO: deal with the data value **/
                this.id += this.uint8Array(value);
              } else {
                console.log("没有value");
              }
            }
          } catch (error) {
            console.error(error);
          } finally {
            console.log(port.readable, keepReading);
          }
        }
        // clearInterval(writeInt);
        await port.close();
        console.log("port closed");
      }
    }
  }
};
</script>
