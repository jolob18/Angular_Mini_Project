import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GridModule } from '@progress/kendo-angular-grid';
import { DragAndDropModule } from '@progress/kendo-angular-utils';


import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './header/register/register.component';
import { ConfigureComponent } from './header/configure/configure.component';
import { AppBarModule } from '@progress/kendo-angular-navigation';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { ReactiveFormsModule } from '@angular/forms';
import { InputsModule, FormFieldModule } from '@progress/kendo-angular-inputs';








@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterComponent,
    ConfigureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GridModule,
    DragAndDropModule,
    FormsModule,
    AppBarModule,
    ButtonModule,
    ReactiveFormsModule,
    InputsModule,
    FormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
