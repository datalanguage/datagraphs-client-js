const InvalidUrnError = require("../errors/InvalidUrnError");

const parseDatasetId = (id) => {
  if (!id.match(/^urn:.+:.+$/))
    throw new InvalidUrnError(
      `Id should be in the form "urn:{project}:{dataset}"`
    );
  const [, project, key] = id.split(":");
  return { project, key };
};

const parseConceptId = (id) => {
  if (!id.match(/^urn:.+:.+:.+$/))
    throw new InvalidUrnError(
      `Id should be in the form "urn:{project}:{dataset}:{identifier}"`
    );
  const [, project, type, ...rest] = id.split(":");
  return { project, type, key: rest.join(":") };
};

const isUrn = (id) => id.startsWith("urn:");

exports = module.exports = {
  parseConceptId,
  parseDatasetId,
  isUrn,
};
