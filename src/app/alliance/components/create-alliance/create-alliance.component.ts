import { Component, Input } from '@angular/core';
import { AllianceService } from '../../services/alliance.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ICreateAlliance } from '../../interfaces/create-alliance.interface';

@Component({
  selector: 'app-create-alliance',
  templateUrl: './create-alliance.component.html',
  styleUrls: ['./create-alliance.component.css'],
  providers: [MessageService],
})
export class CreateAllianceComponent {
  public isModalCreateVisible: boolean = false;
  public isLoading: boolean = false;

  createAllianceForm: FormGroup;

  constructor(
    private allianceService: AllianceService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.createAllianceForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      benefits: this.fb.array([this.fb.control('')]),
      initialDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });

    this.allianceService.isModalCreateVisible$.subscribe((value) => {
      this.isModalCreateVisible = value;
    });
  }

  get benefitsControls() {
    return this.createAllianceForm.get('benefits') as FormArray;
  }

  createAlliance() {
    const createAlliancePayload: ICreateAlliance = {
      name: this.createAllianceForm.get('name')?.value,
      description: this.createAllianceForm.get('description')?.value,
      benefits: this.createAllianceForm.get('benefits')?.value,
      initialDate: this.createAllianceForm.get('initialDate')?.value,
      endDate: this.createAllianceForm.get('endDate')?.value,
    };
    this.isLoading = true;
    this.allianceService.createAlliance(createAlliancePayload).subscribe({
      next: (alliances) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Alianza creada con éxito',
        });

        this.allianceService.setIsModalCreateVisible(false);
      },

      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err,
        });
      },
    });
    this.isLoading = false;
  }

  removeBenefit(i: number) {
    this.benefitsControls.removeAt(i);
  }
  addBenefit() {
    this.benefitsControls.push(this.fb.control(''));
  }

  closeModal(): void {
    this.allianceService.setIsModalCreateVisible(false);
  }
}
