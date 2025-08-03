import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [],
  template: `
    <div class="task-item" [class.completed]="task().completed">
      <input type="checkbox" [checked]="task().completed" (change)="onCompleteClick()">
      <span class="task-title">{{ task().title }}</span>
      <button (click)="onDeleteClick()">Delete</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent {
  task = input.required<Task>();

  complete = output<void>();
  delete = output<void>();

  onCompleteClick(): void {
    this.complete.emit();
  }
  onDeleteClick(): void {
    this.delete.emit();
  }
}
