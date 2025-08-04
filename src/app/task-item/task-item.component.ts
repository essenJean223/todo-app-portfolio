import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [],
  templateUrl:'./task-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent {
  public task = input.required<Task>();

  complete = output<Task>();
  delete = output<Task>();

  onCompleteClick(): void {
    this.complete.emit(this.task());
  }
  onDeleteClick(): void {
    this.delete.emit(this.task());
  }
}
