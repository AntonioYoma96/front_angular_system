import { Component, OnInit } from '@angular/core';
import { FormacionService } from 'src/app/services/api/formacion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng-lts/api';

@Component({
  selector: 'app-mantenedor-tipos-otro-formacion',
  templateUrl: './mantenedor-tipos-otro-formacion.component.html',
  styleUrls: ['./mantenedor-tipos-otro-formacion.component.css']
})
export class MantenedorTiposOtroFormacionComponent implements OnInit {

  lstTiposOtroFormacion: any[] = [];
  displayBasic = false;
  tipoOtroFormacionForm: FormGroup;
  loading = false;
  tipoOtroFormacionActual ={
    id:'',
    nombre:''
  }

  constructor( private formacionService: FormacionService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService ) {

      this.tipoOtroFormacionForm = this.formBuilder.group({
        nombre: ['', Validators.required]
      })
     }

  ngOnInit(): void {
    this.formacionService.getTiposOtroFormacion().subscribe(
      (result: any) =>{
        this.lstTiposOtroFormacion = result;
      }
    )
  }

  get cF(){
    return this.tipoOtroFormacionForm.controls;
  }

  showBasicDialog(tipoOtroFormacion:any = null) {
    this.displayBasic = true;
    if(tipoOtroFormacion == null){
      this.tipoOtroFormacionActual= {
        id:'',
        nombre:''
      }
    }else{
      this.tipoOtroFormacionActual = {
        id:tipoOtroFormacion.id,
        nombre:tipoOtroFormacion.nombre
      }
    }
  }

  onSubmitTipoOtroFormacion(){
   if(this.tipoOtroFormacionActual.id != ''){
      console.log('Modificar');
      this.loading = true;
      if(this.tipoOtroFormacionForm.invalid){
        this.loading = false;
      }
      else 
     { this.formacionService.putTiposOtroFormacion(this.tipoOtroFormacionActual.id, this.tipoOtroFormacionForm.value.nombre).subscribe(() =>{
        this.formacionService.getTiposOtroFormacion().subscribe(tipoOtroFormacion=>{
          this.lstTiposOtroFormacion=tipoOtroFormacion;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
    else{
      console.log('Añadir');
      this.loading = true;
      if(this.tipoOtroFormacionForm.invalid){
        this.loading = false;
      }
      else 
     { this.formacionService.postTiposOtroFormacion(this.tipoOtroFormacionForm.value.nombre).subscribe(() =>{
        this.formacionService.getTiposOtroFormacion().subscribe(tipoOtroFormacion=>{
          this.lstTiposOtroFormacion=tipoOtroFormacion;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
  }

  onCloseTipoOtroFormacionDialog(){
    this.tipoOtroFormacionForm.reset();
  }

  confirmDeleteTipoOtroFormacion(id: any){
    this.confirmationService.confirm({
      message: '¿Está seguro de que desea eliminar este registro?',
      accept: ()=> {this.deleteData(id)}
    })
  }

  deleteData(id: any){
    this.formacionService.deleteTiposOtroFormacion(id).subscribe(() =>{
      this.formacionService.getTiposOtroFormacion().subscribe(tipoOtroFormacion=>{
        this.lstTiposOtroFormacion=tipoOtroFormacion;
      })
    })
  }

  putData(data: any){
    this.formacionService.putTiposOtroFormacion(data.id, data.nombre).subscribe(() =>{
      this.formacionService.getTiposOtroFormacion().subscribe(tipoOtroFormacion=>{
        this.lstTiposOtroFormacion=tipoOtroFormacion;
      })
      this.displayBasic = false;
      this.loading = false;
    })
  }
}
