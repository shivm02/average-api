#!/usr/bin/env node
/**
 * Command-line client for the Average API.
 * Usage: node client/cli.js <number> [<number> ...]
 * Env:   API_URL (default http://localhost:3000)
 */

const API_URL = process.env.API_URL || 'http://localhost:3000';

/**
 * Sends one number to the server.
 * @param {number} number - The number to submit.
 * @param {string} [baseUrl=API_URL] - Server base URL.
 * @returns {Promise<{average: number, count: number}>} Server response.
 * @throws {Error} If the server responds with a non-2xx status.
 */
async function postNumber(number, baseUrl = API_URL) {
  const res = await fetch(`${baseUrl}/average`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ number }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

/**
 * Entry point: posts each CLI argument in order and prints the running average.
 * @param {string[]} args - Raw CLI arguments.
 * @returns {Promise<void>}
 */
async function main(args) {
  if (args.length === 0) {
    console.error('Usage: node client/cli.js <number> [<number> ...]');
    process.exit(1);
  }
  for (const arg of args) {
    const n = Number(arg);
    if (arg.trim() === '' || !Number.isFinite(n)) {
      console.error(`"${arg}" is not a valid number`);
      process.exit(1);
    }
    const { average, count } = await postNumber(n);
    console.log(`sent ${n} -> average ${average} (count ${count})`);
  }
}

if (require.main === module) {
  main(process.argv.slice(2)).catch((err) => {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  });
}

module.exports = { postNumber };
