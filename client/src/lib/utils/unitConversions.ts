/**
 * Convert meters per second to miles per hour.
 *
 * @param mps - the speed in meters per second
 * @return the speed in miles per hour, rounded to one decimal place
 */
export const mps2mph = (mps: number) => {
  return mps * 2.23694
}

/**
 * Converts meters per second to knots per second.
 *
 * @param mpss - the value in meters per second
 * @return the value in knots per second with 2 decimal places
 */
export const mpss2knps = (mpss: number) => {
  return mpss / 0.5144
}
