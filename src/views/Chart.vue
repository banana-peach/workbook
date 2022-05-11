<template>
  <div id="c1"></div>
</template>

<script>
import { Chart } from "@antv/g2";

export default {
  name: "Chart",
  data() {
    return {
      d1: [
        {
          type: "手术人次",
          value: 85,
          isShow: false
        },
        {
          type: "毒麻人次",
          value: 1,
          isShow: true
        },
      ],
      d2: [
        {
          type: "毒麻人次",
          value: 15,
          isShow: false
        },
        {
          type: "双人双核人次",
          value: 1,
          isShow: true
        },
      ]
    };
  },
  mounted() {
    this.initChart();
  },

  methods: {
    initChart() {
      const drugUsedRatio = this.d1[1].value / (this.d1[1].value + this.d1[0].value); // 毒麻占比
      const doubleCheckRatio = this.d2[1].value / (this.d2[1].value + this.d2[0].value); // 双人双核占比
      const drugUsedOffsetAngle = drugUsedRatio * Math.PI; // other 占的角度的一半
      const doubleCheckOffsetAngle = doubleCheckRatio * Math.PI; // other 占的角度的一半
      const chart = new Chart({
        container: "c1",
        // autoFit: true,
        height: 500,
        width: 500
      });
      chart.legend(false);
      chart.tooltip({
        showMarkers: false,
      });

      const view1 = chart.createView({
        region: {
          start: {
            x: 0,
            y: 0,
          },
          end: {
            x: 0.5,
            y: 1,
          },
        },
      });

      view1.coordinate("theta", {
        radius: 0.7,
        startAngle: 0 + drugUsedOffsetAngle,
        endAngle: Math.PI * 2 + drugUsedOffsetAngle,
      });
      view1.data(this.d1);
      view1.interaction("element-highlight");
      view1
        .interval()
        .adjust("stack")
        .position("value")
        .color("type", ["#d1dce3", "#96c7e3"])
        .label("value", function () {
          return {
            offset: -10,
            content: (obj) => {
              return obj.isShow ? obj.value : "";
            },
          };
        });

      const view2 = chart.createView({
        region: {
          start: {
            x: 0.5,
            y: 0.1,
          },
          end: {
            x: 1,
            y: 0.9,
          },
        },
      });
      // view2.axis(false);
      view2.coordinate("theta", {
        radius: 0.5,
        startAngle: 0 + doubleCheckOffsetAngle,
        endAngle: Math.PI * 2 + doubleCheckOffsetAngle,
      });
      view2.data(this.d2);
      view2.interaction("element-highlight");
      view2
        .interval()
        .adjust("stack")
        .position("value")
        .color("type", ["#96c7e3", "#68b6e3"])
        .label("value", {
          position: "right",
          offsetX: 5,
          offsetY: 10,
          content: (obj) => {
            return obj.isShow ? obj.value : "";
          },
        });
      chart.render();
      this.drawLinkArea(chart, view1, view2, drugUsedOffsetAngle);
      chart.on("afterpaint", function () {
        this.drawLinkArea(chart, view1, view2, drugUsedOffsetAngle);
      });
    },
    /* ---------绘制连接区间-----------*/
    drawLinkArea(chart, view1, view2, drugUsedOffsetAngle) {
      const canvas = chart.getCanvas();
      const container = chart.backgroundGroup;
      const view1_coord = view1.getCoordinate();
      const center = view1_coord.getCenter();
      const radius = view1_coord.getRadius();
      const view2_coord = view2.getCoordinate();

      // area points
      const pie_start1 = {
        x: center.x + Math.cos(Math.PI * 2 - drugUsedOffsetAngle) * radius,
        y: center.y + Math.sin(Math.PI * 2 - drugUsedOffsetAngle) * radius,
      };
      const pie_start2 = {
        x: center.x + Math.cos(drugUsedOffsetAngle) * radius,
        y: center.y + Math.sin(drugUsedOffsetAngle) * radius,
      };
      const interval_end1 = {
        x: view2_coord.center.x,
        // y: 850,
        y: view2_coord.center.y - 62.5,
      };
      const interval_end2 = {
        x: view2_coord.center.x,
        // y: 850,
        y: view2_coord.center.y + 62.5,
      };
      const path = [
        ["M", pie_start1.x, pie_start1.y],
        ["L", pie_start2.x, pie_start2.y],
        ["L", interval_end2.x, interval_end2.y],
        ["L", interval_end1.x, interval_end1.y],
        ["Z"],
      ];
      container.addShape("path", {
        attrs: {
          path,
          fill: "#e9f4fe",
        },
      });
      canvas.draw();
    }
  }
};
</script>

<style scoped>

</style>
