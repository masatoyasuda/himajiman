export default class Bonas
{
    /**
     * スキップ、フィーバーの残回数を計算して表示切り替えをする
     */
    checkFeverSkipFree_todayCount()
    {
        const today = window.common.getDatetimeFormat(new Date(), 'YYYY-MM-DD');
        if (today !== window.storage.today) {
            window.storage.today = today;
            window.storage.today_count = 0;
            window.storage.more_movie_skip = 3;
            window.storage.more_movie_fever = 3;
            window.storage.more_free_skip = 1;
        }
        const current_time = new Date();
        const target_time = new Date(window.storage.free_fever_next_at);
        if (current_time.getTime() > target_time.getTime()) {
            window.storage.more_free_fever = 1;
            window.storage.free_fever_next_at = window.fever.calkFeverNextAt();
        }
        window.storage.setGameStorage();
        document.getElementById('skip').classList.remove('bonas-disable');
        document.getElementById('skip_free_btn').classList.add('hidden');
        document.getElementById('skip_movie_btn').classList.add('hidden');
        document.getElementById('fever').classList.remove('bonas-disable');
        document.getElementById('fever_free_btn').classList.add('hidden');
        document.getElementById('fever_movie_btn').classList.add('hidden');
        if (window.storage.more_free_skip > 0) {
            document.getElementById('skip_free_btn').classList.remove('hidden');
        } else if (window.storage.more_movie_skip > 0) {
            document.getElementById('skip_movie_btn').classList.remove('hidden');
        } else {
            document.getElementById('skip').classList.add('bonas-disable');
            document.getElementById('skip_movie_btn').classList.remove('hidden');
        }
        if (window.storage.more_free_fever > 0) {
            document.getElementById('fever_free_btn').classList.remove('hidden');
        } else if (window.storage.more_movie_fever > 0) {
            document.getElementById('fever_movie_btn').classList.remove('hidden');
        } else {
            document.getElementById('fever').classList.add('bonas-disable');
            document.getElementById('fever_movie_btn').classList.remove('hidden');
        }
    }
}
