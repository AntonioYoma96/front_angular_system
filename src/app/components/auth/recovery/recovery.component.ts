import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit {

  recoveryForm: FormGroup;

  constructor( private formBuilder: FormBuilder,
               private recoveryPassword: AuthenticationService,
               private router: Router ) {

    this.recoveryForm = this.formBuilder.group({
      email: ['', Validators.required]
    });

   }

  ngOnInit(): void {
  }

  recovery(){
 
  console.log(this.recoveryForm.value)
  this.recoveryPassword.recoveryPassword( this.recoveryForm.controls.email.value ).subscribe(()=>{
    this.router.navigate(['/login'],{queryParams:{id: 'BienHecho'}})

  })
  }

  
  get lF(): { [p: string]: AbstractControl } {
    return this.recoveryForm.controls;
  }


}
