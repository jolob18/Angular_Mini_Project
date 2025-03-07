import { Component } from '@angular/core';
import { DropTargetEvent } from '@progress/kendo-angular-utils';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dropdown';
  public gridData = [
    {id:1, selected1: false, name: "Name", checked: false,  },
    {id:2, selected1: false, name: "Mobile", checked: false,  },
    {id:3, selected1: false, name: "Email",  checked: false,  },
    {id:4, selected1: false, name: "Address",  checked: false,  }
  ];
 
  public dragData = ({ dragTarget }: any) => {
    return dragTarget.textContent.trim(); // Returns the text content of dragged row
  };

  public onDrop(e: DropTargetEvent): void {
    const fromIndex = this.gridData.findIndex(item => item.name === e.dragData);
    const toIndex = this.gridData.findIndex(item => 
      item.name === e.dropTarget?.textContent?.trim()
    );

    if (fromIndex !== -1 && toIndex !== -1 && fromIndex !== toIndex) {
      const movedItem = this.gridData.splice(fromIndex, 1)[0];
      this.gridData.splice(toIndex, 0, movedItem);
      this.gridData = [...this.gridData]; // Refresh UI
    }
  }
}


// import { Component } from '@angular/core';
// import { DropTargetEvent } from '@progress/kendo-angular-utils/drag-and-drop/events';

 
// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'dropdown';
//   fields = [
//     { label: 'name', show: true, required: true },
//     { label: 'mobile', show: true, required: true },
//     { label: 'email', show: true, required: true },
//     { label: 'address', show: true, required: true }
//   ];
 
//   dragData = ({ dragTarget }: any) => {
//     return Number(dragTarget.getAttribute("data-index"));
//   };
 
//   onDrop(e: DropTargetEvent): void {
//     const fromIndex = e.dragData;
//     const toIndex = Number(e.dropTarget.getAttribute("data-index"));
 
//     if (fromIndex === toIndex) {
//       return;
//     }
 
//     const movedItem = this.fields[fromIndex];
//     this.fields.splice(fromIndex, 1);
//     this.fields.splice(toIndex, 0, movedItem);
//   }
// }