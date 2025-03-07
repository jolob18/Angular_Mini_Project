import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppBarModule } from '@progress/kendo-angular-navigation';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { RegisterComponent } from './register/register.component';
import { ConfigureComponent } from './configure/configure.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {

  activecomponent: string = 'register';

   showComponent(component: string) {
    this.activecomponent = component;
   }

}
