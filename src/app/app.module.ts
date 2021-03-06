import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule,    ReactiveFormsModule}   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {HttpClient, HttpClientModule} from'@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { ProfComponent } from './prof/prof.component';
import { AuthService } from './auth.service';
import { ListePresenceComponent } from './liste-presence/liste-presence.component';
import { AuthGuard } from './auth.guard';
import { HomeProfComponent } from './home-prof/home-prof.component';

import { ProfilComponent } from './profil/profil.component';
import { ArticleComponent } from './article/article.component';
import { LesArticlesComponent } from './les-articles/les-articles.component';
import { EmploiComponent } from './emploi/emploi.component';
import { MapComponent } from './map/map.component';
import { AbsenceComponent } from './absence/absence.component';
import { NoteEComponent } from './note-e/note-e.component';
import { ListAbProfComponent } from './list-ab-prof/list-ab-prof.component';
import { MarkNoteComponent } from './mark-note/mark-note.component';
import { AddRAttrapageComponent } from './add-rattrapage/add-rattrapage.component';
import { ResponseResetComponent } from './response-reset/response-reset.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastContainerDirective,ToastrModule, ToastContainerModule } from 'ngx-toastr';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpdateNoteComponent } from './update-note/update-note.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


//import { ToastrModule } from 'ngx-toastr';
//import { TIMEOUT } from 'dns';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfComponent,
    ProfilComponent,
    HomeComponent,
    ListePresenceComponent,
    HomeProfComponent,
    ProfilComponent,
    ArticleComponent,
    LesArticlesComponent,
    EmploiComponent,
    MapComponent,
    AbsenceComponent,
    NoteEComponent,
    ListAbProfComponent,
    MarkNoteComponent,
    NotificationsComponent,
    UpdateNoteComponent,
    AddRAttrapageComponent,
    ResponseResetComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      closeButton:true,
      onActivateTick:true,
      preventDuplicates: true,
      
    }),
    ToastContainerModule,
    CommonModule,
    RouterModule,
    
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent,
              LoginComponent,
              ProfComponent,
              ProfilComponent,
              HomeComponent,
              ListePresenceComponent,
              LesArticlesComponent,
              AddRAttrapageComponent,
              NgxPaginationModule],
  exports: []
})
export class AppModule { };