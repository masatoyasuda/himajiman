import Bonas from './bonas.js';

export default class Skip extends Bonas
{
    setSkipEvent()
    {
        document.getElementById('skip').addEventListener('click', e => {
            if (!e.target.classList.contains('bonas-disable')) {
                if (window.storage.more_free_skip > 0) {
                    this.himaSkip();
                    window.storage.more_free_skip -= 1;
                } else if (window.storage.more_movie_skip > 0) {
                    this.himaSkip();
                    window.storage.more_movie_skip -= 1;
                }
                this.checkBonasFree_todayCount();
            }
        });
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

    changeViewMovieFree()
    {
        document.getElementById('skip').classList.remove('bonas-disable');
        document.getElementById('skip_free_btn').classList.add('hidden');
        document.getElementById('skip_movie_btn').classList.add('hidden');
        if (window.storage.more_free_skip > 0) {
            document.getElementById('skip_free_btn').classList.remove('hidden');
        } else if (window.storage.more_movie_skip > 0) {
            document.getElementById('skip_movie_btn').classList.remove('hidden');
        } else {
            document.getElementById('skip').classList.add('bonas-disable');
            document.getElementById('skip_movie_btn').classList.remove('hidden');
        }
    }
}
