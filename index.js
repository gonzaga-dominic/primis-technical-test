import { getCountries } from './src/getCountries.js';


/**
 * Program entry point
 */
async function main() {
    const rawCountries = await getCountries();

    for (const rawCountry of rawCountries) {
        console.log(rawCountry);
        break;
    }
}

main()
    .then(() => {
        process.exit(0);
    })
    .catch((error) => {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    });