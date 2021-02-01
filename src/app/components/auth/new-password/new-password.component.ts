import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';



@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  newPasswordForm: FormGroup;
  contra1: string = '';
  contra2: string = '';
  confirm: boolean = false;


  constructor( private formBuilder: FormBuilder,
               private newPassword: AuthenticationService ) {

    this.newPasswordForm = this.formBuilder.group({
      password1: ['', Validators.required],
      password2: ['', Validators.required]

    });

   }

  ngOnInit(): void {
  }

  submitNewPassword(){

    this.contra1 = this.newPasswordForm.value.password1;
    this.contra2 = this.newPasswordForm.value.password2;

    if (this.contra1 === this.contra2){
      console.log('Son iguales'); 
      this.confirm = true;
    }else{
      console.log('Son diferentes');
      
    }

  }

  functionNewPassword(){
    this.newPassword.newPassword(this.contra1, this.contra2).subscribe()
  }
  
  get lF(): { [p: string]: AbstractControl } {
    return this.newPasswordForm.controls;
  }

}
