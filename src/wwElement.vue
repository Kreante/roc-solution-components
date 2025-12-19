<template>
  <div class="evaluation-chart">
    <!-- Chart container with padding -->
    <div 
      class="chart-container"
      :style="{
        paddingLeft: `${paddingLeftResolved}%`,
        paddingRight: `${paddingRightResolved}%`
      }"
    >
      <!-- Grid lines (1-7) -->
      <div class="grid-lines">
        <div
          v-for="n in 7"
          :key="n"
          class="grid-line"
          :style="{
            left: `${((n - 1) / 6) * 100}%`,
            borderColor: gridLinesColorResolved
          }"
        ></div>
      </div>

      <!-- Bars area -->
      <div class="bars-area">
        <div
          v-for="(evaluation, idx) in sortedEvaluations"
          :key="idx"
          class="bar-row"
          :style="{ height: `${barWidthResolved}px` }"
        >
          <div
            class="bar"
            :style="{
              width: evaluation.width,
              backgroundColor: evaluation.color,
              minWidth: '8px'
            }"
            @mouseenter="hoveredBar = idx"
            @mouseleave="hoveredBar = null"
          >
            <!-- Tooltip -->
            <div
              v-if="hoveredBar === idx"
              class="tooltip"
              :style="{
                backgroundColor: tooltipBackgroundColorResolved,
                color: tooltipTextColorResolved
              }"
            >
              {{ evaluation.label }}: {{ evaluation.score }}
            </div>
          </div>
        </div>
      </div>

      <!-- X-Axis line -->
      <div
        class="x-axis"
        :style="{ borderColor: xAxisColorResolved }"
      ></div>

      <!-- X-Axis numbers -->
      <div class="x-axis-numbers">
        <span
          v-for="n in 7"
          :key="n"
          class="x-number"
          :style="{
            left: `${((n - 1) / 6) * 100}%`,
            color: numbersColorResolved
          }"
        >
          {{ n }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
const clampNumber = (value, min, max) => {
  const n = Number(value);
  if (Number.isNaN(n)) return min;
  return Math.max(min, Math.min(max, n));
};

export default {
  name: "EvaluationChart",
  props: {
    content: { type: Object, required: true },
    uid: { type: String, default: "" },
    wwEditorState: { type: Object, default: null },
    wwFrontState: { type: Object, default: null },
    wwElementState: { type: Object, default: null },
  },
  data() {
    return {
      hoveredBar: null
    };
  },
  computed: {
    isInEditor() {
      return !!this.wwEditorState;
    },
    barWidthResolved() {
      return clampNumber(this.content?.barWidth ?? 25, 10, 60);
    },
    paddingLeftResolved() {
      return clampNumber(this.content?.paddingLeft ?? 5, 0, 20);
    },
    paddingRightResolved() {
      return clampNumber(this.content?.paddingRight ?? 5, 0, 20);
    },
    minBarSizeResolved() {
      return clampNumber(this.content?.minBarSize ?? 8, 0, 20);
    },
    defaultBarColorResolved() {
      return this.content?.defaultBarColor || "#90EE90";
    },
    gridLinesColorResolved() {
      return this.content?.gridLinesColor || "rgba(0, 0, 0, 0.2)";
    },
    xAxisColorResolved() {
      return this.content?.xAxisColor || "rgba(0, 0, 0, 0.2)";
    },
    numbersColorResolved() {
      return this.content?.numbersColor || "rgba(0, 0, 0, 0.7)";
    },
    tooltipBackgroundColorResolved() {
      return this.content?.tooltipBackgroundColor || "#333333";
    },
    tooltipTextColorResolved() {
      return this.content?.tooltipTextColor || "#FFFFFF";
    },
    sortedEvaluations() {
      const raw = Array.isArray(this.content?.evaluations)
        ? this.content.evaluations
        : [];

      // Sort by order: 1 = top (Coachee), 2 = middle (Weighted Average), 3 = bottom (Contributors)
      const sorted = [...raw].sort((a, b) => {
        const ao = clampNumber(a?.order, 1, 10);
        const bo = clampNumber(b?.order, 1, 10);
        return ao - bo;
      });

      return sorted.map((item, idx) => {
        const label = item?.label || `Evaluation ${idx + 1}`;
        const rawScore = clampNumber(item?.score, 1, 7);
        // Round to 1 decimal
        const score = Math.round(rawScore * 10) / 10;
        const color = item?.color || this.defaultBarColorResolved;

        // Use same formula as grid lines: ((score - 1) / 6) * 100
        // This ensures bars align exactly with grid lines
        // CSS minWidth: 8px handles visibility for score=1
        const widthPct = ((score - 1) / 6) * 100;

        return {
          label,
          score,
          color,
          width: `${widthPct.toFixed(2)}%`,
        };
      });
    },
  },
};
</script>

<style scoped>
.evaluation-chart {
  width: 100%;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.chart-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.grid-lines {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 30px;
  pointer-events: none;
}

.grid-line {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 0;
  border-left: 1px solid rgba(0, 0, 0, 0.2);
}

.bars-area {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 10px 0;
}

.bar-row {
  position: relative;
  flex-shrink: 0;
}

.bar {
  position: relative;
  height: 100%;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  transition: opacity 0.2s;
}

.bar:hover {
  opacity: 0.85;
}

.tooltip {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(calc(100% + 8px), -50%);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 10;
  pointer-events: none;
}

.x-axis {
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
  height: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
}

.x-axis-numbers {
  flex-shrink: 0;
  position: relative;
  height: 30px;
  margin-top: auto;
}

.x-number {
  position: absolute;
  transform: translateX(-50%);
  font-size: 14px;
  top: 8px;
}
</style>
