export default class GameEvent
{
    constructor()
    {
        this.fever_interval;
    }

    himaFever()
    {
        window.storage.fever_start_at = window.common.getDatetimeFormat(new Date(), 'YYYY-MM-DD hh:mm:ss');
        this.feverView(true);
        this.fever_interval = setInterval(() => {
            const fever_limit_time = this.checkFeverTime();
        }, 1000);
    }

    checkFeverTime()
    {
        if (!window.storage.fever_start_at) {
            return null;
        }
        const fever_start_at = new Date(window.storage.fever_start_at);
        const current_time = new Date();
        const limit_time = current_time.getTime() - fever_start_at.getTime();
        console.log(limit_time);
    }

    feverView(bool)
    {
        if (bool) {
            window.common.$fever_performance_wrap.classList.add('fever_active');
        } else {
            window.common.$fever_performance_wrap.classList.remove('fever_active');
        }
    }

    himaSkip()
    {
        window.storage.total_count += 500;
        window.storage.today_count += 500;
        window.storage.setGameStorage();
        window.game.viewInfo(true);
        const hima = document.createElement('div');
        hima.textContent = 'ヒマ +500';
        hima.classList.add('hima-count-action', 'bold');
        document.getElementById('hima_btn').appendChild(hima);
        setTimeout(() => {
            hima.remove();
        }, 500);
    }
}
