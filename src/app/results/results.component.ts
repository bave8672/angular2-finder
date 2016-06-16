import {Control} from 'angular2/common';
import {Component} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
// import {DOM} from 'rx-dom/';
import * as _ from 'lodash';

import {Faroo, Search} from '../search';
import {SearchForm} from '../common';
import {Result} from './';

@Component({
	selector: 'results', 
	providers: [Faroo, Search],
	directives: [SearchForm, Result],
	styles: [require('./results.scss')],
	template: require('./results.html')
})
export class Results {

	searchQuery: string;
	searchType: string;
	results: Array<app.Faroo.Result>;
	isRequesting: boolean = false;

	constructor(
		private search: Search
	) {
		document.addEventListener('scroll', () => this.onScroll());
	}

	onSearchArgsChanged(args: { query: string; searchType: string; }) {
		this.searchQuery = args.query;
		this.searchType = args.searchType;
		this.getResults(1, 10)
			.subscribe(results => this.results = results);
	}

	private getResults(start, amount) {
		return this.search.get(this.searchType, this.searchQuery, start, amount);
	}

	private lastScrollY: number;
	private onScroll = _.throttle(() => {
		if (!this.isRequesting && (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
			this.isRequesting = true;
			this.getResults(this.results.length + 1, 10)
				.subscribe((results => {
					this.isRequesting = false;
					this.results = this.results.concat(results);
			}).bind(this));
		}
	}, 200);
}