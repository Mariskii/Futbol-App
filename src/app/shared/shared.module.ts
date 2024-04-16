import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchedItemComponent } from './components/searched-item/searched-item.component';
import { SharedNavbarComponent } from './components/shared-navbar/shared-navbar.component';
import { ResultCardComponent } from './components/result-card/result-card.component';



@NgModule({
  declarations: [
    SearchedItemComponent,
    SharedNavbarComponent,
    ResultCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SearchedItemComponent,
    SharedNavbarComponent,
    ResultCardComponent
  ]
})
export class SharedModule { }
