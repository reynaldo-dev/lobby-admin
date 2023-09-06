import { Component } from '@angular/core';
import { CommunityService } from '../../services/community.service';

@Component({
  selector: 'app-community-members',
  templateUrl: './community-members.component.html',
  styleUrls: ['./community-members.component.css'],
})
export class CommunityMembersComponent {
  public isModalCommunityMembersVisible: boolean = false;
  public filter = '';

  constructor(private communityService: CommunityService) {
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
}
