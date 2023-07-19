import { Component } from '@angular/core';
import { CommunityService } from '../../services/community.service';

@Component({
  selector: 'app-communities-page',
  templateUrl: './communities-page.component.html',
  styleUrls: ['./communities-page.component.css'],
})
export class CommunitiesPageComponent {
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
