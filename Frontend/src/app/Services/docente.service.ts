import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Docente } from '../Models/docente.model';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {
  private apiUrl = 'http://localhost:8082/api/docentes';

  constructor(private http: HttpClient) { }

  getAllDocentes(): Observable<Docente[]> {
    return this.http.get<Docente[]>(this.apiUrl);
  }

  getDocenteById(id: number): Observable<Docente> {
    return this.http.get<Docente>(`${this.apiUrl}/${id}`);
  }

  createDocente(docente: Docente): Observable<Docente> {
    return this.http.post<Docente>(this.apiUrl, docente);
  }

  updateDocente(docente: Docente): Observable<Docente> {
    return this.http.put<Docente>(`${this.apiUrl}/${docente.id}`, docente);
  }

  deleteDocente(docente: Docente): Observable<Docente> {
    return this.http.delete<Docente>(`${this.apiUrl}/${docente.id}`);
  }
}
