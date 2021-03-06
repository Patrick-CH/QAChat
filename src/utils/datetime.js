/**
 * 时间日期相关操作
 */


/**
 * 时间格式化
 * 将 2018-09-23T11:54:16.000+0000 格式化成 2018/09/23 11:54:16
 * @param datetime 国际化日期格式
 */
export function format() {
    return formatWithSeperator("/", ":");
}

/**
 * 时间格式化
 * 将 2018-09-23T11:54:16.000+0000 格式化成类似 2018/09/23 11:54:16
 * 可以指定日期和时间分隔符
 * @param datetime 国际化日期格式
 */
export function formatWithSeperator(dateSeprator, timeSeprator) {

    const dateMat = new Date();
    const year = dateMat.getFullYear();
    const month = dateMat.getMonth() + 1;
    const day = dateMat.getDate();
    let hh = dateMat.getHours();
    if (hh < 10) {
        hh = "0" + String(hh);
    } else {
        hh = String(hh);
    }
    let mm = dateMat.getMinutes();
    if (mm < 10) {
        mm = "0" + String(mm);
    } else {
        mm = String(mm);
    }
    let ss = dateMat.getSeconds();
    if (ss < 10) {
        ss = "0" + String(ss);
    } else {
        ss = String(ss);
    }
    const timeFormat = year + dateSeprator + month + dateSeprator + day + " " + hh + timeSeprator + mm + timeSeprator + ss;
    return timeFormat;

}