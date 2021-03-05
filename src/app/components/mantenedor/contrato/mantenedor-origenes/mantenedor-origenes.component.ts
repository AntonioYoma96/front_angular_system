import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/api/ticket.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng-lts/api';

@Component({
  selector: 'app-mantenedor-origenes',
  templateUrl: './mantenedor-origenes.component.html',
  styleUrls: ['./mantenedor-origenes.component.css']
})
export class MantenedorOrigenesComponent implements OnInit {

  lstOrigenes: any[] = [];
  displayBasic = false;
  origenForm: FormGroup;
  loading = false;
  origenActual ={
    id:'',
    nombre:''
  }

  constructor( private ticketService: TicketService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService ) { 

      this.origenForm = this.formBuilder.group({
        nombre: ['', Validators.required]
      })
     }

  ngOnInit(): void {
    this.ticketService.getOrigenes().subscribe(
      (result: any) =>{
        this.lstOrigenes = result;
      }
    )
  }

  get cF(){
    return this.origenForm.controls;
  }

  showBasicDialog(origen:any = null) {
    this.displayBasic = true;
    if(origen == null){
      this.origenActual= {
        id:'',
        nombre:''
      }
    }else{
      this.origenActual = {
        id:origen.id,
        nombre:origen.nombre
      }
    }
  }

  onSubmitOrigen(){
   if(this.origenActual.id != ''){
      console.log('Modificar');
      this.loading = true;
      if(this.origenForm.invalid){
        this.loading = false;
      }
      else 
     { this.ticketService.putOrigenes(this.origenActual.id, this.origenForm.value.nombre).subscribe(() =>{
        this.ticketService.getOrigenes().subscribe(origenes=>{
          this.lstOrigenes=origenes;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
    else{
      console.log('Añadir');
      this.loading = true;
      if(this.origenForm.invalid){
        this.loading = false;
      }
      else 
     { this.ticketService.postOrigenes(this.origenForm.value.nombre).subscribe(() =>{
        this.ticketService.getOrigenes().subscribe(origenes=>{
          this.lstOrigenes=origenes;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
  }

  onCloseOrigenDialog(){
    this.origenForm.reset();
  }

  confirmDeleteOrigen(id: any){
    this.confirmationService.confirm({
      message: '¿Está seguro de que desea eliminar este registro?',
      accept: ()=> {this.deleteData(id)}
    })
  }

  deleteData(id: any){
    this.ticketService.deleteOrigenes(id).subscribe(() =>{
      this.ticketService.getOrigenes().subscribe(origenes=>{
        this.lstOrigenes=origenes;
      })
    })
  }

  putData(data: any){
    this.ticketService.putOrigenes(data.id, data.nombre).subscribe(() =>{
      this.ticketService.getOrigenes().subscribe(origenes=>{
        this.lstOrigenes=origenes;
      })
      this.displayBasic = false;
      this.loading = false;
    })
  }
}
