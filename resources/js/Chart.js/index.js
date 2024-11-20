import createDoughnut from "./charts/doughnut";
import { createLine, createMultiLine } from "./charts/line";

window.ChartJS = { createDoughnut, createLine, createMultiLine };