import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-result-card',
  templateUrl: './result-card.component.html',
  styleUrl: './result-card.component.css'
})
export class ResultCardComponent {

  @Input()
  public title?:string;

  @Input()
  public image?:string;
}
