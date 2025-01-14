export default class Api
{
    constructor()
    {
        this.url_list = {
            locale_ja: 'locale/ja.json',
            locale_en: 'locale/en.json'
        };
    }

    /**
     * 複数のgetApiを実行
     * @param {string} api_names this.url_listのキー名の配列
     * @returns 
     */
    async getAllApi(api_names)
    {
        const api_arr = [];
        for (const api_name of api_names) {
            api_arr.push(this.getApi(api_name));
        }
        return Promise.all(api_arr);
    }

    /**
     * getApiを実行
     * エラー発生時はエラーオブジェクトを返す
     * @param {string} api_name this.url_listのキー名
     * @returns 
     */
    async getApi(api_name)
    {
        try {
            const res = await fetch(this.url_list[api_name]);
            if (!res.ok) {
                throw new Error(res.status);
            }
            return res.json();
        } catch(error) {
            return {error: error};
        }
    }
}
