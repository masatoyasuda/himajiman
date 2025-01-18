export default class Locale
{
    constructor()
    {
        this.locale_list = {};
        this.user_lang = '';
        this.user_locale = {};
    }

    localeInit()
    {
        this.user_lang = this.getLocaleSetting();
        (async () => {
            const locale_datas = await window.api.getAllApi([
                'locale_ja',
                'locale_en'
            ]);
            for (const locale_data of locale_datas) {
                if (locale_data.error) {
                    this.errorHandling();
                } else {
                    this.locale_list[locale_data.locale_name] = locale_data;
                }
            }
            this.user_locale = this.locale_list[this.user_lang];
        })();
    }

    /**
     * 言語設定を返す
     * @returns string
     */
    getLocaleSetting()
    {
        const main_data = window.storage.getStorage('main');
        if (main_data.lang) {
            return main_data.lang;
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

    changeLocale(page)
    {
        for (const locale in this.user_locale[page]) {
            for (const dom of document.getElementsByClassName(`locale-${page}-${locale}`)) {
                if (dom.id === 'back_btn') {
                    dom.children[1].textContent = this.user_locale[page][locale];
                } else {
                    dom.textContent = this.user_locale[page][locale];
                }
            }
        }
    }
}
