import Twitter from 'twitter';

var client = new Twitter({
  consumer_key: process.env.CONSUMER_API_KEY!,
  consumer_secret: process.env.CONSUMER_API_SECRET_KEY!,
  access_token_key: '',
  access_token_secret: '',
});

export interface UserData {
    created_at: string,
    statuses_count: number,
    profile_image_url_https: string,
}

export interface TweetData {
    created_at: string,
    id_str: string,
}

export interface HeatmapPixel {
    date: string,
    count: number,
}

export interface HeatmapAndAverage {
    heatmap: HeatmapPixel[],
    average: number,
}

export class User {
    private data: UserData | null = null;
    constructor(public screenName: string) { }
    private getUserData() {
        return new Promise((resolve, reject) => {
            if(this.data !== null) {
                resolve();
                return;
            }
            client.get('users/show', { screen_name: this.screenName }).then((data) => {
                this.data = data as any;
                resolve();
            }, reject);
        });
    }
    private getAverage(count: number, start: Date, end: Date) {
        let days = (end.getTime() - start.getTime()) / 86400000;
        let average = Math.round(count / days * 10) / 10;
        return average;
    }
    getUserIcon() {
        return new Promise<string>((resolve, reject) => {
            this.getUserData().then(() => {
                resolve(this.data!.profile_image_url_https);
            }, reject);
        });
    }
    getWholeAverageNofTweets() {
        return new Promise((resolve, reject) => {
            this.getUserData().then(() => {
                let created_at = new Date(this.data!.created_at);
                let now = new Date();
                let average = this.getAverage(this.data!.statuses_count, created_at, now);
                resolve(average);
            }, reject);
        });
    }
    getTweetHeatmapAndAverage() {
        return new Promise<HeatmapAndAverage>(async (resolve, reject) => {
            let max_id: string | undefined = undefined;
            let heatmap: HeatmapPixel[] = [];
            let count = 0;
            let lastDate = '';
            let res: HeatmapAndAverage = { heatmap, average: 0 };
            let data: TweetData[];
            for(let i = 0;i < 5;i++)  {
                try {
                    data = await client.get('statuses/user_timeline',
                        {
                            screen_name: this.screenName,
                            count: 200,
                            max_id,
                            include_rts: true,
                        },
                    ) as any;
                } catch(e) {
                    reject(e);
                    break;
                }
                if(data.length == 0) break;
                for(let tweet of data) {
                    let date = new Date(new Date(tweet.created_at).getTime() + 9 * 3600000).toJSON().split('T')[0];
                    if(lastDate !== date) heatmap.splice(0, 0, { date, count: 0 });
                    heatmap[0].count++;
                    lastDate = date;
                }
                max_id = data[data.length - 1].id_str;
                count += data.length;
            }
            if(heatmap.length > 0) {
                let start = new Date(heatmap[0].date);
                let end = new Date(heatmap[heatmap.length - 1].date);
                res.average = this.getAverage(count, start, end);
            }
            resolve(res);
        });
    }
}
