import { Component, OnInit } from '@angular/core';
import { ColaboradorService } from 'src/app/services/api/colaborador.service';

@Component({
  selector: 'app-mantenedor-provincias',
  templateUrl: './mantenedor-provincias.component.html',
  styleUrls: ['./mantenedor-provincias.component.css']
})
export class MantenedorProvinciasComponent implements OnInit {

  lstProvincias: any[] = [];

  constructor( private provincia: ColaboradorService ) { }

  ngOnInit(): void {
    this.provincia.getProvincias().subscribe(
      (result: any) =>{
        this.lstProvincias = result;
      }
    )
  }

}
