import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { ColaboradorService } from 'src/app/services/api/colaborador.service';
import { TicketService } from 'src/app/services/api/ticket.service';
import { ActividadService } from 'src/app/services/api/actividad.service';
import { Colaborador } from 'src/app/models/colaborador';
import {
  AreaTicket,
  DificultadTicket,
  EtapaTicket,
  Origen,
  Prioridad,
  TipoTicket,
} from 'src/app/models/ticket';
import { Modulo } from 'src/app/models/actividades';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { AppSettings } from 'src/app/helpers/app.settings';
import { MessageService } from 'primeng-lts/api';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
})
export class TicketsComponent implements OnInit {
  displayNewTicket = false;
  position = '';

  lstColaboradores: Colaborador[] = [];
  lstOrigenes: Origen[] = [];
  lstModulos: Modulo[] = [];
  lstPrioridades: Prioridad[] = [];
  lstTiposTickets: TipoTicket[] = [];
  lstEtapasTickets: EtapaTicket[] = [];
  lstAreasTickets: AreaTicket[] = [];
  lstDificultadesTicketsByArea: DificultadTicket[] = [];

  newTicketForm: FormGroup;

  es = AppSettings.calendarEs;

  loading = false;

  constructor(
    private helperService: HelperService,
    private colaboradorService: ColaboradorService,
    private ticketService: TicketService,
    private actividadService: ActividadService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {
    helperService.newTitle('Tickets');

    this.newTicketForm = this.formBuilder.group({
      asignado: ['', Validators.required],
      validador: '',
      origen: ['', Validators.required],
      modulo: ['', Validators.required],
      version: '',
      prioridad: ['', Validators.required],
      tipo_ticket: ['', Validators.required],
      fecha_limite: '',
      ruta: '',
      asunto: ['', Validators.required],
      descripcion: ['', Validators.required],
      etapa_ticket: ['', Validators.required],
      area_ticket: '',
      dificultad_ticket: '',
    });
  }

  ngOnInit(): void {}

  public newMessage(
    title: string,
    description: string,
    severity = 'info'
  ): void {
    this.messageService.add({
      severity,
      summary: title,
      detail: description,
    });
  }

  get nTF(): { [p: string]: AbstractControl } {
    return this.newTicketForm.controls;
  }

  showNewTicket(): void {
    this.displayNewTicket = true;
    this.position = window.innerWidth > 992 ? 'center' : 'top';

    this.colaboradorService.getColaboradores().subscribe((data) => {
      this.lstColaboradores = data;
    });
    this.ticketService.getOrigenes().subscribe((data) => {
      this.lstOrigenes = data;
    });
    this.ticketService.getPrioridades().subscribe((data) => {
      this.lstPrioridades = data;
    });
    this.ticketService.getTiposTickets().subscribe((data) => {
      this.lstTiposTickets = data;
    });
    this.ticketService.getEtapasTickets().subscribe((data) => {
      this.lstEtapasTickets = data;
    });
    this.ticketService.getAreasTickets().subscribe((data) => {
      this.lstAreasTickets = data;
    });
    this.actividadService.getModulos().subscribe((data) => {
      this.lstModulos = data;
    });
  }

  clearNewTicket(): void {
    this.displayNewTicket = false;
    this.lstColaboradores = [];
    this.lstOrigenes = [];
    this.lstModulos = [];
    this.lstPrioridades = [];
    this.lstTiposTickets = [];
    this.lstEtapasTickets = [];
  }

  submitNewTicket(): void {
    this.loading = true;
    if (this.newTicketForm.invalid) {
      this.loading = false;
      this.newMessage('Error en el envío', 'Hay campos incompletos', 'error');
      return;
    }
  }

  loadDificultades(): void {
    this.ticketService
      .getDificultadTicketByArea(this.nTF.area_ticket.value.id)
      .subscribe((data) => {
        this.lstDificultadesTicketsByArea = data;
      });
  }
}
