export default class Storage
{
    constructor()
    {
        this.fever_start_at = '';
        this.total_count = 0;
        this.today_count = 0;
        this.today = ''
        this.more_free_skip = 1,
        this.more_movie_skip = 3;
        this.more_free_fever = 1;
        this.more_movie_fever = 3;
        this.free_fever_next_at = '';
    }

    storageInit()
    {
        const main_data = this.getStorage('main');
        if (!main_data) {
            this.setStorage('main', {
                lang: ''
            });
        }
        const game_data = this.getStorage('game');
        if (game_data) {
            this.fever_start_at = game_data.fever_start_at;
            this.total_count = game_data.total_count;
            this.today_count = game_data.today_count;
            this.today = game_data.today;
            this.more_free_skip = game_data.more_free_skip;
            this.more_movie_skip = game_data.more_movie_skip;
            this.more_free_fever = game_data.more_free_fever;
            this.more_movie_fever = game_data.more_movie_fever;
            this.free_fever_next_at = game_data.free_fever_next_at;
        } else {
            this.today = window.common.getDatetimeFormat(new Date(), 'YYYY-MM-DD');
            this.free_fever_next_at = window.fever.calkFeverNextAt();
            this.setStorage('game', {
                fever_start_at: this.fever_start_at,
                total_count: this.total_count,
                today_count: this.today_count,
                today: this.today,
                more_free_skip: this.more_free_skip,
                more_movie_skip: this.more_movie_skip,
                more_free_fever: this.more_free_fever,
                more_movie_fever: this.more_movie_fever,
                free_fever_next_at: this.free_fever_next_at
            });
        }
    }

    getStorage(data_name)
    {
        const data = localStorage.getItem(data_name);
        if (data) {
            return JSON.parse(data);
        } else {
            return null;
        }
    }

    setStorage(storage_name, data)
    {
        localStorage.setItem(storage_name, JSON.stringify(data));
    }

    setGameStorage()
    {
        localStorage.setItem('game', JSON.stringify({
            fever_start_at: this.fever_start_at,
            total_count: this.total_count,
            today_count: this.today_count,
            today: this.today,
            more_free_skip: this.more_free_skip,
            more_movie_skip: this.more_movie_skip,
            more_free_fever: this.more_free_fever,
            more_movie_fever: this.more_movie_fever,
            free_fever_next_at: this.free_fever_next_at,
        }));
    }
}
