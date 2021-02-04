import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng-lts/api';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit {

  recoveryForm: FormGroup;
  confirm:boolean = false;

  constructor( private formBuilder: FormBuilder,
               private recoveryPassword: AuthenticationService,
               private router: Router,
               private messageService: MessageService ) {

    this.recoveryForm = this.formBuilder.group({
      email: ['', Validators.required]
    });

   }

  ngOnInit(): void {
  }

  recovery(){
 
  console.log(this.recoveryForm.value)
  this.confirm = true;
  this.recoveryPassword.recoveryPassword( this.recoveryForm.controls.email.value ).subscribe(()=>{
    this.router.navigate(['/login'],{queryParams:{id: 'BienHecho'}})
  })
  this.messageService.add({severity:'succes', summary:'Link enviado con éxito', detail:'Dirijase a su correo e ingrese al link que le hemos enviado para modificar su contraseña'})

}

  
  get lF(): { [p: string]: AbstractControl } {
    return this.recoveryForm.controls;
  }


}
