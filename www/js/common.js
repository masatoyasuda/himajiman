export default class Common
{
    constructor()
    {
        this.language_support_list = [/$ja/, /$en/];
        this.$event_wrap = document.getElementById('event_wrap');
        this.fever = false; // フィーバー中はtrue
        this.$top_wrap = document.getElementById('top_wrap');
        this.$game_wrap = document.getElementById('game_wrap');
        this.$total_himas = document.getElementsByClassName('js-total-hima');
        this.$today_himas = document.getElementsByClassName('js-today-hima');
        this.$start_btn = document.getElementById('start_btn');
        this.$ranking_btn = document.getElementById('ranking_btn');
        this.$close_btn = document.getElementById('close_btn');
        this.$hima_btn_wrap = document.getElementById('hima_btn_wrap');
        this.$hima_btn = document.getElementById('hima_btn');
        this.$character_msg = document.getElementById('character_msg');
        this.$character_image = document.getElementById('character_image');
        this.$character_name = document.getElementById('character_name');
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

    /**
     * ローカルストレージ取得。存在しない場合はnullを返す
     * 「main」「game」
     * @param {string} storage_name 
     * @returns 
     */
    getStorage(storage_name)
    {
        const storage = localStorage.getItem(storage_name);
        if (storage) {
            return JSON.parse(storage);
        } else {
            return null;
        }
    }

    /**
     * ローカルストレージ保存
     * 「main」「game」
     * @param {string} storage_name 
     * @param {object} data 
     */
    setStorage(storage_name, data)
    {
        localStorage.setItem(storage_name, JSON.stringify(data));
    }

    setGameStorage()
    {
        localStorage.setItem('game', JSON.stringify({
            total_count: game.total_count,
            today_count: game.today_count,
            today: game.today,
            more_free_skip_today: game.more_free_skip_today,
            more_movie_skip_today: game.more_movie_skip_today,
            more_free_fever_today: game.more_free_fever_today,
            more_movie_fever_today: game.more_movie_fever_today,
            free_fever_next_at: game.free_fever_next_at
        }));
    }
}
