import { Component } from '@angular/core';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-display-data',
  templateUrl: './display-data.component.html',
  styleUrls: ['./display-data.component.css']
})
export class DisplayDataComponent {
  formData: any;

  public file: File | null = null;
  public fileUrl: string | null = null;

  constructor(private sharedService: SharedService) 
  {}
 
  ngOnInit() {
    this.file = this.sharedService.getFile();
    this.fileUrl = this.sharedService.getFileUrl();
    
    const savedData = localStorage.getItem('userData');
    if (savedData) {
      this.formData = JSON.parse(savedData);
      console.log(this.formData);
    }
  }

}
