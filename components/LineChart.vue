<script>
import { Pie } from "vue-chartjs";

export default {
  extends: Pie,
  props: {
    chartData:{
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  }),

  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
</script>
