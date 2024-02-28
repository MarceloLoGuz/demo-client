import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Utils } from 'src/app/utils/utils';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})


export class CreateComponent implements OnInit {
  confirmPassword: string = '';
  passwordsMatch: boolean = true;
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private apiService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    });

    this.listenPasswords('password');
    this.listenPasswords('confirmPassword');
  }


  async signup(): Promise<void> {
    const user: User = {
      id: null,
      username: this.signupForm.get('username')?.value,
      fullName: this.signupForm.get('fullName')?.value,
      phoneNumber: this.signupForm.get('phoneNumber')?.value,
      email: this.signupForm.get('email')?.value,
      password: this.signupForm.get('password')?.value
    };


    (await this.apiService.createUser(user)).subscribe((response: User) => {
      this.router.navigate(['login']);
    },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }


  listenPasswords(option: string):void {
    this.signupForm.get(option)!.valueChanges.subscribe(() => {
      this.passwordsMatch = Utils.validatePasswords(this.signupForm.get('password')!.value, this.signupForm.get('confirmPassword')!.value);
    });
  }
}
