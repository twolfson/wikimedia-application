// TODO: Use error constructor family. I believe I used `errman` in the past.
// TODO: Build error handlers to properly treat error responses

exports.HttpError = function (msg, statusCode) {
  var httpError = new Error(msg);
  httpError.statusCode = statusCode;
  return httpError;
};
