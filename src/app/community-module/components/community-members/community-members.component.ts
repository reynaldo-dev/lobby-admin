import { Component } from '@angular/core';
import { CommunityService } from '../../services/community.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-community-members',
  templateUrl: './community-members.component.html',
  styleUrls: ['./community-members.component.css'],
})
export class CommunityMembersComponent {
  public isModalCommunityMembersVisible: boolean = false;
  public filter = '';

  constructor(
    private communityService: CommunityService,
    private router: Router
  ) {
    this.communityService.communityMembersModalVisible.subscribe((value) => {
      this.isModalCommunityMembersVisible = value;
    });
  }

  get communityMembers() {
    return this.communityService.communityMembers?.users;
  }

  closeModal() {
    this.communityService.setIsCommunityMembersModalVisibleValue(false);
  }

  public seeUser(id: string) {
    this.closeModal();
    this.router.navigate(['/dashboard/usuarios', id]);
  }
}
