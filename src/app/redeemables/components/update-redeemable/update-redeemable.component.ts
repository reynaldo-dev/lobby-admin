import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { RedeemableService } from '../../services/redeemable.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IUpdateRedeemablePayload } from '../../interfaces/update-redeemable-payload.interface';

@Component({
  selector: 'app-update-redeemable',
  templateUrl: './update-redeemable.component.html',
  styleUrls: ['./update-redeemable.component.css'],
  providers: [MessageService],
})
export class UpdateRedeemableComponent {
  public isOpen = false;
  public isLoading = false;
  public selectedRedeemableId: string | null = null;
  public updateRedeemableForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    required_points: [1, Validators.required],
    stock: [1, Validators.required],
  });

  constructor(
    private redeemableService: RedeemableService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.redeemableService.$isOpenUpdateRedeemableModal.subscribe((value) => {
      this.isOpen = value;
    });
    this.redeemableService.$selectedRedeemableId.subscribe((id) => {
      if (id) {
        this.selectedRedeemableId = id;
        this.redeemableService.getRedeemable(id).subscribe((redeemable) => {
          this.updateRedeemableForm.patchValue(redeemable);
        });
      }
    });
  }
  updateRedeemable() {
    this.isLoading = true;
    if (this.updateRedeemableForm.valid) {
      this.redeemableService
        .updateRedeemable(
          this.selectedRedeemableId as string,
          this.updateRedeemableForm.value as IUpdateRedeemablePayload
        )
        .subscribe({
          next: (response) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Canjeable actualizado exitosamente.',
            });
            this.isLoading = false;
            this.updateRedeemableForm.reset();
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error,
            });
            this.isLoading = false;
          },
        });
      return;
    }
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No debe haber campos vacíos.',
    });
    this.isLoading = false;
  }

  close() {
    this.redeemableService.setIsOpenUpdateRedeemableModal(false, null);
  }
}
