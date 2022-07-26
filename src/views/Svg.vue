<template>
  <div class="grid">
    <svg width="750" height="500">
      <defs>
        <g id="leftalign">
          <!-- Left align icon made with lines -->
          <line x1="3" y1="3" x2="48" y2="3"></line>
          <line x1="3" y1="19" x2="65" y2="19"></line>
          <line x1="3" y1="35" x2="48" y2="35"></line>
          <line x1="3" y1="51" x2="65" y2="51"></line>
        </g>

        <g id="rightcaret">
          <!-- Right caret icon made with a polyline -->
          <polyline points="
            3 3
            30 28
            3 53
          "></polyline>
        </g>

        <g id="browser">
          <!-- Browser icon made with rectangle and lines -->
          <rect x="3" y="3" width="80" height="60"></rect>
          <line x1="3" y1="19" x2="83" y2="19"></line>
          <line x1="20" y1="3" x2="20" y2="17"></line>
        </g>
      </defs>
      <use href="#leftalign" x="100" y="100"></use>
      <use href="#rightcaret" x="300" y="100"></use>
      <use href="#browser" x="500" y="100"></use>
    </svg>
  </div>
</template>

<script>
export default {
  name: "Svg"
};
</script>

<style scoped>
html,
body {
  height: 100%;
  width: 100%;
  background: #e9e9e9;
}

body {
  margin: 0;
  text-align: center;
}

.grid {
  width: 750px;
  height: 500px;
  margin: 0 auto;
  padding-top: 100px;
  padding-left: 100px;
  position: relative;
}

.grid::before {
  content: "";
  border-left: 1px solid #7c7cea;
  position: absolute;
  top: 0;
  left: 100px;
  width: 750px;
  height: 600px;
}

.grid::after {
  content: "";
  border-top: 1px solid #7c7cea;
  position: absolute;
  top: 100px;
  left: 0;
  width: 850px;
  height: 500px;
}

svg {
  stroke: rgb(0, 0, 0);
  stroke-width: 5;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}
</style>
