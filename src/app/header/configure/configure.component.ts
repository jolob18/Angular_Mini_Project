import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DropTargetEvent } from '@progress/kendo-angular-utils';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-config',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.css']
})
export class ConfigureComponent {
  public tempGridData: any[] = [];
  public form!: FormGroup;
  public gridData: any[] = [];
  
  selectedValue: string = "Pdf";
  options: string[] = ['Jpg', 'Pdf', 'Doc'];

  isFileUploadSelected = true;
  showError = false;

  constructor(private sharedService: SharedService, private fb: FormBuilder) {
    
  }

  

  ngOnInit() {
    
    const savedData = this.sharedService.getFormData();
    this.gridData = savedData?.fields?.length ? savedData.fields : [];
 
    this.tempGridData = JSON.parse(JSON.stringify(this.gridData));

    
    this.initializeForm();
  }



  initializeForm() {
    const formControls = this.tempGridData.reduce((controls, field) => {
      controls[field.name.toLowerCase()] = ['', field.secondChecked ? Validators.required : []];
      return controls;
    }, {} as any);
    this.form = this.fb.group(formControls);
  }
  message: string = ""; ;
  onFieldToggle(field: any) {
    if (!field.firstChecked) {
      field.secondChecked = false;  
    }

    if (field.name === "File Upload") {
      this.isFileUploadSelected = field.firstChecked;
    }
   
   
  }
   
  isAnyFieldSelected(): boolean {
    return this.tempGridData.some(field => field.firstChecked);
  }


  saveChanges() {
   
    if ( !this.selectedValue) {
      this.showError = true;
      return;
    }
    this.showError = false;

    if (!this.isAnyFieldSelected()) {
      alert("Please select at least one field before saving.");
      return;
    }
    
    this.sharedService.setfiletype(this.selectedValue);

  
    this.sharedService.setFormData({ fields: this.tempGridData });
    this.sharedService.saveFormData();
    this.initializeForm();
    
    alert('Changes Saved!');
  }

  dragData = ({ dragTarget }: any) => {
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
