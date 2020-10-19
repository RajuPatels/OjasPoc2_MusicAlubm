import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumComponent } from './album/album.component';
import { ArtistComponent } from './artist/artist.component';
import { GenreComponent } from './genre/genre.component';
import { TitleComponent } from './title/title.component';
 
const routes: Routes = [
  {
    path:'genre',
    component:GenreComponent
  } ,
  {
    path:'album',
    component:AlbumComponent
  } ,
  {
    path:'artist',
    component:ArtistComponent
  }, 
  {
    path:'title',
    component:TitleComponent
  },
 
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }