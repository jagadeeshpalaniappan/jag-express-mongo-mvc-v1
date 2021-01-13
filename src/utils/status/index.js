const VError = require("verror");
const statusCodes = require("./statusCodes");

var { sprintf } = require("extsprintf");

const getMsg = (parentErr, statusCode, ...rest) => {
  // parent:
  if (parentErr && parentErr.statusCode && parentErr.message)
    return { code: parentErr.statusCode, message: parentErr.message };

  // current: (fallback)
  if (statusCode && statusCodes[statusCode])
    return {
      code: statusCode,
      message: sprintf(statusCodes[statusCode], ...rest),
    };

  // fallback
  return { code: "GEN_ERR", message: "Error occured." };
};

function AppErr(err, statusCode, ...rest) {
  const errMsg = statusCodes[statusCode];
  const newErr = new VError(err, errMsg, ...rest);
  return { statusCode, ...newErr };
}
module.exports = { getMsg, AppErr };
