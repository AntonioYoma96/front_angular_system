import { Component, OnInit } from '@angular/core';
import { ColaboradorService } from 'src/app/services/api/colaborador.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng-lts/api';

@Component({
  selector: 'app-mantenedor-sexos',
  templateUrl: './mantenedor-sexos.component.html',
  styleUrls: ['./mantenedor-sexos.component.css']
})
export class MantenedorSexosComponent implements OnInit {

  lstSexos: any[] = [];
  displayBasic = false;
  sexoForm: FormGroup;
  loading = false;
  sexoActual ={
    id:'',
    nombre:''
  }

  constructor( private colaboradorService: ColaboradorService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService ) { 

      this.sexoForm = this.formBuilder.group({
        nombre: ['', Validators.required]
      })
     }

  ngOnInit(): void {
    this.colaboradorService.getSexos().subscribe(
      (result: any) =>{
        this.lstSexos = result;
      }
    )
  }

  get cF(){
    return this.sexoForm.controls;
  }

  showBasicDialog(sexo:any = null) {
    this.displayBasic = true;
    if(sexo == null){
      this.sexoActual= {
        id:'',
        nombre:''
      }
    }else{
      this.sexoActual = {
        id:sexo.id,
        nombre:sexo.nombre
      }
    }
  }

  onSubmitSexo(){
   if(this.sexoActual.id != ''){
      console.log('Modificar');
      this.loading = true;
      if(this.sexoForm.invalid){
        this.loading = false;
      }
      else 
     { this.colaboradorService.putSexos(this.sexoActual.id, this.sexoForm.value.nombre).subscribe(() =>{
        this.colaboradorService.getSexos().subscribe(sexos=>{
          this.lstSexos=sexos;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
    else{
      console.log('Añadir');
      this.loading = true;
      if(this.sexoForm.invalid){
        this.loading = false;
      }
      else 
     { this.colaboradorService.postSexos(this.sexoForm.value.nombre).subscribe(() =>{
        this.colaboradorService.getSexos().subscribe(sexos=>{
          this.lstSexos=sexos;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
  }

  onCloseSexoDialog(){
    this.sexoForm.reset();
  }

  confirmDeleteSexo(id: any){
    this.confirmationService.confirm({
      message: '¿Está seguro de que desea eliminar este registro?',
      accept: ()=> {this.deleteData(id)}
    })
  }

  deleteData(id: any){
    this.colaboradorService.deleteSexos(id).subscribe(() =>{
      this.colaboradorService.getSexos().subscribe(sexos=>{
        this.lstSexos=sexos;
      })
    })
  }

  putData(data: any){
    this.colaboradorService.putSexos(data.id, data.nombre).subscribe(() =>{
      this.colaboradorService.getSexos().subscribe(sexos=>{
        this.lstSexos=sexos;
      })
      this.displayBasic = false;
      this.loading = false;
    })
  }
}
