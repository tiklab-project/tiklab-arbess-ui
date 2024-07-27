import * as echarts from "echarts/core";
import {PieChart,BarChart,LineChart,HeatmapChart,GaugeChart} from 'echarts/charts';

// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
    TooltipComponent,
    GridComponent,
    LegendComponent,
    DatasetComponent,
    VisualMapComponent,
    ToolboxComponent,
    TitleComponent,
} from 'echarts/components';

// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import {CanvasRenderer} from "echarts/renderers";

// 注册必须的组件
echarts.use(
    [
        PieChart,
        BarChart,
        LineChart,
        HeatmapChart,

        TitleComponent,
        TooltipComponent,
        GridComponent,
        LegendComponent,
        DatasetComponent,
        VisualMapComponent,
        CanvasRenderer,
        ToolboxComponent

    ]
);


export default echarts
