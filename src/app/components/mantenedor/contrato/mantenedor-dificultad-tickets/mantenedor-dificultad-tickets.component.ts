import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/api/ticket.service';

@Component({
  selector: 'app-mantenedor-dificultad-tickets',
  templateUrl: './mantenedor-dificultad-tickets.component.html',
  styleUrls: ['./mantenedor-dificultad-tickets.component.css']
})
export class MantenedorDificultadTicketsComponent implements OnInit {

  lstDificultadTickets: any[] = [];

  constructor( private dificultadTicket: TicketService ) { }

  ngOnInit(): void {
    this.dificultadTicket.getDificultadTicket().subscribe(
      (result: any) =>{
        this.lstDificultadTickets = result;
      }
    )
  }

}
