import {Control} from 'angular2/common';
import {BrowserDomAdapter} from 'angular2/platform/browser';
import {Component, EventEmitter, Output} from 'angular2/core';
import {Observable} from 'rxjs/Rx';

import {forIn, throttle} from 'lodash';

import {Faroo} from '../search';

@Component({
	selector: 'SearchForm',
	providers: [BrowserDomAdapter, Faroo],
	styles: [require('./SearchForm.scss')],
	template: require('./SearchForm.html')
})
export class SearchForm {

	searchTypes: Array<string> = ['web', 'news'];
	searchType: string;
	queryControl: Control = new Control('');
	formElement: Element & { style: any; };

	@Output() searchArgs = new EventEmitter<{ query: string; searchType: string; }>();

	constructor(
		private dom: BrowserDomAdapter,
		private faroo: Faroo
	) {
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

	scrollHandler = throttle(() => {
		let scrollY = window.scrollY;
		this.formElement = this.formElement ? this.formElement : this.dom.query('.SearchForm');

		if (this.formElement) {
			if (scrollY > this.formElement.clientHeight && scrollY > this.lastScrollY) {
				this.formElement.style['top'] = -this.formElement.clientHeight - 5 + 'px';
			} else if (scrollY < this.lastScrollY) {
				this.formElement.style['top'] = '0';
			}
		}

		this.lastScrollY = window.scrollY;
	}, 200);

	private lastScrollY: number;
}