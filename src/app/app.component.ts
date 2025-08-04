import { Component, inject } from '@angular/core';
import { TaskItemComponent } from './task-item/task-item.component';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskItemComponent],
  templateUrl: "./app.component.html"
})
export class App {
  private taskService = inject(TaskService);
  protected tasks = this.taskService.allTasks;
  
  addTask(inputElement: HTMLInputElement): void {
    const title = inputElement.value.trim();
    if (title) {
      this.taskService.addTask(title);
      inputElement.value = ''; // Clear the input
    }
  }

  onTaskComplete(taskToComplete: any): void {
    this.taskService.completeTask(taskToComplete);
  }

  onTaskDelete(taskToDelete: any): void {
    this.taskService.deleteTask(taskToDelete);
  }
}