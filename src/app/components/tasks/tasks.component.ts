import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../Task';
import { TASKS } from '../../mock-tasks';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  tasks: Task[] = []; 

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  deleteTask(taskId: number):void {
    this.taskService
      .deleteTask(taskId)
      .subscribe(
        () => (this.tasks = this.tasks.filter((t) => t.id !== taskId))
      );
  } 

  toggleReminder(task:Task){
    task.reminder = !task.reminder;
   this.taskService.updateTaskReminder(task).subscribe();
  }


  addTask(task: Task){
    this.taskService.addTask(task).subscribe((task) => (this.tasks.push(task)));
    
  }

}
