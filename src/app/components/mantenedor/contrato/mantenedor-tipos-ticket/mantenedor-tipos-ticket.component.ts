import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/api/ticket.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng-lts/api';

@Component({
  selector: 'app-mantenedor-tipos-ticket',
  templateUrl: './mantenedor-tipos-ticket.component.html',
  styleUrls: ['./mantenedor-tipos-ticket.component.css']
})
export class MantenedorTiposTicketComponent implements OnInit {

  lstTiposTicket: any[] = [];
  displayBasic = false;
  tipoTicketForm: FormGroup;
  loading = false;
  tipoTicketActual ={
    id:'',
    nombre:''
  }

  constructor( private ticketService: TicketService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService ) { 

      this.tipoTicketForm = this.formBuilder.group({
        nombre: ['', Validators.required]
      })
    }

  ngOnInit(): void {
    this.ticketService.getTiposTickets().subscribe(
      (result: any) =>{
        this.lstTiposTicket = result;
      }
    )
  }

  get cF(){
    return this.tipoTicketForm.controls;
  }

  showBasicDialog(tipoTicket:any = null) {
    this.displayBasic = true;
    if(tipoTicket == null){
      this.tipoTicketActual= {
        id:'',
        nombre:''
      }
    }else{
      this.tipoTicketActual = {
        id:tipoTicket.id,
        nombre:tipoTicket.nombre
      }
    }
  }

  onSubmitTipoTicket(){
   if(this.tipoTicketActual.id != ''){
      console.log('Modificar');
      this.loading = true;
      if(this.tipoTicketForm.invalid){
        this.loading = false;
      }
      else 
     { this.ticketService.putTiposTickets(this.tipoTicketActual.id, this.tipoTicketForm.value.nombre).subscribe(() =>{
        this.ticketService.getTiposTickets().subscribe(tipoTicket=>{
          this.lstTiposTicket=tipoTicket;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
    else{
      console.log('Añadir');
      this.loading = true;
      if(this.tipoTicketForm.invalid){
        this.loading = false;
      }
      else 
     { this.ticketService.postTiposTickets(this.tipoTicketForm.value.nombre).subscribe(() =>{
        this.ticketService.getTiposTickets().subscribe(tipoTicket=>{
          this.lstTiposTicket=tipoTicket;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
  }

  onCloseTipoTicketDialog(){
    this.tipoTicketForm.reset();
  }

  confirmDeleteTipoTicket(id: any){
    this.confirmationService.confirm({
      message: '¿Está seguro de que desea eliminar este registro?',
      accept: ()=> {this.deleteData(id)}
    })
  }

  deleteData(id: any){
    this.ticketService.deleteTiposTickets(id).subscribe(() =>{
      this.ticketService.getTiposTickets().subscribe(tipoTicket=>{
        this.lstTiposTicket=tipoTicket;
      })
    })
  }

  putData(data: any){
    this.ticketService.putTiposTickets(data.id, data.nombre).subscribe(() =>{
      this.ticketService.getTiposTickets().subscribe(tipoTicket=>{
        this.lstTiposTicket=tipoTicket;
      })
      this.displayBasic = false;
      this.loading = false;
    })
  }
}
