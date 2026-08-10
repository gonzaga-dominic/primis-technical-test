import { getCountries } from './src/getCountries.js';
import { logMessage } from './src/utils.js';
import { processCountries } from './src/processCountries.js';
import { createCSV } from './src/createCSV.js';

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, 'output');


/**
 * Program entry point
 */
async function main() {
    const rawCountries = await getCountries();

    if (!rawCountries || rawCountries.length === 0) {
        console.error('No countries found.');
        return;
    }

    logMessage(`Fetched ${rawCountries.length} countries.`);

    const sortedCountries = [...rawCountries].sort((a, b) =>
        a.names.common.localeCompare(b.names.common)
    );

    logMessage(`Sorted ${sortedCountries.length} countries.`);

    const processedCountries = processCountries(sortedCountries);
    logMessage(`Processed ${processedCountries.length} countries.`);

    await mkdir(OUTPUT_DIR, { recursive: true });

    const csvContent = createCSV(processedCountries);
    const csvPath = path.join(OUTPUT_DIR, 'countries.csv');
    await writeFile(csvPath, csvContent, 'utf8');
    logMessage(`CSV file created at: ${csvPath}`);
}

main()
    .then(() => {
        process.exit(0);
    })
    .catch((error) => {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    });