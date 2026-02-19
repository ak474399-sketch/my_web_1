# 将项目上传到 GitHub

## 第一步：接受 Xcode 许可（仅首次需要）

在终端执行（会要求输入密码）：

```bash
sudo xcodebuild -license
```

按空格翻页，最后输入 `agree` 完成。

---

## 第二步：在终端执行以下命令

在项目目录 `/Users/winfield/my_web_1` 下打开终端，依次执行：

### 1. 初始化 Git 并首次提交

```bash
cd /Users/winfield/my_web_1

git init
git add .
git commit -m "Initial commit"
```

### 2. 在 GitHub 上创建仓库

- 打开 https://github.com/new
- **Repository name** 填：`my_web_1`（或你喜欢的名字）
- 选择 **Public**
- **不要**勾选 "Add a README"（本地已有代码）
- 点击 **Create repository**

### 3. 关联远程仓库并推送

创建好仓库后，GitHub 会显示仓库地址。将下面的 `你的用户名` 换成你的 GitHub 用户名后执行：

```bash
git remote add origin https://github.com/你的用户名/my_web_1.git
git branch -M main
git push -u origin main
```

如果 GitHub 上仓库名不是 `my_web_1`，请把上面地址里的仓库名改成实际名称。

### 使用 SSH（可选）

若已配置 SSH 密钥，可以用：

```bash
git remote add origin git@github.com:你的用户名/my_web_1.git
git branch -M main
git push -u origin main
```

---

## 推送时要求登录

- **HTTPS**：会提示输入 GitHub 用户名和密码；密码处需使用 [Personal Access Token](https://github.com/settings/tokens)，不是账号密码。
- **SSH**：需先在 GitHub 添加 SSH 公钥，再用上面 SSH 地址推送。

完成以上步骤后，项目就会出现在你的 GitHub 仓库中。
