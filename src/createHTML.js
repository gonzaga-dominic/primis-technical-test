const TABLE_HEADERS = ['Flag', 'Country', 'Capital', 'Population', 'Languages', 'Currency'];

/**
 * Function AI-generated with Claude
 * Escapes special HTML characters to prevent broken markup or injection
 * when interpolating API data into the page.
 *
 * @param {*} value
 * @returns {string}
 */
function escapeHtml(value) {
    const str = String(value ?? '');
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}


function buildTableRow(country) {
    const flagCell = country.flagUrl
        ? `<img src="${escapeHtml(country.flagUrl)}" alt="Flag of ${escapeHtml(
            country.name
        )}" width="32">`
        : 'N/A';

    return `
      <tr>
        <td>${flagCell}</td>
        <td>${escapeHtml(country.name)}</td>
        <td>${escapeHtml(country.capital)}</td>
        <td>${escapeHtml(country.population)}</td>
        <td>${escapeHtml(country.languages)}</td>
        <td>${escapeHtml(country.currency)}</td>
      </tr>`;
}

export function createHTML(countries) {
    const rows = countries.map(buildTableRow).join('');
    const generatedAt = new Date()
    const timestamp = generatedAt.toLocaleString('en-GB', {
        dateStyle: 'long',
        timeStyle: 'short',
    });

    return `<!DOCTYPE html>
        <html lang="en">
            <head>
            <meta charset="UTF-8">
                <title>Countries Report</title>
                <link href="https://cdn.datatables.net/v/dt/dt-3.0.1/datatables.min.css" rel="stylesheet">
                <script src="https://cdn.datatables.net/v/dt/dt-3.0.1/datatables.min.js" ></script>
            </head>
            <body>
                <h1>Countries Report</h1>
                <p class="timestamp">Report generated: ${escapeHtml(timestamp)}</p>

                <table id="countriesTable" class="display">
                    <thead>
                        <tr>
                            ${TABLE_HEADERS.map((header) => `<th>${escapeHtml(header)}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${rows}
                    </tbody>
                </table>

                <script>
                    new DataTable('#countriesTable', {
                        pageLength: -1,
                        lengthMenu: [
                            [-1],
                            ['All']
                        ]
                    });
                </script>
            </body>
        </html>
    `;
}