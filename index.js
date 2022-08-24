// @ts-check
const screenshot = require("desktop-screenshot");
const fs = require("fs");
const { exit } = require("process");
const jsonfile = require("jsonfile");
const { execSync, exec } = require("child_process");
const { decode } = require("iconv-lite");

const DataDir = "../OneDrive/myremote/";
/** @type {{doThings: "true" | "false", screenshot: "true" | "false", runCommandAsync: "true" | "false", runCommand: string, shutDown: "true" | "false", reboot: "true" | "false", cancelShutDown: "true" | "false", copyFile: {from: string, to: string}, typeString: string, keyTap: string, exit: "true" | "false" }} */
var actions = readActions();
var logs = fs.readFileSync(DataDir + "logs.txt").toString();
/** @type {NodeJS.Timeout} */
var timeout;

/** @returns {{doThings: "true" | "false", screenshot: "true" | "false", runCommandAsync: "true" | "false", runCommand: string, shutDown: "true" | "false", reboot: "true" | "false", cancelShutDown: "true" | "false", copyFile: {from: string, to: string}, typeString: string, keyTap: string, exit: "true" | "false" }} */
function readActions() {
    return jsonfile.readFileSync(DataDir + "actions.json");
    // return JSON.parse(fs.readFileSync(DataDir + "actions.json").toString());
}
function clearActions() {
    jsonfile.writeFileSync(
        DataDir + "actions.json",
        {
            doThings: "",
            screenshot: "",
            runCommandAsync: "",
            runCommand: "",
            shutDown: "",
            reboot: "",
            cancelShutDown: "",
            copyFile: {
                from: "",
                to: "",
            },
            exit: "",
        },
        { spaces: 4 }
    );
}
/**
 * @param {string} log
 * @param {"log" | "error" | "warn"} type
 */
function writeLog(log, type = "log") {
    try {
        if (!log) return;
        console[type](`[${new Date().toString()}] [${type}] ${log}\r\n`);
        logs += `[${new Date().toString()}] [${type}] ${log}\r\n`;
        fs.writeFile(DataDir + "logs.txt", logs, (e) => {
            if (e) {
                console.error(e);
                exit(1);
            }
        });
    } catch (er) {
        console.error(er);
        exit(1);
    }
}
/** @param command {string} @param Async {"true" | "false"} */
function runCommand(command, Async = "true") {
    if (Async !== "false") return exec(command);
    let opts = "\r\n----------",
        /** @type {"log" | "error" | "warn"} */
        status = "log";
    try {
        let opt = execSync(command);
        try {
            if (opt)
                opts +=
                    "\r\n" +
                    decode(opt, "utf8") +
                    "\r\n^-utf8-^ ----- v-gb2312-v\r\n" +
                    decode(opt, "gb2312") +
                    "\r\n----------\r\n";
        } catch (er) {
            writeLog(String(er), "error");
        }
    } catch (e) {
        status = "error";
        e.output.forEach((opt) => {
            if (opt)
                opts +=
                    "\r\n" +
                    decode(opt, "utf8") +
                    "\r\n^-utf8-^ ----- v-gb2312-v\r\n" +
                    decode(opt, "gb2312") +
                    "\r\n----------\r\n";
        });
    }
    writeLog(opts, status);
}

clearActions();
fs.watch(DataDir + "actions.json", (f) => {
    try {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            try {
                actions = readActions();
                console.log(JSON.stringify(actions));
                if (actions.doThings === "true") {
                    if (actions.exit) {
                        clearActions();
                        writeLog("---------- exited ----------");
                        exit(0);
                    }
                    if (actions.shutDown === "true") {
                        clearActions();
                        runCommand("shutdown /sg", "false");
                        writeLog("---------- shuted down ----------");
                        return;
                    }
                    if (actions.reboot === "true") {
                        clearActions();
                        runCommand("shutdown /g", "false");
                        writeLog("---------- rebooted ----------");
                        return;
                    }
                    if (actions.cancelShutDown === "true") {
                        clearActions();
                        runCommand("shutdown /a", "false");
                        writeLog("---------- shut down canceled ----------");
                    }
                    if (actions.screenshot === "true") {
                        screenshot(
                            DataDir +
                                "screenshots/" +
                                new Date().toString().replaceAll(":", "-") +
                                ".png",
                            function (
                                /** @type {string} */ error,
                                /** @type {Boolean} */ complete
                            ) {
                                if (error) writeLog(error, "error");
                                else
                                    writeLog(
                                        "Screenshot succeeded " + complete
                                    );
                            }
                        );
                        writeLog("Screenshot taken");
                    }
                    if (actions.runCommand) {
                        writeLog(
                            "async: " +
                                actions.runCommandAsync +
                                " run: " +
                                actions.runCommand
                        );
                        runCommand(actions.runCommand, actions.runCommandAsync);
                    }
                    if (actions.copyFile.from && actions.copyFile.to) {
                        fs.copyFile(
                            actions.copyFile.from,
                            actions.copyFile.to,
                            (e) => {
                                if (e)
                                    return writeLog(
                                        "cannot copy file " + String(e.stack),
                                        "error"
                                    );
                                writeLog("copied");
                            }
                        );
                        writeLog(
                            "copying file: " +
                                actions.copyFile.from +
                                " >>> " +
                                actions.copyFile.to
                        );
                    }

                    clearActions();
                }
            } catch (e) {
                writeLog(String(e), "error");
            }
        }, 1500);
    } catch (e) {
        writeLog(String(e), "error");
    }
});

writeLog("---------- start up finished ----------");
