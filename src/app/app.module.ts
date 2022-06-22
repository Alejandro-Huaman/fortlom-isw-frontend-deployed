import { ChangePasswordComponent } from './pages/ForgotPassword/change-password/change-password.component';
import { ConfigurationArtistComponent } from './pages/configuration/configuration-artist/configuration-artist.component';
import { ArtistEventComponent } from './pages/Artists/ArtistEvent/ArtistEvent.component';
import { ConfigurationFanaticComponent } from './pages/configuration/configuration-fanatic/configuration-fanatic.component';
import { CommentComponent } from './pages/publication/comment/comment.component';
import { PostComponent } from './pages/publication/post/post.component';
import { CommentFormComponent } from './pages/publication/comment-form/comment-form.component';
import { PostListComponent } from './pages/publication/post-list/post-list.component';
import { PostFormComponent } from './pages/publication/post-form/post-form.component';
import { RateComponent } from './pages/rate/rate.component';
import { ArtistListComponent } from './pages/Fanatic/artist-list/artist-list.component';
import { UserInformationforForumComponent } from './pages/UserInformationforForum/UserInformationforForum.component';
import { FanaticForumcommentComponent } from './pages/Fanatic/Fanatic-Forumcomment/Fanatic-Forumcomment.component';
import { ForumPageComponent } from './pages/ForumPage/ForumPage.component';
import { FanaticForumComponent } from './pages/Fanatic/Fanatic-Forum/Fanatic-Forum.component';
import { EventFanaticComponent } from './pages/Fanatic/EventFanatic/EventFanatic.component';
import { HomeFanaticComponent } from './pages/Fanatic/HomeFanatic/HomeFanatic.component';
import { FanaticnavigationComponent } from './pages/Fanatic/fanaticnavigation/fanaticnavigation.component';
import { MaterialModule } from './material/material.module';
import { ArtistNavegationComponent } from './pages/Artists/ArtistNavegation/ArtistNavegation.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeArtistComponent } from './pages/Artists/home-artist/home-artist.component';
import { ArtistForumsComponent } from './pages/Artists/artist-forums/artist-forums.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FanaticForumCreateComponent } from './pages/Fanatic/FanaticForumCreate/FanaticForumCreate.component';
import { PostPageComponent } from './pages/publication/post-page/post-page.component';
import { Post2Component } from './pages/publication/post2/post2.component';
import { LoginComponent } from './pages/Login/Login.component';
import { interceptorProvider } from './interceptors/Interceptor.service';
import { RegisterArtistComponent } from './pages/Register/RegisterArtist/RegisterArtist.component';
import { RegisterFanaticComponent } from './pages/Register/RegisterFanatic/RegisterFanatic.component';
import { SendEmailComponent } from './pages/ForgotPassword/send-email/send-email.component';
import { DialogOverviewReportDialog } from './pages/publication/post/dialogreport/dialogreport.component';
import { DialogreportforumComponent } from './pages/ForumPage/dialogreportforum/dialogreportforum.component';
import { DialogreportcommentComponent } from './pages/Fanatic/Fanatic-Forumcomment/dialogreportcomment/dialogreportcomment.component';
import { GoogleTagManagerModule } from 'angular-google-tag-manager';


@NgModule({
  declarations: [
    AppComponent,
    HomeArtistComponent,
    ArtistNavegationComponent,
    ArtistForumsComponent,
    HomeFanaticComponent,
    FanaticnavigationComponent,
    EventFanaticComponent,
    FanaticForumComponent,
    FanaticForumCreateComponent,
    ForumPageComponent,
    FanaticForumcommentComponent,
    UserInformationforForumComponent,
    ArtistListComponent,
    RateComponent,
    PostPageComponent,
    PostFormComponent,
    PostListComponent,
    CommentFormComponent,
    CommentComponent,
    Post2Component,
    PostComponent,
    ConfigurationFanaticComponent,
    ArtistEventComponent,
    ConfigurationArtistComponent,
    LoginComponent,
    RegisterArtistComponent,
    RegisterFanaticComponent,
    SendEmailComponent,
    ChangePasswordComponent,
    DialogOverviewReportDialog,
    DialogreportforumComponent,
    DialogreportcommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleTagManagerModule.forRoot({
      id: "GTM-WZW48CK",
    })
    
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
