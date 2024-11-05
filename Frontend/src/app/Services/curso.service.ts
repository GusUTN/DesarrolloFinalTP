import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../Models/curso.model';
import { Alumno } from '../Models/alumno.model';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  
  private apiUrl = 'http://localhost:8082/api/cursos';

  constructor(private http: HttpClient) { }

  getAllCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrl);
  }

  getCursoById(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.apiUrl}/${id}`);
  }

  getCursosByFechaFin(fechaFin: string): Observable<Curso[]> {
     return this.http.get<Curso[]>(`${this.apiUrl}/fecha-fin/${fechaFin}`); 
  }

  createCurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(this.apiUrl, curso);
  }

  updateCurso(curso: Curso): Observable<Curso> {
    return this.http.put<Curso>(`${this.apiUrl}/${curso.id}`, curso);
  }

  deleteCurso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}

