import { Component } from '@angular/core';
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
  public updateAllianceForm: FormGroup;
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
      this.allicanceId = alliance.id;
      this.updateAllianceForm.patchValue({
        ...alliance,
        initialDate: new Date(alliance.initialDate),
        endDate: new Date(alliance.endDate),
      });
    });

    this.updateAllianceForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      benefits: this.fb.array([this.fb.control('', Validators.required)]),
      initialDate: ['', Validators.required],
      endDate: ['', Validators.required],
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
