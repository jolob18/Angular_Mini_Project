import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { reorderIcon } from '@progress/kendo-svg-icons';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryStateService {

  private apiUrl = 'https://countriesnow.space/api/v0.1/countries/states';

  constructor(private http : HttpClient){}

  loadCountryStateData(): Observable<any>{
    return this.http.get<any>(this.apiUrl);
  }
  
}
