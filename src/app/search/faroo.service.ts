import {Injectable} from 'angular2/core';

@Injectable()
export class Faroo implements app.Faroo.Constants {

	apiBase = 'http://www.faroo.com/api?key=TNGxHOF3ztMgyEgShLLSudOqytQ_';

	sources = {
		web: 'web',
		news: 'news',
		topics: 'topics',
		trends: 'trends'
	}
}