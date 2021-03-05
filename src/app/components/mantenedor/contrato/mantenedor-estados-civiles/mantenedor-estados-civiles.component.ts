import { Component, OnInit } from '@angular/core';
import { ColaboradorService } from 'src/app/services/api/colaborador.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng-lts/api';

@Component({
  selector: 'app-mantenedor-estados-civiles',
  templateUrl: './mantenedor-estados-civiles.component.html',
  styleUrls: ['./mantenedor-estados-civiles.component.css']
})
export class MantenedorEstadosCivilesComponent implements OnInit {

  lstEstadosCiviles: any[] = [];
  displayBasic = false;
  estadoCivilForm: FormGroup;
  loading = false;
  estadoCivilActual ={
    id:'',
    nombre:''
  }

  constructor( private colaboradorService: ColaboradorService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService ) { 

      this.estadoCivilForm = this.formBuilder.group({
        nombre: ['', Validators.required]
      })
     }

  ngOnInit(): void {
    this.colaboradorService.getEstadosCiviles().subscribe(
      (result: any) =>{
        this.lstEstadosCiviles = result;
      }
    )
  }

  get cF(){
    return this.estadoCivilForm.controls;
  }

  showBasicDialog(estadoCivil:any = null) {
    this.displayBasic = true;
    if(estadoCivil == null){
      this.estadoCivilActual= {
        id:'',
        nombre:''
      }
    }else{
      this.estadoCivilActual = {
        id:estadoCivil.id,
        nombre:estadoCivil.nombre
      }
    }
  }

  onSubmitEstadoCivil(){
   if(this.estadoCivilActual.id != ''){
      console.log('Modificar');
      this.loading = true;
      if(this.estadoCivilForm.invalid){
        this.loading = false;
      }
      else 
     { this.colaboradorService.putEstadosCiviles(this.estadoCivilActual.id, this.estadoCivilForm.value.nombre).subscribe(() =>{
        this.colaboradorService.getEstadosCiviles().subscribe(estadosC=>{
          this.lstEstadosCiviles=estadosC;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
    else{
      console.log('Añadir');
      this.loading = true;
      if(this.estadoCivilForm.invalid){
        this.loading = false;
      }
      else 
     { this.colaboradorService.postEstadosCiviles(this.estadoCivilForm.value.nombre).subscribe(() =>{
        this.colaboradorService.getEstadosCiviles().subscribe(estadosC=>{
          this.lstEstadosCiviles=estadosC;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
  }

  onCloseEstadoCivilDialog(){
    this.estadoCivilForm.reset();
  }

  confirmDeleteEstadoCivil(id: any){
    this.confirmationService.confirm({
      message: '¿Está seguro de que desea eliminar este registro?',
      accept: ()=> {this.deleteData(id)}
    })
  }

  deleteData(id: any){
    this.colaboradorService.deleteEstadosCiviles(id).subscribe(() =>{
      this.colaboradorService.getEstadosCiviles().subscribe(estadosC=>{
        this.lstEstadosCiviles=estadosC;
      })
    })
  }

  putData(data: any){
    this.colaboradorService.putEstadosCiviles(data.id, data.nombre).subscribe(() =>{
      this.colaboradorService.getEstadosCiviles().subscribe(estadosC=>{
        this.lstEstadosCiviles=estadosC;
      })
      this.displayBasic = false;
      this.loading = false;
    })
  }
}
