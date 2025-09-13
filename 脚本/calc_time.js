/**
 * 哔哩哔哩视频时长计算，分P的视频，直接在控制台运行，或者使用油猴脚本。
 * 会注入信息到合集标题栏中
 * @returns {null}
 */

// 获取所有视频元素
function getLiElements() {
    return document.querySelectorAll(".section .pod-item");
}

// 获取单个视频时长
function getTimeDuration(item) {
    let text = item.querySelector(".stat-item.duration");
    if (text) {
        text = text.textContent;
        return text;
    }
    return null;
}

// 获取所有视频时长字符串
function getAllTime(items) {
    const allTime = [];
    for (const item of items){
        const _time = getTimeDuration(item);
        if (_time) {
            allTime.push(_time);
        }
    }
    return allTime;
}

// 解析视频时长字符串并转换为具体时长列表
function parseAllTime(allTime){
    let sumTime = [0, 0, 0];
    for (const _time of allTime) {
        const min_f = _time.split(":");
        let sec = 0;
        let min = 0;
        let hour = 0;
        if (min_f.length >= 2) {
            sec = parseInt(min_f[min_f.length - 1]);
            min = parseInt(min_f[min_f.length - 2]);
            if (min_f.length === 3) {
                hour = parseInt(min_f[0]);
            }
            sumTime[0] = sumTime[0] + hour;
            sumTime[1] = sumTime[1] + min;
            sumTime[2] = sumTime[2] + sec;
        }
    }
    return sumTime;
}

// 计算总时长
function sumTotalTime(sumTime) {
    let sec = parseInt((sumTime[2] / 60).toFixed(1).slice(0, -1))
    let min = parseInt(((sumTime[1] + (sumTime[2] % 60)) / 60).toFixed(1).slice(0, -1))
    let hour = parseInt((sumTime[0] + (sumTime[1] + (sumTime[2] % 60)) / 60).toFixed(1).slice(0, -1));
    return {hour, min, sec};
}

function insertTotalTime(totalTime) {
    const timeStr = `${totalTime.hour}时${totalTime.min}分${totalTime.sec}秒`;
    const header = document.querySelector(".header-bottom");

    const newDiv = document.createElement("div");
    newDiv.className = "center";
    newDiv.style.color = "gray";
    newDiv.textContent = timeStr;
    header.insertBefore(newDiv, header.lastChild);
}

function run(){
    const items = getLiElements();
    const allTime = getAllTime(items);
    const sumTime = parseAllTime(allTime);
    const totalTime = sumTotalTime(sumTime);
    insertTotalTime(totalTime);
}

window.onload = function() {
    run();
}


