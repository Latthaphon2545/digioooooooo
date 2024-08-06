exports.diffJson = (oldObj, newObj) => {
  const ret = {};
  console.log(oldObj, newObj);
  for (const i in newObj) {
    if (
      !Object.prototype.hasOwnProperty.call(oldObj, i) &&
      newObj[i] !== oldObj[i]
    ) {
      ret[i] = {
        new: newObj[i],
        old: oldObj[i],
      };
    }
  }
  return ret;
};
