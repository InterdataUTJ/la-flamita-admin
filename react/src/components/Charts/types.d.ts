import { SensorDato } from "@/services/Sensores/types";

export interface LineChartProps {
  title: string;
  data: SensorDato[];
  dataKey: string;
  colors?: string[];
}