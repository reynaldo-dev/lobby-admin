import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunitiesPageComponent } from './screens/communities-page/communities-page.component';
import { CommunityComponent } from './screens/community/community.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { FormsModule } from '@angular/forms';
import { CommunityCardComponent } from './components/community-card/community-card.component';
import { EventsModule } from '../events/events.module';
import { CommunityMembersComponent } from './components/community-members/community-members.component';

@NgModule({
  declarations: [
    CommunitiesPageComponent,
    CommunityComponent,
    CommunityCardComponent,
    CommunityMembersComponent,
  ],
  imports: [CommonModule, PrimeNgModule, FormsModule, EventsModule],
  exports: [
    CommunitiesPageComponent,
    CommunityComponent,
    CommunityCardComponent,
  ],
})
export class CommunityModule {}
