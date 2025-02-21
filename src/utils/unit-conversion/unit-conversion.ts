import { Unit } from "types/Unit";

export const convertUnitToGrams = (
  unit: Unit,
  weight: number,
  precision: number = 2,
) => {
  if (weight < 0) throw new Error("Weight cannot be negative");
  if (!Number.isFinite(weight))
    throw new Error("Weight must be a valid number");

  let result: number;

  switch (unit) {
    case Unit.OZ:
      result = weight * 28.34952;
      break;
    case Unit.LB:
      result = weight * 453.6;
      break;
    case Unit.G:
      result = weight;
      break;
    case Unit.KG:
      result = weight * 1000;
      break;
    default:
      throw new Error(`Unhandled unit type: ${unit}`);
  }

  // only show decimal places if needed, up to precision
  const rounded = Number(result.toFixed(precision));
  return rounded === Math.floor(rounded) ? Math.floor(rounded) : rounded;
};

export const convertGramsToUnit = (
  unit: Unit,
  weightInGrams: number,
  precision: number = 2,
) => {
  if (weightInGrams < 0) throw new Error("Weight cannot be negative");
  if (!Number.isFinite(weightInGrams))
    throw new Error("Weight must be a valid number");

  let result: number;

  switch (unit) {
    case Unit.OZ:
      result = weightInGrams / 28.34952;
      break;
    case Unit.LB:
      result = weightInGrams / 453.6;
      break;
    case Unit.G:
      result = weightInGrams;
      break;
    case Unit.KG:
      result = weightInGrams / 1000;
      break;
    default:
      throw new Error(`Unhandled unit type: ${unit}`);
  }

  // Only show decimal places if needed, up to precision
  const rounded = Number(result.toFixed(precision));
  return rounded === Math.floor(rounded) ? Math.floor(rounded) : rounded;
};
