import { Component, OnInit, ViewChild } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { ColaboradorService } from 'src/app/services/api/colaborador.service';
import { TicketService } from 'src/app/services/api/ticket.service';
import { ActividadService } from 'src/app/services/api/actividad.service';
import { Colaborador } from 'src/app/models/colaborador';
import {
  AreaTicket,
  DificultadTicket,
  EtapaTicket,
  Mensaje,
  Origen,
  Prioridad,
  Ticket,
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
import { ConfirmationService, MenuItem, MessageService } from 'primeng-lts/api';
import { FileUpload } from 'primeng-lts/fileupload';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
})
export class TicketsComponent implements OnInit {
  displayNewTicket = false;
  displayTicket = false;
  position = '';

  selTicket: Ticket | undefined;
  selMensajes: Mensaje[] = [];

  lstColaboradores: Colaborador[] = [];
  lstOrigenes: Origen[] = [];
  lstModulos: Modulo[] = [];
  lstPrioridades: Prioridad[] = [];
  lstTiposTickets: TipoTicket[] = [];
  lstEtapasTickets: EtapaTicket[] = [];
  lstAreasTickets: AreaTicket[] = [];
  lstDificultadesTicketsByArea: DificultadTicket[] = [];
  lstTickets: Ticket[] = [];

  newTicketForm: FormGroup;

  es = AppSettings.calendarEs;
  urlPattern = AppSettings.urlPattern;

  loading = false;
  summited = false;
  ticketCreated = false;
  isTranscripcion = true;

  ticketButtonItems: MenuItem[];

  @ViewChild('filesInput') filesInput: FileUpload | undefined;

  constructor(
    private messageService: MessageService,
    private helperService: HelperService,
    private colaboradorService: ColaboradorService,
    private ticketService: TicketService,
    private actividadService: ActividadService,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private confirmationService: ConfirmationService
  ) {
    helperService.newTitle('Tickets');

    this.newTicketForm = this.formBuilder.group({
      transcripcion: false,
      adjuntar: false,
      solicitud: true,
      asignado: ['', Validators.required],
      validador: '',
      solicitante: '',
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
      fecha_solicitud: '',
    });

    this.ticketButtonItems = [
      { label: 'Actualizar', icon: 'pi pi-refresh' },
      { label: 'Cambiar estado', icon: 'pi pi-check-square' },
    ];
  }

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe((data) => {
      this.lstTickets = data;
    });
  }

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
    this.ticketCreated = false;
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
    this.loading = false;
    this.summited = false;
    this.isTranscripcion = false;

    this.lstColaboradores = [];
    this.lstOrigenes = [];
    this.lstModulos = [];
    this.lstPrioridades = [];
    this.lstTiposTickets = [];
    this.lstEtapasTickets = [];

    this.newTicketForm.reset();
    this.nTF.transcripcion.setValue(false);
    this.nTF.adjuntar.setValue(false);
    this.nTF.solicitud.setValue(true);

    this.filesInput?.clear();
  }

  submitNewTicket(): void {
    this.loading = true;
    this.summited = true;
    if (this.newTicketForm.invalid) {
      this.loading = false;
      this.newMessage('Error en el envío', 'Hay campos incompletos', 'error');
      return;
    } else {
      let newRuta = this.nTF.ruta ? this.nTF.ruta.value : null;
      if (newRuta && !newRuta.startsWith('http')) {
        newRuta = 'http://' + newRuta;
      }
      const newTicket: Ticket = {
        asignado: this.nTF.asignado.value.id,
        validador: this.nTF.validador.value
          ? this.nTF.validador.value.id
          : null,
        solicitante: this.nTF.solicitante.value
          ? this.nTF.solicitante.value.id
          : this.authenticationService.credentialValue.colaborador.id,
        origen: this.nTF.origen.value.id,
        prioridad: this.nTF.prioridad.value.id,
        modulo: this.nTF.modulo.value.id,
        tipo_ticket: this.nTF.tipo_ticket.value.id,
        etapa_ticket: this.nTF.etapa_ticket.value.id,
        version: this.nTF.version.value ? this.nTF.version.value : null,
        ruta: newRuta,
        fecha_limite: this.nTF.fecha_limite.value
          ? this.nTF.fecha_limite.value
          : null,
        dificultad_ticket: this.nTF.dificultad_ticket.value
          ? this.nTF.dificultad_ticket.value.id
          : null,
        asunto: this.nTF.asunto.value,
        descripcion: this.nTF.descripcion.value,
      };
      if (this.nTF.fecha_solicitud.value) {
        newTicket.fecha_solicitud = this.nTF.fecha_solicitud.value;
      }
      this.ticketService.createTicket(newTicket).subscribe((data) => {
        this.ticketCreated = true;
        if (this.filesInput) {
          for (const file of this.filesInput.files) {
            const formData = new FormData();
            formData.append('ticket', `${data.id}`);
            formData.append('archivo', file);
            this.ticketService.uploadTicketFile(formData).subscribe();
          }
        }
        this.newMessage(
          'Creación de ticket',
          'El ticket ha sido creado correctamente',
          'success'
        );
        this.clearNewTicket();
      });
    }
  }

  loadDificultades(): void {
    if (this.nTF.area_ticket.value) {
      this.ticketService
        .getDificultadTicketByArea(this.nTF.area_ticket.value.id)
        .subscribe((data) => {
          this.lstDificultadesTicketsByArea = data;
        });
    } else {
      this.lstDificultadesTicketsByArea = [];
    }
  }

  getEmptyName(): string {
    return this.nTF.area_ticket.value
      ? 'No se han encontrado resultados'
      : 'Debe seleccionar el área del ticket';
  }

  updateSolicitanteField(): void {
    if (this.nTF.transcripcion.value) {
      console.log(1);
      this.nTF.solicitante.setValidators([Validators.required]);
    } else {
      this.nTF.solicitante.clearValidators();
      this.nTF.solicitante.reset();
    }
    this.nTF.solicitante.updateValueAndValidity();
  }

  updateFechaField(): void {
    if (this.nTF.solicitud.value) {
      this.nTF.fecha_solicitud.clearValidators();
      this.nTF.fecha_solicitud.reset();
    } else {
      this.nTF.fecha_solicitud.setValidators([Validators.required]);
    }
    this.nTF.fecha_solicitud.updateValueAndValidity();
  }

  showTicket(ticketId: number): void {
    this.displayTicket = true;

    this.ticketService.getTicket(ticketId).subscribe((data) => {
      this.selTicket = data;
    });
    this.ticketService.getMensajes(ticketId).subscribe((data) => {
      this.selMensajes = data;
    });
  }

  confirmCloseNewTicket(): void {
    if (this.ticketCreated) {
      this.confirmationService.confirm({
        message:
          'Si cierra este cuadro perderá todo el progreso hasta ahora, ¿está seguro que desea continuar?',
        accept: () => {
          this.clearNewTicket();
        },
        reject: () => {
          this.displayNewTicket = true;
        },
      });
    } else {
      return;
    }
  }

  clearTicket(): void {
    this.displayTicket = false;
    this.selTicket = undefined;
  }
}
