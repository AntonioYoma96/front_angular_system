import { Component, OnInit } from '@angular/core';
import { ActividadService } from 'src/app/services/api/actividad.service';

@Component({
  selector: 'app-mantenedor-proyectos',
  templateUrl: './mantenedor-proyectos.component.html',
  styleUrls: ['./mantenedor-proyectos.component.css']
})
export class MantenedorProyectosComponent implements OnInit {

  lstProyectos: any[] = [];

  constructor( private proyecto: ActividadService ) { }

  ngOnInit(): void {
    this.proyecto.getProyectos().subscribe(
      (result: any) =>{
        this.lstProyectos = result;
      }
    )
  }

}
