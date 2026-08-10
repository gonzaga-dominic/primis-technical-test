const CSV_HEADERS = ['Country', 'Capital', 'Population', 'Languages', 'Currency'];

/**
 * Function AI-generated with Claude
 * Escapes a single CSV field per RFC 4180: wraps the field in double quotes
 * if it contains a comma, double quote, or newline, and doubles any
 * internal double quotes.
 *
 * @param {*} value
 * @returns {string}
 */
function escapeCsvField(value) {
  const str = String(value ?? '');
  const needsQuoting = /[",\n\r]/.test(str);

  if (!needsQuoting) {
    return str;
  }

  const escaped = str.replace(/"/g, '""');
  return `"${escaped}"`;
}


function buildCsvRow(fields) {
  return fields.map(escapeCsvField).join(',');
}


export function createCSV(countries) {
  const headerRow = buildCsvRow(CSV_HEADERS);

  const dataRows = countries.map((country) =>
    buildCsvRow([
      country.name,
      country.capital,
      country.population,
      country.languages,
      country.currency,
    ])
  );

  return [headerRow, ...dataRows].join('\r\n') + '\r\n';
}
