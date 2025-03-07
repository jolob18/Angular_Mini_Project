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
    return JSON.parse(localStorage.getItem('formData') || '{"fields": []}');
  }
}
