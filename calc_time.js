/**
 * 哔哩哔哩视频时长计算，分P的视频，直接在控制台运行，或者使用油猴脚本。
 * @returns {null}
 */
const fun = () => {
    console.log("计算时间。。。")
    const li_ = document.querySelectorAll("#multi_page > div.cur-list > ul > li")
    if (!li_) {
        setTimeout(() => {
            return fun()
        }, 1000)
        return null;
    }
    if (li_.length <= 1){
        return null;
    }
    let allTime = [];
    li_.forEach(item => {
        let text = item.querySelector("a > div > div.duration")
        if (text) {
            text = text.textContent;
            allTime.push(text)
        }
    })
    // 处理时间
    let sumTime = [0, 0, 0];
    allTime.forEach(timeStr => {
        const min_f = timeStr.split(":");
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
    })
    if (sumTime[0] === 0 && sumTime[1] === 0 && sumTime[2] === 0) {
        setTimeout(() => {
            fun()
        }, 1000)
        return null
    }
    // 处理总时间
    let sec = parseInt((sumTime[2] / 60).toFixed(1).slice(0, -1))
    let min = parseInt(((sumTime[1] + (sumTime[2] % 60)) / 60).toFixed(1).slice(0, -1))
    let hour = parseInt((sumTime[0] + (sumTime[1] + (sumTime[2] % 60)) / 60).toFixed(1).slice(0, -1));
    console.log(`当前视频时长共 ${hour}时 ${min}分 ${sec}分`)
}

fun()


