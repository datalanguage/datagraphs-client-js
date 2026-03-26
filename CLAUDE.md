# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Node.js client library (`@datalanguage/datagraphs-client`) for the Data Graphs API. Pure JavaScript with CommonJS modules — no TypeScript, no bundler, no linter configured.

## Commands

```bash
npm test                # Run all tests (Jest)
npm run test:changed    # Run only tests for changed files
npm run test:watch      # Watch mode
npm run test:cov        # Run tests with coverage report
npx jest path/to/file.spec.js  # Run a single test file
npm run build:docs      # Generate JSDoc documentation
```

## Architecture

**Entry point:** `index.js` → exports `DataGraphs` class from `lib/DataGraphs.js`.

**DataGraphs** is the main client class. Its constructor creates an `Api` instance and wires up domain modules:
- `Datasets` — list datasets with pagination
- `Concepts` — search, CRUD, bulk operations, merge, Cypher graph queries
- `Candidates` — create data quality candidates
- `Models` — get/set active ML model
- `Transactions` — search transaction history

Each domain module instantiates its own `Api` internally, receiving the same config.

**Api** (`lib/Api.js`) — HTTP layer built on `node-fetch`. All requests are scoped to `{host}/{projectId}/{path}`. Adds `x-api-key` header and optional Bearer token from `Authenticator`. Uses `query-string` for query params.

**Authenticator** (`lib/Authenticator.js`) — OAuth2 token management. Caches tokens as promises, auto-refreshes when <1 hour until expiry. Supports `DATAGRAPHS_ACCESS_TOKEN` env var as a shortcut.

**Config** (`lib/config.js`) — Selects API host based on `DATAGRAPHS_ENV` (`dev`, `live`, `localhost`). Defaults to `live`.

**Error hierarchy:** `DataGraphsError` (base) → `ConfigurationError`, `ApiError` (carries statusCode/body/json), `InvalidUrnError`.

**ID format (URNs):** `urn:{project}:{dataset}` for datasets, `urn:{project}:{type}:{identifier}` for concepts. Parsing logic in `lib/utils/ids.js` handles colons in identifiers by splitting from the right.

## Testing

Tests live alongside source files as `*.spec.js`. Jest auto-mocks `node-fetch`. Tests cover API methods, auth token caching/refresh, URN parsing, credential validation, and array utilities.

## Configuration

The client reads from constructor params or environment variables: `DATAGRAPHS_PROJECT_ID`, `DATAGRAPHS_API_KEY`, `DATAGRAPHS_CLIENT_ID`, `DATAGRAPHS_CLIENT_SECRET`. Write operations (create, upsert, delete, merge, graphSearch) require `clientId`/`clientSecret` for OAuth.

## Publishing

npm publishing and docs deployment are handled by GitHub Actions. Releases trigger `npm-publish.yml`; pushes to main trigger `docs.yml` which deploys JSDoc to GitHub Pages.
