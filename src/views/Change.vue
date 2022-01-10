<template>
  <div class="change-container">
    <div class="change-title">
      <span>2进制、10进制和16进制转换</span>
    </div>
    <div class="change-body">
      <van-field v-model="ten" type="digit" label="十进制" clearable
                 @click-input="clearAll"/>
      <van-field v-model="sixteen" type="text" label="十六进制" clearable
                 @click-input="clearAll"/>
      <van-field v-model="two" type="digit" label="二进制" clearable
                 @click-input="clearAll"/>
    </div>
    <div class="change-button">
      <van-button plain hairline type="primary"
                  @click="getTen"
                  @touchstart="getTen"
      >十进制转
      </van-button>
      <van-button plain hairline type="primary"
                  @click="getSixTeen"
                  @touchstart="getSixTeen"
      >十六进制转
      </van-button>
      <van-button plain hairline type="primary"
                  @click="getTwo"
                  @touchstart="getTwo"
      >二进制转
      </van-button>
    </div>

  </div>
</template>

<script>
// import { ref } from 'vue';

export default {
  name: "Change",
  data() {
    return {
      two: 0,
      sixteen: 0,
      ten: 0
    };
  },
  created() {
    document.title = "进制转换";
  },
  methods: {
    getTen() {
      const val = this.ten;
      // console.log(`获取新的的值得${val}`);
      this.two = parseInt(val, 2);
      this.sixteen = parseInt(val, 16);
    },
    getSixTeen() {
      const val = this.sixteen;
      // console.log(`获取新的的值得${val}`);
      this.two = parseInt(val, 2);
      this.ten = parseInt(val, 10);
    },
    getTwo() {
      const val = this.two;
      // console.log(`获取新的的值得${val}`);
      this.ten = parseInt(val, 10);
      this.sixteen = parseInt(val, 16);
    },
    clearAll() {
      this.two = "";
      this.sixteen = "";
      this.ten = "";
    }
  }

};
</script>

<style scoped lang="scss">
.change-title {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  font-size: 20px;
  font-weight: 700;
}

.change-container {
  height: 100%;
  //background: red;
  background: #e6e6e6;
}

.change-body {
  //padding-top: 10vh;
}

.change-button {
  padding-top: 2vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
