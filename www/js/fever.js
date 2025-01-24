import Bonas from './bonas.js';

export default class Fever extends Bonas
{
    constructor()
    {
        super();
        this.fever_interval;
        this.fever_animation_interval;
        this.$fever_flakes = document.getElementById('fever_flakes');
    }

    /**
     * 現在日時を基に次のフィーバー日時を計算して返す
     * @returns datetime
     */
    calkFeverNextAt()
    {
        const datetime = new Date();
        datetime.setMinutes(0);
        datetime.setSeconds(0);
        const hour = Number(datetime.getHours());
        if (hour <= 0 && hour < 8) {
            datetime.setHours(8);
        } else if (hour <= 8 && hour < 12) {
            datetime.setHours(12);
        } else if (hour <= 12 && hour < 18) {
            datetime.setHours(18);
        } else {
            datetime.setHours(24);
        }
        return window.common.getDatetimeFormat(datetime, 'YYYY-MM-DD hh:mm:ss');
    }

    setFeverEvent()
    {
        if (window.storage.fever_end_at) {
            const current_at = new Date();
            const fever_end_at = new Date(window.storage.fever_end_at);
            if (current_at.getTime() > fever_end_at.getTime()) {
                window.storage.fever_end_at = '';
                window.storage.setGameStorage();
            } else {
                this.startFever(false);
            }
        }
        document.getElementById('fever').addEventListener('click', e => {
            if (!e.target.classList.contains('bonas-disable')) {
                if (window.storage.more_free_fever > 0) {
                    window.storage.more_free_fever -= 1;
                    this.startFever(true);
                } else if (window.storage.more_movie_fever > 0) {
                    window.unity.rewardAds(this.rewardComplete());
                } else {
                    this.checkBonasFree_todayCount();
                }
            }
        });
    }

    rewardComplete()
    {
        window.storage.more_movie_fever -= 1;
        this.startFever(true);
    }

    startFever(init)
    {
        if (init) {
            const date = new Date();
            date.setSeconds(date.getSeconds() + 10);
            window.storage.fever_end_at = window.common.getDatetimeFormat(date, 'YYYY-MM-DD hh:mm:ss');
            window.storage.setGameStorage();
        }
        document.getElementById('fever').classList.add('bonas-disable'); // ボーナス無効化
        this.feverAnimation(); // 紙吹雪アニメーション
        const fever_limit_time = this.checkFeverTime();
        document.getElementById('fever_limit').textContent = window.common.timeFormat(fever_limit_time);
        this.loopFever();
    }

    loopFever()
    {
        this.fever_interval = setInterval(() => {
            const fever_limit_time = this.checkFeverTime();
            if (fever_limit_time && fever_limit_time > 0) {
                document.getElementById('fever_limit').textContent = window.common.timeFormat(fever_limit_time);
            } else {
                // フィーバー終了
                document.getElementById('fever_limit').textContent = '';
                clearInterval(this.fever_interval);
                clearInterval(this.fever_animation_interval);
                window.storage.fever_end_at = '';
                window.storage.setGameStorage();
                this.changeViewMovieFree();
            }
        }, 1000);
    }

    checkFeverTime()
    {
        if (!window.storage.fever_end_at) {
            return null;
        }
        const fever_end_at = new Date(window.storage.fever_end_at);
        const current_time = new Date();
        const limit_time = fever_end_at.getTime() - current_time.getTime();
        return limit_time;
    }

    feverAnimation()
    {
        this.fever_animation_interval = setInterval(() => {
            this.createFlake();
        }, 100);
    }

    createFlake()
    {
        const colors = ['#FF6347', '#FFD700', '#32CD32', '#1E90FF', '#FF69B4', '#8A2BE2'];
        const flake = document.createElement('div');
        const size = Math.random() * 10 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        flake.classList.add('fever-flake');
        flake.style.width = `${size}px`;
        flake.style.height = `${size}px`;
        flake.style.backgroundColor = color;
        flake.style.left = `${Math.random() * window.innerWidth}px`;
        const animationDuration = Math.random() * 2 + 2;
        const animationDelay = Math.random() * 2;
        flake.style.animationDuration = `${animationDuration}s`;
        flake.style.animationDelay = `${animationDelay}s`;
        this.$fever_flakes.appendChild(flake);
        setTimeout(() => {
            flake.remove();
        }, (animationDuration + animationDelay) * 1000);
    }

    changeViewMovieFree()
    {
        document.getElementById('fever').classList.remove('bonas-disable');
        document.getElementById('fever_free_btn').classList.add('hidden');
        document.getElementById('fever_movie_btn').classList.add('hidden');
        if (window.storage.fever_end_at) {
            document.getElementById('fever').classList.add('bonas-disable');
            document.getElementById('fever_movie_btn').classList.remove('hidden');
        } else if (window.storage.more_free_fever > 0) {
            document.getElementById('fever_free_btn').classList.remove('hidden');
        } else if (window.storage.more_movie_fever > 0) {
            document.getElementById('fever_movie_btn').classList.remove('hidden');
        } else {
            document.getElementById('fever').classList.add('bonas-disable');
            document.getElementById('fever_movie_btn').classList.remove('hidden');
        }
    }
}
