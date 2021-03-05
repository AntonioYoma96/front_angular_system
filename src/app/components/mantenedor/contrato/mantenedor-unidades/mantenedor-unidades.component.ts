import { Component, OnInit } from '@angular/core';
import { OrganizacionService } from 'src/app/services/api/organizacion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng-lts/api';

@Component({
  selector: 'app-mantenedor-unidades',
  templateUrl: './mantenedor-unidades.component.html',
  styleUrls: ['./mantenedor-unidades.component.css']
})
export class MantenedorUnidadesComponent implements OnInit {

  lstUnidades: any[] = [];
  displayBasic = false;
  unidadForm: FormGroup;
  loading = false;
  unidadActual ={
    id:'',
    nombre:'',
    area:''
  }

  constructor( private organizacionService: OrganizacionService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService ) { 

      this.unidadForm = this.formBuilder.group({
        nombre: ['', Validators.required]
      })
    }

  ngOnInit(): void {
    this.organizacionService.getUnidades().subscribe(
      (result: any) =>{
        this.lstUnidades = result;
      }
    )
  }

  get cF(){
    return this.unidadForm.controls;
  }

  showBasicDialog(unidad:any = null) {
    this.displayBasic = true;
    if(unidad == null){
      this.unidadActual= {
        id:'',
        nombre:'',
        area:''
      }
    }else{
      this.unidadActual = {
        id:unidad.id,
        nombre:unidad.nombre,
        area:unidad.area_funcional
      }
    }
  }

  onSubmitUnidad(){
   if(this.unidadActual.id != ''){
      console.log('Modificar');
      this.loading = true;
      if(this.unidadForm.invalid){
        this.loading = false;
      }
      else 
     { this.organizacionService.putUnidades(this.unidadActual.id, this.unidadForm.value.nombre).subscribe(() =>{
        this.organizacionService.getUnidades().subscribe(unidad=>{
          this.lstUnidades=unidad;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
    else{
      console.log('Añadir');
      this.loading = true;
      if(this.unidadForm.invalid){
        this.loading = false;
      }
      else 
     { this.organizacionService.postUnidades(this.unidadForm.value.nombre).subscribe(() =>{
        this.organizacionService.getUnidades().subscribe(unidad=>{
          this.lstUnidades=unidad;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
  }

  onCloseUnidadDialog(){
    this.unidadForm.reset();
  }

  confirmDeleteUnidad(id: any){
    this.confirmationService.confirm({
      message: '¿Está seguro de que desea eliminar este registro?',
      accept: ()=> {this.deleteData(id)}
    })
  }

  deleteData(id: any){
    this.organizacionService.deleteUnidades(id).subscribe(() =>{
      this.organizacionService.getUnidades().subscribe(unidad=>{
        this.lstUnidades=unidad;
      })
    })
  }

  putData(data: any){
    this.organizacionService.putUnidades(data.id, data.nombre).subscribe(() =>{
      this.organizacionService.getUnidades().subscribe(unidad=>{
        this.lstUnidades=unidad;
      })
      this.displayBasic = false;
      this.loading = false;
    })
  }
}
