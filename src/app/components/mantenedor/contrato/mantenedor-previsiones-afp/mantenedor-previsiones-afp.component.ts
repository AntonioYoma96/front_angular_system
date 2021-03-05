import { Component, OnInit } from '@angular/core';
import { ContratoService } from 'src/app/services/api/contrato.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng-lts/api';

@Component({
  selector: 'app-mantenedor-previsiones-afp',
  templateUrl: './mantenedor-previsiones-afp.component.html',
  styleUrls: ['./mantenedor-previsiones-afp.component.css']
})
export class MantenedorPrevisionesAfpComponent implements OnInit {

  lstPrevisionesAFP: any[] = [];
  displayBasic = false;
  previsionAFPForm: FormGroup;
  loading = false;
  previsionAFPActual ={
    id:'',
    nombre:''
  }

  constructor( private contratoService: ContratoService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService ) { 

      this.previsionAFPForm = this.formBuilder.group({
        nombre: ['', Validators.required]
      })
     }

  ngOnInit(): void {
    this.contratoService.getPrevisionesAFP().subscribe(
      (result: any) =>{
        this.lstPrevisionesAFP = result;
      }
    )
  }

  get cF(){
    return this.previsionAFPForm.controls;
  }

  showBasicDialog(previsionAFP:any = null) {
    this.displayBasic = true;
    if(previsionAFP == null){
      this.previsionAFPActual= {
        id:'',
        nombre:''
      }
    }else{
      this.previsionAFPActual = {
        id:previsionAFP.id,
        nombre:previsionAFP.nombre
      }
    }
  }

  onSubmitPrevisionAFP(){
   if(this.previsionAFPActual.id != ''){
      console.log('Modificar');
      this.loading = true;
      if(this.previsionAFPForm.invalid){
        this.loading = false;
      }
      else 
     { this.contratoService.putPrevisionesAFP(this.previsionAFPActual.id, this.previsionAFPForm.value.nombre).subscribe(() =>{
        this.contratoService.getPrevisionesAFP().subscribe(previsionesAFP=>{
          this.lstPrevisionesAFP=previsionesAFP;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
    else{
      console.log('Añadir');
      this.loading = true;
      if(this.previsionAFPForm.invalid){
        this.loading = false;
      }
      else 
     { this.contratoService.postPrevisionesAFP(this.previsionAFPForm.value.nombre).subscribe(() =>{
        this.contratoService.getPrevisionesAFP().subscribe(previsionesAFP=>{
          this.lstPrevisionesAFP=previsionesAFP;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
  }

  onClosePrevisionAFPDialog(){
    this.previsionAFPForm.reset();
  }

  confirmDeletePrevisionAFP(id: any){
    this.confirmationService.confirm({
      message: '¿Está seguro de que desea eliminar este registro?',
      accept: ()=> {this.deleteData(id)}
    })
  }

  deleteData(id: any){
    this.contratoService.deletePrevisionesAFP(id).subscribe(() =>{
      this.contratoService.getPrevisionesAFP().subscribe(previsionesAFP=>{
        this.lstPrevisionesAFP=previsionesAFP;
      })
    })
  }

  putData(data: any){
    this.contratoService.putPrevisionesAFP(data.id, data.nombre).subscribe(() =>{
      this.contratoService.getPrevisionesAFP().subscribe(previsionesAFP=>{
        this.lstPrevisionesAFP=previsionesAFP;
      })
      this.displayBasic = false;
      this.loading = false;
    })
  }
}
