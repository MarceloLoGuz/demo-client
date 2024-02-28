import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthRequest } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private apiService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }


  async login():Promise<void> {
    const user: AuthRequest = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value
    };


    (await this.apiService.login(user))
      .subscribe((response: any) => {
        localStorage.setItem('token', response.body.token);
        this.router.navigate(['']); // go to home
      }, (error: any) => { 
        this.errorMessage = "¡Ups! ocurrío un error al procesar tu solicitud, verifica que tus credenciales estén correctos.";        
      }
      );
  }
}
