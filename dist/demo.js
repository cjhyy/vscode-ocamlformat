"use strict";

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

const {
  window,
  StatusBarAlignment,
  commands
} = vscode;

class WordCounter {
  constructor() {
    this.statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);
  }

  static wordCountFromDoc(doc) {
    const docContent = doc.getText();
    const final = docContent.replace(/(< ([^>]+)<)/g, '').replace(/\s+/g, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    return final === '' ? 0 : final.split(' ').length;
  }

  updateWordCount() {
    const editor = window.activeTextEditor;

    if (!editor) {
      this.statusBarItem.hide();
      return;
    }

    const doc = editor.document;
    const count = WordCounter.wordCountFromDoc(doc); // Update the status bar

    this.statusBarItem.text = count !== 1 ? `${count} Words` : '1 Word';
    this.statusBarItem.show();
  }

  dispose() {
    this.statusBarItem.hide();
  }

}

const registerWordCount = context => {
  const wc = new WordCounter();
  const disposable = commands.registerCommand('extension.wc', () => {
    wc.updateWordCount();
  });
  context.subscriptions.push(wc);
  context.subscriptions.push(disposable);
};

const registerTest = context => {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  const test = vscode.commands.registerCommand('extension.test', function () {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    vscode.window.showInformationMessage('Hello World!');
  });
  context.subscriptions.push(test);
};

const registerSelection = context => {
  const disposable = vscode.commands.registerCommand('extension.sayHello', () => {
    // The code you place here will be executed every time your command is executed
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
      vscode.window.showInformationMessage('no editor');
      return; // No open text editor
    }

    const selection = editor.selection;
    const text = editor.document.getText(selection); // Display a message box to the user

    vscode.window.showInformationMessage('Selected characters: ' + text.length);
  });
  context.subscriptions.push(disposable);
}; // this method is called when your extension is activated
// your extension is activated the very first time the command is executed


function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "auto-formatter" is now active!');
  registerSelection(context);
  registerTest(context);
  registerWordCount(context);
}

exports.activate = activate; // this method is called when your extension is deactivated

function deactivate() {}

exports.deactivate = deactivate;