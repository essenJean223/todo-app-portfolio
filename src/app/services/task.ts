import { Injectable, signal, computed } from '@angular/core';
import { Task } from '/home/user/todo-app/src/app/task'; // Use absolute path

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks = signal<Task[]>(this.loadTasks());

  public allTasks = computed(() => this.tasks());

  private localStorageKey = 'todoTasks';

  private loadTasks(): Task[] {
    const tasks = localStorage.getItem(this.localStorageKey);
    return tasks ? JSON.parse(tasks) : [];
  }

  private saveTasks(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.tasks()));
  }

  addTask(title: string): void {
    const newTask: Task = { id: Date.now(), title, completed: false };
    this.tasks.update(tasks => [...tasks, newTask]);
    this.saveTasks();
  }

  completeTask(taskToComplete: Task): void {
    this.tasks.update(tasks => tasks.map(task => task.id === taskToComplete.id ? { ...task, completed: !task.completed } : task));
    this.saveTasks();
  }

  deleteTask(taskToDelete: Task): void {
    this.tasks.update(tasks => tasks.filter(task => task.id !== taskToDelete.id));
    this.saveTasks();
  }

  // Placeholder methods for future API integration
  async getTasksFromApi(): Promise<Task[]> { console.log('Fetching tasks from API...'); return []; }
  async addTaskToApi(task: Task): Promise<Task> { console.log('Adding task to API:', task); return task; }
  async updateTaskInApi(task: Task): Promise<Task> { console.log('Updating task in API:', task); return task; }
  async deleteTaskFromApi(taskId: number): Promise<void> { console.log('Deleting task from API:', taskId); }
}
