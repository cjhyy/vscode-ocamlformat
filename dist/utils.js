"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatError = exports.errorFirstPromisify = exports.formatterErrorMessage = exports.formatterInvalidSassPathMessage = exports.formatterMissingCommandMessage = void 0;

var _ramda = require("ramda");

const formatterMissingCommandMessage = 'Please install the target formatter command line tool.';
exports.formatterMissingCommandMessage = formatterMissingCommandMessage;
const formatterInvalidSassPathMessage = 'The formatter path setting is not valid.';
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
  var _ref, _error;

  return (_ref = (_error = error, toString(_error)), (0, _ramda.trim)(_ref)) + '\n';
};

exports.formatError = formatError;