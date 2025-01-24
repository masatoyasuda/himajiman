export default class Bonas
{
    /**
     * スキップ、フィーバーの残回数を計算して表示切り替えをする
     */
    checkBonasFree_todayCount()
    {
        // 今日のタップ回数初期化
        const today = window.common.getDatetimeFormat(new Date(), 'YYYY-MM-DD');
        if (today !== window.storage.today) {
            window.storage.today = today;
            window.storage.today_count = 0;
            window.storage.more_movie_skip = 3;
            window.storage.more_movie_fever = 3;
            window.storage.more_free_skip = 1;
        }

        // フリーフィーバー付与
        const current_time = new Date();
        const target_time = new Date(window.storage.free_fever_next_at);
        if (current_time.getTime() > target_time.getTime()) {
            window.storage.more_free_fever = 1;
            window.storage.free_fever_next_at = window.fever.calkFeverNextAt();
        }
        window.storage.setGameStorage();

        // フリー、動画、不可表示切り替え
        window.fever.changeViewMovieFree();
        window.skip.changeViewMovieFree();
    }
}
