"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deactivate = exports.activate = void 0;

var _vscode = require("vscode");

var _disposables = _interopRequireDefault(require("./ocamlformatter/disposables"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const registerTest = context => {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  const test = _vscode.commands.registerCommand('extension.test', function () {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    _vscode.window.showInformationMessage('Hello World!');
  });

  context.subscriptions.push(test);
};

const activate = context => {
  console.log('extension "auto-formatter" is now active!');
  context.subscriptions.push(..._disposables.default);
};

exports.activate = activate;

const deactivate = () => {};

exports.deactivate = deactivate;