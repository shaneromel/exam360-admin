import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { TermsRoutingModule } from './terms-routing.module';
import { UpdateTermsComponent } from './update-terms/update-terms.component';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  imports: [
    CommonModule,
    TermsRoutingModule,
    ThemeModule,
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot()
  ],
  declarations: [UpdateTermsComponent]
})
export class TermsModule { }
