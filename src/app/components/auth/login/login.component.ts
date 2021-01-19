import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng-lts/api';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  returnUrl = '';
  httpError: any;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private helperService: HelperService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    if (authenticationService.credentialValue) {
      this.router.navigate(['']);
    }
    this.helperService.errorMessage.subscribe((res) => {
      this.httpError = res;
    });
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    if (this.httpError.title) {
      this.messageService.add({
        severity: 'error',
        summary: this.httpError.title,
        detail: this.httpError.body,
      });
      this.helperService.cleanErrorMessage();
    }
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

  get lF(): { [p: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  submitLogin(): any {
    this.loading = true;
    if (this.loginForm.invalid) {
      this.loading = false;
      return;
    }
    this.authenticationService
      .login(this.lF.email.value, this.lF.password.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate([this.returnUrl]);
        },
        error: (error) => {
          this.loading = false;
          this.newMessage('Inicio de sesión', error, 'error');
        },
      });
  }
}
