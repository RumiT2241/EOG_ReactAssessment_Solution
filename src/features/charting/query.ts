export default `
query($input: [MeasurementQuery]) {
  getMultipleMeasurements(input: $input) {
    metric
    measurements {
      at
      value
      metric
      unit
    }
  }
}
`;