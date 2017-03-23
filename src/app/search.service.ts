import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {

  constructor(private jsonp: Jsonp) { }

  search(term: string) {
  	let apiUrl: string = 'http://en.wikipedia.com/w/api.php';

  	let params = new URLSearchParams();

  	params.set('search', term);
  	params.set('action', 'opensearch');
  	params.set('format', 'json');
  	params.set('callback', 'JSONP_CALLBACK');

  	return this.jsonp.get(apiUrl, { search : params })
  		.map(response => <string[]>response.json()[1]);
  }

}
