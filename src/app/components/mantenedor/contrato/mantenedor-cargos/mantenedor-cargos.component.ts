import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng-lts/api';
import { OrganizacionService } from 'src/app/services/api/organizacion.service';

@Component({
  selector: 'app-mantenedor-cargos',
  templateUrl: './mantenedor-cargos.component.html',
  styleUrls: ['./mantenedor-cargos.component.css']
})
export class MantenedorCargosComponent implements OnInit {

  lstCargos: any[] = [];
  displayBasic = false;
  cargoForm: FormGroup;
  loading = false;
  cargoActual ={
    id:'',
    nombre:''
  }
  constructor( private organizacionService: OrganizacionService, 
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService ) { 
   
    this.cargoForm = this.formBuilder.group({
      nombre: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.organizacionService.getCargos().subscribe(
      (result: any) =>{
        this.lstCargos = result;
      }
    )
  }

  get cF(){
    return this.cargoForm.controls;
  }

  showBasicDialog(cargo:any = null) {
    this.displayBasic = true;
    if(cargo == null){
      this.cargoActual= {
        id:'',
        nombre:''
      }
    }else{
      this.cargoActual = {
        id:cargo.id,
        nombre:cargo.nombre
      }
    }
  }

  onSubmitCargo(){
   if(this.cargoActual.id != ''){
      console.log('Modificar');
      this.loading = true;
      if(this.cargoForm.invalid){
        this.loading = false;
      }
      else 
     { this.organizacionService.putCargo(this.cargoActual.id, this.cargoForm.value.nombre).subscribe(() =>{
        this.organizacionService.getCargos().subscribe(cargos=>{
          this.lstCargos=cargos;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
    else{
      console.log('Añadir');
      this.loading = true;
      if(this.cargoForm.invalid){
        this.loading = false;
      }
      else 
     { this.organizacionService.postCargo(this.cargoForm.value.nombre).subscribe(() =>{
        this.organizacionService.getCargos().subscribe(cargos=>{
          this.lstCargos=cargos;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
  }

  onCloseCargoDialog(){
    this.cargoForm.reset();
  }

  confirmDeleteCargo(id: any){
    this.confirmationService.confirm({
      message: '¿Está seguro de que desea eliminar este registro?',
      accept: ()=> {this.deleteData(id)}
    })
  }

  deleteData(id: any){
    this.organizacionService.deleteCargo(id).subscribe(() =>{
      this.organizacionService.getCargos().subscribe(cargos=>{
        this.lstCargos=cargos;
      })
    })
  }

  putData(data: any){
    this.organizacionService.putCargo(data.id, data.nombre).subscribe(() =>{
      this.organizacionService.getCargos().subscribe(cargos=>{
        this.lstCargos=cargos;
      })
      this.displayBasic = false;
      this.loading = false;
    })
  }
}