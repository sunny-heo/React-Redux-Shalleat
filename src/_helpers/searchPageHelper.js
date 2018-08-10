const UNIT_REGEX = /(\d+\.?\d{0,9}|\.\d{0,2})(miles|mile|m|cm|km|inch|yard|foot)/;

export const extractType = input => {
  const [type] = input.split(" in");
  return type;
};

export const extractRadius = input => {
  let [rangeStr, radius, unit] = input.match(UNIT_REGEX) || ["noMatch"];
  if (radius) {
    switch (unit) {
      case "mile" || "miles":
        radius = radius * 1609.34;
        break;
      case "cm":
        radius = radius * 0.01;
        break;
      case "km":
        radius = radius * 1000;
        break;
      case "inch":
        radius = radius * 0.0254;
        break;
      case "yard":
        radius = radius * 0.9144;
        break;
      case "foot":
        radius = radius * 0.3048;
        break;
      default:
        break;
    }
    return ~~radius;
  }
  return null;
};
