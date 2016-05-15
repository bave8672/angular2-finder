import {Injectable, Inject} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

import {Faroo} from './faroo.service.ts';

@Injectable()
export class Search implements app.Search {

	constructor(
		private http: Http,
		private faroo: Faroo
	) {
	}

    get(
		source: string,
		query?: string,
		start?: number,
		length?: number
    ): Observable<app.Faroo.Response> {
    	switch (source) {
    		case this.faroo.sources.web:
				return this.web(query, start, length);

			case this.faroo.sources.news:
				return this.news(query, start, length);

			case this.faroo.sources.topics:
				return this.topics(start, length);

    		case this.faroo.sources.trends:
				return this.trends(start, length);

    		default:
				return this.web(query, start, length);
    	}
    }

	web(
		query: string,
		start?: number,
		length?: number
	) {
		return this.jsonRequest(this.faroo.sources.web, query, start, length);
	}

	news(
		query: string,
		start?: number,
		length?: number
	) {
		return this.jsonRequest(this.faroo.sources.news, query, start, length);
	}

	topics(
		start?: number,
		length?: number
	) {
		return this.jsonRequest(this.faroo.sources.topics, null, start, length);
	}

	trends(
		start?: number,
		length?: number
	) {
		return this.jsonRequest(this.faroo.sources.trends, null, start, length);
	}

	private jsonRequest(
		src: string, 
		q: string = '',
		start: number = 1,
		length: number = 10
	): Observable<app.Faroo.Response> {
		return this.http.get(encodeURI(
			`${this.faroo.apiBase}&src=${src}&q=${q}&start=${start}&length=${length}&l=en&f=json`))
			.map(res => res.json().results);
	}
}


// Mock
var json = <app.Faroo.Response><any>{"results":[{"title": "Lasting: iPhones tend to stick around","kwic": "... Roy Orbisonâ€™s Only The Lonely. You know whatâ€™s not?  The headline on this piece by The Guardian â€™s Samuel Gibbs.  â€œApple expects your iPhone ...","content": "","url": "http://www.macworld.com/article/3056801/ios/lasting-iphones-tend-to-stick-around.html","iurl": "http://zapt0.staticworld.net/images/article/2012/09/macalope-feature-11384296-medium.jpg","domain": "www.macworld.com","author": "The Macalope","news": true,"votes": "20","date": 1460804400000,"related":[]},{"title": "Save $7 on this clear thin case for your iPhone 6S today!","kwic": "Once you finally decide on the iPhone color for you, odds are that you will want to show it off while keeping it protected. Amzer's SlimGrip ...","content": "","url": "http://www.imore.com/save-7-clear-thin-case-your-iphone-6s-today","iurl": "http://www.imore.com/sites/imore.com/files/styles/large/public/field/image/2015/08/R19116.jpg?itok=V0nOZBl_","domain": "www.imore.com","author": "iMore.com","news": true,"votes": "20","date": 1460800807000,"related":[]},{"title": "How to manage Apple Pay on your iPhone or iPad","kwic": "... it accurate and up to date. That way, when you buy all the things, they'll know just where to send them.  Launch the Settings app on your iPhone ...","content": "","url": "http://www.imore.com/how-manage-apple-pay-your-iphone-or-ipad","iurl": "http://www.imore.com/sites/imore.com/files/styles/large_wm_blw/public/field/image/2016/03/apple-pay-iphone-6-hero.jpg?itok=LAVfWHNM","domain": "www.imore.com","author": "Luke Filipowicz","news": true,"votes": "20","date": 1460800807000,"related":[]},{"title": "The week in Apple news: MacOS rebrand rumor, iPhone 7 rumors, Apple's new VP of public policy, and more ...","kwic": "Apple headlines for the week ending Apr. 15, 2016  The buzz this week didnâ€™t come from Apple, and it certainly wasnâ€™t news. It came from Motor ...","content": "","url": "http://www.macworld.com/article/3056911/tech-events-dupe/the-week-in-apple-news-macos-rebrand-rumor-iphone-7-rumors-apples-new-vp-of-public-policy-and-more.html","iurl": "https://cms-images.idgesg.net/images/article/2015/09/apple-logo-news-slide-background-100612702-gallery.png","domain": "www.macworld.com","author": "Macworld Staff","news": true,"votes": "20","date": 1460800800000,"related":[]},{"title": "Japan quakes disrupt Sony image sensor production used in Apple iPhones","kwic": "Electronics giant Sony Corp said a factory producing image sensors for Apple Inc and other smartphone makers will remain closed while it assesses ...","content": "","url": "http://news.yahoo.com/second-deadly-quake-prolongs-production-halts-japans-southern-051619563--finance.html","iurl": "http://media.zenfs.com/en_us/News/Reuters/2016-04-16T063445Z_1_LYNXNPEC3F05A_RTROPTP_2_SONY-RESULTS.JPG","domain": "news.yahoo.com","author": "","news": true,"votes": "20","date": 1460790713000,"related":[]},{"title": "How to extend your iPhone's battery life as long as possible","kwic": "How to extend your iPhone's battery life as long as possible","content": "","url": "http://www.telegraph.co.uk/technology/2016/04/16/how-to-extend-your-iphones-battery-life-as-long-as-possible/","iurl": "http://www.telegraph.co.uk/content/dam/technology/2016/04/14/batteru_3033124b.jpg","domain": "www.telegraph.co.uk","author": "syndication","news": true,"votes": "20","date": 1460790000000,"related":[]},{"title": "In New Filing, Apple Resists F.B.I.â€™s Call to Open iPhone in Drug Case","kwic": "The dispute began two months ago when the federal agency sought Appleâ€™s help to gain access to a phone used by an attacker in a mass shooting. ...","content": "","url": "http://www.nytimes.com/2016/04/16/business/in-new-filing-apple-resists-fbis-call-to-open-iphone-in-drug-case.html","iurl": "","domain": "www.nytimes.com","author": "ERIC LICHTBLAU","news": true,"votes": "10","date": 1460770821000,"related":[]},{"title": "Apple continues feud with government in N.Y. iPhone case","kwic": "Apple continues feud with government in N.Y. iPhone case","content": "","url": "http://www.cbsnews.com/news/apple-continues-feud-with-government-in-new-york-iphone-case/","iurl": "","domain": "www.cbsnews.com","author": "","news": true,"votes": "10","date": 1460770785369,"related":[]},{"title": "Hilary Duff Tells Her iPhone to 'Go to Hell'","kwic": "... storage to take a photo. You can manage your storage in Settings,â€ the notification said. She captured the screencap, â€œGo to hell iPhone.","content": "","url": "http://www.justjared.com/2016/04/15/hilary-duff-tells-her-iphone-to-go-to-hell/","iurl": "http://cdn03.cdn.justjared.com/wp-content/uploads/headlines/2016/04/hilary-duff-tells-her-iphone-to-go-to-hell.jpg","domain": "www.justjared.com","author": "Just Jared","news": true,"votes": "20","date": 1460769338000,"related":[]},{"title": "Can a millennial survive a week without his iPhone?","kwic": "You might think that millennials couldn't possibly survive a full week with their precious smartphones and you might be right. But it turns out ...","content": "","url": "http://bgr.com/2016/04/15/no-smartphone-for-a-week/","iurl": "https://boygeniusreport.files.wordpress.com/2016/02/netflix-iphone-6.jpg?w=610","domain": "bgr.com","author": "Chris Smith","news": true,"votes": "20","date": 1460767518000,"related":[]}],"query": "iphone","suggestions":[],"count":100,"start":1,"length":10,"time": "28"};
