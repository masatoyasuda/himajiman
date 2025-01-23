export default class Unity
{
    constructor()
    {
        this.game_ids = {
            appstore: '5781202',
            android: '5781203'
        };
        this.adsInit();
    }

    adsInit()
    {
        document.addEventListener('deviceready', () => {
            var gameId = this.game_ids.appstore;
            var testMode = true;
            unityAds.initialize(gameId, testMode, () => {
                console.log("Unity Ads Initialized");
            });
        }, false);
    }

    rewardAds(callback)
    {
        if (UnityAds.isReady('rewardedVideo')) {
            UnityAds.show('rewardedVideo', {
                didFinish: (result) => {
                    if (result === UnityAds.FINISH_STATE.COMPLETED) {
                        console.log('完了');
                        callback();
                    } else {
                        console.log('広告がスキップされました');
                    }
                }
            });
        } else {
            console.log("報酬型広告が準備できていません");
        }
    }
}
