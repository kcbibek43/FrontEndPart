import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginMode = true;
  loginForm!: FormGroup;
  registerForm!: FormGroup ;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registerForm = this.formBuilder.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['Tenant', Validators.required],
      userName : ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }
    const loginFormValue = this.loginForm.value;

      this.authService.login(this.loginForm.value).subscribe(
        (response : any) => {
          sessionStorage.setItem('id', response.id);
          sessionStorage.setItem('userName', response.userName);
        sessionStorage.setItem('role', response.role.toLowerCase());
          this.router.navigate(['/home']);
          this.snackBar.open('Login successful', 'X', {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top',

          });
        },
        error => {
          this.snackBar.open('Login failed', 'X', {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top',

          });
        }
      );
  }

  onRegister() {
    if (this.registerForm.invalid) {
      return;
    }
    const registerFormValue = this.registerForm.value;
    this.authService.register(registerFormValue).subscribe();
    this.isLoginMode = true;
  }

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}

