# Data Graphs Client Lib #

API Client library for [Data Graphs](datagraphs.com)

Documentation for the Data Graphs API can be found under the `Developer Docs` section of the [Data Graphs App](app.datagraphs.io)

## Install

```sh
npm install --save datagraphs-client
```

## Usage

```js
// Require the library
const Datagraphs = require('datagraphs-client')

// Create the Data Graphs client
const datagraphs = new DataGraphs();

// Fetch all datasets
const datasets = await datagraphs.datasets.all();
// Search concepts
const concepts = await datagraphs.concepts.search();
// Get an individual concept
const concept = await datagraphs.concepts.get(conceptId);
// Create a new concept
const concept = await datagraphs.concepts.create(datasetId, {
  label: 'My New Concept'
});
// Create a new candidate concept
const candidate = await datagraphs.candidates.create({
  label: 'My New Candidate'
});
```

## Configuration

Configuration options can either be passed as parameters to the DataGraphs constructor or set as environment variables. To find these values visit the `Applications` area of the [Data Graphs App](app.datagraphs.io)

| Constructor Property | Environment Variable | Description |
| --- | --- | --- |
| accountKey | DATAGRAPHS_ACCOUNT_KEY | Your Data Graphs account key |
| apiKey | DATAGRAPHS_API_KEY | Your Data Graphs application API key |
| clientId | DATAGRAPHS_CLIENT_ID | Your Data Graphs application client id |
| clientSecret | DATAGRAPHS_CLIENT_SECRET | Your Data Graphs application client secret |

Below is an example of passing these parameters to the Data Graphs client constructor

```js
const datagraphs = new DataGraphs({
  accountKey: 'my-test-account',
  apiKey: 'bZiDs4.....',
  clientId: 'sR5dfR.....',
  clientSecret: 'pRM6kR.....'
});
```