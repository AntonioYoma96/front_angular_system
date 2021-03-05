import { Component, OnInit } from '@angular/core';
import { OrganizacionService } from 'src/app/services/api/organizacion.service';
import { ConfirmationService } from 'primeng-lts/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mantenedor-centros-costo',
  templateUrl: './mantenedor-centros-costo.component.html',
  styleUrls: ['./mantenedor-centros-costo.component.css']
})
export class MantenedorCentrosCostoComponent implements OnInit {

  lstCentrosCosto: any[] = [];
  displayBasic = false;
  centroCostoForm: FormGroup;
  loading = false;
  centroCostoActual ={
    id:'',
    nombre:''
  }

  constructor( private organizacionService: OrganizacionService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService ) { 
      this.centroCostoForm = this.formBuilder.group({
        nombre: ['', Validators.required]
      })
     }

  ngOnInit(): void {
    this.organizacionService.getCentrosCosto().subscribe(
      (result: any) =>{
        this.lstCentrosCosto = result;
      }
    )
  }

  get cF(){
    return this.centroCostoForm.controls;
  }

  showBasicDialog(centroCosto:any = null) {
    this.displayBasic = true;
    if(centroCosto == null){
      this.centroCostoActual= {
        id:'',
        nombre:''
      }
    }else{
      this.centroCostoActual = {
        id:centroCosto.id,
        nombre:centroCosto.nombre
      }
    }
  }

  onSubmitCentroCosto(){
   if(this.centroCostoActual.id != ''){
      console.log('Modificar');
      this.loading = true;
      if(this.centroCostoForm.invalid){
        this.loading = false;
      }
      else 
     { this.organizacionService.putCentrosCosto(this.centroCostoActual.id, this.centroCostoForm.value.nombre).subscribe(() =>{
        this.organizacionService.getCentrosCosto().subscribe(centroC=>{
          this.lstCentrosCosto=centroC;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
    else{
      console.log('Añadir');
      this.loading = true;
      if(this.centroCostoForm.invalid){
        this.loading = false;
      }
      else 
     { this.organizacionService.postCentrosCosto(this.centroCostoForm.value.nombre).subscribe(() =>{
        this.organizacionService.getCentrosCosto().subscribe(centroC=>{
          this.lstCentrosCosto=centroC;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
  }

  onCloseCentroCostoDialog(){
    this.centroCostoForm.reset();
  }

  confirmDeleteCentroCosto(id: any){
    this.confirmationService.confirm({
      message: '¿Está seguro de que desea eliminar este registro?',
      accept: ()=> {this.deleteData(id)}
    })
  }

  deleteData(id: any){
    this.organizacionService.deleteCentrosCosto(id).subscribe(() =>{
      this.organizacionService.getCentrosCosto().subscribe(centroC=>{
        this.lstCentrosCosto=centroC;
      })
    })
  }

  putData(data: any){
    this.organizacionService.putCentrosCosto(data.id, data.nombre).subscribe(() =>{
      this.organizacionService.getCentrosCosto().subscribe(centroC=>{
        this.lstCentrosCosto=centroC;
      })
      this.displayBasic = false;
      this.loading = false;
    })
  }
}
