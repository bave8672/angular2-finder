import {Control} from 'angular2/common';
import {BrowserDomAdapter} from 'angular2/platform/browser';
import {Component, EventEmitter, Output} from 'angular2/core';
import {Observable} from 'rxjs/Rx';

import * as _ from 'lodash';

import {Faroo} from '../search';

@Component({
	selector: 'SearchForm',
	providers: [BrowserDomAdapter, Faroo],
	styles: [require('./SearchForm.scss')],
	template: require('./SearchForm.html')
})
export class SearchForm {

	searchTypes: Array<string> = [];
	searchType: string;
	queryControl: Control = new Control('Kanye West');
	formElement: Element;

	@Output() searchArgs = new EventEmitter<{ query: string; searchType: string; }>();

	constructor(
		private dom: BrowserDomAdapter,
		private faroo: Faroo
	) {
		_.forIn(this.faroo.sources, source => this.searchTypes.push(source));

		this.searchType = this.faroo.sources.news;

		this.queryControl.valueChanges
			.startWith(this.queryControl.value)
			.debounceTime(400)
			.distinctUntilChanged()
			.subscribe(() => this.emitArgs());

		document.addEventListener('scroll', () => this.scrollHandler());
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

	scrollHandler = _.throttle(() => {
		let scrollY = window.scrollY;
		this.formElement = this.formElement ? this.formElement : this.dom.query('.SearchForm');

		if (this.formElement) {
			if (scrollY > this.formElement.clientHeight && scrollY > this.lastScrollY) {
				this.formElement.classList.add('SearchForm-hidden');
			} else if (scrollY < this.lastScrollY) {
				this.formElement.classList.remove('SearchForm-hidden');
			}
		}

		this.lastScrollY = window.scrollY;
	}, 200);

	private lastScrollY: number;
}