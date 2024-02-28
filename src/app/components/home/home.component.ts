import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbModalConfig, NgbModal]
})


export class HomeComponent implements OnInit {
  users: User[] | undefined;
  showModal = false;
  userData: User | undefined;

  constructor(private apiService: UserService, config: NgbModalConfig,
    private modalService: ModalService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }


  async ngOnInit(): Promise<void> {    
    await this.getUsers();
    // close modal
    this.modalService.closeModal$.subscribe(() => {
      this.modalService.dismissAll();
      this.getUsers();
    });
  }


  async getUsers(): Promise<void> {
    (await this.apiService.getUsers()).subscribe((users: User[]) => {
      this.users = users;
    });
  }


  async onDelete(id: number | null): Promise<void> {
    if (confirm(`¿Estás seguro de que deseas eliminar al usuario?`)) {
      if (id) {
        (await this.apiService.deleteUser(id)).subscribe((success: boolean) => {
          this.getUsers();
        });
      }
    }
  }


  // Open a modal to update user data
  async openModal(id: number | null, content: any):Promise<void> {
    if (id) {
      (await this.apiService.getUserById(id)).subscribe((user: User) => {
        this.userData = user;
        this.modalService.open(content);
      });
    }
  }
}
