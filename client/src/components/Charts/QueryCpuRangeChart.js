import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'zingchart/es6';
import ZingChart from 'zingchart-react';
// EXPLICITLY IMPORT MODULE from node_modules
import 'zingchart/modules-es6/zingchart-maps.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa.min.js';

class QueryCpuRangeChart extends Component {
  constructor(props) {
    super(props);
    console.log('this.props.cpuRangeChart',this.props.cpuRangeChart)
    this.dataFormat();
    this.state = {
      config: {
        "globals": {
          "font-family": "Roboto"
        },
        "graphset": [{
          "type": "area",
          // "background-color": "#fff",
          "utc": true,
          "title": {
            "y": "15px",
            "text": "CPU Query Range Chart",
            "background-color": "none",
            "font-color": "#05636c",
            "font-size": "24px",
            "height": "25px",
            "adjust-layout": true
          },
          "plotarea": {
            "margin-top": "10%",
            "margin-right": "dynamic",
            "margin-bottom": "dynamic",
            "margin-left": "dynamic",
            "adjust-layout": true
          },
          "labels": [{
              "text": "Visitors: %plot-2-value",
              "default-value": "",
              "color": "#8da0cb",
              "x": "20%",
              "y": 50,
              "width": 120,
              "text-align": "left",
              "bold": 0,
              "font-size": "14px",
              "font-weight": "bold"
            },
            {
              "text": "Clicks: %plot-1-value",
              "default-value": "",
              "color": "#66c2a5",
              "x": "45%",
              "y": 50,
              "width": 120,
              "text-align": "left",
              "bold": 0,
              "font-size": "14px",
              "font-weight": "bold"
            },
            {
              "text": "Returns: %plot-0-value",
              "default-value": "",
              "color": "#fc8d62",
              "x": "70%",
              "y": 50,
              "width": 120,
              "text-align": "left",
              "bold": 0,
              "font-size": "14px",
              "font-weight": "bold"
            }
          ],
          "scale-x": {
            "label": {
              "text": "Date Range",
              "font-size": "14px",
              "font-weight": "normal",
              "offset-x": "10%",
              "font-angle": 360
            },
            "item": {
              "text-align": "center",
              "font-color": "#05636c"
            },
            "zooming": 1,
            // "labels": [
            //   "Sept<br>19",
            //   "Sept<br>20",
            //   "Sept<br>21",
            //   "Sept<br>22",
            //   "Sept<br>23",
            //   "Sept<br>24",
            //   "Sept<br>25",
            //   "Sept<br>26",
            //   "Sept<br>27",
            //   "Sept<br>28",
            //   "Sept<br>29",
            //   "Sept<br>30"
            // ],
            "max-items": 12,
            "items-overlap": true,
            "guide": {
              "line-width": "0px"
            },
            "tick": {
              "line-width": "2px"
            },
          },
          "crosshair-x": {
            "line-color": "#fff",
            "line-width": 1,
            "plot-label": {
              "visible": false
            }
          },
          "scale-y": {
            "item": {
              "font-color": "#05636c",
              "font-weight": "normal"
            },
            "label": {
              "text": "CPU Range Data",
              "font-size": "14px"
            },
            "guide": {
              "line-width": "0px",
              "alpha": 0.2,
              "line-style": "dashed"
            }
          },
          "plot": {
            "line-width": 2,
            "marker": {
              "size": 1,
              "visible": false
            },
            "tooltip": {
              "font-family": "Roboto",
              "font-size": "15px",
              "text": `%t value is %v`,
              "text-align": "left",
              "border-radius": 5,
              "padding": 10
            }
          },
          "series": this.dataFormat()
        }]
      }
    };
  }

  dataFormat = () => {
    let outerContainer = [];
    let dataLength = this.props.cpuRangeChart.length;
    let valueObj = {};
    let values = [];
    let dataTime = [];
    let timeValue;
    let lineColor = ["#FF9AA2", "#FFB7B2", "#FFDAC1", "#E2F0CB", "#B5EAD7", "#C7CEEA", "#9ED2F6", "#9DDCE0", "#ADD4FF"];

    for (let i = 0; i < dataLength; i++) {
      timeValue = this.props.cpuRangeChart[i][1];

      for (let j = 0; j < timeValue.length; j++) {
        values.push(Number(timeValue[j][1]));
        dataTime.push(Number(timeValue[j][0]))
      }

      valueObj = {
        "values": values,
        "dataTime": dataTime,
        "line-color": lineColor[i % lineColor.length],
        "aspect": "spline",
        "background-color": lineColor[i % lineColor.length],
        "alpha-area": ".5",
        "font-family": "Roboto",
        "font-size": "14px",
        "text": `${this.props.cpuRangeChart[i][0]}`
      }

      outerContainer.push(valueObj);
      valueObj = {};
      values = [];
      dataTime = [];
    }
    console.log('refactor', outerContainer);
    return outerContainer;
  }

  labelFormat = () => {
    const labelContainer = [];

  }


  render() {
    return (
      <div>
        <ZingChart id="querycpurangechart" data={this.state.config} />
      </div>
    );
  }
}


export default connect(
  state => ({
    cpuRangeChart: state.metricsReducer.cpuRangeChart,
  }),
  null
)(QueryCpuRangeChart);
