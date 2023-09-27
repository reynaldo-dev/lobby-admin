import { Component, OnInit } from '@angular/core';
import { AllianceService } from '../../services/alliance.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-update-alliance',
  templateUrl: './update-alliance.component.html',
  styleUrls: ['./update-alliance.component.css'],
  providers: [MessageService],
})
export class UpdateAllianceComponent {
  public isModalUpdateVisible: boolean = false;
  public isLoading: boolean = false;
  public updateAllianceForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    benefits: this.fb.array([]),
    initialDate: ['', Validators.required],
    endDate: ['', Validators.required],
  });
  public allicanceId!: string;

  get benefitsControls() {
    return this.updateAllianceForm.get('benefits') as FormArray;
  }

  constructor(
    private allianceService: AllianceService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.allianceService.isModalUpdateVisible$.subscribe((value) => {
      this.isModalUpdateVisible = value;
    });

    this.allianceService.selectedAlliance$.subscribe((alliance) => {
      if (alliance) {
        this.allicanceId = alliance.id;
        this.updateAllianceForm.patchValue({
          name: alliance.name,
          description: alliance.description,
          initialDate: new Date(alliance.initialDate),
          endDate: new Date(alliance.endDate),
        });
        this.benefitsControls.controls = [];
        alliance.benefits.forEach((benefit) => {
          this.benefitsControls.push(
            this.fb.control(benefit, Validators.required)
          );
        });
      }
    });
  }

  updateAlliance() {
    this.isLoading = true;
    const alliance = {
      ...this.updateAllianceForm.value,
      id: this.allicanceId,
    };

    if (this.updateAllianceForm.valid) {
      this.allianceService.updateAlliance(alliance).subscribe(
        (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Allianza actualizada correctamente',
          });
          this.isLoading = false;
          this.closeModal();
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error,
          });
          this.isLoading = false;
        }
      );
      return;
    }

    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Todos los campos son requeridos',
    });
    this.isLoading = false;
  }

  closeModal() {
    this.benefitsControls.controls.forEach((control, i) => {
      if (control.invalid) {
        this.removeBenefit(i);
      }
      this.allianceService.setIsModalUpdateVisible(false);
    });
  }

  removeBenefit(i: number) {
    this.benefitsControls.removeAt(i);
  }
  addBenefit() {
    this.benefitsControls.push(this.fb.control('', Validators.required));
  }
}
