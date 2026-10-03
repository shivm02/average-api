/**
 * In-memory running-average tracker.
 * Keeps only the sum and count, so memory use is constant (O(1)).
 */
class AverageStore {
  constructor() {
    /** @type {number} Sum of all numbers received so far. */
    this.sum = 0;
    /** @type {number} How many numbers have been received. */
    this.count = 0;
  }

  /**
   * Adds a number and returns the new average of all numbers received.
   * @param {number} value - A finite number to include in the average.
   * @returns {number} The average of all numbers added so far.
   * @throws {TypeError} If value is not a finite number.
   */
  add(value) {
    if (typeof value !== 'number' || !Number.isFinite(value)) {
      throw new TypeError('value must be a finite number');
    }
    this.sum += value;
    this.count += 1;
    return this.sum / this.count;
  }

  /**
   * Clears all stored data.
   * @returns {void}
   */
  reset() {
    this.sum = 0;
    this.count = 0;
  }
}

module.exports = AverageStore;
