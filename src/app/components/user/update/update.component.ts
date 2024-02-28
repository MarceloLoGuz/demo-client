import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Utils } from 'src/app/utils/utils';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})


export class UpdateComponent implements OnInit {
  @Input() userData: User | undefined;
  confirmPassword: string = '';
  passwordsMatch: boolean = false;
  userUpdateForm!: FormGroup;


  constructor(private fb: FormBuilder,
    private apiService: UserService,
    private router: Router,
    private modalService: ModalService) { }

  ngOnInit(): void {
    this.userUpdateForm = this.fb.group({
      username: [this.userData?.username, [Validators.required]],
      fullName: [this.userData?.fullName, [Validators.required]],
      email: [this.userData?.email, [Validators.required]],
      phoneNumber: [this.userData?.phoneNumber, [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    });


    this.listenPasswords('password');
    this.listenPasswords('confirmPassword');
  }


  async saveChanges():Promise<void> {
    const user: User = {
      id: this.userData?.id || null,
      username: this.userUpdateForm.get('username')?.value,
      fullName: this.userUpdateForm.get('fullName')?.value,
      phoneNumber: this.userUpdateForm.get('phoneNumber')?.value,
      email: this.userUpdateForm.get('email')?.value,
      password: this.userUpdateForm.get('password')?.value
    };

    (await this.apiService.updateUser(user)).subscribe((response: any) => {
      this.router.navigate(['']); // go to home
      this.modalService.closeModal();
    },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }



  listenPasswords(option: string):void {
    this.userUpdateForm.get(option)!.valueChanges.subscribe(() => {
      this.passwordsMatch = Utils.validatePasswords(this.userUpdateForm.get('password')!.value, this.userUpdateForm.get('confirmPassword')!.value);
    });
  }


}
