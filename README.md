# primis-technical-test

A Node.js project that fetches european country data from a REST Countries-style API, processes it, and generates both CSV and HTML reports in the output folder. 

## Requirements

- Node.js 20 or newer
- npm (included with Node.js)

## Installation

1. Open a terminal in the project root.
2. No NPM packages are required for this project.

## Configuration

The application reads its API settings from environment variables. A .env.example file is included as a template with the required configuration. Copy it to .env in the project root and update the values with your API endpoint settings.

```env
BASE_API_URL=https://api.restcountries.com/countries/v5
API_KEY=rc_live_xxxxxxxxxxxxx
```

## Running the project

From the project root, run:

```bash
node index.js
```

This executes the main script in `index.js`, which will:

- fetch the country data
- sort the data alphabetically by country name
- generate a CSV report at `output/countries.csv`
- generate an HTML report at `output/countries.html`

## Output files

After a successful run, the following files will be created in the `output` directory:

- `output/countries.csv`
- `output/countries.html`

## Troubleshooting

- If the script fails with an API error, confirm that `BASE_API_URL` and `API_KEY` are correct in `.env`.
- If no data is returned, verify that the API endpoint is reachable and that the response includes the expected data shape.
- If you see a Node.js version error, upgrade to Node.js 20+.
