"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vscode = require("vscode");

var _commons = require("./commons");

var _utils = require("./utils");

class ProvideDocumentRangeFormattingEdits {
  async provideDocumentRangeFormattingEdits(document, range, options, token) {
    const text = document.getText();

    try {
      const newText = _commons.service.stdioFormat(text);

      console.log(newText);
      return [_vscode.TextEdit.replace(range, newText)];
    } catch (error) {
      console.error(error);
      this.outputChannel.append((0, _utils.formatError)(error));
      this.outputChannel.show();
    }
  }

}

var _default = _vscode.languages.registerDocumentRangeFormattingEditProvider(_commons.documentSelector, new ProvideDocumentRangeFormattingEdits());

exports.default = _default;