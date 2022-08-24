# 借助 OneDrive 实现的自用简陋远程控制

# 食用方法

## 1. 在 A 电脑(家里的)上依次运行以下命令

```
C:\Users\dsy4567> git clone https://github.com/dsy4567/my-remote-control.git
C:\Users\dsy4567> cd my-remote-control
C:\Users\dsy4567\my-remote-control> npm install
```

## 2. 在 A 电脑(家里的)上修改 index.js 里的 DataDir (可选)

```JavaScript
9| const DataDir = "......";
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
    "doThings": "false", // 修改完下面的东西后, 将它改成 "true" (必须是字符串类型, 下同) 并保存
    "screenshot": "true", // 截屏(图片保存在 screenshots 文件夹里)
    "runCommandAsync": "false", // 是否等待命令执行完毕, 并将输出写入 logs.txt
    "runCommand": "dir .", // 执行 cmd 命令
    "shutDown": "false", // 关闭电脑(在下一次启动时, 如果启用了自动重启登录, 则将自动登录并锁定上次交互用户)
    "reboot": "false", // 重启电脑(在下一次启动时, 如果启用了自动重启登录, 则将自动登录并锁定上次交互用户)
    "cancelShutDown": "true", // 取消关机或重启
    "copyFile": {
        // 复制文件
        "from": "c:\\users\\dsy4567\\desktop\\yellow-video.mp4", // 将文件...
        "to": "c:\\users\\dsy4567\\onedrive\\myremote\\do-not-open-me.mp4" // 复制到...
    },
    "exit": "false" // 退出远程控制
}
```
