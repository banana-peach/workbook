<template>
  <svg width="300" height="300" >
    <rect x="3" y="3" width="80" height="60"></rect>
    <line x1="3" y1="19" x2="83" y2="19"></line>
    <line x1="20" y1="3" x2="20" y2="17"></line>
  </svg>
</template>

<script>
export default {
  name: "Svg"
};
</script>

<style scoped>
svg {
  stroke: #000;
  stroke-width: 5;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}
</style>
