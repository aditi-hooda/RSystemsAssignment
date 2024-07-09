import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoryListComponent } from './Components/story-list/story-list.component';
import { SearchBoxComponent } from './Components/search-box/search-box.component';
import { PaginationComponent } from './Components/pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { StoryService } from './Services/story/story.service';
import { LoaderComponent } from './Components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    StoryListComponent,
    SearchBoxComponent,
    PaginationComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [StoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
