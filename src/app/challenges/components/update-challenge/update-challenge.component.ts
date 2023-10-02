import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ChallengesService } from '../../services/challenges.service';

@Component({
  selector: 'app-update-challenge',
  templateUrl: './update-challenge.component.html',
  styleUrls: ['./update-challenge.component.css'],
  providers: [MessageService],
})
export class UpdateChallengeComponent {
  public updateChallengeForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    endDate: ['', Validators.required],
    credits: [1, Validators.required],
    indications: this.fb.array([]),
    coupons: [1, Validators.required],
  });
  public isVisible = false;
  public isLoading = false;
  public challengeId: string | null = null;
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private challengeService: ChallengesService
  ) {
    this.challengeService.isModalUpdateVisible$.subscribe((value) => {
      this.isVisible = value;
    });

    this.challengeService.selectedChallenge$.subscribe((value) => {
      if (value) {
        this.challengeId = value.id;
        this.updateChallengeForm.patchValue({
          title: value.title,
          description: value.description,
          endDate: new Date(value.endDate),
          credits: value.credits,
          coupons: value.coupons,
        });
        this.indicationsControls.controls = [];
        value.indications.forEach((indication) => {
          this.indicationsControls.push(
            this.fb.control(indication, Validators.required)
          );
        });
      }
    });
  }

  get indicationsControls() {
    return this.updateChallengeForm.get('indications') as FormArray;
  }

  removeIndication(i: number) {
    this.indicationsControls.removeAt(i);
  }
  addIndication() {
    this.indicationsControls.push(this.fb.control('', Validators.required));
  }

  public closeModal() {
    this.challengeService.setIsModalUpdateVisible(false);
  }
  public updateChallenge() {
    this.isLoading = true;
    if (this.updateChallengeForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No deben existir campos vacíos',
      });
      this.isLoading = false;
      return;
    }
    this.challengeService
      .updateChallenge(this.challengeId!, this.updateChallengeForm.value)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Reto actualizado exitosamente',
          });
          this.isLoading = false;
          this.closeModal();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err,
          });
          this.isLoading = false;
        },
      });
  }
}
