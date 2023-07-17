import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-communities-carousel',
  templateUrl: './communities-carousel.component.html',
  styleUrls: ['./communities-carousel.component.css'],
})
export class CommunitiesCarouselComponent {
  @Input() communities: any[] = [];
  get items() {
    return this.communities;
  }
}
