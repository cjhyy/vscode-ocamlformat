"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.service = exports.outputChannel = exports.documentSelector = void 0;

var _vscode = require("vscode");

var _Service = _interopRequireDefault(require("./Service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const documentSelector = {
  scheme: 'file',
  language: 'ocaml'
};
exports.documentSelector = documentSelector;

const outputChannel = _vscode.window.createOutputChannel('ocamlformat');

exports.outputChannel = outputChannel;
const service = new _Service.default();
exports.service = service;