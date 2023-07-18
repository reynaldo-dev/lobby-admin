import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommunityService } from '../../../community-module/services/community.service';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-community-detail',
  templateUrl: './community-detail.component.html',
  styleUrls: ['./community-detail.component.css'],
  providers: [MessageService],
})
export class CommunityDetailComponent {
  community: any;
  nameValue: string | undefined;
  descriptionValue: string | undefined;
  visible: boolean = false;
  color: string = '#ffffff';
  communityId: string = '';

  constructor(
    private route: ActivatedRoute,
    private communityService: CommunityService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.communityId = id as string;

    this.nameValue = this.community?.name;
    this.descriptionValue = this.community?.description;
    this.color = this.community?.color;

    if (id === null) {
      return;
    }
    // console.log(this.communityService.getCommunityById(id));
    this.communityService.getCommunityById(id).subscribe((community) => {
      this.community = community;
    });
  }

  updateCommunity() {
    const payload = {
      name: this.nameValue,
      description: this.descriptionValue,
      color: this.color,
    };

    this.communityService.updateCommunity(this.communityId, payload).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Comunidad actualizada correctamente',
        });
        this.toggleDialog();
        this.communityService
          .getCommunityById(this.communityId)
          .subscribe((community) => {
            this.community = community;
          });
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

  toggleDialog() {
    this.visible = !this.visible;

    this.nameValue = this.community?.name;
    this.descriptionValue = this.community?.description;
    this.color = this.community?.color;
  }
}
