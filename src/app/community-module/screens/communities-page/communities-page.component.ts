import { Component, OnInit } from '@angular/core';
import { CommunityService } from '../../services/community.service';
import { ICommunities } from 'src/app/admin-dashboard/interfaces/communities.interface';

@Component({
  selector: 'app-communities-page',
  templateUrl: './communities-page.component.html',
  styleUrls: ['./communities-page.component.css'],
})
export class CommunitiesPageComponent implements OnInit {
  searchValue: string | undefined;

  constructor(private communityService: CommunityService) {}
  ngOnInit(): void {
    this.communityService.getCommunities().subscribe();
  }

  get communities(): ICommunities[] | null {
    return this.communityService.communities
      ? this.communityService.communities
      : null;
  }
  onKey() {
    console.log(this.searchValue);
  }
}
