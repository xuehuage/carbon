/**
 * @description 防抖 debounce
 * @param {*} func 函数体
 * @param {*} time 延时时间
 * @param {*} once 立即执行
 * @returns fun
 */
 export const debounce = (func, time, once = true) => {
    let timer = null

    return function(){
        const context = this
        const args = arguments
        timer && clearTimeout(timer)

        if (once) {
            let callNow = !timer

            timer = setTimeout(() => {
                timer = null
            }, time)

            callNow && func.apply(context, arguments)
        } else {
            timer = setTimeout(() => {
                func.apply(context, args)
            }, time)
        }
    }
}


/**
 * @description 节流
 * @param {*} func 函数体
 * @param {*} time 延迟毫秒数
 * @param {*} once 立即执行
 */
export const throttle = (func, time, once = true) => {
    if(once){
        let prev = 0
    } else {
        let timer = null
    }

    return function(){
        const context = this
        const args = arguments

        if (once) {
            let now = new Date.now()

            if (now - prev > time) {

                func.apply(context, args)
                prev = now
            }
        } else {
            if(!timer) {
                timer = setTimeout(() => {

                    timer = null
                    func.apply(context, args)
                }, time)
            }
        }
    }
}

/**
 * 
 * @param { Array } data 数据源
 * @param { String } value 排序的属性
 * @param {*} way 升序还是降序 DROP 降序
 * @returns 
 */
export const mySort = (data, value, way = 'DROP') => {
    let dataList = []
    if (way === 'DROP') {
        dataList = data.sort(function(item1, item2){
           return item1[value] - item2[value]
        })
    } else {
        dataList = data.sort(function(item1, item2){
            return item2[value] - item1[value]
        })
    }

    return dataList
}

/**
 * @description 判断是否到某个时间
 * @param {*} time 时间 2021/06/06 15:00:00
 */
export const isEndTime = (time = '2021/06/06 15:00:00') => {
    let now = new Date().getTime(),
    times = new Date(time).getTime();

    let diff = times - now
    if(diff > 0){
        return false
    }

    return true
}
