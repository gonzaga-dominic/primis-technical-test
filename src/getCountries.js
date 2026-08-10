import { loadEnvFile } from 'node:process';

loadEnvFile();

const API_BASE_URL = process.env.BASE_API_URL;
const API_KEY = process.env.API_KEY;

/**
 * Retrieve country data for a given region from the REST Countries API.
 *
 * @param {string} region - The region to fetch (e.g. "Europe").
 * @param {string} subregion - The subregion to fetch (e.g. "Northern Europe").
 * @returns {Promise<object[]>} Array of raw country objects from the API.
 * @throws {Error} If the network request fails or the API returns a non-200 response.
 */

export async function getCountries(region = 'Europe', subregion = null) {
    const url = new URL(API_BASE_URL);

    url.searchParams.set('region', region);
    url.searchParams.set('limit', '100');

    if (subregion) {
        url.searchParams.set('subregion', subregion);
    }

    let response;

    try {
        response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            }
        });
    } catch (networkError) {
        throw new Error(
            `Network error while contacting the REST Countries API: ${networkError.message}`
        );
    }

    if (!response.ok) {
        throw new Error(
            `REST Countries API returned a non-200 response: ${response.status} ${response.statusText}`
        );
    }

    try {
        const json = await response.json();
        const countries = json?.data?.objects;

        if (!Array.isArray(countries)) {
            throw new Error(
                'Unexpected API response shape: expected data.objects to be an array.'
            );
        }

        return countries;
    } catch (parseError) {
        throw new Error(
            `Failed to parse JSON response from the API: ${parseError.message}`
        );
    }
}