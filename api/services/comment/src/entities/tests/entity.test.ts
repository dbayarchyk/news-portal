import { Entity } from "../../entities/entity";
import { UniqueId } from "../../value-objects/unique-id";

class TestEntity extends Entity<unknown> {}

describe("Entity", () => {
  let entity: TestEntity;

  beforeEach(() => {
    entity = new TestEntity({});
  });

  describe("equals method", () => {
    describe("when object is null", () => {
      it("should return false", () => {
        expect(entity.equals(null)).toBe(false);
      });
    });

    describe("when object is undefined", () => {
      it("should return false", () => {
        expect(entity.equals(undefined)).toBe(false);
      });
    });

    describe("when object is the the same reference", () => {
      it("should return true", () => {
        expect(entity.equals(entity)).toBe(true);
      });
    });

    describe("when object is not entity", () => {
      it("should return false", () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(entity.equals({} as any)).toBe(false);
      });
    });

    describe("when ids are equal", () => {
      it("should return true", () => {
        const commonUniqueId = UniqueId.create();
        const entity1 = new TestEntity({}, commonUniqueId);
        const entity2 = new TestEntity({}, commonUniqueId);

        expect(entity1.equals(entity2)).toBe(true);
      });
    });
  });
});
