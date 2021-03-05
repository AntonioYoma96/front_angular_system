import { Component, OnInit } from '@angular/core';
import { FormacionService } from 'src/app/services/api/formacion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng-lts/api';

@Component({
  selector: 'app-mantenedor-carrera',
  templateUrl: './mantenedor-carrera.component.html',
  styleUrls: ['./mantenedor-carrera.component.css']
})
export class MantenedorCarreraComponent implements OnInit {

  ltsCarreras: any[] = [];
  displayBasic = false;
  carreraForm: FormGroup;
  loading = false;
  carreraActual ={
    id:'',
    nombre:''
  }

  constructor( private formacionService: FormacionService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService ) { 
      this.carreraForm = this.formBuilder.group({
        nombre: ['', Validators.required]
      })
     }

  ngOnInit(): void {
    this.formacionService.getCarreras().subscribe(
      (result: any) =>{
        this.ltsCarreras = result;
      }
    )
  }

  get cF(){
    return this.carreraForm.controls;
  }

  showBasicDialog(carrera:any = null) {
    this.displayBasic = true;
    if(carrera == null){
      this.carreraActual= {
        id:'',
        nombre:''
      }
    }else{
      this.carreraActual = {
        id:carrera.id,
        nombre:carrera.nombre
      }
    }
  }

  onSubmitCarrera(){
   if(this.carreraActual.id != ''){
      console.log('Modificar');
      this.loading = true;
      if(this.carreraForm.invalid){
        this.loading = false;
      }
      else 
     { this.formacionService.putCarreras(this.carreraActual.id, this.carreraForm.value.nombre).subscribe(() =>{
        this.formacionService.getCarreras().subscribe(carreras=>{
          this.ltsCarreras=carreras;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
    else{
      console.log('Añadir');
      this.loading = true;
      if(this.carreraForm.invalid){
        this.loading = false;
      }
      else 
     { this.formacionService.postCarreras(this.carreraForm.value.nombre).subscribe(() =>{
        this.formacionService.getCarreras().subscribe(carreras=>{
          this.ltsCarreras=carreras;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
  }

  onCloseCarreraDialog(){
    this.carreraForm.reset();
  }

  confirmDeleteCarrera(id: any){
    this.confirmationService.confirm({
      message: '¿Está seguro de que desea eliminar este registro?',
      accept: ()=> {this.deleteData(id)}
    })
  }

  deleteData(id: any){
    this.formacionService.deleteCarreras(id).subscribe(() =>{
      this.formacionService.getCarreras().subscribe(carreras=>{
        this.ltsCarreras=carreras;
      })
    })
  }

  putData(data: any){
    this.formacionService.putCarreras(data.id, data.nombre).subscribe(() =>{
      this.formacionService.getCarreras().subscribe(carreras=>{
        this.ltsCarreras=carreras;
      })
      this.displayBasic = false;
      this.loading = false;
    })
  }
}
