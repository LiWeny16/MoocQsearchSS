// ==UserScript==
// @name         慕课题目搜搜搜
// @namespace    http://tampermonkey.net/
// @version      1.2.1
// @description   题库查询小工具
// @author       Onion
// @match     https://www.icourse163.org/*
// @match     https://i.chaoxing.com/*
// @match     https://mooc2-ans.chaoxing.com/*
// @match     https://mooc1.chaoxing.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=icourse163.org
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @connect    cx.icodef.com
// @connect    huawei-cdn.lyck6.cn
// @connect    tk.enncy.cn
// @connect    web.baimiaoapp.com
// @run-at       document-start
// @license      MPL2.0
// ==/UserScript==
function mainTop() {

    'use strict';
    var yourQues
    var yzggToken = `ddMyyyPEhfHSzQBy`
    var enncyToken = ``
    var ocrToken = new Object()
    let ocrSumResults = ""
    ocrToken.cookie = ``
    ocrToken.xauthToken = ``
    ocrToken.xauthUuid = ``
    var readyState = 0
    const document = unsafeWindow.document;
    const window = unsafeWindow
    if (window.location.href.indexOf("www.icourse163.org") > -1) {
        appendBox(0).then((res) => {
            initBox()
            addBoxEvent()
            addMoveEvent()
            addSearchEvent()
            pic2WordsEvent()

            //  keyEvent()
        })
        addBothStyle()

    }
    function creatBox() {
        return new Promise((resolve) => {
            var divE = document.createElement('div');
            var divId = document.createAttribute("id"); //创建属性
            divId.value = 'gptDiv'; //设置属性值
            divE.setAttributeNode(divId); //给div添加属性
            divE.innerHTML = `
                <div id="gptInputBox">
                   <textarea id="gptInput" type=text></textarea>
                   <button id="button_GPT">搜一下</button>
                </div>
                <div id=gptCueBox>
                    <div id="gptAnswer" class="markdown-body">
                        <div id="gptAnswer_inner">慕课题目搜搜搜v1.2.1已启动</div>
                        <div id="loadingBox">加载中<span class="dot"></span></div>
                        <div id="loadingBoxImg">图片转文字中,请稍等<span class="dot"></span></div>
                    </div>
                </div>
                <div id="gptSettingBox">
                    <div id="moveIt"><svg t="1671455942102" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="2728" width="200" height="200">
                            <path
                                d="M486.4 776.533333v-213.333333H247.466667v106.666667L85.333333 512l162.133334-162.133333V512h238.933333V247.466667H349.866667L512 85.333333l162.133333 162.133334h-132.266666V512h238.933333V349.866667L938.666667 512l-162.133334 162.133333v-106.666666h-238.933333v213.333333h132.266667L512 938.666667l-162.133333-162.133334h136.533333z"
                                p-id="2729"></path>
                        </svg></div>
                    <div id="spreadOrShrink">⇥</div>
                </div>
     `
            resolve(divE)
        })
    }
    async function pivElemAddEventAndValue(append_case) {
        var search_content
        if (append_case === 3) {
            search_content = document.getElementById('q').value
        }
        if (append_case === 2) {
            search_content = document.getElementById('kw').value
        }
        if (append_case === 1) {
            search_content = document.querySelector("#tsf > div:nth-child(1) > div.A8SBwf > div.RNNXgb > div > div.a4bIc > input:nth-child(3)").value
        }
        if (append_case === 0) {
            search_content = document.getElementsByClassName('b_searchbox')[0].value
        }
        document.getElementById("gptInput").value = search_content
        document.getElementById('button_GPT').addEventListener('click', () => {
            your_qus = document.getElementById("gptInput").value
            do_it()

        })


    }
    async function appendBox(append_case) {
        return new Promise((resolve, reject) => {
            creatBox().then((divE) => {
                switch (append_case) {
                    case 0: //bing
                        if (divE) {
                            document.body.prepend(divE)
                        }
                        break;
                    case 1://google
                        if (document.getElementsByClassName('TQc1id ')[0]) {
                            document.getElementsByClassName('TQc1id ')[0].prepend(divE);
                        }
                        else {
                            document.getElementById("rcnt").appendChild(divE);
                        }
                        break;
                    case 2:
                        if (document.getElementById('content_right')) {
                            document.getElementById('content_right').prepend(divE)
                        }
                        break;
                    case 3:
                        if (document.getElementsByClassName("layout-web__sidebar")[0]) {
                            document.getElementsByClassName("layout-web__sidebar")[0].prepend(divE)
                        }
                    default:
                        if (divE) {
                            console.log(`啥情况${divE}`)
                        }
                }
            }).catch((err) => {
                throw new Error(err)
            })

            resolve("finished")
        })
    }
    function addBothStyle() {
        GM_addStyle(`

     #moveIt{
     justify-content: right;
     display: flex;
     cursor: move;
}
 .icon{
     width: 100%;
     height: 100%;
}
 #gptSettingBox{
     display: flex;
     flex-direction: row;
     width: 8%;
}
 #spreadOrShrink{
     justify-content: space-evenly;
     display: flex;
     align-items: center;
     border: solid;
     border-top: none;
     border-bottom: none;
     caret-color: transparent;
}
 #gptAnswer{
     margin: 4px;
     border-top: solid;
     border-bottom: solid;
    height: fit-content;
    overflow-y: auto;
    align-items: center;
      text-align: center;
}
 #gptInput{
     width: 81%;
     border-radius: 4px;
     border: solid;
}
 #gptInputBox{
     display: flex;
     justify-content: space-around;
}
 #button_GPT:hover{
     background:#ffffffcc;
}
 #gptDiv{
     border-radius: 8px;
     padding: 10px;
     margin-bottom: 9px;
     width:452px;
     translate:-20px;
     background:#ffffffcc;
     display: flex;
     flex-direction: row;
     position: fixed;
     top: 80px;
     border: solid;
     right: 51px;
     z-index: 9999;
     background: white;
     color: black;
     transition: all 0.5s ease 0s;
}
 #button_GPT{
}
 #button_GPT{
     background: transparent;
     border-radius: 3px;
}
 #gptCueBox{
      width: 68%;
}
 #gptAnswer_inner{

 }
/*dots*/
  .dot{
    height: 4px;
    width: 4px;
    display: inline-block;
    border-radius: 2px;
    animation: dotting 2.4s  infinite step-start;
}
  @keyframes dotting {
    25%{
        box-shadow: 4px 0 0 #71777D;
    }
    50%{
        box-shadow: 4px 0 0 #71777D ,14px 0 0 #71777D;
    }
    75%{
        box-shadow: 4px 0 0 #71777D ,14px 0 0 #71777D, 24px 0 0 #71777D;
    }
}
    `)
    }
    function addBoxEvent() {
        if (getCookie("isShrink") == "") {
            setCookie("isShrink", 0, 30)
        }
        else {
            document.getElementById('spreadOrShrink').addEventListener("click", () => {
                if (getCookie("isShrink") == 0) {
                    document.getElementById('gptInputBox').style.display = "none"
                    document.getElementById('gptCueBox').style.display = "none"
                    document.getElementById('gptDiv').style.width = "1.5vh"
                    document.getElementById('spreadOrShrink').innerHTML = "\u21e4"
                    setCookie("isShrink", 1, 30)
                }
                else {
                    document.getElementById('gptInputBox').style.display = "flex"
                    document.getElementById('gptCueBox').style.display = "block"
                    document.getElementById('gptDiv').style.width = "452px"
                    document.getElementById('spreadOrShrink').innerHTML = "\u21e5"
                    setCookie("isShrink", 0, 30)
                }
            })
        }
    }
    function initBox() {
        if (getCookie("isShrink") == 0) {
            document.getElementById('gptInputBox').style.display = "flex"
            document.getElementById('gptCueBox').style.display = "block"
            document.getElementById('gptDiv').style.width = "452px"
            document.getElementById('spreadOrShrink').innerHTML = "\u21e5"
        }
        else {
            document.getElementById('gptInputBox').style.display = "none"
            document.getElementById('gptCueBox').style.display = "none"
            document.getElementById('gptDiv').style.width = "1.5vh"
            document.getElementById('spreadOrShrink').innerHTML = "\u21e4"
        }
        document.getElementById('loadingBox').style.display = "none" //不展示
        document.getElementById('loadingBoxImg').style.display = "none" //不展示
    }
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }
    //原生cookie函数
    function getCookieObject() {
        let cookieString = document.cookie;
        cookieString = cookieString.substring(0, cookieString.length - 1);
        let tempCookieArray = cookieString.split('; ');

        let cookieObject = {}; // 存放 cookie 键值对

        tempCookieArray.forEach(item => {
            let name = item.substring(0, item.indexOf('='));
            let value = item.substring(item.indexOf('=') + 1);
            value = decodeURIComponent(value); // 还原字符串
            cookieObject[name] = value; // 将键值插入中这个对象中
        });

        return cookieObject // 返回包含 cookie 键值对的对象
    }
    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    }
    function moveIt(controlEle, movedEle) {
        //var demo = document.getElementById(`${settings}`)
        var canitmove = false
        var x = 0,
            y = 0
        controlEle.onmousedown = function (e) {
            e.preventDefault()
            x = e.pageX - movedEle.offsetLeft
            y = e.pageY - movedEle.offsetTop
            canitmove = true
            document.getElementById("gptDiv").style.transition = "none"
            //  console.log(e.pageX)
        }
        controlEle.onmouseup = function (e) {
            e.preventDefault()
            x = e.pageX - movedEle.offsetLeft
            y = e.pageY - movedEle.offsetTop
            canitmove = false
            document.getElementById("gptDiv").style.transition = "all 0.5s ease 0s"
            //  console.log(movedEle.offsetLeft)
            console.log(e.pageX)
        }
        window.onmouseup = function () {
            canitmove = false
        }
        window.onmousemove = function (e) {

            if (canitmove) {
                movedEle.style.left = e.pageX - x + 'px'
                movedEle.style.top = e.pageY - y + 'px'
            }
        }
    }
    function addMoveEvent() {
        moveIt(document.getElementById('moveIt'), document.getElementById('gptDiv'))
    }

    //搜题部分
    function getQues() {
        yourQues = document.getElementById('gptInput').value
        return document.getElementById('gptInput').value.trim()
    }
    function getAllAnswer() {
        if (document.getElementById('gptInput').value !== "") {
            document.getElementById('loadingBox').style.display = "block"
            document.getElementById('gptAnswer_inner').innerHTML = ``
            getAnswer(1)
                .then(() => {
                    readyState++
                    return getAnswer(0)
                })
                .then(() => {
                    if (enncyToken !== "") {
                        readyState++
                        getAnswer(2).then(() => {
                            //    if (readyState == 2) {
                            document.getElementById('loadingBox').style.display = "none"
                            readyState = 0
                            //    }
                        })
                    }
                    else {
                        //     if (readyState == 1) {
                        document.getElementById('loadingBox').style.display = "none"
                        readyState = 0
                        //  }
                    }
                })
                .catch((err) => {
                    log(err)
                })
        }
        else {
            document.getElementById('gptAnswer_inner').innerHTML = `<div>搜索内容不能为空</div>`
        }
    }
    function getAnswer(chooseCase) {
        return new Promise((resolve) => {
            if (document.getElementById('gptInput').value !== "") {
                switch (chooseCase) {
                    case 0:
                        GM_xmlhttpRequest({
                            method: "POST",
                            url: "https://cx.icodef.com/wyn-nb",
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded",
                                Authorization: `${yzggToken}`,
                            },
                            data: `question=${getQues()}`,
                            onloadend: function (data) {
                                try {
                                    let parsedAnswer = JSON.parse(data.response).data
                                    resolve(data.response)
                                    if (parsedAnswer.match(/http.+/g)) {
                                        logAdd(`<br><b>一之哥哥</b>: <img src="${parsedAnswer}" alt="">`)
                                    }
                                    else {
                                        document.getElementById('gptAnswer_inner').innerHTML += `<br><b>一之哥哥</b>:${parsedAnswer}<br>`
                                    }
                                } catch (err) {
                                    logAdd(`<br><b>一之哥哥err</b>:${err}`)
                                }
                            },
                            onerror: function (err) {
                                throw new Error('Error while executing the code');
                            },
                            ontimeout: function (err) {
                                throw new Error('Error while executing the code');
                            }
                        })
                        break;
                    case 1:
                        GM_xmlhttpRequest({
                            method: "POST",
                            url: "http://huawei-cdn.lyck6.cn/api/autoFreeAnswer",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            data: `{"question": "${getQues()}"}`,
                            onloadend: function (data) {
                                try {
                                    let allAns = ""
                                    for (let i = 0; i <= 2; i++) {
                                        allAns += `<b>${i}</b>：${JSON.parse(data.response).data.list[i]}\n\n`
                                    }
                                    document.getElementById('gptAnswer_inner').innerHTML = `<b>【万能】全平台</b>：${allAns}<br>`
                                } catch (err) {
                                    logAdd(`<b>【万能】全平台</b>：点的太快了gg，再试一次；<br><b>错误信息</b>："${err}"<br>`)
                                }
                                resolve(data.response)
                            },
                            onerror: function (err) {
                                throw new Error('Error while executing the code');
                            },
                            ontimeout: function (err) {
                                throw new Error('Error while executing the code');
                            }
                        })
                        break;
                    case 2:
                        GM_xmlhttpRequest({
                            method: "GET",
                            url: `https://tk.enncy.cn/query?title=${getQues()}&token=${enncyToken}`,
                            headers: {
                                "Content-Type": "application/json",
                            },
                            onloadend: function (data) {
                                try {
                                    document.getElementById('gptAnswer_inner').innerHTML += `<br><b>enncy题库</b>:${JSON.parse(data.response).data.answer}`
                                } catch (err) {
                                    logAdd(`enncyERR:${err}`);
                                }
                                resolve(data.response)
                            },
                            onerror: function (err) {
                                throw new Error('Error while executing the code');
                            },
                            ontimeout: function (err) {
                                throw new Error('Error while executing the code');
                            }
                        })
                        break;
                    default:
                        GM_xmlhttpRequest({
                            method: "POST",
                            url: "https://cx.icodef.com/wyn-nb",
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded",
                                Authorization: `${yzggToken}`,
                            },
                            data: `question=${getQues()}`,
                            onloadend: function (data) {
                                document.getElementById('gptAnswer').innerHTML = JSON.parse(data.response).data
                            },
                            onerror: function (err) {
                                throw new Error('Error while executing the code');
                            },
                            ontimeout: function (err) {
                                throw new Error('Error while executing the code');
                            }
                        })

                }
            }
            else {
                document.getElementById('gptAnswer_inner').innerHTML = `<div>搜索内容不能为空</div>`
            }
        })




    }
    function pic2WordsEvent() {
        document.getElementById('gptInput').addEventListener('paste', (e) => {
            pic2base64(e).then((base64data) => {
                if (base64data) {
                    if (!ocrToken.xauthToken||!ocrToken.xauthUuid||!ocrToken.cookie) {
                        log(`你妹有白描cookie（悲<br><a href="https://web.baimiaoapp.com/">点我去白描官网买</a>`)
                    }
                    else {
                        console.log(base64data);
                        log(`尊贵的白描黄金VIP,欢迎`)
                        document.getElementById('loadingBoxImg').style.display = "block"
                        sendOcrMode()
                            .then((sendOcrModeRes) => {
                                console.log(sendOcrModeRes);
                                return sendOcrData(JSON.parse(sendOcrModeRes).data.token, base64data)
                            })
                            .then((sendOcrDataRes) => {
                                // console.log(JSON.parse(sendOcrDataRes).data.jobStatusId);
                                return JSON.parse(sendOcrDataRes).data.jobStatusId
                            })
                            .then((jobStatusId) => {
                                console.log(jobStatusId);
                                sleep(2000).then(() => {
                                    getOcrResults(jobStatusId)
                                        .then((finalRes) => {
                                            if (JSON.parse(finalRes).code) {
                                                for (let i = 0; i <= JSON.parse(finalRes).data.ydResp.data.lines.length - 1; i++) {
                                                    ocrSumResults += JSON.parse(finalRes).data.ydResp.data.lines[i].text
                                                }
                                            }
                                            else {
                                                log(`emmm,网络有点卡,再试一次吧！`)
                                            }

                                        }).then(() => {
                                            if (ocrSumResults == "") {
                                                log(`奇怪的情况出现了（惊`)
                                            }
                                            else { document.getElementById('gptInput').value = `${ocrSumResults.trim()}` }
                                        }).then(() => {
                                            ocrSumResults = ""
                                        }).then(() => {
                                            document.getElementById('loadingBoxImg').style.display = "none"
                                        })
                                })


                            })
                    }

                }
                else {
                    console.log("原来只是正常的复制而已（*~*)");
                }

            })
        })
    }
    function pic2base64(e) {
        return new Promise((resolve) => {
            e.stopPropagation();
            // e.preventDefault();
            // 阻止粘贴
            // 获取剪贴板信息
            var clipboardData = e.clipboardData || window.clipboardData;
            var items = clipboardData.items;
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (item.kind == 'file') {
                    var pasteFile = item.getAsFile();
                    var reader = new FileReader();
                    reader.onload = function (event) {
                        // 将结果显示在<textarea>中
                        resolve(event.target.result)
                        //  console.log(event.target.result);
                    }
                    // 将文件读取为BASE64格式字符串
                    reader.readAsDataURL(pasteFile);
                    break;
                }
                else {
                    resolve(0)
                }
            }
        })
    }
    const sleep = (time) => {
        return new Promise(resolve => setTimeout(resolve, time))
    }
    function getOcrResults(jobStatusId) {
        return new Promise((resolve) => {
            GM_xmlhttpRequest({
                method: "GET",
                url: `https://web.baimiaoapp.com/api/ocr/image/xunfei/status?jobStatusId=${jobStatusId}`,
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "x-auth-token": ocrToken.xauthToken,
                    "x-auth-uuid": ocrToken.xauthUuid,
                    "Cookie": ocrToken.cookie,
                    "Connection": "keep-alive",
                    "Accept": "*/*"
                },
                onloadend: function (data) {
                    try {
                        resolve(data.response)
                    } catch (err) {
                        logAdd(`err:${err}`)
                    }
                },
                onerror: function (err) {
                    logAdd(`err:${err}`)
                },
                ontimeout: function (err) {
                    logAdd(`err:${err}`)
                }
            })
        })

    }
    function sendOcrData(nextToken, base64data) {
        return new Promise((resolve) => {
            GM_xmlhttpRequest({
                method: "POST",
                url: "https://web.baimiaoapp.com/api/ocr/image/xunfei",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "x-auth-token": ocrToken.xauthToken,
                    "x-auth-uuid": ocrToken.xauthUuid,
                    "Cookie": ocrToken.cookie,
                    "Connection": "keep-alive",
                    "Accept": "*/*"
                },
                data: `{"token":"${nextToken}","hash":"3f9c056379f0457c564290f6e15a9c232f1e5557","name":"image.png","size":13764,"dataUrl":"${base64data}","result":{},"status":"processing","isSuccess":false}`,
                onloadend: function (data) {
                    try {
                        resolve(data.response)
                    } catch (err) {
                        logAdd(`err:${err}`)
                    }
                },
                onerror: function (err) {
                    logAdd(`err:${err}`)
                },
                ontimeout: function (err) {
                    logAdd(`err:${err}`)
                }
            })
        })

    }
    function sendOcrMode() {
        return new Promise((resolve) => {
            GM_xmlhttpRequest({
                method: "POST",
                url: "https://web.baimiaoapp.com/api/perm/single",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "x-auth-token": ocrToken.xauthToken,
                    "x-auth-uuid": ocrToken.xauthUuid,
                    cookie: ocrToken.cookie
                },
                data: `{"mode": "single"}`,
                onloadend: function (data) {
                    try {
                        resolve(data.response)
                    } catch (err) {
                        logAdd(`err:${err}`)
                    }
                },
                onerror: function (err) {
                    logAdd(`err:${err}`)
                },
                ontimeout: function (err) {
                    logAdd(`err:${err}`)
                }
            })
        })

    }
    function addSearchEvent() {
        document.getElementById('button_GPT').addEventListener("click", () => {
            getAllAnswer()
        })
    }
    function keyEvent() {
        document.onkeydown = function (e) {
            var keyNum = window.event ? e.keyCode : e.which;
            if (13 == keyNum) {
                if (isBlur()) {
                    document.getElementById('button_GPT').click()
                }
                else {
                    console.log("失焦不执行")
                }

            }
        }

    }
    function isBlur() {
        var myInput = document.getElementById('gptInput');
        if (myInput == document.activeElement) {
            return 1
        } else {
            return 0
        }
    }
    function getBase64Size(base64) {//获取base64字符串的大小
        /*
            参考：https://www.jb51.net/article/172316.htm
            并优化后代码
        */
        if (base64) { // 获取base64图片byte大小
            base64 = base64.split(",")[1].split("=")[0];
            var strLength = base64.length;
            var fileLength = strLength - (strLength / 8) * 2;
            return Math.floor(fileLength); // 向下取整
        } else {
            return null
        }
    };
    function log(temp_1) {
        document.getElementById('gptAnswer_inner').innerHTML = temp_1
    }
    function logAdd(temp_1) {
        document.getElementById('gptAnswer_inner').innerHTML += temp_1
    }

}
(function () { window.onload = mainTop })()