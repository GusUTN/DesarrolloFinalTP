import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumno } from '../Models/alumno.model';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private apiUrl = 'http://localhost:8082/api/alumnos';

  constructor(private http: HttpClient) { }

  getAllAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.apiUrl);
  }

  getAlumnoById(id: number): Observable<Alumno> {
    return this.http.get<Alumno>(`${this.apiUrl}/${id}`);
  }

  createAlumno(alumno: Alumno): Observable<Alumno> {
    return this.http.post<Alumno>(this.apiUrl, alumno);
  }

  updateAlumno(alumno: Alumno): Observable<Alumno> {
    return this.http.put<Alumno>(`${this.apiUrl}/${alumno.id}`, alumno);
  }

  deleteAlumno(alumno: Alumno): Observable<Alumno> {
    return this.http.delete<Alumno>(`${this.apiUrl}/${alumno.id}`);
  }
}
