import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditorComponent } from './home/components/editor/editor.component';
import { PreviewComponent } from './home/components/preview/preview.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FlexLayoutModule } from "@angular/flex-layout";



@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    PreviewComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
