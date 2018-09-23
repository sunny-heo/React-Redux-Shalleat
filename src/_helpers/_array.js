const ArrayExtends = {
  _contains(key, value) {
    for (let elm of this) {
      if (elm[key] === value) return true;
    }
    return false;
  },
  _replaceObj(newObj, key) {
    return this.map(obj => (obj[key] === newObj[key] ? newObj : obj));
  },
  _removeObj(id, key) {
    return this.filter(obj => obj[key] !== id);
  }
};

Object.assign(Array.prototype, ArrayExtends);
