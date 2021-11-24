// GraphQL query for getting all measurements
export default `subscription {
    newMeasurement{
      metric,
      at,
      value,
      unit
    }
  }`;