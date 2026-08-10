function extractCapital(country) {
  if (Array.isArray(country.capitals) && country.capitals.length > 0) {
    return country.capitals[0].name || 'N/A';
  }
  return 'N/A';
}

function formatPopulation(value) {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return 'N/A';
  }
  return value.toLocaleString('en-US');
}

function extractLanguages(country) {
  if (Array.isArray(country.languages) && country.languages.length > 0) {
    return country.languages.map((l) => l.name).filter(Boolean).join(', ') || 'N/A';
  }
  return 'N/A';
}

function extractCurrency(country) {
  if (Array.isArray(country.currencies) && country.currencies.length > 0) {
    const { name, symbol } = country.currencies[0];
    return symbol ? `${name || 'N/A'} (${symbol})` : (name || 'N/A');
  }
  return 'N/A';
}

function extractFlagUrl(country) {
  return (country.flag && country.flag.url_png) || null;
}

function processCountry(country) {
  return {
    name: (country.names && country.names.common) || 'N/A',
    capital: extractCapital(country),
    population: formatPopulation(country.population),
    languages: extractLanguages(country),
    currency: extractCurrency(country),
    flagUrl: extractFlagUrl(country),
  };
}

/**
 * Processes and sorts a list of raw country objects.
 *
 * @param {object[]} countries - Raw country objects from the API.
 * @returns {object[]} Processed and alphabetically sorted country records.
 */
export function processCountries(countries) {
  return countries
    .map(processCountry);
}