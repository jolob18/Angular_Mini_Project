import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/Services/shared.service';



@Component({
  selector: 'app-register',

  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  public form!: FormGroup;
  public formFields: any[] = [];
 
  constructor(private sharedService: SharedService, private fb: FormBuilder) {}
 
  ngOnInit() {
    const savedData = this.sharedService.getFormData();
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
 
      controls[fieldName] = ['', validators];
      return controls;
    }, {} as any);
 
    this.form = this.fb.group(formControls);
  }
 

  submit() {
    if (this.form.valid) {
      console.log("Form Submitted:", this.form.value);
    } else {
      alert("Please fill all required fields.");
    }
  }
 
}