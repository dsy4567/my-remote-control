# 借助 OneDrive 实现的自用简陋远程控制

# 食用方法

> 首先, 确保您有两台电脑:  A 电脑(家里的)和 B 电脑(公司里的)

## 1. 在 A 电脑(家里的)上依次运行以下命令

```
C:\Users\dsy4567> git clone https://github.com/dsy4567/my-remote-control.git
C:\Users\dsy4567> cd my-remote-control
C:\Users\dsy4567\my-remote-control> npm install
```

## 2. 简单地配置一下 (可选)

在 A 电脑(家里的)上修改 `index.js`

```JavaScript
// line 10
const Data0Dir = "../OneDrive/myremote/"; // 数据存储位置
const AllowEval = true; // 是否允许执行 JavaScript 字符串
/*
  是否导入 RobotJS 模块, 如果您因为没有 windows-build-tools
  而导致安装依赖出错且想放弃解决问题, 可以考虑修改它,
  然后修改 package.json 并直接删除 index.js 的第 8 行
 */
const RequireRobotJS = true;
```

## 3. 设置 OneDrive

在 A 电脑(家里的)和 B 电脑(公司里的)上使用同一微软账号登录 OneDrive, 然后参考下面的目录结构创建文件和文件夹

```
C:\Users\dsy4567\OneDrive\myremote\
    screenshots\
    actions.json
    logs.txt
```

## 4. 在 A 电脑(家里的)上运行

```
C:\Users\dsy4567\my-remote-control> npm start
```

## 开始使用

在 B 电脑(公司里的)上修改 `C:\Users\dsy45\OneDrive\myremote\actions.json`, 然后等待一会, 再打开 `logs.txt` 查看效果

> actions.json 文件示例

```jsonc
{
    "wait": 0, // 每执行一步操作前的延时(单位: 毫秒)
    "runCommandAsync": false, // 是否等待命令执行完毕, 并将输出写入 logs.txt
    "doThings": false, // 修改完下面的东西后, 将它改成 true 并保存
    // 支持依次执行多个操作, 操作执行顺序: 从上到下
    "cancelShutDown": true, // 取消关机或重启
    "shutDown": false, // 关闭电脑(在下一次启动时, 如果启用了自动重启登录, 则将自动登录并锁定上次交互用户)
    "reboot": false, // 重启电脑(在下一次启动时, 如果启用了自动重启登录, 则将自动登录并锁定上次交互用户)
    "screenshot": true, // 截屏(图片保存在 screenshots 文件夹里)
    "runCommand": "tree /f", // 执行 cmd 命令
    "copyFile": {
        // 复制文件
        "from": "c:\\users\\dsy4567\\desktop\\yellow-video.mp4", // 将文件...
        "to": "c:\\users\\dsy4567\\onedrive\\myremote\\do-not-open-me.mp4" // 复制到...
    },
    "typeString": "password", // 输入字符
    "keyTap": "enter", // 按下键盘按键
    "moveMouse": [
        // 移动鼠标
        0, // x
        0 // y
    ],
    "mouseClick": "left", // 点击鼠标, 值必须是 left | middle | right
    "eval": "console.log('Hello World!');", // 执行 JavaScript 字符串
    "exit": false // 退出远程控制
}
```

# 原理

OneDrive 会始终让里面的每一个文件在各个设备上保持一致, 这个简陋的远程控制工具只需要监听 `actions.json` 文件的更改并执行操作即可

# 注意事项

-   它不支持操作锁屏界面, 因此如果您需要执行控制鼠标键盘等操作, 请让电脑始终保持解锁状态(建议设置自动登录), 并注意**不要让不怀好意的人碰 A 电脑(家里的)**
-   `actions.json` 里不能有注释

# 许可证

The Motherfucking Anti Indulgence License
