import { Component, HostListener, Input } from '@angular/core';
import { CommunityService } from 'src/app/community-module/services/community.service';

@Component({
  selector: 'app-communities-carousel',
  templateUrl: './communities-carousel.component.html',
  styleUrls: ['./communities-carousel.component.css'],
})
export class CommunitiesCarouselComponent {
  numVisible = 3;
  numScroll = 1;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.resizeCarousel(event.target.innerWidth);
  }

  constructor(private communityService: CommunityService) {
    this.resizeCarousel(window.innerWidth);
  }
  get communities() {
    return this.communityService.communities;
  }

  resizeCarousel(width: number) {
    if (width < 600) {
      this.numVisible = 1;
    } else {
      this.numVisible = 3;
    }
  }
}
