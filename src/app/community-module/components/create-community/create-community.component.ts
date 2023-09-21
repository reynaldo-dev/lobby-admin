import { Component, OnInit } from '@angular/core';
import { CommunityService } from '../../services/community.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-community',
  templateUrl: './create-community.component.html',
  styleUrls: ['./create-community.component.css'],
  providers: [MessageService],
})
export class CreateCommunityComponent implements OnInit {
  public isLoading: boolean = false;
  public isVisible: boolean = false;
  public createCommunityForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    color: ['', Validators.required],
    link: ['', Validators.required],
  });

  constructor(
    private communityService: CommunityService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.communityService.isOpenModalCreateCommunity.subscribe((value) => {
      this.isVisible = value;
    });
  }

  createCommunity() {
    this.communityService
      .createCommunity(this.createCommunityForm.value)
      .subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Comunidad creada correctamente',
          });
          this.communityService.toggleModalCreateCommunity(false);
          this.communityService.getCommunities().subscribe();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err,
          });
        },
      });
  }

  public toggleModalCreateCommunity(isOpen: boolean) {
    this.communityService.toggleModalCreateCommunity(isOpen);
  }
}
