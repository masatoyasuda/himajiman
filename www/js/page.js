export default class Page
{
    constructor()
    {
        this.$app_navigator = document.getElementById('app_navigator');
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
            const page = e.enterPage.id;
            if (page === 'top_page') {
                // トップページに戻る時に発動
                if (window.main.message_interval) {
                    clearInterval(window.main.message_interval);
                }
                if (window.main.fever_skip_interval) {
                    clearInterval(window.main.fever_skip_interval);
                }
                if (window.fever.fever_interval) {
                    clearInterval(window.fever.fever_interval);
                }
                if (window.fever.fever_animation_interval) {
                    clearInterval(window.fever.fever_animation_interval);
                }
            }
        });
    }

    pageInit()
    {
        this.$app_navigator.pushPage('top.html').then(() => {
            this.setTopPageEvent();
        });
    }

    // トップページ初期化
    setTopPageEvent()
    {
        window.locale.changeLocale('top');
        document.getElementById('start_btn').addEventListener('click', () => {
            this.$app_navigator.pushPage('game.html');
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

    // ゲームページイベント設定
    setGamePageEvent()
    {
        window.game.viewInfo(false);
        window.game.setHimaTapEvent();
        window.skip.setSkipEvent();
        window.fever.setFeverEvent();
        window.main.gameLoop();
    }
}
