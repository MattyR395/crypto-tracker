import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss']
})
export class EmptyStateComponent {

  @Input() title!: string;
  @Input() subText!: string;
  @Input() icon!: string;
  @Input() maxWidth: string = '25rem'
  @Input() verticalActions: boolean = true;

  @Input() actions: {
    title: string
    actionName?: string
    route?: any[] | string | null | undefined
  }[] = [];

  @Output() actionClick: EventEmitter<string> = new EventEmitter();
}