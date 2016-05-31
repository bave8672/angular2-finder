import {Control} from 'angular2/common';
import {Component, EventEmitter, Output} from 'angular2/core';
import {Observable} from 'rxjs/Rx';

import * as _ from 'lodash';

import {Faroo} from '../search';

@Component({
	selector: 'SearchForm',
	providers: [Faroo],
	styles: [require('./SearchForm.scss')],
	template: require('./SearchForm.html')
})
export class SearchForm {

	searchTypes: Array<string> = [];
	searchType: string;
	queryControl: Control = new Control('Kanye West');

	@Output() searchArgs = new EventEmitter<{ query: string; searchType: string; }>();

	constructor(
		private faroo: Faroo
	) {
		_.forIn(this.faroo.sources, source => this.searchTypes.push(source));

		this.searchType = this.faroo.sources.news;

		document.querySelector(`.SearchForm-type[value=${this.faroo.sources.news}]`)['checked'] = true;

		this.queryControl.valueChanges
			.startWith(this.queryControl.value)
			.debounceTime(400)
			.distinctUntilChanged()
			.subscribe(() => this.emitArgs());
	}

	capitalise(word: string) {
		return word.charAt(0).toUpperCase() + word.slice(1);
	}

	onTypeChanged(type: string) {
		this.searchType = type;
		this.emitArgs();
	}

	emitArgs() {
		this.searchArgs.emit({
			query: this.queryControl.value,
			searchType: this.searchType
		});
	}
}