export default class Game
{
    constructor()
    {
        this.character_name_list = [
            {count: 10000, image: 'himagakusei.png', name: 'student', event: ''},
            {count: 50000, image: 'himabaito.png', name: 'part', event: ''},
            {count: 100000, image: 'himakaisyain.png', name: 'employee', event: ''},
            {count: 300000, image: 'himasyatyou.png', name: 'self_employed', event: ''},
            {count: 500000, image: 'himasensei.png', name: 'teacher', event: ''},
            {count: 800000, image: 'himahakase.png', name: 'doctor', event: ''},
            {count: 1000000, image: 'himadaitouryou.png', name: 'president', event: ''},
            {count: 1300000, image: 'himatennou.png', name: 'emperor', event: ''},
            {count: 1500000, image: 'himabouzu.png', name: 'monk', event: ''},
            {count: 1800000, image: 'himasennin.png', name: 'hermit', event: ''},
            {count: 2000000, image: 'himaryuujin.png', name: 'dragon_sage', event: ''},
            {count: 2300000, image: 'himahotoke.png', name: 'buddha', event: ''},
            {count: 2500000, image: 'himakami.png', name: 'god', event: ''}
        ];
    }

    /**
     * 初期にストレージにデータがある場合、インスタンスプロパティを更新
     * ストレージデータがない場合はストレージデータを作成
     */
    gameDataInit()
    {
        const game_data = window.storage.getStorage('game');
        if (game_data) {
            window.storage.fever_start_at = game_data.fever_start_at;
            window.storage.total_count = game_data.total_count;
            window.storage.today_count = game_data.today_count;
            window.storage.today = game_data.today;
            window.storage.more_free_skip = game_data.more_free_skip;
            window.storage.more_movie_skip = game_data.more_movie_skip;
            window.storage.more_free_fever = game_data.more_free_fever;
            window.storage.more_movie_fever = game_data.more_movie_fever;
            window.storage.free_fever_next_at = game_data.free_fever_next_at;
        } else {
            window.storage.today = window.common.getDatetimeFormat(new Date(), 'YYYY-MM-DD');
            window.storage.free_fever_next_at = this.calkFeverNextAt();
            window.storage.setStorage('game', {
                fever_start_at: window.storage.fever_start_at,
                total_count: window.storage.total_count,
                today_count: window.storage.today_count,
                today: window.storage.today,
                more_free_skip: window.storage.more_free_skip,
                more_movie_skip: window.storage.more_movie_skip,
                more_free_fever: window.storage.more_free_fever,
                more_movie_fever: window.storage.more_movie_fever,
                free_fever_next_at: window.storage.free_fever_next_at
            });
        }
    }

    /**
     * 現在日時を基に次のフィーバー日時を計算して返す
     * @returns datetime
     */
    calkFeverNextAt()
    {
        const current_time = window.common.getDatetimeFormat(new Date(), 'YYYY-MM-DD hh:mm:ss');
        const datetime = new Date(current_time);
        datetime.setMinutes(0);
        datetime.setSeconds(0);
        const hour = Number(datetime.getHours());
        if (hour <= 0 && hour < 8) {
            datetime.setHours(8);
        } else if (hour <= 8 && hour < 12) {
            datetime.setHours(12);
        } else if (hour <= 12 && hour < 18) {
            datetime.setHours(18);
        } else {
            datetime.setHours(24);
        }
        return window.common.getDatetimeFormat(datetime, 'YYYY-MM-DD hh:mm:ss');
    }

    /**
     * ヒマ回数、キャラクター、称号、キャラクター画像を切り替える
     * 一定回数だった場合はイベント発動
     * @param {boolean} event_valid 一定回数だった時にイベントを発動するかどうか。初期化時はfalseにして発動させない。
     */
    viewInfo(event_valid)
    {
        let name = window.locale.user_locale.game.character_name;
        let image = 'himaneat.png';
        let character_event;
        for (const character_name_list of this.character_name_list) {
            if (window.storage.total_count >= character_name_list.count) {
                name = window.locale.user_locale.character_name[character_name_list.name];
                image = character_name_list.image;
                if (window.storage.total_count === character_name_list.count) {
                    character_event = character_name_list;
                }
            } else {
                break;
            }
        }
        document.getElementById('character_img').src = `images/${image}`;
        document.getElementById('character_name').textContent = name;
        document.getElementById('total_hima').textContent = window.storage.total_count;
        document.getElementById('today_hima').textContent = window.storage.today_count;
        if (event_valid && character_event) {
            console.log(111, character_event);
        }
    }

    /**
     * ヒマボタンタップ時のイベント
     */
    setHimaTapEvent()
    {
        document.getElementById('hima_btn').addEventListener('click', () => {
            const add_hima_count = this.fever_start_at ? 3:1;
            window.storage.today_count += add_hima_count;
            window.storage.total_count += add_hima_count;
            window.storage.setGameStorage();
            this.viewInfo(true);
            const hima = document.createElement('div');
            hima.textContent = `ヒマ +${add_hima_count}`;
            hima.classList.add('hima-count-action');
            document.getElementById('hima_btn').appendChild(hima);
            setTimeout(() => {
                hima.remove();
            }, 500);
        });
    }

    setHimaSkipEvent()
    {
        document.getElementById('skip').addEventListener('click', e => {
            if (!e.target.classList.contains('disable')) {
                if (this.more_free_skip > 0) {
                    window.game_event.himaSkip();
                    this.more_free_skip -= 1;
                } else if (this.more_movie_skip > 0) {
                    window.game_event.himaSkip();
                    this.more_movie_skip -= 1;
                }
                this.checkFeverSkipFree_todayCount();
            }
        });
    }

    setHimaFeverEvent()
    {
        document.getElementById('fever').addEventListener('click', e => {
            if (!e.target.classList.contains('disable')) {
                if (this.more_free_fever > 0) {
                    window.game_event.himaFever();
                    this.more_free_fever -= 1;
                } else if (this.more_movie_fever > 0) {
                    window.game_event.himaFever();
                    this.more_movie_fever -= 1;
                }
                this.checkFeverSkipFree_todayCount();
            }
        });
    }

    /**
     * ランダム表示のキャラクターメッセージ表示切り替え
     */
    viewCharacterMessage()
    {
        const random_msg = Math.floor(Math.random() * window.locale.user_locale.character_message.length);
        document.getElementById('character_msg').textContent = window.locale.user_locale.character_message[random_msg];
    }

    /**
     * スキップ、フィーバーの残回数を計算して表示切り替えをする
     */
    checkFeverSkipFree_todayCount()
    {
        const today = window.common.getDatetimeFormat(new Date(), 'YYYY-MM-DD');
        if (today !== this.today) {
            window.storage.today = today;
            window.storage.today_count = 0;
            window.storage.more_movie_skip = 3;
            window.storage.more_movie_fever = 3;
            window.storage.more_free_skip = 1;
        }
        const current_time = new Date();
        const target_time = new Date(this.free_fever_next_at);
        if (current_time.getTime() > target_time.getTime()) {
            window.storage.more_free_fever = 1;
            window.storage.free_fever_next_at = this.calkFeverNextAt();
        }
        window.storage.setGameStorage();
        document.getElementById('skip').classList.remove('disable');
        document.getElementById('skip_free_btn').classList.add('hidden');
        document.getElementById('skip_movie_btn').classList.add('hidden');
        document.getElementById('fever').classList.remove('disable');
        document.getElementById('fever_free_btn').classList.add('hidden');
        document.getElementById('fever_movie_btn').classList.add('hidden');
        if (window.storage.more_free_skip > 0) {
            document.getElementById('skip_free_btn').classList.remove('hidden');
        } else if (window.storage.more_movie_skip > 0) {
            document.getElementById('skip_movie_btn').classList.remove('hidden');
        } else {
            document.getElementById('skip').classList.add('disable');
            document.getElementById('skip_movie_btn').classList.remove('hidden');
        }
        if (window.storage.more_free_fever > 0) {
            document.getElementById('fever_free_btn').classList.remove('hidden');
        } else if (window.storage.more_movie_fever > 0) {
            document.getElementById('fever_movie_btn').classList.remove('hidden');
        } else {
            document.getElementById('fever').classList.add('disable');
            document.getElementById('fever_movie_btn').classList.remove('hidden');
        }
    }
}
