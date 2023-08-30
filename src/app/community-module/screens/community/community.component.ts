import { Component, effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommunityService } from '../../services/community.service';
import { MessageService } from 'primeng/api';
import { ICommunities } from 'src/app/admin-dashboard/interfaces/communities.interface';
import { switchMap } from 'rxjs';
effect;

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css'],
  providers: [MessageService],
})
export class CommunityComponent {
  public nameValue: string | undefined;
  public descriptionValue: string | undefined;
  public visible: boolean = false;
  public color: string = '#ffffff';
  public community!: ICommunities;

  constructor(
    private route: ActivatedRoute,
    private communityService: CommunityService,
    private messageService: MessageService
  ) {}

  get communityMembers() {
    return this.communityService.communityMembers;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.communityService.getCommunityById(id).subscribe((res) => {
      this.community = res;
    });

    this.communityService.getCommunityMembers(id).subscribe();

    this.nameValue = this.community?.name;
    this.descriptionValue = this.community?.description;
    this.color = this.community?.color as string;
  }

  updateCommunity() {
    const payload = {
      name: this.nameValue,
      description: this.descriptionValue,
      color: this.color,
    };

    this.communityService
      .updateCommunity(this.community?.id as string, payload)
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
          this.toggleDialog();
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
    this.color = this.community?.color as string;
  }

  openModalCommunityMembers() {
    this.communityService.setIsCommunityMembersModalVisibleValue(true);
  }
}
