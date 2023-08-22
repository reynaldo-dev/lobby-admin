import { Component, OnInit } from '@angular/core';
import { CommunityService } from '../../services/community.service';

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

  get communities() {
    return this.communityService.communities;
  }
  onKey() {
    console.log(this.searchValue);
  }
}
