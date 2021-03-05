import { Component, OnInit } from '@angular/core';
import { ContratoService } from 'src/app/services/api/contrato.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng-lts/api';

@Component({
  selector: 'app-mantenedor-tipos-cuenta',
  templateUrl: './mantenedor-tipos-cuenta.component.html',
  styleUrls: ['./mantenedor-tipos-cuenta.component.css']
})
export class MantenedorTiposCuentaComponent implements OnInit {

  lstTiposCuenta: any[] = [];
  displayBasic = false;
  tipoCuentaForm: FormGroup;
  loading = false;
  tipoCuentaActual ={
    id:'',
    nombre:''
  }

  constructor( private contratoService: ContratoService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService ) {

      this.tipoCuentaForm = this.formBuilder.group({
        nombre: ['', Validators.required]
      })
     }

  ngOnInit(): void {
    this.contratoService.getTiposCuenta().subscribe(
      (result: any) =>{
        this.lstTiposCuenta = result;
      }
    )
  }

  get cF(){
    return this.tipoCuentaForm.controls;
  }

  showBasicDialog(tipoCuenta:any = null) {
    this.displayBasic = true;
    if(tipoCuenta == null){
      this.tipoCuentaActual= {
        id:'',
        nombre:''
      }
    }else{
      this.tipoCuentaActual = {
        id:tipoCuenta.id,
        nombre:tipoCuenta.nombre
      }
    }
  }

  onSubmitTipoCuenta(){
   if(this.tipoCuentaActual.id != ''){
      console.log('Modificar');
      this.loading = true;
      if(this.tipoCuentaForm.invalid){
        this.loading = false;
      }
      else 
     { this.contratoService.putTiposCuenta(this.tipoCuentaActual.id, this.tipoCuentaForm.value.nombre).subscribe(() =>{
        this.contratoService.getTiposCuenta().subscribe(tiposCuenta=>{
          this.lstTiposCuenta=tiposCuenta;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
    else{
      console.log('Añadir');
      this.loading = true;
      if(this.tipoCuentaForm.invalid){
        this.loading = false;
      }
      else 
     { this.contratoService.postTiposCuenta(this.tipoCuentaForm.value.nombre).subscribe(() =>{
        this.contratoService.getTiposCuenta().subscribe(tiposCuenta=>{
          this.lstTiposCuenta=tiposCuenta;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
  }

  onCloseTipoCuentaDialog(){
    this.tipoCuentaForm.reset();
  }

  confirmDeleteTipoCuenta(id: any){
    this.confirmationService.confirm({
      message: '¿Está seguro de que desea eliminar este registro?',
      accept: ()=> {this.deleteData(id)}
    })
  }

  deleteData(id: any){
    this.contratoService.deleteTiposCuenta(id).subscribe(() =>{
      this.contratoService.getTiposCuenta().subscribe(tiposCuenta=>{
        this.lstTiposCuenta=tiposCuenta;
      })
    })
  }

  putData(data: any){
    this.contratoService.putTiposCuenta(data.id, data.nombre).subscribe(() =>{
      this.contratoService.getTiposCuenta().subscribe(tiposCuenta=>{
        this.lstTiposCuenta=tiposCuenta;
      })
      this.displayBasic = false;
      this.loading = false;
    })
  }
}
