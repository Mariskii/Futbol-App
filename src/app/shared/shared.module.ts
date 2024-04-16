import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedNavbarComponent } from './components/shared-navbar/shared-navbar.component';
import { ResultCardComponent } from './components/result-card/result-card.component';



@NgModule({
  declarations: [
    SharedNavbarComponent,
    ResultCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SharedNavbarComponent,
    ResultCardComponent
  ]
})
export class SharedModule { }
