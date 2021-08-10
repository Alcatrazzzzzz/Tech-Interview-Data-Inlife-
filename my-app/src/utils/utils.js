export const isNumeric = (str) => {
  if (typeof str != "string") return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
};

export const findItemInArr = (id, arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (+id === +arr[i].id) return i;
  }
  return -1;
};

export const deleteItemById = (id, arr) => {
  let index = null;

  arr.forEach((elem, iter) => {
    if (+elem.id === +id) {
      index = iter;
    }
  });

  return index !== null
    ? [...arr.slice(0, index), ...arr.slice(index + 1)]
    : arr;
};
