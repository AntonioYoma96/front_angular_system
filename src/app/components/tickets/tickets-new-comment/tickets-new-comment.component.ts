import {
  Component,
  Input,
  OnInit,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';
import { Mensaje, Ticket } from 'src/app/models/ticket';
import { TicketService } from 'src/app/services/api/ticket.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MessageService } from 'primeng-lts/api';
import { FileUpload } from 'primeng-lts/fileupload';

@Component({
  selector: 'app-tickets-new-comment',
  templateUrl: './tickets-new-comment.component.html',
  styleUrls: ['./tickets-new-comment.component.css'],
})
export class TicketsNewCommentComponent implements OnInit {
  @Input() selTicket = {} as Ticket;
  @Output() newLstMensajes = new EventEmitter<Mensaje[]>();

  newMensajeAsunto = '';
  newMensajeDetalle = '';
  attachFilesMessage = false;
  loading = false;

  @ViewChild('filesMessageInput') filesMessageInput: FileUpload | undefined;

  constructor(
    private ticketService: TicketService,
    private authenticationService: AuthenticationService,
    private messageService: MessageService
  ) {}

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

  submitNewMensaje(ticketId: number): void {
    this.loading = true;

    if (!this.newMensajeAsunto || !this.newMensajeDetalle) {
      this.loading = false;
      this.newMessage(
        'Error de mensaje',
        'El mensaje no contiene asunto y/o descripción',
        'error'
      );
    } else {
      const newMensaje: Mensaje = {
        autor: this.authenticationService.credentialValue.colaborador.id,
        ticket: ticketId,
        asunto: this.newMensajeAsunto,
        descripcion: this.newMensajeDetalle,
      };
      this.ticketService.createMensaje(newMensaje).subscribe({
        next: (mensajeCreated) => {
          if (this.filesMessageInput) {
            for (const file of this.filesMessageInput.files) {
              const formData = new FormData();
              formData.append('mensaje', `${mensajeCreated.id}`);
              formData.append('archivo', file);
              this.ticketService.uploadMensajeFile(formData).subscribe({
                error: (err) => console.error(err),
              });
            }
          }
          this.newMessage(
            'Nuevo mensaje',
            'El nuevo mensaje ha sido guardado correctamente',
            'success'
          );
          this.ticketService.getMensajes(ticketId).subscribe((mensajes) => {
            this.newLstMensajes.emit(mensajes);
          });
          this.newMensajeAsunto = '';
          this.newMensajeDetalle = '';
          this.filesMessageInput?.clear();
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }
}
