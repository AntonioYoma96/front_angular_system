import { Component, OnInit } from '@angular/core';
import { ColaboradorService } from 'src/app/services/api/colaborador.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng-lts/api';

@Component({
  selector: 'app-mantenedor-skills',
  templateUrl: './mantenedor-skills.component.html',
  styleUrls: ['./mantenedor-skills.component.css']
})
export class MantenedorSkillsComponent implements OnInit {

  lstSkills: any[] = [];
  displayBasic = false;
  skillForm: FormGroup;
  loading = false;
  skillActual ={
    id:'',
    nombre:''
  }

  constructor( private colaboradorService: ColaboradorService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService ) { 

      this.skillForm = this.formBuilder.group({
        nombre: ['', Validators.required]
      })
     }

  ngOnInit(): void {
    this.colaboradorService.getSkills().subscribe(
      (result: any) =>{
        this.lstSkills = result;
      }
    )
  }

  get cF(){
    return this.skillForm.controls;
  }

  showBasicDialog(skill:any = null) {
    this.displayBasic = true;
    if(skill == null){
      this.skillActual= {
        id:'',
        nombre:''
      }
    }else{
      this.skillActual = {
        id:skill.id,
        nombre:skill.nombre
      }
    }
  }

  onSubmitSkill(){
   if(this.skillActual.id != ''){
      console.log('Modificar');
      this.loading = true;
      if(this.skillForm.invalid){
        this.loading = false;
      }
      else 
     { this.colaboradorService.putSkills(this.skillActual.id, this.skillForm.value.nombre).subscribe(() =>{
        this.colaboradorService.getSkills().subscribe(skills=>{
          this.lstSkills=skills;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
    else{
      console.log('Añadir');
      this.loading = true;
      if(this.skillForm.invalid){
        this.loading = false;
      }
      else 
     { this.colaboradorService.postSkills(this.skillForm.value.nombre).subscribe(() =>{
        this.colaboradorService.getSkills().subscribe(skills=>{
          this.lstSkills=skills;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
  }

  onCloseSkillDialog(){
    this.skillForm.reset();
  }

  confirmDeleteSkill(id: any){
    this.confirmationService.confirm({
      message: '¿Está seguro de que desea eliminar este registro?',
      accept: ()=> {this.deleteData(id)}
    })
  }

  deleteData(id: any){
    this.colaboradorService.deleteSkills(id).subscribe(() =>{
      this.colaboradorService.getSkills().subscribe(skills=>{
        this.lstSkills=skills;
      })
    })
  }

  putData(data: any){
    this.colaboradorService.putSkills(data.id, data.nombre).subscribe(() =>{
      this.colaboradorService.getSkills().subscribe(skills=>{
        this.lstSkills=skills;
      })
      this.displayBasic = false;
      this.loading = false;
    })
  }
}
