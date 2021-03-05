import { Component, OnInit } from '@angular/core';
import { ColaboradorService } from 'src/app/services/api/colaborador.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng-lts/api';

@Component({
  selector: 'app-mantenedor-nacionalidades',
  templateUrl: './mantenedor-nacionalidades.component.html',
  styleUrls: ['./mantenedor-nacionalidades.component.css']
})
export class MantenedorNacionalidadesComponent implements OnInit {

  lstNacionalidades: any[] = [];
  displayBasic = false;
  nacionalidadForm: FormGroup;
  loading = false;
  nacionalidadActual ={
    id:'',
    nombre:''
  }

  constructor( private colaboradorService: ColaboradorService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService ) { 

      this.nacionalidadForm = this.formBuilder.group({
        nombre: ['', Validators.required]
      })
     }

  ngOnInit(): void {
    this.colaboradorService.getNacionalidades().subscribe(
      (result: any) =>{
        this.lstNacionalidades = result;
      }
    )
  }

  get cF(){
    return this.nacionalidadForm.controls;
  }

  showBasicDialog(nacionalidad:any = null) {
    this.displayBasic = true;
    if(nacionalidad == null){
      this.nacionalidadActual= {
        id:'',
        nombre:''
      }
    }else{
      this.nacionalidadActual = {
        id:nacionalidad.id,
        nombre:nacionalidad.nombre
      }
    }
  }

  onSubmitNacionalidad(){
   if(this.nacionalidadActual.id != ''){
      console.log('Modificar');
      this.loading = true;
      if(this.nacionalidadForm.invalid){
        this.loading = false;
      }
      else 
     { this.colaboradorService.putNacionalidades(this.nacionalidadActual.id, this.nacionalidadForm.value.nombre).subscribe(() =>{
        this.colaboradorService.getNacionalidades().subscribe(nacionalidades=>{
          this.lstNacionalidades=nacionalidades;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
    else{
      console.log('Añadir');
      this.loading = true;
      if(this.nacionalidadForm.invalid){
        this.loading = false;
      }
      else 
     { this.colaboradorService.postNacionalidades(this.nacionalidadForm.value.nombre).subscribe(() =>{
        this.colaboradorService.getNacionalidades().subscribe(nacionalidades=>{
          this.lstNacionalidades=nacionalidades;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
  }

  onCloseNacionalidadDialog(){
    this.nacionalidadForm.reset();
  }

  confirmDeleteNacionalidad(id: any){
    this.confirmationService.confirm({
      message: '¿Está seguro de que desea eliminar este registro?',
      accept: ()=> {this.deleteData(id)}
    })
  }

  deleteData(id: any){
    this.colaboradorService.deleteNacionalidades(id).subscribe(() =>{
      this.colaboradorService.getNacionalidades().subscribe(nacionalidades=>{
        this.lstNacionalidades=nacionalidades;
      })
    })
  }

  putData(data: any){
    this.colaboradorService.putNacionalidades(data.id, data.nombre).subscribe(() =>{
      this.colaboradorService.getNacionalidades().subscribe(nacionalidades=>{
        this.lstNacionalidades=nacionalidades;
      })
      this.displayBasic = false;
      this.loading = false;
    })
  }
}
