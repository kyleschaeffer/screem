export default class Utility {
  /**
   * Greatest common denominator of given numbers
   * @param {number} a
   * @param {number} b
   * @return {number}
   */
  static gcd (a, b) {
    return (b === 0) ? a : utility.gcd(b, a % b)
  }

  /**
   * Display latitude/longitude in a friendly format
   * @param {number} coord
   * @param {number} boundary
   * @param {number} precision
   * @return {string}
   */
  static location (coord, boundary, precision) {
    let H = 'NSEW'[2 * (boundary != 90) + (coord < 0)]
    coord = (coord < 0 ? -coord : coord) % boundary
    let D = 0 | coord
    coord = (coord - D) * 60
    let M = 0 | coord
    coord = (coord - M) * 60
    let S = coord.toFixed(precision)
    return `${D}°${M}'${S}"${H}`
  }
}
