import { Component, OnInit } from '@angular/core';
import { ColaboradorService } from 'src/app/services/api/colaborador.service';

@Component({
  selector: 'app-mantenedor-regiones',
  templateUrl: './mantenedor-regiones.component.html',
  styleUrls: ['./mantenedor-regiones.component.css']
})
export class MantenedorRegionesComponent implements OnInit {

  lstRegiones: any[] = [];

  constructor( private region: ColaboradorService ) { }

  ngOnInit(): void {
    this.region.getRegiones().subscribe(
      (result: any) =>{
        this.lstRegiones = result;
      }
    )
  }

}
