import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/Services/shared.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',

  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  public form!: FormGroup;
  public formFields: any[] = [];
  
  selectedFileType: string = 'application/pdf'; 

  fileTypeMap: { [key: string]: string } = {
    'Jpg': 'image/jpeg',
    'Pdf': 'application/pdf',
    'Doc': 'application/msword'
  };

  fileFormatError: boolean = false; 

  @Output() componentChange = new EventEmitter<string>();

  constructor(private sharedService: SharedService, private fb: FormBuilder, private router: Router) {}
 
  ngOnInit() {
    
    const savedData = this.sharedService.getFormData();
    
    this.selectedFileType = this.sharedService.getfiletype();
    this.selectedFileType = this.fileTypeMap[this.selectedFileType] || 'application/pdf';
    console.log(this.selectedFileType);
    this.formFields = savedData?.fields?.filter((field: { firstChecked: any; }) => field.firstChecked) || [];
    this.initializeForm();
  }
  
  
  
  initializeForm() {
    const formControls = this.formFields.reduce((controls, field) => {
      const fieldName = field.name.toLowerCase();
      let validators = [];
 
      if (field.secondChecked) {
        validators.push(Validators.required);
      }
 
      if (fieldName === 'mobile') {
        validators.push(Validators.pattern(/^\d{10}$/));
      } else if (fieldName === 'name') {
        validators.push(Validators.maxLength(20));
      } else if (fieldName === 'address') {
        validators.push(Validators.maxLength(50));
      } else if (fieldName === 'email') {
        validators.push(Validators.email);
      }
      controls['file upload'] = [null, Validators.required]; 
      
      controls[fieldName] = ['', validators];
      return controls;
    }, {} as any);

    
 
    this.form = this.fb.group(formControls);
  }
   
  onFileSelected(event: any) {
    console.log(this.selectedFileType);
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      

      if (fileType !== this.selectedFileType) {
        this.fileFormatError = true;
      } else {
        this.fileFormatError = false;
        this.sharedService.saveFile(file);
      }
    }
  }
   

  submit() {
    if (this.form.valid) {
      console.log("Form Submitted:", this.form.value);
      localStorage.setItem('userData', JSON.stringify(this.form.value));
    console.log('Form Data Saved:', this.form.value);
      this.componentChange.emit('displayData');
    } else {
      alert("Please fill all required fields.");
    }
  }
 
}