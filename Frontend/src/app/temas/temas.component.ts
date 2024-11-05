import { Component, OnInit } from '@angular/core';
import { TemaService } from '../Services/tema.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'
import { Tema } from '../Models/tema.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  standalone: true,
  styleUrls: ['./temas.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class TemasComponent implements OnInit {
  temas: Tema[] = [];
  temaForm: FormGroup;
  editMode = false;  
  temaEditado: Tema | null = null;  

  constructor(
    private temaService: TemaService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.temaForm = this.fb.group({
      nombre: [''],
      descripcion: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id']; 
     if (id) {
        this.getTemaById(id); 
       } else {
          this.temaService.getAllTemas().subscribe(data => {
            this.temas = data;
          });
        }
    });
  }

  getTemaById(id: number): void {
    this.temaService.getTemaById(id).subscribe(
      (data: Tema) => {
        this.temaForm.patchValue(data);  
        this.temaEditado = data; 
        this.editMode = true; 
      }
      );
    }


  editTema(tema: Tema): void {
    this.router.navigate(["temas/"+tema.id!]);
    this.temaForm.patchValue(tema);  
    this.temaEditado = tema; 
    this.editMode = true;  
  }

  createOrUpdateTema(): void {
    if (this.temaForm.valid) {
      const temaData: Tema = this.temaForm.value;

      if (this.editMode && this.temaEditado) {
        // Si estamos en modo de edición, llama a updateAlumno
        temaData.id = this.temaEditado.id; // Asegura que el ID sea el mismo
        this.temaService.updateTema(temaData).subscribe(
          (updatedTema) => {
            const index = this.temas.findIndex(a => a.id === updatedTema.id);
            if (index !== -1) {
              this.temas[index] = updatedTema;  // Actualiza el alumno en la lista
            }
            this.cancelEdit();  // Reinicia el formulario
          },
          (error) => {
            console.error('Error actualizando tema:', error);
          }
        );
      } else {
        this.temaService.createTema(temaData).subscribe(
          (tema) => {
            this.temas.push(tema);
            this.temaForm.reset();
          },
          (error) => {
            console.error('Error creando tema:', error);
          }
        );
      }
    }
  }

  cancelEdit(): void {
    this.editMode = false;
    this.temaEditado = null;
    this.temaForm.reset();
    this.router.navigate(["/temas"])
  }

  deleteTema(tema: Tema): void {
    if (tema.id) {
      this.temaService.deleteTema(tema).subscribe(
        () => {
          this.temas = this.temas.filter(a => a.id !== tema.id);
        },
        (error) => {
          console.error('Error borrando tema:', error);
        }
      );
    }
  }
}