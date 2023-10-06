import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ChallengesService } from '../../services/challenges.service';
import { EventsCategoryService } from 'src/app/events-category/services/events-category.service';

@Component({
  selector: 'app-create-challenge',
  templateUrl: './create-challenge.component.html',
  styleUrls: ['./create-challenge.component.css'],
  providers: [MessageService],
})
export class CreateChallengeComponent {
  public createChallengeForm: FormGroup;
  public isVisible = false;
  public isLoading = false;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private challengeService: ChallengesService,
    private eventCategoryService: EventsCategoryService
  ) {
    this.challengeService.isModalCreateVisible$.subscribe((value) => {
      this.isVisible = value;
    });
    this.createChallengeForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      initialDate: ['', Validators.required],
      endDate: ['', Validators.required],
      credits: [1, Validators.required],
      indications: this.fb.array([this.fb.control('', Validators.required)]),
      eventCategoryId: ['', Validators.required],
      coupons: [1, Validators.required],
    });
  }

  get eventCategories() {
    return this.eventCategoryService.eventCategories;
  }

  get indicationsControls() {
    return this.createChallengeForm.get('indications') as FormArray;
  }

  removeIndication(i: number) {
    this.indicationsControls.removeAt(i);
  }
  addIndication() {
    this.indicationsControls.push(this.fb.control('', Validators.required));
  }

  public createChallenge() {
    this.isLoading = true;
    if (this.createChallengeForm.valid) {
      this.challengeService
        .createChallenge(this.createChallengeForm.value)
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Reto creado exitosamente',
            });
            this.createChallengeForm.reset();
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
      return;
    }
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No deben existir campos vacios',
    });
    this.isLoading = false;
  }

  public closeModal() {
    this.challengeService.setIsModalCreateVisible(false);
  }
}
