"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatError = exports.errorFirstPromisify = exports.formatterErrorMessage = exports.formatterInvalidSassPathMessage = exports.formatterMissingCommandMessage = void 0;

var _ramda = require("ramda");

const formatterMissingCommandMessage = 'Please install the target formatter command line tool.';
exports.formatterMissingCommandMessage = formatterMissingCommandMessage;
const formatterInvalidSassPathMessage = 'The ocamlformatter path setting is not valid.';
exports.formatterInvalidSassPathMessage = formatterInvalidSassPathMessage;
const formatterErrorMessage = 'There was an error formatting your file. See Output panel for more details.';
exports.formatterErrorMessage = formatterErrorMessage;

const errorFirstPromisify = fn => (...args) => new Promise((resolve, reject) => {
  fn(...args, (err, ...values) => {
    if (err) {
      reject(err);
      return;
    }

    resolve(values);
  });
});

exports.errorFirstPromisify = errorFirstPromisify;

const formatError = error => {
  var _ref, _ref2, _ref3, _ref4, _ref5, _errorString;

  const errorString = error.toString('utf8').trim();
  console.log(error);
  return (_ref = (_ref2 = (_ref3 = (_ref4 = (_ref5 = (_errorString = errorString, (0, _ramda.split)('\n')(_errorString)), (0, _ramda.slice)(1)(_ref5)), (0, _ramda.join)('\n')(_ref4)), (0, _ramda.replace)('Use --trace for backtrace.', '')(_ref3)), (0, _ramda.replace)('Use --trace for backtrace', '')(_ref2)), (0, _ramda.trim)(_ref)) + '\n';
};

exports.formatError = formatError;