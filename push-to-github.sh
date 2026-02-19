#!/bin/bash
# 推送到 GitHub - 请在终端执行: bash push-to-github.sh
# 若从未同意 Xcode 许可，请先执行: sudo xcodebuild -license

cd "$(dirname "$0")"

echo ">>> 添加远程仓库..."
git remote add origin https://github.com/ak474399-sketch/my_web_1.git 2>/dev/null || git remote set-url origin https://github.com/ak474399-sketch/my_web_1.git

echo ">>> 将当前分支命名为 main..."
git branch -M main

echo ">>> 推送到 GitHub..."
git push -u origin main

echo ">>> 完成！"
