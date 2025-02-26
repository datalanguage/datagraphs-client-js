# Data Graphs Client Lib

API Client library for [Data Graphs](https://datagraphs.com)

Documentation for the Data Graphs API can be found here [Data Graphs Support](https://support.datagraphs.io)

## Install

```sh
npm install --save @datalanguage/datagraphs-client
```

## Usage

```js
// Require the library
const Datagraphs = require("@datalanguage/datagraphs-client");

// Create the Data Graphs client
const datagraphs = new Datagraphs();
```

## Examples

### Fetch all datasets

See https://datalanguage.github.io/datagraphs-client-js/Datasets.html#all

```js
const datasets = await datagraphs.datasets.all();
```

### Search concepts

See https://datalanguage.github.io/datagraphs-client-js/Concepts.html#search

```js
const concepts = await datagraphs.concepts.search();
```

### Get an individual concept

See https://datalanguage.github.io/datagraphs-client-js/Concepts.html#get

```js
const concept = await datagraphs.concepts.get(conceptId);
```

### Create a new concept

See https://datalanguage.github.io/datagraphs-client-js/Concepts.html#create

```js
const concept = await datagraphs.concepts.create(datasetId, {
  label: "My New Concept",
});
```

### Create a new candidate concept

See https://datalanguage.github.io/datagraphs-client-js/Candidates.html#create

```js
const candidate = await datagraphs.candidates.create({
  label: "My New Candidate",
});
```

## Configuration

Configuration options can either be passed as parameters to the DataGraphs constructor or set as environment variables. To find these values visit the `Applications` area of the [Data Graphs App](app.datagraphs.io)

| Constructor Property | Environment Variable     | Description                                |
| -------------------- | ------------------------ | ------------------------------------------ |
| projectId            | DATAGRAPHS_PROJECT_ID    | Your Data Graphs project id                |
| apiKey               | DATAGRAPHS_API_KEY       | Your Data Graphs application API key       |
| clientId             | DATAGRAPHS_CLIENT_ID     | Your Data Graphs application client id     |
| clientSecret         | DATAGRAPHS_CLIENT_SECRET | Your Data Graphs application client secret |

Below is an example of passing these parameters to the Data Graphs client constructor

```js
const datagraphs = new DataGraphs({
  projectId: "my-test-project",
  apiKey: "bZiDs4.....",
  clientId: "sR5dfR.....",
  clientSecret: "pRM6kR.....",
});
```

## Documentation

Full documentation for this library can be found at https://datalanguage.github.io/datagraphs-client-js/
