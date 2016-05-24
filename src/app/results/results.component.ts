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
	styles: [require('./results.css')],
	template: require('./results.html')
})
export class Results {

	searchQuery: string;
	searchType: string;
	results: app.Faroo.Response;

	constructor(
		private search: Search
	) {
	}

	onSearchArgsChanged(args: { query: string; searchType: string; }) {
		console.log(args);
		this.search.get(args.searchType, args.query, 1, 10)
			.subscribe(results => this.results = results);
	}
}