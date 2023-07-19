import { Component, Input } from '@angular/core';
import { ICommunities } from 'src/app/admin-dashboard/interfaces/communities.interface';

@Component({
  selector: 'app-community-card',
  templateUrl: './community-card.component.html',
  styleUrls: ['./community-card.component.css'],
})
export class CommunityCardComponent {
  @Input() community!: ICommunities;
}
