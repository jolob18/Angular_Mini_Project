import {  EventEmitter,  Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SharedService } from 'src/app/Services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public form!: FormGroup;
  public formFields: any[] = [];

  public countries: string[] = [];
  public filteredCountries: string[] = [];
  public states: string[] = [];
  public filteredStates: string[] = [];
  private countryStateData: any = [];
  private apiUrl = 'https://countriesnow.space/api/v0.1/countries/states';
  public showToast = false;

  
  selectedFileType: string = 'application/pdf'; 

  fileTypeMap: { [key: string]: string } = {
    'Jpg': 'image/jpeg',
    'Pdf': 'application/pdf',
    'Doc': 'application/msword'
  };

  fileFormatError: boolean = false; 

  @Output() componentChange = new EventEmitter<string>();

  constructor(private sharedService: SharedService, private fb: FormBuilder, private router: Router, private http: HttpClient) {}
 
  ngOnInit() {
    
    const savedData = this.sharedService.getFormData();
    
    this.selectedFileType = this.sharedService.getfiletype();
    this.selectedFileType = this.fileTypeMap[this.selectedFileType] || 'application/pdf';
    console.log(this.selectedFileType);
    this.formFields = savedData?.fields?.filter((field: { firstChecked: any; }) => field.firstChecked) || [];
    this.loadCountryStateData();

    this.initializeForm();
  }
  


  loadCountryStateData() {
    this.http.get<any>(this.apiUrl).subscribe(
      (response) => {
        if (!response.error && response.data) {
          this.countryStateData = response.data;
          this.countries = response.data.map((country: any) => country.name);
          this.filteredCountries = [...this.countries];
        } else {
          console.error("Error fetching countries and states:", response.msg);
        }
      },
      (error) => {
        console.error("Error fetching countries and states:", error);
      }
    );
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
   

    const countryField = this.formFields.find(field => field.name.toLowerCase() === 'country');
    if (countryField?.firstChecked) {
      formControls['country'] = ['', countryField.secondChecked ? Validators.required : []];
    }

    const stateField = this.formFields.find(field => field.name.toLowerCase() === 'state');
    if (stateField?.firstChecked) {
      formControls['state'] = ['', stateField.secondChecked ? Validators.required : []];
    }
    

    this.form = this.fb.group(formControls);


    this.form.get('country')?.valueChanges.subscribe(selectedCountry => {
      this.updateStates(selectedCountry);
    });
  }


  updateStates(selectedCountry: string) {
    const countryData = this.countryStateData.find((country: any) => country.name === selectedCountry);
    this.states = countryData ? countryData.states.map((state: any) => state.name) : [];
    this.filteredStates = [...this.states]; 
    this.form.get('state')?.setValue(''); 
  }

  onCountryFilter(value: string) {
    this.filteredCountries = this.countries.filter(country => 
      country.toLowerCase().includes(value.toLowerCase())
    );
  }


  onStateFilter(value: string) {
    this.filteredStates = this.states.filter(state => 
      state.toLowerCase().includes(value.toLowerCase())
    );
  }

  isRequired(fieldName: string): boolean {
    const control = this.form.get(fieldName.toLowerCase());
    return control?.validator ? control.validator(new FormControl())?.['required'] : false;
  }
   
  onFileSelected(event: any) {
    
    const file = event.target.files[0];

    if (file) {
      const fileType = file.type;
     

      if (fileType !== this.selectedFileType) {
        this.fileFormatError = true;
        this.form.get('file upload')?.setValue(null);
      } else {
        this.fileFormatError = false;
        this.sharedService.saveFile(file);
        this.form.get('file upload')?.setValue(file); 
        this.form.get('file upload')?.markAsTouched(); 
        this.form.get('file upload')?.updateValueAndValidity();
      }

    }
  }
   

  submit() {
    if (this.form.valid) {
      console.log("Form Submitted:", this.form.value);
      localStorage.setItem('userData', JSON.stringify(this.form.value));
    console.log('Form Data Saved:', this.form.value);
      this.componentChange.emit('displayData');
      this.showToast = true; 
      setTimeout(() => {
        this.showToast = false; 
      }, 3000);
    } else {
      alert("Please fill all required fields.");
    }
  }
}
