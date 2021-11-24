import { IState } from '../../store';
import { Filter } from '../filters/reducer';

export interface ILatestMeasurements {
  [index: string]: string | number;
}

export const getSelectedMetrics = (state: IState): Filter[] => state.filters.metrics.filter((m: any) => m.selected);

export const getLatestMeasurements = (state: IState): ILatestMeasurements => {
  const {
    filters: { metrics },
    measurements,
  } = state;
  const result: ILatestMeasurements = {};
  metrics.forEach((m: any) => {
    const measurement = measurements[m.title];
    if (measurement && measurement.size()) {
      result[m.title] = measurement.atLast().get('value');
    } else {
      result[m.title] = '';
    }
  });
  return result;
};
