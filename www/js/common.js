export default class Common
{
    constructor()
    {
        this.$fever_flakes = document.getElementById('fever_flakes');
    }

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
}
