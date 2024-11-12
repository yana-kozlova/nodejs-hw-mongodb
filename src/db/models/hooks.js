export const handleSaveError = (error, data, next) => {
  error.status = 400;
  next();
}

export const setUpdateSettings = function (next) {
  this.option.runValidators = true;
  this.option.new = true;
  next();
}