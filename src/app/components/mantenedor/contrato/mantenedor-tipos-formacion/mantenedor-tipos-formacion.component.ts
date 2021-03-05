import { Component, OnInit } from '@angular/core';
import { FormacionService } from 'src/app/services/api/formacion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng-lts/api';

@Component({
  selector: 'app-mantenedor-tipos-formacion',
  templateUrl: './mantenedor-tipos-formacion.component.html',
  styleUrls: ['./mantenedor-tipos-formacion.component.css']
})
export class MantenedorTiposFormacionComponent implements OnInit {

  lstTiposFormacion: any[] = [];
  displayBasic = false;
  tipoFormacionForm: FormGroup;
  loading = false;
  tipoFormacionActual ={
    id:'',
    nombre:''
  }

  constructor( private formacionService: FormacionService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService ) { 

      this.tipoFormacionForm = this.formBuilder.group({
        nombre: ['', Validators.required]
      })
    }

  ngOnInit(): void {
    this.formacionService.getTiposFormacion().subscribe(
      (result: any) =>{
        this.lstTiposFormacion = result;
      }
    )
  }

  get cF(){
    return this.tipoFormacionForm.controls;
  }

  showBasicDialog(tipoFormacion:any = null) {
    this.displayBasic = true;
    if(tipoFormacion == null){
      this.tipoFormacionActual= {
        id:'',
        nombre:''
      }
    }else{
      this.tipoFormacionActual = {
        id:tipoFormacion.id,
        nombre:tipoFormacion.nombre
      }
    }
  }

  onSubmitTipoFormacion(){
   if(this.tipoFormacionActual.id != ''){
      console.log('Modificar');
      this.loading = true;
      if(this.tipoFormacionForm.invalid){
        this.loading = false;
      }
      else 
     { this.formacionService.putTiposFormacion(this.tipoFormacionActual.id, this.tipoFormacionForm.value.nombre).subscribe(() =>{
        this.formacionService.getTiposFormacion().subscribe(tiposFormacion=>{
          this.lstTiposFormacion=tiposFormacion;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
    else{
      console.log('Añadir');
      this.loading = true;
      if(this.tipoFormacionForm.invalid){
        this.loading = false;
      }
      else 
     { this.formacionService.postTiposFormacion(this.tipoFormacionForm.value.nombre).subscribe(() =>{
        this.formacionService.getTiposFormacion().subscribe(tiposFormacion=>{
          this.lstTiposFormacion=tiposFormacion;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
  }

  onCloseTipoFormacionDialog(){
    this.tipoFormacionForm.reset();
  }

  confirmDeleteTipoFormacion(id: any){
    this.confirmationService.confirm({
      message: '¿Está seguro de que desea eliminar este registro?',
      accept: ()=> {this.deleteData(id)}
    })
  }

  deleteData(id: any){
    this.formacionService.deleteTiposFormacion(id).subscribe(() =>{
      this.formacionService.getTiposFormacion().subscribe(tiposFormacion=>{
        this.lstTiposFormacion=tiposFormacion;
      })
    })
  }

  putData(data: any){
    this.formacionService.putTiposFormacion(data.id, data.nombre).subscribe(() =>{
      this.formacionService.getTiposFormacion().subscribe(tiposFormacion=>{
        this.lstTiposFormacion=tiposFormacion;
      })
      this.displayBasic = false;
      this.loading = false;
    })
  }
}
