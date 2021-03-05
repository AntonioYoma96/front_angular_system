import { Component, OnInit } from '@angular/core';
import { ColaboradorService } from 'src/app/services/api/colaborador.service';

@Component({
  selector: 'app-mantenedor-comunas',
  templateUrl: './mantenedor-comunas.component.html',
  styleUrls: ['./mantenedor-comunas.component.css']
})
export class MantenedorComunasComponent implements OnInit {

  lstComunas: any[] = [];

  constructor( private comuna: ColaboradorService ) { }

  ngOnInit(): void {
    this.comuna.getComuna().subscribe(
      (result: any) =>{
        this.lstComunas = result;
      }
    )
  }
}
