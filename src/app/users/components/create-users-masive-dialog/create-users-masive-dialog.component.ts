import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { XlsxMakerService } from 'src/app/common/services/xlsx-maker.service';
import { UsersService } from '../../services/users.service';
import { UserData } from '../../interfaces/user.interface';

@Component({
  selector: 'app-create-users-masive-dialog',
  templateUrl: './create-users-masive-dialog.component.html',
  styleUrls: ['./create-users-masive-dialog.component.css'],
  providers: [MessageService],
})
export class CreateUsersMasiveDialogComponent {
  public isVisible = false;
  public isLoading = false;

  constructor(
    private userService: UsersService,
    private messageService: MessageService,
    private xlsx: XlsxMakerService
  ) {
    this.userService.isModalCreateMasiveVisible.subscribe((modalStatus) => {
      this.isVisible = modalStatus;
    });
  }

  public readFile(event: any) {
    const file = event.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = this.xlsx.readFile(e);
        this.userService.createUsersMasive(data as UserData[]).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Creado',
              detail: 'Se crearon correctamente los usuarios',
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: err,
            });
          },
        });
      };

      reader.readAsArrayBuffer(file);
    }
  }

  public closeModal() {
    this.userService.toggleCreateMasiveModal(false);
  }
}
