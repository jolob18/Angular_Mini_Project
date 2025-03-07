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

  constructor(private sharedService: SharedService, private fb: FormBuilder) {}

  ngOnInit() {
    this.tempGridData = [
      { name: 'Name', firstChecked: true, secondChecked: true },
      { name: 'Email', firstChecked: true, secondChecked: true },
      { name: 'Mobile', firstChecked: true, secondChecked: true },
      { name: 'Address', firstChecked: true, secondChecked: true }
    ];
    this.initializeForm();
  }

  initializeForm() {
    const formControls = this.tempGridData.reduce((controls, field) => {
      controls[field.name.toLowerCase()] = ['', field.secondChecked ? Validators.required : []];
      return controls;
    }, {} as any);
    this.form = this.fb.group(formControls);
  }

  onFieldToggle(field: any) {
    if (!field.firstChecked) {
      field.secondChecked = false; 
    }
  }
   
  isAnyFieldSelected(): boolean {
    return this.tempGridData.some(field => field.firstChecked);
  }


  saveChanges() {

    if (!this.isAnyFieldSelected()) {
      alert("Please select at least one field before saving.");
      return;
    }
  
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
