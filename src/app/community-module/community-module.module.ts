import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunitiesPageComponent } from './screens/communities-page/communities-page.component';
import { CommunityComponent } from './screens/community/community.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommunityCardComponent } from './components/community-card/community-card.component';
import { EventsModule } from '../events/events.module';
import { CommunityMembersComponent } from './components/community-members/community-members.component';
import { ComponentsModule } from '../components/components.module';
import { CreateCommunityComponent } from './components/create-community/create-community.component';

@NgModule({
  declarations: [
    CommunitiesPageComponent,
    CommunityComponent,
    CommunityCardComponent,
    CommunityMembersComponent,
    CreateCommunityComponent,
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    FormsModule,
    EventsModule,
    ComponentsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommunitiesPageComponent,
    CommunityComponent,
    CommunityCardComponent,
    CommunityMembersComponent,
    CreateCommunityComponent,
  ],
})
export class CommunityModule {}
