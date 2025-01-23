import Common from './common.js';
import Api from './api.js';
import Storage from './storage.js';
import Locale from './locale.js';
import Page from './page.js';
import Fever from './fever.js';
import Skip from './skip.js';
import Game from './game.js';
import GameEvent from './game_event.js';
import Unity from './unity.js';

class Main
{
    constructor()
    {
        this.message_interval;
        this.fever_skip_interval;
    }

    init()
    {
        window.storage.storageInit(); // ストレージデータ読み込み＆初期化
        window.locale.localeInit(); // 言語初期化
        window.page.setPageChangeEvent(); // ページイベント設定
    }

    errorHandling(error)
    {
        console.log(error);
        window.location.reload();
    }

    /**
     * 30秒に一度、ランダム表示のキャラクターメッセージ表示を切り替える
     * 60秒に一度、スキップ、フィーバーの残回数を計算して表示切り替え
     */
    gameLoop()
    {
        window.fever.checkFeverSkipFree_todayCount();
        window.game.viewCharacterMessage();
        this.message_interval = setInterval(() => {
            window.game.viewCharacterMessage();
        }, 20000);
        this.fever_skip_interval = setInterval(() => {
            window.fever.checkFeverSkipFree_todayCount();
        }, 60000)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.common = new Common();
    window.api = new Api();
    window.storage = new Storage();
    window.locale = new Locale();
    window.page = new Page();
    window.fever = new Fever();
    window.skip = new Skip();
    window.game = new Game();
    window.game_event = new GameEvent();
    window.unity = new Unity();
    window.main = new Main();
    window.main.init();
});
