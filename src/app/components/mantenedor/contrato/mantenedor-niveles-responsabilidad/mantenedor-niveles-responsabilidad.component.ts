import { Component, OnInit } from '@angular/core';
import { OrganizacionService } from 'src/app/services/api/organizacion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng-lts/api';

@Component({
  selector: 'app-mantenedor-niveles-responsabilidad',
  templateUrl: './mantenedor-niveles-responsabilidad.component.html',
  styleUrls: ['./mantenedor-niveles-responsabilidad.component.css']
})
export class MantenedorNivelesResponsabilidadComponent implements OnInit {

  lstNivelesResponsabilidad: any[] = [];
  displayBasic = false;
  nivelResponsabilidadForm: FormGroup;
  loading = false;
  nivelResponsabilidadActual ={
    id:'',
    nombre:''
  }
  constructor( private organizacionService: OrganizacionService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService ) { 

      this.nivelResponsabilidadForm = this.formBuilder.group({
        nombre: ['', Validators.required]
      })
     }

  ngOnInit(): void {
    this.organizacionService.getNivelesResponsabilidad().subscribe(
      (result: any) =>{
        this.lstNivelesResponsabilidad = result;
      }
    )
  }

  get cF(){
    return this.nivelResponsabilidadForm.controls;
  }

  showBasicDialog(nivelResponsabilidad:any = null) {
    this.displayBasic = true;
    if(nivelResponsabilidad == null){
      this.nivelResponsabilidadActual= {
        id:'',
        nombre:''
      }
    }else{
      this.nivelResponsabilidadActual = {
        id:nivelResponsabilidad.id,
        nombre:nivelResponsabilidad.nombre
      }
    }
  }

  onSubmitNivelResponsabilidad(){
   if(this.nivelResponsabilidadActual.id != ''){
      console.log('Modificar');
      this.loading = true;
      if(this.nivelResponsabilidadForm.invalid){
        this.loading = false;
      }
      else 
     { this.organizacionService.putNivelesResponsabilidad(this.nivelResponsabilidadActual.id, this.nivelResponsabilidadForm.value.nombre).subscribe(() =>{
        this.organizacionService.getNivelesResponsabilidad().subscribe(nivelR=>{
          this.lstNivelesResponsabilidad=nivelR;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
    else{
      console.log('Añadir');
      this.loading = true;
      if(this.nivelResponsabilidadForm.invalid){
        this.loading = false;
      }
      else 
     { this.organizacionService.postNivelesResponsabilidad(this.nivelResponsabilidadForm.value.nombre).subscribe(() =>{
        this.organizacionService.getNivelesResponsabilidad().subscribe(nivelR=>{
          this.lstNivelesResponsabilidad=nivelR;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
  }

  onCloseNivelRespDialog(){
    this.nivelResponsabilidadForm.reset();
  }

  confirmDeleteNivelResp(id: any){
    this.confirmationService.confirm({
      message: '¿Está seguro de que desea eliminar este registro?',
      accept: ()=> {this.deleteData(id)}
    })
  }

  deleteData(id: any){
    this.organizacionService.deleteNivelesResponsabilidad(id).subscribe(() =>{
      this.organizacionService.getNivelesResponsabilidad().subscribe(nivelR=>{
        this.lstNivelesResponsabilidad=nivelR;
      })
    })
  }

  putData(data: any){
    this.organizacionService.putNivelesResponsabilidad(data.id, data.nombre).subscribe(() =>{
      this.organizacionService.getNivelesResponsabilidad().subscribe(nivelR=>{
        this.lstNivelesResponsabilidad=nivelR;
      })
      this.displayBasic = false;
      this.loading = false;
    })
  }
}
