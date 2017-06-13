import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { Http, Response } from "@angular/http";
import { EmptyObservable } from "rxjs/observable/EmptyObservable";
import { environment } from "environments/environment";

@Component({
  selector: 'app-tax-lookup',
  templateUrl: './tax/src/app/tax-lookup/tax-lookup.component.html',
  styleUrls: ['./tax/src/app/tax-lookup/tax-lookup.component.css']
})
export class TaxLookupComponent implements OnInit {
  public asyncSelected: string;
  public taxId: string;
  public typeaheadLoading: boolean;
  public typeaheadNoResults: boolean;
  public dataSource: Observable<any>;

  public constructor(private http: Http) {
    this.dataSource = Observable
      .create((observer: any) => {
        // Runs on every search
        observer.next(this.asyncSelected);
      })
      .mergeMap((token: string) => this.getTaxonsAsObservable(token));
  }

  public getTaxonsAsObservable(token: string): Observable<any> {

    return this.http.get("http://www.ebi.ac.uk/ena/taxonomy/rest/suggest-for-search/" + token)
      .map((res: Response) => res.json())
      .catch(err => {
          // handle errors
          return Observable.of(JSON.parse("[]"));
        });

  }

  public changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
    this.typeaheadNoResults = false;
  }

  public changeTypeaheadNoResults(e: boolean): void {
    this.typeaheadNoResults = e;
  }

  public typeaheadOnSelect(e: TypeaheadMatch): void {
    console.log('Selected value: ', e.value);
    this.asyncSelected = e.value;
    console.log('Selected taxid: ', e.item.taxId);
    this.taxId = e.item.taxId;
  }
  ngOnInit() {
  }

}
