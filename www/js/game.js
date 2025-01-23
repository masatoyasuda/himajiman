export default class Game
{
    constructor()
    {
        this.character = 'neat';
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
     * ヒマ回数、キャラクター、称号、キャラクター画像を切り替える
     * 一定回数だった場合はイベント発動
     * @param {boolean} event_valid 一定回数だった時にイベントを発動するかどうか。初期化時はfalseにして発動させない。
     */
    viewInfo(event_valid)
    {
        let name = window.locale.user_locale.character_name.neat;
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
        document.getElementById('total_hima').textContent = window.storage.total_count.toLocaleString('ja-JP');
        document.getElementById('today_hima').textContent = window.storage.today_count.toLocaleString('ja-JP');
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

    /**
     * ランダム表示のキャラクターメッセージ表示切り替え
     */
    viewCharacterMessage()
    {
        const random_msg = Math.floor(Math.random() * window.locale.user_locale.character_message.length);
        document.getElementById('character_msg').innerHTML = `<span>
            ${window.locale.user_locale.character_name[this.character]}
        </span><br>
        ${window.locale.user_locale.character_message[random_msg]}`;
    }
}
