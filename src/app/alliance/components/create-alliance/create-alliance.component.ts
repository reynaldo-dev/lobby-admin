import { Component, Input } from '@angular/core';
import { AllianceService } from '../../services/alliance.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ICreateAlliance } from '../../interfaces/create-alliance.interface';
import { AllianceCategoryService } from 'src/app/alliance-category/services/alliance-category.service';

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
    private messageService: MessageService,
    private allianceCategoryService: AllianceCategoryService
  ) {
    this.createAllianceForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      benefits: this.fb.array([this.fb.control('', Validators.required)]),
      initialDate: ['', Validators.required],
      endDate: ['', Validators.required],
      allianceCategoryId: ['', Validators.required],
    });

    this.allianceService.isModalCreateVisible$.subscribe((value) => {
      this.isModalCreateVisible = value;
    });
  }

  get benefitsControls() {
    return this.createAllianceForm.get('benefits') as FormArray;
  }

  get allianceCategories() {
    return this.allianceCategoryService.allianceCategories;
  }

  createAlliance() {
    this.isLoading = true;
    const createAlliancePayload: ICreateAlliance = {
      name: this.createAllianceForm.get('name')?.value,
      description: this.createAllianceForm.get('description')?.value,
      benefits: this.createAllianceForm.get('benefits')?.value,
      initialDate: this.createAllianceForm.get('initialDate')?.value,
      endDate: this.createAllianceForm.get('endDate')?.value,
      allianceCategoryId:
        this.createAllianceForm.get('allianceCategoryId')?.value,
    };

    if (this.createAllianceForm.valid) {
      this.allianceService.createAlliance(createAlliancePayload).subscribe({
        next: (alliances) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Alianza creada con éxito',
          });
          this.createAllianceForm.reset();
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
      return;
    }
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No debe haber campos vacíos',
    });
    this.isLoading = false;
  }

  removeBenefit(i: number) {
    this.benefitsControls.removeAt(i);
  }
  addBenefit() {
    this.benefitsControls.push(this.fb.control('', Validators.required));
  }

  closeModal(): void {
    this.allianceService.setIsModalCreateVisible(false);
  }
}
