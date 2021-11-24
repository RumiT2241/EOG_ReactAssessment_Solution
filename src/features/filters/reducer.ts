import { actionTypes } from './actions';

export interface Filter {
  title: string;
  selected?: boolean;
}

interface IFiltersState {
  metrics: Array<Filter>;
}

const initialState: IFiltersState = {
  metrics: [],
};

interface IFilterAction {
  type: string;
  payload: any;
}

const FilterReducer = (state = initialState, action: IFilterAction) => {
  switch (action.type) {
    case actionTypes.METRICS_DATA_RECEIVED:
      state = { ...state };
      state.metrics = action.payload.map((title: string) => ({ title, selected: false }));
      return state;
    case actionTypes.METRICS_SELECTED:
      state.metrics = state.metrics.map((metric: any) => ({
        ...metric,
        selected: action.payload.includes(metric.title),
      }));
      return state;
    default:
      return state;
  }
};

export default FilterReducer;
