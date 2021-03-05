import { Component, OnInit } from '@angular/core';
import { FormacionService } from 'src/app/services/api/formacion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng-lts/api';

@Component({
  selector: 'app-mantenedor-tipos-institucion',
  templateUrl: './mantenedor-tipos-institucion.component.html',
  styleUrls: ['./mantenedor-tipos-institucion.component.css']
})
export class MantenedorTiposInstitucionComponent implements OnInit {

  lstTiposInstitucion: any[] = [];
  displayBasic = false;
  tipoInstitucionForm: FormGroup;
  loading = false;
  tipoInstitucionActual ={
    id:'',
    nombre:''
  }

  constructor( private formacionService: FormacionService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService ) {

      this.tipoInstitucionForm = this.formBuilder.group({
        nombre: ['', Validators.required]
      })
     }

  ngOnInit(): void {
    this.formacionService.getTiposInstitucion().subscribe(
      (result: any) =>{
        this.lstTiposInstitucion = result;
      }
    )
  }

  get cF(){
    return this.tipoInstitucionForm.controls;
  }

  showBasicDialog(tipoInstitucion:any = null) {
    this.displayBasic = true;
    if(tipoInstitucion == null){
      this.tipoInstitucionActual= {
        id:'',
        nombre:''
      }
    }else{
      this.tipoInstitucionActual = {
        id:tipoInstitucion.id,
        nombre:tipoInstitucion.nombre
      }
    }
  }

  onSubmitTipoInstitucion(){
   if(this.tipoInstitucionActual.id != ''){
      console.log('Modificar');
      this.loading = true;
      if(this.tipoInstitucionForm.invalid){
        this.loading = false;
      }
      else 
     { this.formacionService.putTiposInstitucion(this.tipoInstitucionActual.id, this.tipoInstitucionForm.value.nombre).subscribe(() =>{
        this.formacionService.getTiposInstitucion().subscribe(tipoInstitucion=>{
          this.lstTiposInstitucion=tipoInstitucion;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
    else{
      console.log('Añadir');
      this.loading = true;
      if(this.tipoInstitucionForm.invalid){
        this.loading = false;
      }
      else 
     { this.formacionService.postTiposInstitucion(this.tipoInstitucionForm.value.nombre).subscribe(() =>{
        this.formacionService.getTiposInstitucion().subscribe(tipoInstitucion=>{
          this.lstTiposInstitucion=tipoInstitucion;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
  }

  onCloseTipoInstitucionDialog(){
    this.tipoInstitucionForm.reset();
  }

  confirmDeleteTipoInstitucion(id: any){
    this.confirmationService.confirm({
      message: '¿Está seguro de que desea eliminar este registro?',
      accept: ()=> {this.deleteData(id)}
    })
  }

  deleteData(id: any){
    this.formacionService.deleteTiposInstitucion(id).subscribe(() =>{
      this.formacionService.getTiposInstitucion().subscribe(tipoInstitucion=>{
        this.lstTiposInstitucion=tipoInstitucion;
      })
    })
  }

  putData(data: any){
    this.formacionService.putTiposInstitucion(data.id, data.nombre).subscribe(() =>{
      this.formacionService.getTiposInstitucion().subscribe(tipoInstitucion=>{
        this.lstTiposInstitucion=tipoInstitucion;
      })
      this.displayBasic = false;
      this.loading = false;
    })
  }
}
