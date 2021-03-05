import { Component, OnInit, ViewChild } from '@angular/core';
import { ContratoService } from 'src/app/services/api/contrato.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng-lts/api';

@Component({
  selector: 'app-mantenedor-bancos',
  templateUrl: './mantenedor-bancos.component.html',
  styleUrls: ['./mantenedor-bancos.component.css']
})
export class MantenedorBancosComponent implements OnInit {

  lstBancos: any[] = [];
  displayBasic = false;
  bancoForm: FormGroup;
  loading = false;
  bancoActual ={
    id:'',
    nombre:''
  }

  constructor( private contratoService: ContratoService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService ) { 
      this.bancoForm = this.formBuilder.group({
        nombre: ['', Validators.required]
      })
     }

  ngOnInit(): void {
    this.contratoService.getBancos().subscribe(
      (result: any) =>{
        this.lstBancos = result;
      }
    )
  }

  get cF(){
    return this.bancoForm.controls;
  }

  showBasicDialog(banco:any = null) {
    this.displayBasic = true;
    if(banco == null){
      this.bancoActual= {
        id:'',
        nombre:''
      }
    }else{
      this.bancoActual = {
        id:banco.id,
        nombre:banco.nombre
      }
    }
  }

  onSubmitBanco(){
   if(this.bancoActual.id != ''){
      console.log('Modificar');
      this.loading = true;
      if(this.bancoForm.invalid){
        this.loading = false;
      }
      else 
     { this.contratoService.putBancos(this.bancoActual.id, this.bancoForm.value.nombre).subscribe(() =>{
        this.contratoService.getBancos().subscribe(bancos=>{
          this.lstBancos=bancos;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
    else{
      console.log('Añadir');
      this.loading = true;
      if(this.bancoForm.invalid){
        this.loading = false;
      }
      else 
     { this.contratoService.postBancos(this.bancoForm.value.nombre).subscribe(() =>{
        this.contratoService.getBancos().subscribe(bancos=>{
          this.lstBancos=bancos;
        })
        this.displayBasic = false;
        this.loading = false;
      })}
    }
  }

  onCloseBancoDialog(){
    this.bancoForm.reset();
  }

  confirmDeleteBanco(id: any){
    this.confirmationService.confirm({
      message: '¿Está seguro de que desea eliminar este registro?',
      accept: ()=> {this.deleteData(id)}
    })
  }

  deleteData(id: any){
    this.contratoService.deleteBancos(id).subscribe(() =>{
      this.contratoService.getBancos().subscribe(bancos=>{
        this.lstBancos=bancos;
      })
    })
  }

  putData(data: any){
    this.contratoService.putBancos(data.id, data.nombre).subscribe(() =>{
      this.contratoService.getBancos().subscribe(bancos=>{
        this.lstBancos=bancos;
      })
      this.displayBasic = false;
      this.loading = false;
    })
  }
}
