import {Component, Input} from 'angular2/core';

@Component({
	selector: 'result',
	styles: [require('./result.scss')],
	template: require('./result.html')
})
export class Result {
	@Input() result: app.Faroo.Result;
}