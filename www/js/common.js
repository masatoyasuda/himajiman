export default class Common
{
    getDatetimeFormat(datetime_obj, format)
    {
        const year = datetime_obj.getFullYear();
        let month = datetime_obj.getMonth() + 1;
        if (month < 10) {
            month = `0${month}`;
        }
        let date = datetime_obj.getDate();
        if (date < 10) {
            date = `0${date}`;
        }
        let hours = datetime_obj.getHours();
        if (hours < 10) {
            hours = `0${hours}`;
        }
        let minutes = datetime_obj.getMinutes();
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        let seconds = datetime_obj.getSeconds();
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        format = format.replace('YYYY', year);
        format = format.replace('MM', month);
        format = format.replace('DD', date);
        format = format.replace('hh', hours);
        format = format.replace('mm', minutes);
        format = format.replace('ss', seconds);
        return format;
    }

    timeFormat(time_ms)
    {
        const time_s = Math.ceil(time_ms / 1000);
        let res = '';
        if (time_s > 59) {
            const minutes = Math.floor(time_s / 60);
            const seconds = time_s - (minutes * 60);
            if (seconds > 9) {
                res = `0${minutes}:${seconds}`;
            } else {
                res = `0${minutes}:0${seconds}`;
            }
        } else {
            if (time_s > 9) {
                res = `00:${time_s}`;
            } else {
                res = `00:0${time_s}`
            }
        }
        return res;
    }
}
