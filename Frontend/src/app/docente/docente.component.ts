import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DocenteService } from '../Services/docente.service';
import { CommonModule } from '@angular/common';
import { Docente } from '../Models/docente.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from '../Services/curso.service';
import { Curso } from '../Models/curso.model';

@Component({
  selector: 'app-docentes',
  templateUrl: './docente.component.html',
  standalone: true,
  styleUrls: ['./docente.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class DocentesComponent implements OnInit {
  docentes: Docente[] = [];
  docenteForm: FormGroup;
  editMode = false;
  docenteEditado: Docente | null = null;
  cursosDocente: Curso[] = [];

  constructor(
    private docenteService: DocenteService,
    private cursoService: CursoService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.docenteForm = this.fb.group({
      nombre: [''],
      legajo: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.getDocenteById(id);
      } else {
        this.docenteService.getAllDocentes().subscribe(data => {
          this.docentes = data;
        });
      }
    });
  }

  getDocenteById(id: number): void {
    this.docenteService.getDocenteById(id).subscribe(
      (data: Docente) => {
        this.docenteForm.patchValue(data);
        this.docenteEditado = data;
        this.editMode = true;
        this.getCursosDocente(data.id!);
      },
      (error) => {
        console.error('Error obteniendo docente por ID:', error);
      }
    );
  }

  getCursosDocente(docenteId: number): void {
    this.cursoService.getAllCursos().subscribe(
      (cursos: Curso[]) => {
        this.cursosDocente = cursos.filter(curso => curso.docente.id === docenteId);
      },
      (error) => {
        console.error('Error obteniendo cursos del docente:', error);
      }
    );
  }

  editDocente(docente: Docente): void {
    this.router.navigate(['docentes', docente.id!]);
    this.docenteForm.patchValue(docente);
    this.docenteEditado = docente;
    this.editMode = true;
  }

  createOrUpdateDocente(): void {
    if (this.docenteForm.valid) {
      const docenteData: Docente = this.docenteForm.value;

      if (this.editMode && this.docenteEditado) {
        docenteData.id = this.docenteEditado.id;
        this.docenteService.updateDocente(docenteData).subscribe(
          (updatedDocente) => {
            const index = this.docentes.findIndex(a => a.id === updatedDocente.id);
            if (index !== -1) {
              this.docentes[index] = updatedDocente;
            }
            this.cancelEdit();
          },
          (error) => {
            console.error('Error actualizando docente:', error);
          }
        );
      } else {
        this.docenteService.createDocente(docenteData).subscribe(
          (alumno) => {
            this.docentes.push(alumno);
            this.docenteForm.reset();
          },
          (error) => {
            console.error('Error creando docente:', error);
          }
        );
      }
    }
  }

  cancelEdit(): void {
    this.editMode = false;
    this.docenteEditado = null;
    this.docenteForm.reset();
    this.router.navigate(['/docentes']);
  }

  deleteDocente(docente: Docente): void {
    if (docente.id) {
      this.docenteService.deleteDocente(docente).subscribe(
        () => {
          this.docentes = this.docentes.filter(a => a.id !== docente.id);
        },
        (error) => {
          console.error('Error borrando docente:', error);
        }
      );
    }
  }
}
