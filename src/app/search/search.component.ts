import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css'],
	providers: [ SearchService ]
})

export class SearchComponent implements OnInit {
	searchTermStream = new Subject<string>();
	items: Observable<string[]>;

	constructor(private searchService: SearchService) { }

	search(term: string) {
		this.searchTermStream.next(term);
	}

	ngOnInit() {
		this.items = this.searchTermStream
						.debounceTime(300)
						.distinctUntilChanged()
						.switchMap((term: string) => this.searchService.search(term));
		}

}
