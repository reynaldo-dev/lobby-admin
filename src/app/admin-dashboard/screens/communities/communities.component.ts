import { Component } from '@angular/core';
import { CommunityService } from 'src/app/community-module/services/community.service';

@Component({
  selector: 'app-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.css'],
})
export class CommunitiesComponent {
  searchValue: string | undefined;

  constructor(private communityService: CommunityService) {}

  get communities() {
    // console.log(this.communityService.communities);
    return this.communityService.communities;
  }
  onKey() {
    console.log(this.searchValue);
  }
}
