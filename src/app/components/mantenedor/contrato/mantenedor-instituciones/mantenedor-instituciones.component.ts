import { Component, OnInit } from '@angular/core';
import { FormacionService } from 'src/app/services/api/formacion.service';

@Component({
  selector: 'app-mantenedor-instituciones',
  templateUrl: './mantenedor-instituciones.component.html',
  styleUrls: ['./mantenedor-instituciones.component.css']
})
export class MantenedorInstitucionesComponent implements OnInit {

  lstInstituciones: any[] = [];

  constructor( private institucion: FormacionService ) { }

  ngOnInit(): void {
    this.institucion.getInstituciones().subscribe(
      (result: any) =>{
        this.lstInstituciones = result;
      }
    )
  }

}
