import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/api/ticket.service';
import { ConfirmationService } from 'primeng-lts/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-mantenedor-areas-ticket',
  templateUrl: './mantenedor-areas-ticket.component.html',
  styleUrls: ['./mantenedor-areas-ticket.component.css']
})
export class MantenedorAreasTicketComponent implements OnInit {

  lstAreasTicket: any[] = [];
  displayBasic = false;
  areasTicketForm: FormGroup;
  loading = false;
  areaTicketActual ={
    id:'',
    nombre:''
  }

  constructor( private ticketService: TicketService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService ) { 
      this.areasTicketForm = this.formBuilder.group({
        nombre: ['', Validators.required]
      })
     }

  ngOnInit(): void {
    this.ticketService.getAreasTickets().subscribe(
      (result: any) =>{
        this.lstAreasTicket = result;
      }
    )
  }

  get cF(){
    return this.areasTicketForm.controls;
  }

  showBasicDialog(areaT:any = null) {
    this.displayBasic = true;
    if(areaT == null){
      this.areaTicketActual= {
        id:'',
        nombre:''
      }
    }else{
      this.areaTicketActual = {
        id:areaT.id,
        nombre:areaT.nombre
      }
    }
  }

  onSubmitAreaTicket(){
   if(this.areaTicketActual.id != ''){
      console.log('Modificar');
      this.loading = true;
      if(this.areasTicketForm.invalid){
        this.loading = false;
      }
      else 
     { this.ticketService.putAreasTicket(this.areaTicketActual.id, this.areasTicketForm.value.nombre).subscribe(() =>{
        this.ticketService.getAreasTickets().subscribe(areaT=>{
          this.lstAreasTicket=areaT;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
    else{
      console.log('Añadir');
      this.loading = true;
      if(this.areasTicketForm.invalid){
        this.loading = false;
      }
      else 
     { this.ticketService.postAresTicket(this.areasTicketForm.value.nombre).subscribe(() =>{
        this.ticketService.getAreasTickets().subscribe(areaT=>{
          this.lstAreasTicket=areaT;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
  }

  onCloseAreaTicketDialog(){
    this.areasTicketForm.reset();
  }

  confirmDeleteAreaTicket(id: any){
    this.confirmationService.confirm({
      message: '¿Está seguro de que desea eliminar este registro?',
      accept: ()=> {this.deleteData(id)}
    })
  }

  deleteData(id: any){
    this.ticketService.deleteAreasTicket(id).subscribe(() =>{
      this.ticketService.getAreasTickets().subscribe(areaT=>{
        this.lstAreasTicket=areaT;
      })
    })
  }

  putData(data: any){
    this.ticketService.putAreasTicket(data.id, data.nombre).subscribe(() =>{
      this.ticketService.getAreasTickets().subscribe(areaT=>{
        this.lstAreasTicket=areaT;
      })
      this.displayBasic = false;
      this.loading = false;
    })
  }
}
