import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient,HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { ProfComponent } from './prof/prof.component';
import { AppRoutingModule } from './app-routing.module';
import { LayoutProfComponent } from './layout-prof/layout-prof.component';
import { LayoutEtudiantComponent } from './layout-etudiant/layout-etudiant.component';
import { AuthService } from './auth.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EtudiantComponent,
    ProfComponent,
    LayoutProfComponent,
    LayoutEtudiantComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AuthService],
  bootstrap: [
    AppComponent,
    LoginComponent,
    LayoutProfComponent,
    ProfComponent]
})
export class AppModule { };