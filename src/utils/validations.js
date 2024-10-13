const isNullOrUndefined = (value) => {
  return value === null || value === undefined;
};

const isEmptyOrInvalidString = (value) => {
  return (
    value === null || value === undefined || value.split(/\s+/).join("") === ""
  );
};

const isEmptyOrInvalidArray = (value) => {
  return value === null || value === undefined || value.length === 0;
};

const isEmptyOrNullObject = (data) => {
  for (var key in data) {
    return false;
  }
  return true;
};

export {
  isEmptyOrInvalidArray,
  isEmptyOrNullObject,
  isEmptyOrInvalidString,
  isNullOrUndefined
}