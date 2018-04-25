"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.documentSelector = exports.outputChannel = void 0;

var _vscode = require("vscode");

var _Service = _interopRequireDefault(require("./Service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const outputChannel = _vscode.window.createOutputChannel('ocamlformatter');

exports.outputChannel = outputChannel;
const documentSelector = {
  language: 'ocaml'
};
exports.documentSelector = documentSelector;
const service = new _Service.default(outputChannel);

const provideDocumentFormattingEdits = doc => {
  const text = document.getText();
  console.log(document); // errorFirstPromisify(exec)()
};

var _default = {
  provideDocumentFormattingEdits
};
exports.default = _default;