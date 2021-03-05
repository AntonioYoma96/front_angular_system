import { Component, OnInit } from '@angular/core';
import { ActividadService } from 'src/app/services/api/actividad.service';

@Component({
  selector: 'app-mantenedor-modulos',
  templateUrl: './mantenedor-modulos.component.html',
  styleUrls: ['./mantenedor-modulos.component.css']
})
export class MantenedorModulosComponent implements OnInit {

  lstModulos: any[] = [];

  constructor( private modulo: ActividadService ) { }

  ngOnInit(): void {
    this.modulo.getModulos().subscribe(
      (result: any) =>{
        this.lstModulos = result;
      }
    )
  }
}
