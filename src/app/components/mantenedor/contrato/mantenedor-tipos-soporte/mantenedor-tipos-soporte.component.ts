import { Component, OnInit } from '@angular/core';
import { ActividadService } from 'src/app/services/api/actividad.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng-lts/api';

@Component({
  selector: 'app-mantenedor-tipos-soporte',
  templateUrl: './mantenedor-tipos-soporte.component.html',
  styleUrls: ['./mantenedor-tipos-soporte.component.css']
})
export class MantenedorTiposSoporteComponent implements OnInit {

  lstTiposSoporte: any[] = [];
  displayBasic = false;
  tipoSoporteForm: FormGroup;
  loading = false;
  tipoSoporteActual ={
    id:'',
    nombre:''
  }

  constructor( private actividadService: ActividadService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService ) { 
     
      this.tipoSoporteForm = this.formBuilder.group({
        nombre: ['', Validators.required]
      })
    }

  ngOnInit(): void {
    this.actividadService.getTiposSoporte().subscribe(
      (result: any) =>{
        this.lstTiposSoporte = result;
      }
    )
  }

  get cF(){
    return this.tipoSoporteForm.controls;
  }

  showBasicDialog(tipoSoporte:any = null) {
    this.displayBasic = true;
    if(tipoSoporte == null){
      this.tipoSoporteActual= {
        id:'',
        nombre:''
      }
    }else{
      this.tipoSoporteActual = {
        id:tipoSoporte.id,
        nombre:tipoSoporte.nombre
      }
    }
  }

  onSubmitTipoSoporte(){
   if(this.tipoSoporteActual.id != ''){
      console.log('Modificar');
      this.loading = true;
      if(this.tipoSoporteForm.invalid){
        this.loading = false;
      }
      else 
     { this.actividadService.putTiposSoporte(this.tipoSoporteActual.id, this.tipoSoporteForm.value.nombre).subscribe(() =>{
        this.actividadService.getTiposSoporte().subscribe(tipoSoporte=>{
          this.lstTiposSoporte=tipoSoporte;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
    else{
      console.log('Añadir');
      this.loading = true;
      if(this.tipoSoporteForm.invalid){
        this.loading = false;
      }
      else 
     { this.actividadService.postTiposSoporte(this.tipoSoporteForm.value.nombre).subscribe(() =>{
        this.actividadService.getTiposSoporte().subscribe(tipoSoporte=>{
          this.lstTiposSoporte=tipoSoporte;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
  }

  onCloseTipoSoporteDialog(){
    this.tipoSoporteForm.reset();
  }

  confirmDeleteTipoSoporte(id: any){
    this.confirmationService.confirm({
      message: '¿Está seguro de que desea eliminar este registro?',
      accept: ()=> {this.deleteData(id)}
    })
  }

  deleteData(id: any){
    this.actividadService.deleteTiposSoporte(id).subscribe(() =>{
      this.actividadService.getTiposSoporte().subscribe(tipoSoporte=>{
        this.lstTiposSoporte=tipoSoporte;
      })
    })
  }

  putData(data: any){
    this.actividadService.putTiposSoporte(data.id, data.nombre).subscribe(() =>{
      this.actividadService.getTiposSoporte().subscribe(tipoSoporte=>{
        this.lstTiposSoporte=tipoSoporte;
      })
      this.displayBasic = false;
      this.loading = false;
    })
  }
}
