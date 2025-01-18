import Common from './common.js';
import Api from './api.js';
import Storage from './storage.js';
import Locale from './locale.js';
import Game from './game.js';
import GameEvent from './game_event.js';

class Main
{
    constructor()
    {
        window.storage.storageInit();
        this.message_interval;
        this.fever_skip_interval;
    }

    init()
    {
        window.locale.localeInit();
        this.setPageChangeEvent();
        window.game.gameDataInit();
    }

    errorHandling(error)
    {
        console.log(error);
        window.location.reload();
    }

    /**
     * トップ画面とゲーム画面を切り替えるボタンのイベント
     */
    setPageChangeEvent()
    {
        document.addEventListener('postpush', e => {
            const page = e.enterPage.id;
            if (page === 'game_page') {
                // ゲームページに遷移時に発動
                window.locale.changeLocale('game');
                this.setGamePageEvent();
            }
        });
        document.addEventListener('prepop', e => {
            if (this.fever_skip_interval) {
                clearInterval(this.message_interval);
                clearInterval(this.fever_skip_interval);
            }
        });
        window.common.$app_navigator.pushPage('top.html').then(() => {
            this.setTopPageEvent();
        });
    }

    setTopPageEvent()
    {
        window.locale.changeLocale('top');
        document.getElementById('start_btn').addEventListener('click', () => {
            window.common.$app_navigator.pushPage('game.html');
        });
        document.getElementById('language_select').value = window.locale.user_lang;
        document.getElementById('language_select').addEventListener('change', e => {
            window.locale.user_lang = e.target.value;
            window.locale.user_locale = window.locale.locale_list[e.target.value];
            const main_data = window.storage.getStorage('main');
            main_data.lang = e.target.value;
            window.storage.setStorage('main', main_data);
            window.locale.changeLocale('top');
        });
    }

    setGamePageEvent()
    {
        window.game.viewInfo(false);
        window.game.setHimaTapEvent();
        window.game.setHimaSkipEvent();
        window.game.setHimaFeverEvent();
        this.gameLoop();
    }

    /**
     * 30秒に一度、ランダム表示のキャラクターメッセージ表示を切り替える
     * 60秒に一度、スキップ、フィーバーの残回数を計算して表示切り替え
     */
    gameLoop()
    {
        window.game.checkFeverSkipFree_todayCount();
        window.game.viewCharacterMessage();
        this.message_interval = setInterval(() => {
            window.game.viewCharacterMessage();
        }, 20000);
        this.fever_skip_interval = setInterval(() => {
            window.game.checkFeverSkipFree_todayCount();
        }, 60000)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.common = new Common();
    window.api = new Api();
    window.storage = new Storage();
    window.locale = new Locale();
    window.game = new Game();
    window.game_event = new GameEvent();
    window.main = new Main();
    window.main.init();
});
