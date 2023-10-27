import { Component, effect } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ICommunities } from 'src/app/admin-dashboard/interfaces/communities.interface';
import { CommunityService } from '../../services/community.service';
effect;

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css'],
  providers: [MessageService],
})
export class CommunityComponent {
  public isLoading = false;
  public visible: boolean = false;
  public community!: ICommunities;
  public updateCommunityForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    color: ['', Validators.required],
    link: ['', Validators.required],
  });

  constructor(
    private route: ActivatedRoute,
    private communityService: CommunityService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {}

  get communityMembers() {
    return this.communityService.communityMembers;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.communityService.getCommunityById(id).subscribe((res) => {
      this.community = res;
      this.updateCommunityForm.patchValue({
        name: this.community?.name,
        description: this.community?.description,
        color: this.community?.color,
        link: this.community?.link,
      });
    });

    this.communityService.getCommunityMembers(id).subscribe();
  }

  updateCommunity() {
    this.isLoading = true;

    if (this.updateCommunityForm.valid) {
      this.communityService
        .updateCommunity(
          this.community?.id as string,
          this.updateCommunityForm.value
        )
        .subscribe({
          next: (res: any) => {
            this.communityService
              .getCommunityById(res?.id as string)
              .subscribe((res) => (this.community = res));
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Comunidad actualizada correctamente',
            });
            this.isLoading = false;
            this.toggleDialog();
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

    this.isLoading = false;

    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No deberían haber campos vacíos',
    });
  }

  toggleDialog() {
    this.visible = !this.visible;
  }

  openModalCommunityMembers() {
    this.communityService.setIsCommunityMembersModalVisibleValue(true);
  }
}
