import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DropTargetEvent } from '@progress/kendo-angular-utils';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-config',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.css']
})
export class ConfigureComponent implements OnInit {
  public tempGridData: any[] = [];
  public form!: FormGroup;
  public gridData: any[] = [];
  
  selectedValue: string = "Pdf";
  options: string[] = ['Jpg', 'Pdf', 'Doc'];
  public showSuccessMessage = false;
  public stateError: boolean = false;
  public selectionError: string = '';
  public requiredError: string = '';

  isFileUploadSelected = true;
  showError = false;
  message: string = "";

  constructor(private sharedService: SharedService, private fb: FormBuilder) {}

  ngOnInit(): void {
    const savedData = this.sharedService.getFormData();
    this.gridData = savedData?.fields?.length ? savedData.fields : [];
    this.tempGridData = JSON.parse(JSON.stringify(this.gridData));
    this.initializeForm();
  }

  initializeForm(): void {
    const formControls = this.tempGridData.reduce((controls, field) => {
      controls[field.name.toLowerCase()] = ['', field.secondChecked ? Validators.required : []];
      return controls;
    }, {} as any);
    this.form = this.fb.group(formControls);
  }

  onFieldToggle(field: any): void {
    if (!field.firstChecked) {
      field.secondChecked = false;
    }

    this.selectionError = '';
    this.requiredError = '';

    if (field.name === 'Country') {
      const stateField = this.tempGridData.find(f => f.name === 'State');
      if (stateField && !field.firstChecked) {
        stateField.firstChecked = false;
        stateField.secondChecked = false;
      }
      this.checkStateError();
    }

    if (field.name === 'State') {
      this.checkStateError();
    }

    if (field.name === "File Upload") {
      this.isFileUploadSelected = field.firstChecked;
    }
  }

  checkStateError(): void {
    const countryField = this.tempGridData.find(f => f.name === 'Country');
    const stateField = this.tempGridData.find(f => f.name === 'State');

    if (stateField?.firstChecked && !countryField?.firstChecked) {
      this.stateError = true; 
      stateField.firstChecked = false;
      stateField.secondChecked = false;
    } else {
      this.stateError = false; 
    }
  }

  isFieldDisabled(fieldName: string): boolean {
    if (fieldName === 'State') {
      const countryField = this.tempGridData.find(f => f.name === 'Country');
      return !countryField?.firstChecked;
    }
    return false;
  }

  isAnyFieldSelected(): boolean {
    return this.tempGridData.some(field => field.firstChecked);
  }

  isAnyFieldRequired(): boolean {
    return this.tempGridData.some(field => field.secondChecked);
  }

  onRequiredFieldToggle(): void {
    this.requiredError = ''; 
  }

  saveChanges(): void {
    if (!this.selectedValue) {
      this.showError = true;
      return;
    }
    this.showError = false;

    this.selectionError = '';
    this.requiredError = '';
  
    if (!this.isAnyFieldSelected()) {
      this.selectionError = "Please select at least one field before saving.";
      return;
    }
    
    this.sharedService.setfiletype(this.selectedValue);

    if (!this.isAnyFieldRequired()) {
      this.requiredError = "At least one field must be required before saving.";
      return;
    }
  
    this.sharedService.setFormData({ fields: this.tempGridData });
    this.sharedService.saveFormData();
    this.initializeForm();
    console.log(this.tempGridData);

    this.showSuccessMessage = true;
    setTimeout(() => this.showSuccessMessage = false, 3000);
  }

  dragData = ({ dragTarget }: any): number => {
    return Number(dragTarget.getAttribute("data-index"));
  };

  onDrop(e: DropTargetEvent): void {
    const fromIndex = e.dragData;
    const toIndex = Number(e.dropTarget.getAttribute("data-index"));
    if (fromIndex === toIndex) return;
    const [movedItem] = this.tempGridData.splice(fromIndex, 1);
    this.tempGridData.splice(toIndex, 0, movedItem);
  }
}
