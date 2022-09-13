import * as echarts from "echarts/core";
import {BarChart} from "echarts/charts";
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {GridComponent,LegendComponent} from "echarts/components";
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import {CanvasRenderer} from "echarts/renderers";

// 注册必须的组件
echarts.use([
    GridComponent,
    BarChart,
    CanvasRenderer,
    LegendComponent,
]);

export default echarts;