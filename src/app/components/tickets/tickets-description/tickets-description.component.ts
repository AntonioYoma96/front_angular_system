import { Component, Input, OnInit } from '@angular/core';
import { Ticket } from 'src/app/models/ticket';

@Component({
  selector: 'app-tickets-description',
  templateUrl: './tickets-description.component.html',
  styleUrls: ['./tickets-description.component.css'],
})
export class TicketsDescriptionComponent implements OnInit {
  @Input() selTicket = {} as Ticket;

  constructor() {}

  ngOnInit(): void {}
}
