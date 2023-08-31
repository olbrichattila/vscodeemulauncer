(()=>{"use strict";var t={496:t=>{t.exports=require("vscode")},81:t=>{t.exports=require("child_process")}},e={};function o(r){var n=e[r];if(void 0!==n)return n.exports;var s=e[r]={exports:{}};return t[r](s,s.exports,o),s.exports}var r={};(()=>{var t=r;Object.defineProperty(t,"__esModule",{value:!0}),t.deactivate=t.activate=void 0;const e=o(496),n=o(81),s=e.workspace.getConfiguration("emulatorLancher").get("emulatorPath");function a(t,o){(0,n.exec)(t,((t,r,n)=>{t?e.window.showErrorMessage(`Error executing command: ${t}`):o(r.trim())}))}t.activate=function(t){!function(t){const o="AndroidEmulatorLauncer.statusBarClick";t.subscriptions.push(e.commands.registerCommand(o,(async()=>{a(`${s} -list-avds`,(async t=>{const o=t.split("\n");0===o.length&&e.window.showErrorMessage("Cannot find virtual devides, Check your settings and configurations");const r=await e.window.showQuickPick(o);a(`${s} -avd ${r} &>/dev/null &`,(t=>{}))}))})));const r=e.window.createStatusBarItem(e.StatusBarAlignment.Right,100);r.command=o,t.subscriptions.push(r),r.text="Launch Android Emulator",r.tooltip="Click here to view the list of your emulators and select one.",r.show()}(t);let o=e.commands.registerCommand("androidemulatorlauncer.launchAndroidEmulator",(()=>{e.window.showInformationMessage("Android Emulator Launced!")}));t.subscriptions.push(o)},t.deactivate=function(){}})(),module.exports=r})();