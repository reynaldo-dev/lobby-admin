import { Component, HostListener, Input } from '@angular/core';
import { CommunityService } from 'src/app/community-module/services/community.service';
import { DashboardService } from '../../services/dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-communities-carousel',
  templateUrl: './communities-carousel.component.html',
  styleUrls: ['./communities-carousel.component.css'],
})
export class CommunitiesCarouselComponent {
  public numVisible = 3;
  public numScroll = 1;

  constructor(
    private communityService: CommunityService,
    private router: Router
  ) {
    this.resizeCarousel(window.innerWidth);
  }

  get communities() {
    return this.communityService.communities;
  }

  navigateToCommunity(id: string) {
    this.router.navigate(['/community', id]);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.resizeCarousel(event.target.innerWidth);
  }

  resizeCarousel(width: number) {
    if (width < 600) {
      this.numVisible = 1;
    } else {
      this.numVisible = 3;
    }
  }
}
