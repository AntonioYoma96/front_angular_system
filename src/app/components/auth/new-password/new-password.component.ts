import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MessageService } from 'primeng-lts/api';
import { ValidadorService } from '../../../services/validador.service'




@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  newPasswordForm: FormGroup;
  contra1: string = '';
  contra2: string = '';
  uidb64: string = '';
  decodeUidb64: string = ''
  token: string = ''


  constructor( private formBuilder: FormBuilder,
               private newPassword: AuthenticationService,
               private route: ActivatedRoute,
               private messageService: MessageService,
               private router: Router,
               private validate: ValidadorService ) {

    this.newPasswordForm = this.formBuilder.group({
      password1: [
        '',
         [
           Validators.required, Validators.minLength(8), this.validate.validateChar, this.validate.validateNum, this.validate.validateSpace, this.validate.validateSymbols, this.validate.validateUpper]],
      password2: ['', Validators.required]

    });

   }

  ngOnInit(): void {
    this.uidb64 = this.route.snapshot.queryParams["uidb64"]
    this.decodeUidb64 = atob(this.uidb64)
    this.token = this.route.snapshot.queryParams["token"]
    
  }

  public newMessage(
    title: string,
    description: string,
    severity = 'info'
  ): void {
    this.messageService.add({
      severity,
      summary: title,
      detail: description,
    });
  }


  submitNewPassword(){

    this.contra1 = this.newPasswordForm.value.password1;
    this.contra2 = this.newPasswordForm.value.password2;

    if (this.contra1 === this.contra2){
      this.newPassword.newPassword(
        this.decodeUidb64,
        this.contra1,
        this.contra2,
        this.uidb64,
        this.token
        )
        .subscribe({
          next: (data) => {
            console.log(data)
            this.router.navigate(['/login'],{queryParams:{id: 'Contraseña-Modificada'}})
            this.messageService.add({severity:'succes', summary:'Contraseña modificada', detail:'Su contraseña ha sido modificada con éxito'})

          },
          error: (err) => {
            if(err.status == 400){
              console.log('La contraseña no satisface los requerimientos');
              this.newMessage('La contraseña no cumple con los requerimientos', 'errorMessage', 'error');

            }
            else if(err.status == 403){
              console.log('Token caducado')
              this.newMessage('Token caducado', 'errorMessage', 'error');
              this.router.navigate(['/login'],{queryParams:{id: 'Error:Tiempo_Agotado'}})
            }else{
              console.log('Hay problemas');
            }
          }
        })
    }else{
      console.log('Son diferentes');
      
    }


  }

  
  
  get lF(): { [p: string]: AbstractControl } {
    return this.newPasswordForm.controls;
  }

}
