// various utilities to help with displaying data

/**
 * Function to filter the network table, replacing any -999 values with default values.
 *
 * @param table - the network table to be filtered
 * @return the filtered network table
 */
export const getAcceleration = (acc: number) => {
  if (acc > 0.75) {
    return 'Rapidly accelerating'
  }
  if (acc > 0.25) {
    return 'Accelerating'
  }
  return 'Not accelerating'
}

let defaults: TelemetryData = {
  'orientation': 0,
  'chassis-x-speed': 0,
  'chassis-y-speed': 0,
  'accx': 0,
  'accy': 0,
  'accz': 0,
  'jerk-x': 0,
  'jerk-y': 0,
  'voltage': 12,
  'acc-profile': 'chill',
  'gear': 'park',
  'ebrake': false,
  'reorient': false,
  'gpws': false,
}

/**
 * Function to filter the network table, replacing any -999 values with default values.
 *
 * @param table - the network table to be filtered
 * @return the filtered network table
 */
export const filter = (table: TelemetryData) => {
  // if any entry of the table object has value -999, replace with default value
  for (let key in table) {
    if (
      table[key as keyof TelemetryData] === -999 ||
      table[key as keyof TelemetryData] === '-999'
    ) {
      ;(table[key as keyof TelemetryData] as number | string | boolean) =
        defaults[key as keyof TelemetryData]
    }
  }
  return table
}

/**
 * Calculate the resultant acceleration and its direction based on the given acceleration components and velocity components.
 *
 * @param acc_x - The x-component of acceleration
 * @param acc_y - The y-component of acceleration
 * @param v_x - The x-component of velocity
 * @param v_y - The y-component of velocity
 * @return An object containing the resultant acceleration (R) and its direction (theta)
 */
export const resolveAcceleration = (
  acc_x: number,
  acc_y: number,
  v_x: number,
  v_y: number
): Polar => {
  let R = (acc_x * v_x + acc_y * v_y) / Math.hypot(v_x, v_y)
  let theta = Math.atan2(v_y, v_x)
  return { R, theta }
}

/* SHUT UP SONARLINT */
/**
 * Returns the cardinal direction based on the input angle.
 *
 * @param angle - The input angle in degrees
 * @return The cardinal direction based on the input angle
 */
export const getDirection = (angle: number): CardinalDirection => {
  if (angle < 0 || angle > 360)
    if (angle < 22.5 || angle > 337.5) {
      return 'North'
    }
  if (angle > 22.5 && angle < 67.5) {
    return 'Northeast'
  }
  if (angle > 67.5 && angle < 112.5) {
    return 'East'
  }
  if (angle > 112.5 && angle < 157.5) {
    return 'Southeast'
  }
  if (angle > 157.5 && angle < 202.5) {
    return 'South'
  }
  if (angle > 202.5 && angle < 247.5) {
    return 'Southwest'
  }
  if (angle > 247.5 && angle < 292.5) {
    return 'West'
  }
  if (angle > 292.5 && angle < 337.5) {
    return 'Northwest'
  }

  throw new Error(`Angle ${angle} out of range!`)
}
