import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { AppCommonModule } from '../common/common.module';
import { AlliancesComponent } from './screen/alliances/alliances.component';
import { AllianceComponent } from './screen/alliance/alliance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateAllianceComponent } from './components/create-alliance/create-alliance.component';
import { UpdateAllianceComponent } from './components/update-alliance/update-alliance.component';

@NgModule({
  declarations: [
    AlliancesComponent,
    AllianceComponent,
    CreateAllianceComponent,
    UpdateAllianceComponent,
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    AppCommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [AlliancesComponent, AllianceComponent],
})
export class AllianceModule {}
