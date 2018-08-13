import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhoWeAreRoutingModule } from './who-we-are-routing.module';
import { AboutUsComponent } from './about-us/about-us.component';
import { ThemeModule } from '../../@theme/theme.module';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { SharedModule } from '../../modules/shared/shared.module';
import { WhatWeDoComponent } from './what-we-do/what-we-do.component';

@NgModule({
  imports: [
    CommonModule,
    WhoWeAreRoutingModule,
    ThemeModule,
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
    SharedModule
  ],
  declarations: [AboutUsComponent, WhatWeDoComponent]
})
export class WhoWeAreModule { }
