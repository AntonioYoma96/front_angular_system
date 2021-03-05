import { Component, OnInit } from '@angular/core';
import { ContratoService } from 'src/app/services/api/contrato.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng-lts/api';

@Component({
  selector: 'app-mantenedor-previsiones-salud',
  templateUrl: './mantenedor-previsiones-salud.component.html',
  styleUrls: ['./mantenedor-previsiones-salud.component.css']
})
export class MantenedorPrevisionesSaludComponent implements OnInit {

  lstPrevisionesSalud: any[] = [];
  displayBasic = false;
  previsionSaludForm: FormGroup;
  loading = false;
  previsionSaludActual ={
    id:'',
    nombre:''
  }

  constructor( private contratoService: ContratoService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService ) { 

      this.previsionSaludForm = this.formBuilder.group({
        nombre: ['', Validators.required]
      })
     }

  ngOnInit(): void {
    this.contratoService.getPrevisionesSalud().subscribe(
      (result: any) =>{
        this.lstPrevisionesSalud = result;
      }
    )
  }

  get cF(){
    return this.previsionSaludForm.controls;
  }

  showBasicDialog(previsionSalud:any = null) {
    this.displayBasic = true;
    if(previsionSalud == null){
      this.previsionSaludActual= {
        id:'',
        nombre:''
      }
    }else{
      this.previsionSaludActual = {
        id:previsionSalud.id,
        nombre:previsionSalud.nombre
      }
    }
  }

  onSubmitPrevisionSalud(){
   if(this.previsionSaludActual.id != ''){
      console.log('Modificar');
      this.loading = true;
      if(this.previsionSaludForm.invalid){
        this.loading = false;
      }
      else 
     { this.contratoService.putPrevisionesSalud(this.previsionSaludActual.id, this.previsionSaludForm.value.nombre).subscribe(() =>{
        this.contratoService.getPrevisionesSalud().subscribe(previsionesSalud=>{
          this.lstPrevisionesSalud=previsionesSalud;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
    else{
      console.log('Añadir');
      this.loading = true;
      if(this.previsionSaludForm.invalid){
        this.loading = false;
      }
      else 
     { this.contratoService.postPrevisionesSalud(this.previsionSaludForm.value.nombre).subscribe(() =>{
        this.contratoService.getPrevisionesSalud().subscribe(previsionesSalud=>{
          this.lstPrevisionesSalud=previsionesSalud;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
  }

  onClosePrevisionSaludDialog(){
    this.previsionSaludForm.reset();
  }

  confirmDeletePrevisionSalud(id: any){
    this.confirmationService.confirm({
      message: '¿Está seguro de que desea eliminar este registro?',
      accept: ()=> {this.deleteData(id)}
    })
  }

  deleteData(id: any){
    this.contratoService.deletePrevisionesSalud(id).subscribe(() =>{
      this.contratoService.getPrevisionesSalud().subscribe(previsionesSalud=>{
        this.lstPrevisionesSalud=previsionesSalud;
      })
    })
  }

  putData(data: any){
    this.contratoService.putPrevisionesSalud(data.id, data.nombre).subscribe(() =>{
      this.contratoService.getPrevisionesSalud().subscribe(previsionesSalud=>{
        this.lstPrevisionesSalud=previsionesSalud;
      })
      this.displayBasic = false;
      this.loading = false;
    })
  }
}
