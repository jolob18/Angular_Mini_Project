import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private formDataSubject = new BehaviorSubject<any>(this.getStoredFormData());

  get formData$() {
    return this.formDataSubject.asObservable();
  }

  setFormData(data: any) {
    this.formDataSubject.next(data);
    this.saveFormData();
  }

  getFormData() {
    return this.formDataSubject.getValue();
  }

  public saveFormData() {
    localStorage.setItem('formData', JSON.stringify(this.formDataSubject.getValue()));
  }

  private getStoredFormData() {
    //return JSON.parse(localStorage.getItem('formData') || '{"fields": []}');
    const storedData = localStorage.getItem('formData');

    if (storedData) {
      return JSON.parse(storedData);
    }
    
    return {
      fields: [
        { name: 'Name', firstChecked: true, secondChecked: true },
        { name: 'Email', firstChecked: true, secondChecked: true },
        { name: 'Mobile', firstChecked: true, secondChecked: true },
        { name: 'Address', firstChecked: true, secondChecked: true },
        { name: 'Country', firstChecked: true, secondChecked: true },
        { name: 'State', firstChecked: true, secondChecked: true },
      ]
    };
  }
}