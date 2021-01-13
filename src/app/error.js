const VError = require("verror");
const errCodes = require("../constants/error-codes");

var { sprintf } = require("extsprintf");

const getErr = (parentErr, curErrCode, ...rest) => {
  const { errCode, message } = parentErr || {};
  const curErrMsg = sprintf(errCodes[curErrCode], ...rest);
  return {
    errCode: errCode || curErrCode,
    message: message || curErrMsg,
  };
};

function AppErr(err, errCode, ...rest) {
  const errMsg = errCodes[errCode];
  const newErr = new VError(err, errMsg, ...rest);
  return { errCode, ...newErr };
}
module.exports = { getErr, AppErr };
