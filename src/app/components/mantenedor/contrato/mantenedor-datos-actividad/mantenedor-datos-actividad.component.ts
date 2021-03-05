import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActividadService } from 'src/app/services/api/actividad.service';

@Component({
  selector: 'app-mantenedor-datos-actividad',
  templateUrl: './mantenedor-datos-actividad.component.html',
  styleUrls: ['./mantenedor-datos-actividad.component.css']
})
export class MantenedorDatosActividadComponent implements OnInit {

  lstDatosActividad: any[] = [];
  displayBasic = false;
  cargoForm: FormGroup;
  loading = false;

  constructor( private datoActividad: ActividadService, private formBuilder: FormBuilder ) { 
    this.cargoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      tiempo_maximo: ['', Validators.required],
      tiempo_minimo: ['', Validators.required],
      cargo: ['', Validators.required],

    })
  }

  ngOnInit(): void {
    this.datoActividad.getDatosActividad().subscribe(
      (result: any) =>{
        this.lstDatosActividad = result;
      }
    )
  }

  showBasicDialog(){
    this.displayBasic = true;
  }

  onCloseCargoDialog(){
    this.cargoForm.reset();
  }

  get cF(){
    return this.cargoForm.controls;
  }

  onSubmitCargo(){
    this.loading = true;
    if(this.cargoForm.invalid){
    this.loading = false;
    }
    else 
   { this.datoActividad.postDatosActividad(this.cargoForm.value.nombre, this.cargoForm.value.descripcion, this.cargoForm.value.tiempo_maximo, this.cargoForm.value.tiempo_minimo, this.cargoForm.value.cargo).subscribe(() =>{
      this.datoActividad.getDatosActividad().subscribe(data=>{
      this.lstDatosActividad=data;
      })
      console.log(this.cargoForm.value.cargo);
      this.displayBasic = false;
      this.loading = false;
    })}
  }
}
