// @ts-check
const screenshot = require("desktop-screenshot");
const fs = require("fs");
/** @type {{doThings: boolean, "screenshot": boolean, "runCommand": string, "shutDown": boolean, "quit": boolean }} */
var actions = readActions();
var logs = fs.readFileSync("../OneDrive/myremote/logs.txt").toString();

/** @returns {{doThings: boolean, "screenshot": boolean, "runCommand": string, "shutDown": boolean, "quit": boolean }} */
function readActions() {
    return JSON.parse(
        fs.readFileSync("../OneDrive/myremote/actions.json").toString()
    );
}
/**
 * @param {string} log
 * @param {string} type
 */
function writeLog(log, type = "log") {
    console[type](log);
    logs += `[${new Date().toString()}] [${type}] ${log}\r\n`;
    fs.writeFileSync("../OneDrive/myremote/logs.txt", logs);
}

fs.watch("../OneDrive/myremote/actions.json", (f) => {
    writeLog(f);
    try {
        actions = readActions();
        if(actions.doThings){}
    } catch (e) {
        writeLog(String(e), "error");
    }
});

// screenshot(
//     "../OneDrive/myremote/screenshots/" +
//         new Date().toString().replaceAll(":", "-") +
//         ".png",
//     function (error, complete) {
//         if (error) console.log("Screenshot failed", error);
//         else console.log("Screenshot succeeded");
//     }
// );
