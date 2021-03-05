import { Component, OnInit } from '@angular/core';
import { OrganizacionService } from 'src/app/services/api/organizacion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng-lts/api';

@Component({
  selector: 'app-mantenedor-areas-funcionales',
  templateUrl: './mantenedor-areas-funcionales.component.html',
  styleUrls: ['./mantenedor-areas-funcionales.component.css']
})
export class MantenedorAreasFuncionalesComponent implements OnInit {

  lstAreasFuncionales: any[] = [];
  displayBasic = false;
  areasFuncionalesForm: FormGroup;
  loading = false;
  areaFuncionalActual ={
    id:'',
    nombre:''
  }

  constructor( private organizacionService: OrganizacionService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService ) {
      this.areasFuncionalesForm = this.formBuilder.group({
        nombre: ['', Validators.required]
      })
     }

  ngOnInit(): void {
    this.organizacionService.getAreasFuncionales().subscribe(
      (result: any) =>{
        this.lstAreasFuncionales = result;
      }
    )
  }

  get cF(){
    return this.areasFuncionalesForm.controls;
  }

  showBasicDialog(areaF:any = null) {
    this.displayBasic = true;
    if(areaF == null){
      this.areaFuncionalActual= {
        id:'',
        nombre:''
      }
    }else{
      this.areaFuncionalActual = {
        id:areaF.id,
        nombre:areaF.nombre
      }
    }
  }

  onSubmitAreaFuncional(){
   if(this.areaFuncionalActual.id != ''){
      console.log('Modificar');
      this.loading = true;
      if(this.areasFuncionalesForm.invalid){
        this.loading = false;
      }
      else 
     { this.organizacionService.putAreasFuncionales(this.areaFuncionalActual.id, this.areasFuncionalesForm.value.nombre).subscribe(() =>{
        this.organizacionService.getAreasFuncionales().subscribe(areaF=>{
          this.lstAreasFuncionales=areaF;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
    else{
      console.log('Añadir');
      this.loading = true;
      if(this.areasFuncionalesForm.invalid){
        this.loading = false;
      }
      else 
     { this.organizacionService.postAreasFuncionales(this.areasFuncionalesForm.value.nombre).subscribe(() =>{
        this.organizacionService.getAreasFuncionales().subscribe(areaF=>{
          this.lstAreasFuncionales=areaF;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
  }

  onCloseAreaFuncionalDialog(){
    this.areasFuncionalesForm.reset();
  }

  confirmDeleteAreaFuncional(id: any){
    this.confirmationService.confirm({
      message: '¿Está seguro de que desea eliminar este registro?',
      accept: ()=> {this.deleteData(id)}
    })
  }

  deleteData(id: any){
    this.organizacionService.deleteAreasFuncionales(id).subscribe(() =>{
      this.organizacionService.getAreasFuncionales().subscribe(areaF=>{
        this.lstAreasFuncionales=areaF;
      })
    })
  }

  putData(data: any){
    this.organizacionService.putAreasFuncionales(data.id, data.nombre).subscribe(() =>{
      this.organizacionService.getAreasFuncionales().subscribe(areaF=>{
        this.lstAreasFuncionales=areaF;
      })
      this.displayBasic = false;
      this.loading = false;
    })
  }

}
