const forceArray = (arr, { defaultValue = [] } = {}) => {
  if(!arr) return defaultValue;
  if(Array.isArray(arr)) return arr;
  return [arr];
};

exports = module.exports = {
  forceArray
};