import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchedItemComponent } from './components/searched-item/searched-item.component';
import { SharedNavbarComponent } from './components/shared-navbar/shared-navbar.component';



@NgModule({
  declarations: [
    SearchedItemComponent,
    SharedNavbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SearchedItemComponent,
    SharedNavbarComponent,
  ]
})
export class SharedModule { }
