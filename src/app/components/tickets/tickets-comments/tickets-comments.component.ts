import { Component, Input, OnInit } from '@angular/core';
import { Mensaje } from 'src/app/models/ticket';
import { AppSettings } from 'src/app/helpers/app.settings';

@Component({
  selector: 'app-tickets-comments',
  templateUrl: './tickets-comments.component.html',
  styleUrls: ['./tickets-comments.component.css'],
})
export class TicketsCommentsComponent implements OnInit {
  @Input() lstMensajes: Mensaje[];

  constructor() {
    this.lstMensajes = [];
  }

  ngOnInit(): void {}

  getDateTime(fechaMensaje: string): string {
    return new Date(fechaMensaje).toLocaleDateString(
      'es-ES',
      AppSettings.dateStringFormat
    );
  }
}
