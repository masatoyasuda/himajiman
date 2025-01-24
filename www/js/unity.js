export default class Unity
{
    constructor()
    {
        this.game_ids = {
            appstore: '5781202',
            android: '5781203'
        };
        console.log('unity初期化');
        this.adsInit();
    }

    adsInit()
    {
        document.addEventListener('deviceready', () => {
            var gameId = this.game_ids.appstore;
            var testMode = true;
            console.log('unityAdsセット');
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
                        console.log('広告閲覧完了');
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
