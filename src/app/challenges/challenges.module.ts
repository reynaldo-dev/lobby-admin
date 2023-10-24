import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ChallengesScreenComponent } from './screens/challenges-screen/challenges-screen.component';
import { CreateChallengeComponent } from './components/create-challenge/create-challenge.component';
import { UpdateChallengeComponent } from './components/update-challenge/update-challenge.component';
import { ComponentsModule } from '../components/components.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { MarkAsDoneComponent } from './components/mark-as-done/mark-as-done.component';

@NgModule({
  declarations: [
    ChallengesScreenComponent,
    CreateChallengeComponent,
    UpdateChallengeComponent,
    MarkAsDoneComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, ComponentsModule, PrimeNgModule],
  exports: [ChallengesScreenComponent],
})
export class ChallengesModule {}
