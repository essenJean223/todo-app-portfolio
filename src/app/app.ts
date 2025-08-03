import { Component, inject } from '@angular/core';
import { TaskItemComponent } from './task-item/task-item';
import { TaskService } from './services/task';
import { Task } from './task';

@Component({
 selector: 'app-root',
  standalone: true,
  imports: [TaskItemComponent],
  template: `
    <main>
      <h1>Todo App</h1>

      <div class="add-task">
        <input #taskInput type="text" placeholder="Add a new task">
        <button (click)="addTask(taskInput)">Add Task</button>
      </div>

      <ul class="task-list">
        @for (task of tasks(); track task.id) {
          <li>
            <app-task-item [task]="task" (complete)="onTaskComplete(task)" (delete)="onTaskDelete(task)"></app-task-item>
          </li>
        } @empty {
          <li>No tasks yet!</li>
        }
      </ul>
    </main>
  `,})
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

  onTaskComplete(taskToComplete: Task): void {
    this.taskService.completeTask(taskToComplete);
  }

  onTaskDelete(taskToDelete: Task): void {
 this.taskService.deleteTask(taskToDelete);
  }
}