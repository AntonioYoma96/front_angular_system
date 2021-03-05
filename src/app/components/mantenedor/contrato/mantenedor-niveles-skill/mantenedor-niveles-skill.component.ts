import { Component, OnInit } from '@angular/core';
import { ColaboradorService } from 'src/app/services/api/colaborador.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng-lts/api';

@Component({
  selector: 'app-mantenedor-niveles-skill',
  templateUrl: './mantenedor-niveles-skill.component.html',
  styleUrls: ['./mantenedor-niveles-skill.component.css']
})
export class MantenedorNivelesSkillComponent implements OnInit {

  lstNivelesSkill: any[] = [];
  displayBasic = false;
  nivelSkillForm: FormGroup;
  loading = false;
  nivelSkillActual ={
    id:'',
    nombre:''
  }

  constructor( private colaboradorService: ColaboradorService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService ) { 

      this.nivelSkillForm = this.formBuilder.group({
        nombre: ['', Validators.required]
      })
     }

  ngOnInit(): void {
    this.colaboradorService.getNivelesSkill().subscribe(
      (result: any) =>{
        this.lstNivelesSkill = result;
      }
    )
  }

  get cF(){
    return this.nivelSkillForm.controls;
  }

  showBasicDialog(nivelSkill:any = null) {
    this.displayBasic = true;
    if(nivelSkill == null){
      this.nivelSkillActual= {
        id:'',
        nombre:''
      }
    }else{
      this.nivelSkillActual = {
        id:nivelSkill.id,
        nombre:nivelSkill.nombre
      }
    }
  }

  onSubmitNivelSkill(){
   if(this.nivelSkillActual.id != ''){
      console.log('Modificar');
      this.loading = true;
      if(this.nivelSkillForm.invalid){
        this.loading = false;
      }
      else 
     { this.colaboradorService.putNivelesSkill(this.nivelSkillActual.id, this.nivelSkillForm.value.nombre).subscribe(() =>{
        this.colaboradorService.getNivelesSkill().subscribe(nivelSkill=>{
          this.lstNivelesSkill=nivelSkill;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
    else{
      console.log('Añadir');
      this.loading = true;
      if(this.nivelSkillForm.invalid){
        this.loading = false;
      }
      else 
     { this.colaboradorService.postNivelesSkill(this.nivelSkillForm.value.nombre).subscribe(() =>{
        this.colaboradorService.getNivelesSkill().subscribe(nivelSkill=>{
          this.lstNivelesSkill=nivelSkill;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
  }

  onCloseNivelSkillDialog(){
    this.nivelSkillForm.reset();
  }

  confirmDeleteNivelSkill(id: any){
    this.confirmationService.confirm({
      message: '¿Está seguro de que desea eliminar este registro?',
      accept: ()=> {this.deleteData(id)}
    })
  }

  deleteData(id: any){
    this.colaboradorService.deleteNivelesSkill(id).subscribe(() =>{
      this.colaboradorService.getNivelesSkill().subscribe(nivelSkill=>{
        this.lstNivelesSkill=nivelSkill;
      })
    })
  }

  putData(data: any){
    this.colaboradorService.putNivelesSkill(data.id, data.nombre).subscribe(() =>{
      this.colaboradorService.getNivelesSkill().subscribe(nivelSkill=>{
        this.lstNivelesSkill=nivelSkill;
      })
      this.displayBasic = false;
      this.loading = false;
    })
  }
}
