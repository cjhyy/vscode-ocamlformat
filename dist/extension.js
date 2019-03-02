"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deactivate = exports.activate = void 0;

var _vscode = require("vscode");

var _commons = require("./commons");

var _languageFormatProvider = _interopRequireDefault(require("./language-format-provider"));

var _inplaceFormatCommands = _interopRequireDefault(require("./inplace-format-commands"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const disposables = [_commons.outputChannel, _languageFormatProvider.default, _inplaceFormatCommands.default];

const activate = context => {
  _vscode.window.showInformationMessage('extension "ocamlformat" is now active!');

  disposables.forEach(disposable => context.subscriptions.push(disposable));
};

exports.activate = activate;

const deactivate = () => {
  _vscode.window.showInformationMessage('extension "ocamlformat" is now deactived!');
};

exports.deactivate = deactivate;