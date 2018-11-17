import { NgtUniversalModule } from '@ng-toolkit/universal';
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF , CommonModule} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from './modules/shared/shared.module';
import { environment } from '../environments/environment.prod';
import { AngularFireModule } from 'angularfire2';
import { AuthGuard } from './guards/auth.guard';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './services/auth.service';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { UserService } from './services/user.service';
import { ToastrModule } from '../../node_modules/ngx-toastr';
import { AngularFireStorageModule } from 'angularfire2/storage';

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports:[
 CommonModule,
NgtUniversalModule,
 
    
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ToastrModule.forRoot(),
    AngularFireStorageModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },AuthGuard, AuthService, UserService
  ],
})
export class AppModule {
}
