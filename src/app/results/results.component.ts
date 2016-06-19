import {Control} from 'angular2/common';
import {Component, Input} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import {throttle} from 'lodash';

import {Result} from './';

@Component({
	selector: 'Results', 
	directives: [Result],
	styles: [require('./results.scss')],
	template: require('./results.html')
})
export class Results {
	@Input() results: Array<app.Faroo.Result>;
}