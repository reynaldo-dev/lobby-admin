import { Component, HostListener, Input } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-communities-carousel',
  templateUrl: './communities-carousel.component.html',
  styleUrls: ['./communities-carousel.component.css'],
})
export class CommunitiesCarouselComponent {
  constructor(private dashboardService: DashboardService) {
    this.resizeCarousel(window.innerWidth);
  }
  get communities() {
    return this.dashboardService.communities;
  }
  numVisible = 3;
  numScroll = 1;

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
