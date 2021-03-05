import { Component, OnInit } from '@angular/core';
import { ContratoService } from 'src/app/services/api/contrato.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng-lts/api';

@Component({
  selector: 'app-mantenedor-tipos-contrato',
  templateUrl: './mantenedor-tipos-contrato.component.html',
  styleUrls: ['./mantenedor-tipos-contrato.component.css']
})
export class MantenedorTiposContratoComponent implements OnInit {

  lstTiposContrato: any[] = [];
  displayBasic = false;
  tipoContratoForm: FormGroup;
  loading = false;
  tipoContratoActual ={
    id:'',
    nombre:''
  }

  constructor( private contratoService: ContratoService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService ) { 

      this.tipoContratoForm = this.formBuilder.group({
        nombre: ['', Validators.required]
      })
    }

  ngOnInit(): void {
    this.contratoService.getTiposContrato().subscribe(
      (result: any) =>{
        this.lstTiposContrato = result;
      }
    )
  }

  get cF(){
    return this.tipoContratoForm.controls;
  }

  showBasicDialog(tipoContrato:any = null) {
    this.displayBasic = true;
    if(tipoContrato == null){
      this.tipoContratoActual= {
        id:'',
        nombre:''
      }
    }else{
      this.tipoContratoActual = {
        id:tipoContrato.id,
        nombre:tipoContrato.nombre
      }
    }
  }

  onSubmitTipoContrato(){
   if(this.tipoContratoActual.id != ''){
      console.log('Modificar');
      this.loading = true;
      if(this.tipoContratoForm.invalid){
        this.loading = false;
      }
      else 
     { this.contratoService.putTiposContrato(this.tipoContratoActual.id, this.tipoContratoForm.value.nombre).subscribe(() =>{
        this.contratoService.getTiposContrato().subscribe(tiposContrato=>{
          this.lstTiposContrato=tiposContrato;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
    else{
      console.log('Añadir');
      this.loading = true;
      if(this.tipoContratoForm.invalid){
        this.loading = false;
      }
      else 
     { this.contratoService.postTiposContrato(this.tipoContratoForm.value.nombre).subscribe(() =>{
        this.contratoService.getTiposContrato().subscribe(tiposContrato=>{
          this.lstTiposContrato=tiposContrato;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
  }

  onCloseTipoContratoDialog(){
    this.tipoContratoForm.reset();
  }

  confirmDeleteTipoContrato(id: any){
    this.confirmationService.confirm({
      message: '¿Está seguro de que desea eliminar este registro?',
      accept: ()=> {this.deleteData(id)}
    })
  }

  deleteData(id: any){
    this.contratoService.deleteTiposContrato(id).subscribe(() =>{
      this.contratoService.getTiposContrato().subscribe(tiposContrato=>{
        this.lstTiposContrato=tiposContrato;
      })
    })
  }

  putData(data: any){
    this.contratoService.putTiposContrato(data.id, data.nombre).subscribe(() =>{
      this.contratoService.getTiposContrato().subscribe(tiposContrato=>{
        this.lstTiposContrato=tiposContrato;
      })
      this.displayBasic = false;
      this.loading = false;
    })
  }
}
