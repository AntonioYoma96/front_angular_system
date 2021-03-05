import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/api/ticket.service';

@Component({
  selector: 'app-mantenedor-prioridades',
  templateUrl: './mantenedor-prioridades.component.html',
  styleUrls: ['./mantenedor-prioridades.component.css']
})
export class MantenedorPrioridadesComponent implements OnInit {

  lstPrioridades: any[] = [];

  constructor( private prioridad: TicketService ) { }

  ngOnInit(): void {
    this.prioridad.getPrioridades().subscribe(
      (result: any) =>{
        this.lstPrioridades = result;
      }
    )
  }

}
