import { Component, OnInit } from '@angular/core';
import { RedeemableService } from '../../services/redeemable.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ICreateRedeemablePayload } from '../../interfaces/create-redeemable-payload.interface';
import { TokenService } from 'src/app/tokens/token.service';

@Component({
  selector: 'app-create-redeemable',
  templateUrl: './create-redeemable.component.html',
  styleUrls: ['./create-redeemable.component.css'],
  providers: [MessageService],
})
export class CreateRedeemableComponent implements OnInit {
  public isOpen = false;
  public isLoading = false;
  public createRedeemableForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    required_token_amount: [1, Validators.required],
    required_token_id: ['', Validators.required],
    stock: [1, Validators.required],
  });

  constructor(
    private redeemableService: RedeemableService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private tokenService: TokenService
  ) {
    this.redeemableService.$isOpenCreateRedeemableModal.subscribe((value) => {
      this.isOpen = value;
    });
  }
  ngOnInit(): void {
    this.tokenService.getTokens().subscribe();
  }

  get tokens() {
    return this.tokenService.tokens;
  }

  createRedeemable() {
    this.isLoading = true;
    if (this.createRedeemableForm.valid) {
      this.redeemableService
        .createRedeemable(
          this.createRedeemableForm.value as ICreateRedeemablePayload
        )
        .subscribe({
          next: (response) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Canjeable creado exitosamente.',
            });
            this.isLoading = false;
            this.createRedeemableForm.reset();
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
      detail: 'No deben existir campos vacios.',
    });
    this.isLoading = false;
  }

  close() {
    this.redeemableService.setIsOpenCreateRedeemableModal(false);
  }
}
