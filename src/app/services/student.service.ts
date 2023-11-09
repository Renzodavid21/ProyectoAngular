import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private url = 'https://backend-idra-production.up.railway.app/student'

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.url + '/getAll')
  }

  save(student: student): Observable<any> {
    return this.http.post(this.url, student)
  }

  update(student: student): Observable<any> {
    return this.http.post(this.url + '/' + student.id + '/update', student)
  }

  delete(id: number): Observable<any> {
    return this.http.post(this.url + '/' + id + '/delete', null)
  }
}