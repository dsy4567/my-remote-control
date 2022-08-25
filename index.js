// @ts-check
const screenshot = require("desktop-screenshot");
const fs = require("fs");
const process = require("process");
const jsonfile = require("jsonfile");
const { execSync, exec } = require("child_process");
const { decode } = require("iconv-lite");
const robot = require("robotjs");

const DataDir = "../OneDrive/myremote/"; // 数据存储位置
const AllowEval = true; // 是否允许执行 JavaScript 字符串
const RequireRobotJS = true; // 是否导入 RobotJS 模块, 如果您因为没有 windows-build-tools 而导致安装依赖出错且想放弃解决问题, 可以考虑修改它, 然后修改 package.json 并直接删除 index.js 的第 8 行

/** @type {Actions} */
const DefaultActions = {
    wait: 0, // 每执行一步操作前的延时(单位: 毫秒)
    runCommandAsync: true, // 是否等待命令执行完毕, 并将输出写入 logs.txt
    doThings: false, // 修改完下面的东西后, 将它改成 boolean 并保存
    // 支持依次执行多个操作, 操作执行顺序: 从上到下
    cancelShutDown: true, // 取消关机或重启
    shutDown: false, // 关闭电脑(在下一次启动时, 如果启用了自动重启登录, 则将自动登录并锁定上次交互用户)
    reboot: false, // 重启电脑(在下一次启动时, 如果启用了自动重启登录, 则将自动登录并锁定上次交互用户)
    screenshot: false, // 截屏(图片保存在 screenshots 文件夹里)
    runCommand: "", // 执行 cmd 命令
    copyFile: {
        // 复制文件
        from: "", // 将文件...
        to: "", // 复制到...
    },
    typeString: "", // 输入字符
    keyTap: "", // 按下键盘按键
    moveMouse: [
        // 移动鼠标
        0, // x
        0, // y
    ],
    mouseClick: "", // 点击鼠标, 值必须是 left | middle | right
    eval: "", // 执行 JavaScript 代码
    exit: false, // 退出远程控制
};

/** @type {NodeRequire[]} */
var requires = []; // 在 eval 代码时可能会有用
/** @type {Actions} */
var actions = DefaultActions;
/** @type {NodeJS.Timeout} */
var timeout;
var wait = (/** @type {number} */ ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

/** @returns {Actions} */
function readActions() {
    return jsonfile.readFileSync(DataDir + "actions.json");
    // return JSON.parse(fs.readFileSync(DataDir + "actions.json").toString());
}
function clearActions() {
    actions.doThings = false;
    jsonfile.writeFileSync(DataDir + "actions.json", actions, {
        spaces: 4,
    });
}
/**
 * @param {string} log
 * @param {"log" | "error" | "warn"} type
 */
function writeLog(log, type = "log") {
    try {
        if (!log) return;
        log = `[${new Date().toLocaleString()}] [${type}] ${log}\r\n`;
        console[type](log);
        fs.appendFile(DataDir + "logs.txt", log, (e) => {
            if (e) {
                console.error(e);
                process.exit(1);
            }
        });
    } catch (er) {
        console.error(er);
        process.exit(1);
    }
}
/** @param command {string} @param Async {boolean} */
function runCommand(command, Async = true) {
    if (!Async) return exec(command);
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
fs.watch(DataDir + "actions.json", () => {
    try {
        clearTimeout(timeout);
        timeout = setTimeout(async () => {
            try {
                actions = readActions();
                console.log(JSON.stringify(actions));
                if (actions.doThings) {
                    writeLog("开始执行操作");
                    if (actions.wait) await wait(actions.wait);
                    if (actions.cancelShutDown) {
                        clearActions();
                        runCommand("shutdown /a", false);
                        writeLog("---------- 已取消关机 ----------");
                    }
                    if (actions.wait) await wait(actions.wait);
                    if (actions.shutDown) {
                        clearActions();
                        writeLog("---------- 已关机 ----------");
                        runCommand("shutdown /sg", false);
                    }
                    if (actions.wait) await wait(actions.wait);
                    if (actions.reboot) {
                        clearActions();
                        writeLog("---------- 已重启 ----------");
                        runCommand("shutdown /g", false);
                    }
                    if (actions.wait) await wait(actions.wait);
                    if (actions.screenshot) {
                        screenshot(
                            DataDir +
                                "screenshots/" +
                                new Date()
                                    .toString()
                                    .replaceAll(
                                        /\\|\/|\:|\*|\?|\'|\"|\<|\>|\|/g,
                                        "-"
                                    ) +
                                ".png",
                            function (
                                /** @type {string} */ error,
                                /** @type {Boolean} */ complete
                            ) {
                                if (error)
                                    writeLog("截屏失败 " + error, "error");
                                else writeLog("截屏成功 " + complete);
                            }
                        );
                        writeLog("已截屏");
                    }
                    if (actions.wait) await wait(actions.wait);
                    if (actions.runCommand) {
                        writeLog(
                            "async: " +
                                actions.runCommandAsync +
                                " run: " +
                                actions.runCommand
                        );
                        runCommand(actions.runCommand, actions.runCommandAsync);
                    }
                    if (actions.wait) await wait(actions.wait);
                    if (actions.copyFile.from && actions.copyFile.to) {
                        fs.copyFile(
                            actions.copyFile.from,
                            actions.copyFile.to,
                            (e) => {
                                if (e)
                                    return writeLog(
                                        "无法复制文件 " + String(e.stack),
                                        "error"
                                    );
                                writeLog("已复制");
                            }
                        );
                        writeLog(
                            "正在复制文件: " +
                                actions.copyFile.from +
                                " >>> " +
                                actions.copyFile.to
                        );
                    }
                    if (actions.wait) await wait(actions.wait);
                    if (RequireRobotJS && actions.typeString) {
                        robot.typeString(actions.typeString);
                        writeLog("已输入文字 " + actions.typeString);
                    }
                    if (actions.wait) await wait(actions.wait);
                    if (RequireRobotJS && actions.keyTap) {
                        robot.keyTap(actions.keyTap);
                        writeLog("已按下键盘按键 " + actions.keyTap);
                    }
                    if (actions.wait) await wait(actions.wait);
                    if (
                        RequireRobotJS &&
                        actions.moveMouse[0] &&
                        actions.moveMouse[1]
                    ) {
                        robot.moveMouse(...actions.moveMouse);
                        writeLog(
                            "已移动鼠标 " +
                                actions.moveMouse[0] +
                                " " +
                                actions.moveMouse[1]
                        );
                    }
                    if (actions.wait) await wait(actions.wait);
                    if (RequireRobotJS && actions.mouseClick) {
                        robot.mouseClick(actions.mouseClick);
                        writeLog("已按下鼠标 " + actions.mouseClick);
                    }
                    if (actions.wait) await wait(actions.wait);
                    if (actions.eval && AllowEval) {
                        eval(actions.eval);
                        writeLog("已执行 JavaScript 代码 " + actions.eval);
                    }
                    if (actions.wait) await wait(actions.wait);
                    if (actions.exit) {
                        clearActions();
                        writeLog("---------- 已退出远程控制 ----------");
                        process.exit(0);
                    }

                    clearActions();
                }
            } catch (e) {
                writeLog(String(e), "error");
                clearActions();
            }
        }, 1500);
    } catch (e) {
        writeLog(String(e), "error");
    }
});

writeLog("---------- 启动完成 ----------");
