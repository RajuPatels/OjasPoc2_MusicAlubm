import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: any = `${environment.host_url}`
  constructor(private http: HttpClient) {

  }

   GetAllMusic() {
      return this.http.get(this.url +'/Music/GetAll')
  }


  getallgenre(){
    return this.http.get(this.url +'/Genre/GetAll')
  }
  addgenre(c){
    return this.http.post(this.url +'/Genre/Create',c);
  }
   GetGenreById(id){
    return this.http.post(this.url+'/Genre/GetById?genreid='+id,null);
  }
  updateGenere(val){
    return this.http.post(this.url+'/Genre/Update',val);
  }
  deleteGenere(id){
    return this.http.post(this.url+'/Genre/Delete?genreid='+id,null);
  }
  

  AddTitles(c){
    return this.http.post(this.url +'/Title/Create',c);
  }
  GetAllTitles(){
    return this.http.get(this.url +'/Title/GetAll')
  }
  GetTitleById(id){
    return this.http.post(this.url+'/Title/GetById?titleid='+id,null);
  }
  updateTitle(val){
    return this.http.post(this.url+'/Title/Update',val);
  }
  deleteTitle(id){
    return this.http.post(this.url+'/Title/Delete?titleid='+id,null);
  }


  AddAlbums(c){
    return this.http.post(this.url +'/Album/Create',c);
 }
  GetAllAlbums() {
    return this.http.get(this.url +'/Album/GetAll')
}
GetAlbumById(id){
  return this.http.post(this.url+'/Album/GetById?albumid='+id,null);
}
updateAlbum(val){
  return this.http.post(this.url+'/Album/Update',val);
}
deleteAlbum(id){
  return this.http.post(this.url+'/Album/Delete?albumid='+id,null);
}


AddArtists(c){
 return this.http.post(this.url +'/Artist/Create',c);
}
GetAllArtists(){
 return this.http.get(this.url +'/Artist/GetAll')
}
GetArtistById(id){
  return this.http.post(this.url+'/Artist/GetById?artistid='+id,null);
}
updateArtist(val){
  return this.http.post(this.url+'/Artist/Update',val);
}
deleteArtist(id){
  return this.http.post(this.url+'/Artist/Delete?artistid='+id,null);
}

}


