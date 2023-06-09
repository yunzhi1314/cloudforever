# 在GitHub上配置SSH密钥

要在GitHub上配置SSH密钥，请按照以下步骤进行操作：

1. 生成SSH密钥对：
   - 打开bash窗口。
   - 输入以下命令生成SSH密钥对：`ssh-keygen -t rsa -b 4096 -C "your-email@example.com"`
     - `-C "your-email@example.com"` 表示在公钥文件中添加注释，可以替换为你的电子邮件地址。
   - 提示输入保存密钥对的文件路径，默认为 `~/.ssh/id_rsa`，如果你希望使用默认路径，直接按Enter键即可。
   - 提示输入用于保护密钥对的密码短语，可以选择设置密码短语或直接按Enter键跳过。

2. 复制公钥内容：
   - 在bash中，使用文本编辑器打开公钥文件，如 `cat ~/.ssh/id_rsa.pub`。
   - 复制公钥文件中显示的内容，该内容通常以 `ssh-rsa` 开头。

3. 登录到GitHub账户：
   - 打开GitHub网站并登录到你的账户。

4. 配置SSH密钥：
   - 在右上角的用户菜单中，选择 "Settings"。
   - 在左侧导航栏中，选择 "SSH and GPG keys"。
   - 点击 "New SSH key"。
   - 在 "Title" 字段中，为该密钥提供一个描述性的名称，可以是任意你认可的名称。
   - 在 "Key" 字段中，粘贴之前复制的公钥内容。
   - 点击 "Add SSH key"。

# VSCODE如何使用SSH协议连接其他人的远程仓库

要在VSCODE中使用SSH协议连接远程仓库，请按照以下步骤进行操作：

1. 需要拥有对应人仓库的公钥。

2. 在 <用户目录>/.ssh/ 目录中应该新建一个名为 authorized_keys（文件名具体而定） 的文件，而不是新建公钥文件。这个文件用于存储已授权的公钥，每行一个公钥。当想要连接其他人的远程存储仓库时，你应该将你的公钥添加到你的 authorized_keys 文件中，同时，对应人的authorized_keys文件中也得有一行你的公钥。

- 如何使用公钥连接其他人的远程Git仓库

> 如果想要使用公钥连接其他人的远程Git仓库，请按照以下步骤进行操作：
>
> (1). 确保在本地生成了自己的SSH密钥对。
> (2). 将自己的公钥内容提供给对应人。
> (3). 对应人将你的公钥内容添加到他的远程Git仓库的配置中。
> (4). 在自己的本地使用SSH协议克隆或推送到对应人的远程Git仓库时，使用对应人提供的远程仓库的SSH连接字符串。

3. 如果尚未生成 SSH 密钥对，请按照前面提到的步骤生成 SSH 密钥对。

4. 配置 SSH 代理：如果使用 SSH 代理，请确保已在 VS Code 中进行配置。在 VS Code 中，按下 Ctrl + Shift + P（Windows/Linux）或 Cmd + Shift + P（Mac）打开命令面板，然后输入 "Open User Settings" 并选择打开。

5. 在设置中搜索 "ssh"：在用户设置中搜索 "ssh"，找到 "Remote.SSH: Path" 选项。

6. 配置 SSH 路径：在 "Remote.SSH: Path" 选项中，输入 SSH 可执行文件的路径。在大多数情况下，这应该是你系统中 SSH 的默认路径。例如，对于 Windows 用户，通常是 C:\Windows\System32\OpenSSH\ssh.exe。

7. 打开远程仓库：在 VS Code 中，按下 Ctrl + Shift + P（Windows/Linux）或 Cmd + Shift + P（Mac）打开命令面板，然后输入 "Remote-SSH: Connect to Host" 并选择打开。

8. 添加远程主机：在命令面板中，选择 "Remote-SSH: Add New SSH Host"。

9. 输入远程主机信息：在弹出的输入框中，输入远程主机的 SSH 连接字符串。例如，user@example.com 或 user@hostname。按回车键确认。

10. 选择密钥：在弹出的列表中，选择要与远程主机关联的密钥。选择您之前生成的 SSH 密钥对。

11. 连接远程主机：VS Code 将尝试使用 SSH 协议连接到远程主机。如果成功，将打开一个新的 VS Code 窗口或者在当前窗口，显示远程主机的文件系统。