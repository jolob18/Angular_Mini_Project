import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Path } from '@progress/kendo-drawing';
import { DisplayDataComponent } from './header/display-data/display-data.component';
import { RegisterComponent } from './header/register/register.component';
import { ConfigureComponent } from './header/configure/configure.component';

const routes: Routes = [
  { path:"displayData", component : DisplayDataComponent  },
  { path :"register", component: RegisterComponent },
  { path: "configure", component:  ConfigureComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
