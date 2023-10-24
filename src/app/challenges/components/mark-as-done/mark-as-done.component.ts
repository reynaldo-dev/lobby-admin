import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import * as XLSX from 'xlsx';
import { ChallengesService } from '../../services/challenges.service';

@Component({
  selector: 'app-mark-as-done',
  templateUrl: './mark-as-done.component.html',
  styleUrls: ['./mark-as-done.component.css'],
  providers: [MessageService],
})
export class MarkAsDoneComponent implements OnInit {
  public isVisible = false;
  @ViewChild('fileUpload', { static: false }) fileUpload: any;

  public isLoading = false;

  constructor(
    private challengeService: ChallengesService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.challengeService.isModalMarkAsDoneVisible$.subscribe({
      next: (isVisible) => {
        this.isVisible = isVisible;
      },
    });
  }

  public isSomePending(data: any) {
    return data.filter((item: any) => item.done == false).length > 0;
  }

  public readFile(event: any) {
    this.isLoading = true;
    const file = event.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const excelData = XLSX.utils.sheet_to_json(worksheet);

        // if (this.isSomePending(excelData)) {
        //   this.messageService.add({
        //     severity: 'error',
        //     summary: 'Error',
        //     detail:
        //       'Revisa el documento, ningun ticket debe estar con el reto pendiente',
        //   });

        //   this.clearFileInput();
        //   return;
        // }

        this.challengeService.markChallengesAsDone(excelData).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Retos marcados como completados satisfactoriamente',
            });
            this.isLoading = false;
            this.clearFileInput();
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: err,
            });
            this.isLoading = false;
            this.clearFileInput();
          },
        });
      };

      reader.readAsArrayBuffer(file);
    }
  }

  private clearFileInput() {
    const fileInput = this.fileUpload.nativeElement;
    if (fileInput) {
      fileInput.value = ''; // Esto eliminará el archivo seleccionado
    }
  }

  public closeModal() {
    this.challengeService.setIsModalMarkAsDoneVisible(false);
  }
}
