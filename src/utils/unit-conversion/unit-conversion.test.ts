import { describe, expect, it, vi } from "vitest";
import { convertGramsToUnit, convertUnitToGrams } from "./unit-conversion";
import { Unit } from "types/Unit";

describe("convertUnitToGrams", () => {
  it("converts ounces", () => {
    expect(convertUnitToGrams(Unit.OZ, 10)).toBe(283.5);
  });
  it("converts pounds", () => {
    expect(convertUnitToGrams(Unit.LB, 10)).toBe(4536);
  });
  it("converts grams", () => {
    expect(convertUnitToGrams(Unit.G, 10)).toBe(10);
  });
  it("converts kilograms", () => {
    expect(convertUnitToGrams(Unit.KG, 10)).toBe(10000);
  });

  it("sets precision correctly", () => {
    expect(convertUnitToGrams(Unit.OZ, 1.23)).toBe(34.87);
    expect(convertUnitToGrams(Unit.OZ, 0.035274)).toBe(1);
  });

  it("errors on negative numbers ", () => {
    expect(() => convertUnitToGrams(Unit.OZ, -10)).toThrowError(
      "Weight cannot be negative",
    );
  });
  it("errors on strings", () => {
    // @ts-expect-error
    expect(() => convertUnitToGrams(Unit.LB, "abc")).toThrowError(
      "Weight must be a valid number",
    );
  });
});

describe("convertGramsToUnit", () => {
  it("converts ounces", () => {
    expect(convertGramsToUnit(Unit.OZ, 10)).toBe(0.35);
  });
  it("converts pounds", () => {
    expect(convertGramsToUnit(Unit.LB, 10)).toBe(0.02);
  });
  it("converts grams", () => {
    expect(convertGramsToUnit(Unit.G, 10)).toBe(10);
  });
  it("converts kilograms", () => {
    expect(convertGramsToUnit(Unit.KG, 10)).toBe(0.01);
  });

  it("sets precision correctly", () => {
    expect(convertGramsToUnit(Unit.OZ, 1.23)).toBe(0.04);
    expect(convertGramsToUnit(Unit.OZ, 28.3495)).toBe(1);
  });

  it("errors on negative numbers ", () => {
    expect(() => convertGramsToUnit(Unit.OZ, -10)).toThrowError(
      "Weight cannot be negative",
    );
  });
  it("errors on strings", () => {
    // @ts-expect-error
    expect(() => convertGramsToUnit(Unit.LB, "abc")).toThrowError(
      "Weight must be a valid number",
    );
  });
});
