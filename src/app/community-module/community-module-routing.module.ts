import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunitiesPageComponent } from './screens/communities-page/communities-page.component';
import { authGuard } from '../auth/guards/auth.guard';
import { CommunityComponent } from './screens/community/community.component';
import { DashboardLayoutComponent } from '../admin-dashboard/layout/dashboard-layout/dashboard-layout.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunityModuleRoutingModule {}
