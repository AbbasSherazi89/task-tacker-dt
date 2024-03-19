import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Task} from '../Task'


const httpOptions={
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiURL='http://localhost:5000/tasks'

  constructor(private http:HttpClient) { }

  //to get the data from the backend (fake server)
  getTasks():Observable<Task[]>{
    return this.http.get<Task[]>(this.apiURL);
  }

  deleteTask(taskId:number): Observable<void>{
    const url=`${this.apiURL}/${taskId}`;
    return this.http.delete<any>(url);
  }
  updateTaskReminder(task:Task): Observable<Task>{
    const url = `${this.apiURL}/${task.id}`;
    return this.http.put<Task>(url, task, httpOptions);
  }
  addTask(task:Task):Observable<Task>{
    return this.http.post<Task>(this.apiURL, task, httpOptions);
  }
}
