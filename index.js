import { getCountries } from './src/getCountries.js';
import { logMessage } from './src/utils.js';


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


}

main()
    .then(() => {
        process.exit(0);
    })
    .catch((error) => {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    });