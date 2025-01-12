export default class Utility
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

    getStorage()
    {
        const storage = localStorage.getItem('hima_count');
        if (storage) {
            return JSON.parse(storage);
        } else {
            const default_obj = {
                total_count: 0,
                today_count: 0,
                today: this.getDatetimeFormat(new Date(), 'YYYY-MM-DD'),
                more_free_skip_today: 1,
                more_movie_skip_today: 3,
                more_free_fever_today: 1,
                more_movie_fever_today: 3,
                free_fever_next_at: window.main.calkFeverNextAt()
            };
            this.setStorage(default_obj);
            console.log(default_obj);
            return default_obj;
        }
    }

    setStorage(data)
    {
        localStorage.setItem('hima_count', JSON.stringify(data));
    }


}
