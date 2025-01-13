import Utility from './utility.js';
// import GameEvent from './game_event.js';

class Main
{
    fever = false; // フィーバー中はtrue
    top_wrap = document.getElementById('top_wrap');
    game_wrap = document.getElementById('game_wrap');
    total_hima = document.getElementsByClassName('js-total-hima');
    today_hima = document.getElementsByClassName('js-today-hima');
    start_btn = document.getElementById('start_btn');
    ranking_btn = document.getElementById('ranking_btn');
    close_btn = document.getElementById('close_btn');
    hima_btn_wrap = document.getElementById('hima_btn_wrap');
    hima_btn = document.getElementById('hima_btn');
    character_msg = document.getElementById('character_msg');
    character_image = document.getElementById('character_image');
    character_name = document.getElementById('character_name');
    character_name_list = [
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
    character_message_list = [
        'ヒマでなにがわるい',
        'ヒマだっていきているんだ',
        'ヒマじんだもの',
        'ヒマこそせいぎ',
        'はたらいたらまけ',
        'ヒマにかてるごらくはない',
        'ヒマ〜〜',
        'タップタップタップ'
    ];

    constructor()
    {
        this.setPageChangeBtnEvent();
        this.viewInfo(false);
        this.setHimaTapEvent();
        this.viewCharacterMessage();
        this.loop();
    }

    /**
     * トップ画面とゲーム画面を切り替えるボタンのイベント
     */
    setPageChangeBtnEvent()
    {
        this.start_btn.addEventListener('click', () => {
            this.top_wrap.classList.add('hidden');
            this.game_wrap.classList.remove('hidden');
        });
        this.close_btn.addEventListener('click', () => {
            this.game_wrap.classList.add('hidden');
            this.top_wrap.classList.remove('hidden');
        });
    }

    /**
     * ヒマ回数、キャラクター、称号、キャラクター画像を切り替える
     * 一定回数だった場合はイベント発動
     * @param {boolean} event_valid 一定回数だった時にイベントを発動するかどうか。初期化時はfalseにして発動させない。
     */
    viewInfo(event_valid)
    {
        const storage = window.utility.getStorage();
        let name = 'ヒマニート';
        let image = 'himaneat.png';
        let character_event;
        for (const character_name_list of this.character_name_list) {
            if (storage.total_count >= character_name_list.count) {
                name = character_name_list.name;
                image = character_name_list.image;
                if (storage.total_count === character_name_list.count) {
                    character_event = character_name_list;
                }
            } else {
                break;
            }
        }
        this.character_image.src = `images/${image}`;
        this.character_name.textContent = name;
        for (const total_hima of this.total_hima) {
            total_hima.textContent = storage.total_count;
        }
        for (const today_hima of this.today_hima) {
            today_hima.textContent = storage.today_count;
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
        this.hima_btn.addEventListener('click', () => {
            const storage = window.utility.getStorage();
            const add_hima_count = this.fever ? 3:1;
            storage.today_count += add_hima_count;
            storage.total_count += add_hima_count;
            window.utility.setStorage(storage);
            this.viewInfo(true);
            const hima = document.createElement('div');
            hima.textContent = `ヒマ +${add_hima_count}`;
            hima.classList.add('hima-count-action');
            this.hima_btn_wrap.appendChild(hima);
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
        this.character_msg.textContent = this.character_message_list[random_msg];
    }

    /**
     * 30秒に一度、ランダム表示のキャラクターメッセージ表示を切り替える
     * 60秒に一度、スキップ、フィーバーの残回数を計算して表示切り替え
     */
    loop()
    {
        this.checkFeverSkipFree_todayCount();
        setTimeout(() => {
            this.viewCharacterMessage();
        }, 30000);
        setTimeout(() => {
            this.loop();
        }, 60000);
    }

    /**
     * スキップ、フィーバーの残回数を計算して表示切り替えをする
     */
    checkFeverSkipFree_todayCount()
    {
        const storage = window.utility.getStorage();
        const today = window.utility.getDatetimeFormat(new Date(), 'YYYY-MM-DD');
        if (storage) {
            if (today !== storage.today) {
                storage.today = today;
                storage.today_count = 0;
                storage.more_movie_skip_today = 3;
                storage.more_movie_fever_today = 3;
                storage.more_free_skip_today = 1;
            }
            const current_time = new Date();
            const target_time = new Date(storage.free_fever_next_at);
            if (current_time.getTime() > target_time.getTime()) {
                storage.more_free_fever_today = 1;
                storage.free_fever_next_at = this.calkFeverNextAt();
            }
            window.utility.setStorage(storage);
            if (storage.more_free_skip_today > 0) {

            } else if (storage.more_movie_skip_today > 0) {

            }
            if (storage.more_free_fever_today > 0) {

            } else if (storage.more_movie_fever_today > 0) {

            }
        }
    }

    calkFeverNextAt()
    {
        const current_time = window.utility.getDatetimeFormat(new Date(), 'YYYY-MM-DD hh:mm:ss');
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
        return window.utility.getDatetimeFormat(datetime, 'YYYY-MM-DD hh:mm:ss');
    }
}

window.utility = new Utility();
window.main = new Main();
// window.game_event = new GameEvent();
