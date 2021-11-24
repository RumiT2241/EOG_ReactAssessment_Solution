import { IMeasurementState } from '../subscriber/reducer';

export interface IChartData {
  name: string;
  [index: string]: any;
}

export const getChartData = (measurements: IMeasurementState, metrics: string[]): IChartData[] => {
  const dataMap: any = {};
  Object.keys(measurements).forEach((metric: string) => {
    measurements[metric].toJSON().points.forEach((point: number[]) => {
      if (metrics.includes(metric)) {
        const [time, value] = point;
        if (!dataMap[time]) {
          dataMap[time] = {};
        }
        dataMap[time][metric] = value;
      }
    });
  });
  return Object.keys(dataMap).map((d) => ({
    name: d,
    ...dataMap[d],
  }));
};
