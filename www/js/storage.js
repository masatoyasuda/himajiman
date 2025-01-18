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
            fever_start_at: game.fever_start_at,
            total_count: game.total_count,
            today_count: game.today_count,
            today: game.today,
            more_free_skip: game.more_free_skip,
            more_movie_skip: game.more_movie_skip,
            more_free_fever: game.more_free_fever,
            more_movie_fever: game.more_movie_fever,
            free_fever_next_at: game.free_fever_next_at,
        }));
    }
}
