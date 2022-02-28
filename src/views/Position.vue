<template>
  <div class="items">
    <div class="item">1</div>
    <div class="item">2</div>
  </div>
</template>

<script>
export default {
  name: "Position"
};
</script>

<style scoped>

.items {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100px;
}
.item {
  background: red;
  height: 50px;
  width: 100px;
}

</style>
