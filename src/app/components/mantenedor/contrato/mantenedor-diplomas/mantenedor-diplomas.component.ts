import { Component, OnInit } from '@angular/core';
import { FormacionService } from 'src/app/services/api/formacion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng-lts/api';

@Component({
  selector: 'app-mantenedor-diplomas',
  templateUrl: './mantenedor-diplomas.component.html',
  styleUrls: ['./mantenedor-diplomas.component.css']
})
export class MantenedorDiplomasComponent implements OnInit {

  lstDiplomas: any[] = [];
  displayBasic = false;
  diplomaForm: FormGroup;
  loading = false;
  diplomaActual ={
    id:'',
    nombre:''
  }

  constructor( private formacionService: FormacionService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService ) { 
      
      this.diplomaForm = this.formBuilder.group({
        nombre: ['', Validators.required]
      })
     }

  ngOnInit(): void {
    this.formacionService.getDiplomas().subscribe(
      (result: any) =>{
        this.lstDiplomas = result;
      }
    )
  }
  get cF(){
    return this.diplomaForm.controls;
  }

  showBasicDialog(diploma:any = null) {
    this.displayBasic = true;
    if(diploma == null){
      this.diplomaActual= {
        id:'',
        nombre:''
      }
    }else{
      this.diplomaActual = {
        id:diploma.id,
        nombre:diploma.nombre
      }
    }
  }

  onSubmitDiploma(){
   if(this.diplomaActual.id != ''){
      console.log('Modificar');
      this.loading = true;
      if(this.diplomaForm.invalid){
        this.loading = false;
      }
      else 
     { this.formacionService.putDiplomas(this.diplomaActual.id, this.diplomaForm.value.nombre).subscribe(() =>{
        this.formacionService.getDiplomas().subscribe(diplomas=>{
          this.lstDiplomas=diplomas;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
    else{
      console.log('Añadir');
      this.loading = true;
      if(this.diplomaForm.invalid){
        this.loading = false;
      }
      else 
     { this.formacionService.postDiplomas(this.diplomaForm.value.nombre).subscribe(() =>{
        this.formacionService.getDiplomas().subscribe(diplomas=>{
          this.lstDiplomas=diplomas;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
  }

  onCloseDiplomaDialog(){
    this.diplomaForm.reset();
  }

  confirmDeleteDiploma(id: any){
    this.confirmationService.confirm({
      message: '¿Está seguro de que desea eliminar este registro?',
      accept: ()=> {this.deleteData(id)}
    })
  }

  deleteData(id: any){
    this.formacionService.deleteDiplomas(id).subscribe(() =>{
      this.formacionService.getDiplomas().subscribe(diplomas=>{
        this.lstDiplomas=diplomas;
      })
    })
  }

  putData(data: any){
    this.formacionService.putDiplomas(data.id, data.nombre).subscribe(() =>{
      this.formacionService.getDiplomas().subscribe(diplomas=>{
        this.lstDiplomas=diplomas;
      })
      this.displayBasic = false;
      this.loading = false;
    })
  }
}
