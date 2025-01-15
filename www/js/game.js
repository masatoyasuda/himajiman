export default class Game
{
    constructor()
    {
        this.total_count = 0;
        this.today_count = 0;
        this.today = ''
        this.more_free_skip_today = 1,
        this.more_movie_skip_today = 3;
        this.more_free_fever_today = 1;
        this.more_movie_fever_today = 3;
        this.free_fever_next_at = '';
        this.character_name_list = [
            {count: 10000, image: 'himagakusei.png', name: 'ヒマ学生', event: ''},
            {count: 50000, image: 'himabaito.png', name: 'ヒマバイト', event: ''},
            {count: 100000, image: 'himakaisyain.png', name: 'ヒマ会社員', event: ''},
            {count: 300000, image: 'himasyatyou.png', name: 'ヒマ社長', event: ''},
            {count: 500000, image: 'himasensei.png', name: 'ヒマ先生', event: ''},
            {count: 800000, image: 'himahakase.png', name: 'ヒマ博士', event: ''},
            {count: 1000000, image: 'himadaitouryou.png', name: 'ヒマ大統領', event: ''},
            {count: 1300000, image: 'himatennou.png', name: 'ヒマ天皇', event: ''},
            {count: 1500000, image: 'himabouzu.png', name: 'ヒマ坊主', event: ''},
            {count: 1800000, image: 'himasennin.png', name: 'ヒマ仙人', event: ''},
            {count: 2000000, image: 'himaryuujin.png', name: 'ヒマ竜人', event: ''},
            {count: 2300000, image: 'himahotoke.png', name: 'ヒマほとけ', event: ''},
            {count: 2500000, image: 'himakami.png', name: 'ヒマ神', event: ''}
        ];
        this.character_message_list = [
            'ヒマでなにがわるい',
            'ヒマだっていきているんだ',
            'ヒマじんだもの',
            'ヒマこそせいぎ',
            'はたらいたらまけ',
            'ヒマにかてるごらくはない',
            'ヒマ〜〜',
            'タップタップタップ'
        ];
    }

    /**
     * 初期にストレージにデータがある場合、インスタンスプロパティを更新
     * ストレージデータがない場合はストレージデータを作成
     * @param {object} storage 
     */
    gameDataInit(storage)
    {
        if (storage) {
            this.total_count = storage.total_count;
            this.today_count = storage.today_count;
            this.today = storage.today;
            this.more_free_skip_today = storage.more_free_skip_today;
            this.more_movie_skip_today = storage.more_movie_skip_today;
            this.more_free_fever_today = storage.more_free_fever_today;
            this.more_movie_fever_today = storage.more_movie_fever_today;
            this.free_fever_next_at = storage.free_fever_next_at;
        } else {
            this.today = window.common.getDatetimeFormat(new Date(), 'YYYY-MM-DD');
            this.free_fever_next_at = this.calkFeverNextAt();
            window.common.setStorage('game', {
                total_count: this.total_count,
                today_count: this.today_count,
                today: this.today,
                more_free_skip_today: this.more_free_skip_today,
                more_movie_skip_today: this.more_movie_skip_today,
                more_free_fever_today: this.more_free_fever_today,
                more_movie_fever_today: this.more_movie_fever_today,
                free_fever_next_at: this.free_fever_next_at
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
        let name = 'ヒマニート';
        let image = 'himaneat.png';
        let character_event;
        for (const character_name_list of this.character_name_list) {
            if (this.total_count >= character_name_list.count) {
                name = character_name_list.name;
                image = character_name_list.image;
                if (this.total_count === character_name_list.count) {
                    character_event = character_name_list;
                }
            } else {
                break;
            }
        }
        window.common.$character_image.src = `images/${image}`;
        window.common.$character_name.textContent = name;
        for (const total_hima of window.common.$total_himas) {
            total_hima.textContent = this.total_count;
        }
        for (const today_hima of window.common.$today_himas) {
            today_hima.textContent = this.today_count;
        }
        if (event_valid && character_event) {
            console.log(111, character_event);
        }
    }

    /**
     * ヒマボタンタップ時のイベント
     */
    setHimaTapEvent()
    {
        window.common.$hima_btn.addEventListener('click', () => {
            const add_hima_count = this.fever ? 3:1;
            this.today_count += add_hima_count;
            this.total_count += add_hima_count;
            window.common.setGameStorage();
            this.viewInfo(true);
            const hima = document.createElement('div');
            hima.textContent = `ヒマ +${add_hima_count}`;
            hima.classList.add('hima-count-action');
            window.common.$hima_btn_wrap.appendChild(hima);
            setTimeout(() => {
                hima.remove();
            }, 500);
        });
    }

    /**
     * ランダム表示のキャラクターメッセージ表示切り替え
     */
    viewCharacterMessage()
    {
        const random_msg = Math.floor(Math.random() * this.character_message_list.length);
        window.common.$character_msg.textContent = this.character_message_list[random_msg];
    }

    /**
     * スキップ、フィーバーの残回数を計算して表示切り替えをする
     */
    checkFeverSkipFree_todayCount()
    {
        const today = window.common.getDatetimeFormat(new Date(), 'YYYY-MM-DD');
        if (today !== this.today) {
            this.today = today;
            this.today_count = 0;
            this.more_movie_skip_today = 3;
            this.more_movie_fever_today = 3;
            this.more_free_skip_today = 1;
        }
        const current_time = new Date();
        const target_time = new Date(this.free_fever_next_at);
        if (current_time.getTime() > target_time.getTime()) {
            this.more_free_fever_today = 1;
            this.free_fever_next_at = this.calkFeverNextAt();
        }
        window.common.setGameStorage();
        if (this.more_free_skip_today > 0) {

        } else if (this.more_movie_skip_today > 0) {

        }
        if (this.more_free_fever_today > 0) {

        } else if (this.more_movie_fever_today > 0) {

        }
    }
}
