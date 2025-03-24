import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private file: File | null = null;
  private fileUrl: string | null = null;

  saveFile(file: File) {
    this.file = file;
    this.fileUrl = URL.createObjectURL(file); 
  }

  getFile() {
    return this.file;
  }

  getFileUrl() {
    return this.fileUrl;
  }



  private formDataSubject = new BehaviorSubject<any>(this.getStoredFormData());

  filetype:string ="";

  setfiletype(type: string ){
   this.filetype = type;
  }
  
  getfiletype(){
   return this.filetype;
  }

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
        {name: 'File Upload', firstChecked: true, secondChecked: true }
      ]
    };
  }
}