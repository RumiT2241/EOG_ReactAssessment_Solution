import { IMeasurementState } from "../subscriber/reducer";

// API for getting the Units from the measurements
export const getUnits = (measurements: IMeasurementState) => {
  const units: any = {};
  Object.keys(measurements).forEach((m: string) => {
    const name = measurements[m].name();
    const unit = measurements[m].atFirst().get('unit');
    units[name] = unit;
  });
  return units;
};