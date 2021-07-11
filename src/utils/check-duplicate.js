const checkDuplicate = (array, value) => {
  for (let x of array) if (x === value) return true;
  return false;
};

export default checkDuplicate;
