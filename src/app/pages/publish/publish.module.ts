import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublishRoutingModule } from './publish-routing.module';
import { SharedModule } from '../../modules/shared/shared.module';
import { UpdateComponent } from './update/update.component';

@NgModule({
  imports: [
    CommonModule,
    PublishRoutingModule,
    SharedModule
  ],
  declarations: [UpdateComponent]
})
export class PublishModule { }
