// @ts-check
/*
“死妈的防沉迷”许可证 第一版（草案）

版权所有 （c） 2022 dsy4567

简介
    《“死妈的防沉迷”许可证》是一份面向软件及其他类型作品的版权许可协
议，它旨在制约制定、实施或遵守防沉迷通知以及为上述行为提供条件或便利的
个人或法人实体的发展，并强迫这些个人或法人实体权衡自身行为。

    下文是有关使用、复制、修改、衍生利用、散布、发布和再许可的严谨描述
和实施条件。

〇、定义
    “本许可证”指《“死妈的防沉迷”许可证 第一版（草案）》；
    “本作品”指任何在本许可证保护下的有版权的作品（包括源代码、文件和/
或相关内容）；
    “版权持有人”可以是个人或法人实体；
    “您”指接收本作品的副本的个人或法人实体；
    “防沉迷通知”指《国家新闻出版署关于进一步严格管理 切实防止未成年人
沉迷网络游戏的通知》
<https://www.nppa.gov.cn/nppa/contents/279/98792.shtml>（国新
出发〔2021〕14号）；
    “举报平台”指国家新闻出版署防止未成年人沉迷网络游戏举报平台
<https://jubao.chinaso.com/>；
    “实名认证系统”指网络游戏防沉迷实名认证系统
<https://wlc.nppa.gov.cn/fcm_company/index.html>；

一、本作品的处置
    在符合本许可证的条件的情况下，您有权以任何目的处置本作品（包括但不
限于使用、复制、修改、衍生利用、散布、发布和再许可），且不必事先取得版
权持有人的同意。

二、版权声明
    您必须在授权作品的每个再散布或衍生副本上包含以上版权声明和本许可
证，不得自行修改。

三、您的行为的限制
    您不得遵守或实施防沉迷通知内的任何要求，也不得参与防沉迷通知的编
写、制定或修订活动；
    您不得为举报平台和实名认证系统及其衍生副本的制作、使用、复制、修
改、衍生利用、散布、发布和正常运营提供条件或便利，也不得组织或参与举报
平台或实名认证系统的运营活动，以及制作、使用、复制、修改、衍生利用、散
布或发布举报平台或实名认证系统及其衍生副本；
    您不得与不满足本条条件的其他个人或法人实体有隶属、投资或被投资关
系。

四、品质担保和免责声明
    在适用的法律范围内，除非另有书面说明，否则版权持有人不对本作品的品
质作任何担保，如果本作品的缺陷（例如程序的质量和性能问题）引发了任何程
度的损失和后果（例如数据丢失或损坏、无法与其他程序协同工作），那么版权
持有人不为此承担任何责任，即使他（们）声称本作品没有任何缺陷，且您需要
自行承担为此花费的修复费用或其他必要费用以及损失和责任。

    条款和条件结束。

–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

附录: 国家新闻出版署关于进一步严格管理 切实防止未成年人沉迷网络游戏的通
知

各省、自治区、直辖市新闻出版局，各网络游戏企业，有关行业组织：

    一段时间以来，未成年人过度使用甚至沉迷网络游戏问题突出，对正常生活
学习和健康成长造成不良影响，社会各方面特别是广大家长反映强烈。为进一步
严格管理措施，坚决防止未成年人沉迷网络游戏，切实保护未成年人身心健康，
现将有关要求通知如下。

    一、严格限制向未成年人提供网络游戏服务的时间。自本通知施行之日起，
所有网络游戏企业仅可在周五、周六、周日和法定节假日每日20时至21时向未
成年人提供1小时网络游戏服务，其他时间均不得以任何形式向未成年人提供网络
游戏服务。
    二、严格落实网络游戏用户账号实名注册和登录要求。所有网络游戏必须接
入国家新闻出版署网络游戏防沉迷实名验证系统，所有网络游戏用户必须使用真
实有效身份信息进行游戏账号注册并登录网络游戏，网络游戏企业不得以任何形
式（含游客体验模式）向未实名注册和登录的用户提供游戏服务。
    三、各级出版管理部门加强对网络游戏企业落实提供网络游戏服务时段时
长、实名注册和登录、规范付费等情况的监督检查，加大检查频次和力度，对未
严格落实的网络游戏企业，依法依规严肃处理。
    四、积极引导家庭、学校等社会各方面营造有利于未成年人健康成长的良好
环境，依法履行未成年人监护职责，加强未成年人网络素养教育，在未成年人使
用网络游戏时督促其以真实身份验证，严格执行未成年人使用网络游戏时段时长
规定，引导未成年人形成良好的网络使用习惯，防止未成年人沉迷网络游戏。
    五、本通知所称未成年人是指未满18周岁的公民，所称网络游戏企业含提供
网络游戏服务的平台。

    本通知自2021年9月1日起施行。《国家新闻出版署关于防止未成年人沉迷网
络游戏工作的通知》（国新出发〔2019〕34号）相关规定与本通知不一致的，
以本通知为准。

                                                 国家新闻出版署
                                                 2021年8月30日
                                        
*/
const screenshot = require("desktop-screenshot");
const fs = require("fs");
const process = require("process");
const jsonfile = require("jsonfile");
const { execSync, exec } = require("child_process");
const { decode } = require("iconv-lite");
const robot = require("robotjs");

const DataDir = "../OneDrive/myremote/"; // 数据存储位置
const AllowEval = true; // 是否允许执行 JavaScript 字符串
/*
  是否导入 RobotJS 模块, 如果您因为没有 windows-build-tools
  而导致安装依赖出错且想放弃解决问题, 可以考虑修改它,
  然后修改 package.json 并直接删除 index.js 的第 8 行
 */
const RequireRobotJS = true;

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
/** @param {string} log @param {"log" | "error" | "warn"} type */
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
                            /** @param {string} error @param {Boolean} complete */
                            (error, complete) => {
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
