import {Component, ViewEncapsulation} from 'angular2/core';

import {throttle} from 'lodash';

import {Faroo, Search} from './search';
import {Results} from './results';
import {SearchForm} from './SearchForm';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  pipes: [ ],
  providers: [ Faroo, Search ],
  directives: [ Results, SearchForm ],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./app.scss')],
  template: require('./app.html')
})
export class App {

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
  private onScroll = throttle(() => {
    if (!this.isRequesting && (window.innerHeight + window.scrollY + 150) >= document.body.offsetHeight) {
      this.isRequesting = true;
      this.getResults(this.results.length + 1, 10)
        .subscribe((results => {
          this.isRequesting = false;
          this.results = this.results.concat(results);
      }).bind(this));
    }
  }, 200);
}