export default {
  editor: {
    label: { en: "Evaluation Chart" },
    icon: "chart-bar",
  },
  properties: {
    evaluations: {
      label: { en: "Evaluations" },
      type: "Array",
      section: "settings",
      bindable: true,
      defaultValue: [
        { label: "Coachee", score: 5.0, color: "#6941C6", order: 1 },
        { label: "Weighted Average", score: 4.2, color: "#31523E", order: 2 },
        { label: "Contributors", score: 3.5, color: "#72DBA3", order: 3 },
      ],
      options: {
        expandable: true,
        getItemLabel(item, index) {
          return item?.label || `Evaluation ${index + 1}`;
        },
        item: {
          type: "Object",
          options: {
            item: {
              label: {
                label: "Label (optional)",
                type: "Text",
                options: { nullable: true },
              },
              score: {
                label: "Score",
                type: "Number",
                options: { min: 1, max: 7, step: 0.1 },
              },
              color: {
                label: "Bar Color",
                type: "Color",
                options: { nullable: true },
              },
              order: {
                label: "Display Order",
                type: "Number",
                options: { min: 1, max: 10, step: 1 },
              },
            },
          },
        },
      },
      /* wwEditor:start */
      bindingValidation: {
        type: "array",
        tooltip: "Array of objects with {label?, score, color?, order?}",
      },
      propertyHelp: {
        tooltip:
          "Bars displayed vertically. Order 1=top (Coachee), 2=middle (Weighted Average), 3=bottom (Contributors).",
      },
      /* wwEditor:end */
    },
    defaultBarColor: {
      label: { en: "Default Bar Color" },
      type: "Color",
      section: "style",
      bindable: true,
      defaultValue: "#90EE90",
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "Bind a color value for the default bar color",
      },
      propertyHelp: {
        tooltip: "Default color for bars when no specific color is set",
      },
      /* wwEditor:end */
    },
    gridLinesColor: {
      label: { en: "Grid Lines Color" },
      type: "Color",
      section: "style",
      bindable: true,
      defaultValue: "rgba(0, 0, 0, 0.2)",
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "Bind a color value for the grid lines",
      },
      propertyHelp: {
        tooltip: "Color of the vertical grid lines",
      },
      /* wwEditor:end */
    },
    xAxisColor: {
      label: { en: "X-Axis Color" },
      type: "Color",
      section: "style",
      bindable: true,
      defaultValue: "rgba(0, 0, 0, 0.2)",
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "Bind a color value for the x-axis line",
      },
      propertyHelp: {
        tooltip: "Color of the horizontal x-axis line",
      },
      /* wwEditor:end */
    },
    numbersColor: {
      label: { en: "Numbers Color" },
      type: "Color",
      section: "style",
      bindable: true,
      defaultValue: "rgba(0, 0, 0, 0.7)",
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "Bind a color value for the grid numbers",
      },
      propertyHelp: {
        tooltip: "Color of the grid numbers",
      },
      /* wwEditor:end */
    },
    tooltipBackgroundColor: {
      label: { en: "Tooltip Background" },
      type: "Color",
      section: "style",
      bindable: true,
      defaultValue: "#333333",
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "Bind a color value for the tooltip background",
      },
      propertyHelp: {
        tooltip: "Background color of the tooltip",
      },
      /* wwEditor:end */
    },
    tooltipTextColor: {
      label: { en: "Tooltip Text Color" },
      type: "Color",
      section: "style",
      bindable: true,
      defaultValue: "#FFFFFF",
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "Bind a color value for the tooltip text",
      },
      propertyHelp: {
        tooltip: "Color of the text inside tooltips",
      },
      /* wwEditor:end */
    },
    minBarSize: {
      label: { en: "Minimum Bar Size (%)" },
      type: "Number",
      section: "settings",
      bindable: true,
      defaultValue: 8,
      options: {
        min: 0,
        max: 20,
        step: 1,
      },
      /* wwEditor:start */
      bindingValidation: {
        type: "number",
        tooltip:
          "Minimum width percentage for bars, ensuring visibility even for score=1",
      },
      propertyHelp: {
        tooltip:
          "Sets the minimum width (%) for bars to ensure visibility even for minimum scores",
      },
      /* wwEditor:end */
    },
  },
};


