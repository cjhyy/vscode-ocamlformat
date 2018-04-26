"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deactivate = exports.activate = void 0;

var _vscode = require("vscode");

var _disposables = _interopRequireDefault(require("./ocamlformat/disposables"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const activate = context => {
  _vscode.window.showInformationMessage('extension "ocamlformat" is now active!');

  context.subscriptions.push(..._disposables.default);
};

exports.activate = activate;

const deactivate = () => {};

exports.deactivate = deactivate;