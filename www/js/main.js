import Common from './common.js';
import Api from './api.js';
import Game from './game.js';

class Main
{
    constructor()
    {
        this.locale_list = {};
        this.user_lang = this.localeInit();
        this.user_locale = {};
    }

    init()
    {
        (async () => {
            const locales = await window.api.getAllApi([
                'locale_ja',
                'locale_en'
            ]);
            for (const locale of locales) {
                if (locale.error) {
                    this.errorHandling();
                } else {
                    this.locale_list[locale.locale_name] = locale;
                }
            }
            this.user_locale = this.locale_list[this.user_lang];
            this.setPageChangeBtnEvent();
            const game_storage = window.common.getStorage('game');
            window.game.gameDataInit(game_storage);
            window.game.viewInfo(false);
            window.game.setHimaTapEvent();
            window.game.viewCharacterMessage();
            this.loop();
        })();
    }

    /**
     * 言語設定を返す
     * @returns string
     */
    localeInit()
    {
        const storage_main = window.common.getStorage('main');
        if (storage_main) {
            return storage_main.lang;
        }
        const user_lang = navigator.language || navigator.userLanguage;
        if (/$ja/.test(user_lang)) {
            return 'ja';
        }
        if (/$en/.test(user_lang)) {
            return 'en';
        }
        return 'ja';
    }

    errorHandling(error)
    {
        console.log(error);
        console.log('エラーが発生しました。再読み込みします。');
    }

    /**
     * トップ画面とゲーム画面を切り替えるボタンのイベント
     */
    setPageChangeBtnEvent()
    {
        window.common.$start_btn.addEventListener('click', () => {
            window.common.$top_wrap.classList.add('hidden');
            window.common.$game_wrap.classList.remove('hidden');
        });
        window.common.$close_btn.addEventListener('click', () => {
            window.common.$game_wrap.classList.add('hidden');
            window.common.$top_wrap.classList.remove('hidden');
        });
    }

    /**
     * 30秒に一度、ランダム表示のキャラクターメッセージ表示を切り替える
     * 60秒に一度、スキップ、フィーバーの残回数を計算して表示切り替え
     */
    loop()
    {
        window.game.checkFeverSkipFree_todayCount();
        setTimeout(() => {
            window.game.viewCharacterMessage();
        }, 30000);
        setTimeout(() => {
            this.loop();
        }, 60000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.common = new Common();
    window.api = new Api();
    window.game = new Game();
    window.main = new Main();
    window.main.init();
});
