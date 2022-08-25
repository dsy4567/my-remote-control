interface Actions {
    wait: number; // 每执行一步操作前的延时(单位: 毫秒)
    runCommandAsync: boolean; // 是否等待命令执行完毕, 并将输出写入 logs.txt
    doThings: boolean; // 修改完下面的东西后, 将它改成 boolean 并保存
    // 支持依次执行多个操作, 操作执行顺序: 从上到下
    cancelShutDown: boolean; // 取消关机或重启
    shutDown: boolean; // 关闭电脑(在下一次启动时, 如果启用了自动重启登录, 则将自动登录并锁定上次交互用户)
    reboot: boolean; // 重启电脑(在下一次启动时, 如果启用了自动重启登录, 则将自动登录并锁定上次交互用户)
    screenshot: boolean; // 截屏(图片保存在 screenshots 文件夹里)
    runCommand: string; // 执行 cmd 命令
    copyFile: {
        // 复制文件
        from: string; // 将文件...
        to: string; // 复制到...
    };
    typeString: string; // 输入字符
    keyTap: string; // 按下键盘按键
    moveMouse: [
        // 移动鼠标
        number, // x
        number // y
    ];
    mouseClick: string; // 点击鼠标, 值必须是 left | middle | right
    eval: string; // 执行 JavaScript 代码
    exit: boolean; // 退出远程控制
}
