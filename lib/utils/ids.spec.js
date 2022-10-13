const InvalidUrnError = require("../errors/InvalidUrnError");
const { parseDatasetId, parseConceptId } = require("./ids");

/* global describe, it */
describe("", () => {
  describe("parseDatasetId", () => {
    it("should throw a InvalidUrnError if id is not a valid urn", () => {
      const id = "invalid";
      expect(() => parseDatasetId(id)).toThrow(InvalidUrnError);
    });

    it("should extract the project and dataset keys from the id", () => {
      const id = "urn:project1:dataset1";
      const { project, key } = parseDatasetId(id);
      expect(project).toEqual("project1");
      expect(key).toEqual("dataset1");
    });
  });

  describe("parseConceptId", () => {
    it("should throw a InvalidUrnError if id is not a valid urn", () => {
      const id = "invalid";
      expect(() => parseConceptId(id)).toThrow(InvalidUrnError);
    });

    it("should extract the project and type and key from the id", () => {
      const id = "urn:project1:type1:concept1";
      const { project, type, key } = parseConceptId(id);
      expect(project).toEqual("project1");
      expect(type).toEqual("type1");
      expect(key).toEqual("concept1");
    });

    it("should extract the project and type and key from the id if key contains a colon", () => {
      const id = "urn:project1:type1:prefix:concept1";
      const { project, type, key } = parseConceptId(id);
      expect(project).toEqual("project1");
      expect(type).toEqual("type1");
      expect(key).toEqual("prefix:concept1");
    });
  });
});
