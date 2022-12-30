# 慕课题目搜搜搜
<a href="https://greasyfork.org/zh-CN/scripts/456832-%E6%85%95%E8%AF%BE%E9%A2%98%E7%9B%AE%E6%90%9C%E6%90%9C%E6%90%9C">
<img src="https://img.shields.io/badge/GreasyFork-v1.2.1-black.svg">
</a>  
<a href="https://github.com/LiWeny16/MoocQsearchSS/blob/main/LICENSE">
<img src="https://img.shields.io/badge/LICENSE-MPL2.0-pink.svg">
</a>  
<a href="https://github.com/LiWeny16/MoocQsearchSS">
<img src="https://img.shields.io/badge/Link-Github-2.svg">
</a>

## 简介
这是一个油猴脚本，可以让你轻松搜索题目，源题库：
1. 全平台【万能】题库
2. 一之哥哥题库
3. enncy题库  
4. Ne-21题库
5. 蛋炒饭题库
6. 山楂树题库

还支持OCR识别，前提是你需要有一个**白描会员cookie**

## 安装

1. [点我了解油猴插件怎么安装](https://greasyfork.org/zh-CN/help/installing-user-scripts)
2. [安装链接](https://greasyfork.org/zh-CN/scripts/456832-%E6%85%95%E8%AF%BE%E9%A2%98%E7%9B%AE%E6%90%9C%E6%90%9C%E6%90%9C)

## 版本新增

+ 快捷键
+ OCR识别
+ 选中自动粘贴
+ 高级搜索

    ###  **高级搜索模式**

    + 输入形如(按下Alt+A时选中一段文字可以快捷输入[])
        ```
        [社会主义的根本任务是()?]
        [发展生产力]
        [以经济建设为中心]
        [走向共同富裕]
        [全面建成小康社会]
        ```
        即
        ```
        [你要搜索的问题]
        [选项A]
        [选项B]
        [选项C]
        [选项D]
        ```

        **注意:**  

        + `[]`必须是英文的半角
        + 五个`[]`之间有没有换行和空格都无所谓，你可以写成这样
        
            ```
            [1+1=?][1][2][3][4]
            ```
            你也可以写成这样
            ```
            [1+1=?] [1] 
            [2]  [3]
            [4]
            ```
            只要注意他们的顺序正确就好了,第一个`[]`中间的内容是要搜索的题目

    ### **快捷键**
    + Ctrl + Enter 进行快捷搜索(MOOC会有插件提示,无需担心,这就只是个无实质性作用的窗口而已)
    + 按下Ctrl再选中文本可以实现快速复制粘贴
    + 按下Alt+A组合键可以实现快速高级搜索

    ### **OCR识别**
    + 使用win+shift+s进行截图后,Ctrl+V粘贴到题目搜索框

## 开源协议

+ MPL2.0

## 致谢
1. [steven026](https://bbs.tampermonkey.net.cn/space-uid-55086.html)关于unsafeWindow的处理