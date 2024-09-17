/**
 * Creates a delay for the specified time.
 * @param {number} ms - The delay duration in milliseconds.
 * @returns {Promise} A promise that resolves after the delay.
 */
export async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
