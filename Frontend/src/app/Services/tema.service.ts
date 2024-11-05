import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tema } from '../Models/tema.model';

@Injectable({
  providedIn: 'root'
})
export class TemaService {
  private apiUrl = 'http://localhost:8082/api/temas';

  constructor(private http: HttpClient) { }

  getAllTemas(): Observable<Tema[]> {
    return this.http.get<Tema[]>(this.apiUrl);
  }

  getTemaById(id: number): Observable<Tema> {
    return this.http.get<Tema>(`${this.apiUrl}/${id}`);
  }

  createTema(tema: Tema): Observable<Tema> {
    return this.http.post<Tema>(this.apiUrl, tema);
  }

  updateTema(tema: Tema): Observable<Tema> {
    return this.http.put<Tema>(`${this.apiUrl}/${tema.id}`, tema);
  }

  deleteTema(tema: Tema): Observable<Tema> {
    return this.http.delete<Tema>(`${this.apiUrl}/${tema.id}`);
  }
}
