import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TypeaheadModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component.ts';
import { TaxLookupComponent } from './tax-lookup/tax-lookup.component.ts';

@NgModule({
  declarations: [
    AppComponent,
    TaxLookupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TypeaheadModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
