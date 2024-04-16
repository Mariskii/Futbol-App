import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-searched-item',
  templateUrl: './searched-item.component.html',
  styleUrl: './searched-item.component.css'
})
export class SearchedItemComponent {

  @Input()
  public title?:string;

  @Input()
  public image?:string;

}
