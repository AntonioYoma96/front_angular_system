import { Component, OnInit } from '@angular/core';
import { ActividadService } from 'src/app/services/api/actividad.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng-lts/api';

@Component({
  selector: 'app-mantenedor-clientes',
  templateUrl: './mantenedor-clientes.component.html',
  styleUrls: ['./mantenedor-clientes.component.css']
})
export class MantenedorClientesComponent implements OnInit {

  lstClientes: any[] = [];
  displayBasic = false;
  clienteForm: FormGroup;
  loading = false;
  clienteActual ={
    id:'',
    nombre:''
  }

  constructor( private actividadService: ActividadService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService ) { 

      this.clienteForm = this.formBuilder.group({
        nombre: ['', Validators.required]
      })
     }

  ngOnInit(): void {
    this.actividadService.getClientes().subscribe(
      (result: any) =>{
        this.lstClientes = result;
      }
    )
  }

  get cF(){
    return this.clienteForm.controls;
  }

  showBasicDialog(cliente:any = null) {
    this.displayBasic = true;
    if(cliente == null){
      this.clienteActual= {
        id:'',
        nombre:''
      }
    }else{
      this.clienteActual = {
        id:cliente.id,
        nombre:cliente.nombre
      }
    }
  }

  onSubmitCliente(){
   if(this.clienteActual.id != ''){
      console.log('Modificar');
      this.loading = true;
      if(this.clienteForm.invalid){
        this.loading = false;
      }
      else 
     { this.actividadService.putClientes(this.clienteActual.id, this.clienteForm.value.nombre).subscribe(() =>{
        this.actividadService.getClientes().subscribe(clientes=>{
          this.lstClientes=clientes;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
    else{
      console.log('Añadir');
      this.loading = true;
      if(this.clienteForm.invalid){
        this.loading = false;
      }
      else 
     { this.actividadService.postClientes(this.clienteForm.value.nombre).subscribe(() =>{
        this.actividadService.getClientes().subscribe(clientes=>{
          this.lstClientes=clientes;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
  }

  onCloseClienteDialog(){
    this.clienteForm.reset();
  }

  confirmDeleteCliente(id: any){
    this.confirmationService.confirm({
      message: '¿Está seguro de que desea eliminar este registro?',
      accept: ()=> {this.deleteData(id)}
    })
  }

  deleteData(id: any){
    this.actividadService.deleteClientes(id).subscribe(() =>{
      this.actividadService.getClientes().subscribe(clientes=>{
        this.lstClientes=clientes;
      })
    })
  }

  putData(data: any){
    this.actividadService.putClientes(data.id, data.nombre).subscribe(() =>{
      this.actividadService.getClientes().subscribe(clientes=>{
        this.lstClientes=clientes;
      })
      this.displayBasic = false;
      this.loading = false;
    })
  }
}
