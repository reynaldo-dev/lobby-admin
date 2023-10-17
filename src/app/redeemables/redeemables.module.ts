import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedeemablesScreenComponent } from './screens/redeemables-screen/redeemables-screen.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { AppCommonModule } from '../common/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { CreateRedeemableComponent } from './components/create-redeemable/create-redeemable.component';
import { UpdateRedeemableComponent } from './components/update-redeemable/update-redeemable.component';
import { RedeemsHistoryComponent } from './screens/redeems-history/redeems-history.component';

@NgModule({
  declarations: [
    RedeemablesScreenComponent,
    CreateRedeemableComponent,
    UpdateRedeemableComponent,
    RedeemsHistoryComponent,
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    AppCommonModule,
    FormsModule,
    ComponentsModule,
    ReactiveFormsModule,
  ],
  exports: [
    RedeemablesScreenComponent,
    CreateRedeemableComponent,
    UpdateRedeemableComponent,
  ],
})
export class RedeemablesModule {}
