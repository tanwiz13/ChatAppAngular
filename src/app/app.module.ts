import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule,Routes,Router } from '@angular/router'
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ChatScreenComponent } from './chat-screen/chat-screen.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
} from "angular-6-social-login";
import { ServerService } from './server.service';

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("291888123183-mm6rp4cegg205tprnnvisd6hof9lkunf.apps.googleusercontent.com")
        },
      ]
  );
  return config;
}

const routes: Routes = [
  {
    path : '',
    component : LoginComponent,
  },
  {
    path : 'chatscreen',
    component : ChatScreenComponent,
  },
  {
    path : 'chatscreen',
    component : ChatScreenComponent,
    canActivate:[ServerService]
  },
  {
    path:'**',
    component:LoginComponent,
  }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatScreenComponent
  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
