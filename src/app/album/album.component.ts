import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  @Input() name: string;
  
  getmusic = [];
  getallalbums= [];
  addalbum=[];
  editedId: any;
  albumById: any;
  
  albumForm: FormGroup = this.formbuilder.group({
    AlbumName: ['', Validators.required],
    Year: ['', Validators.required],
    GenreId: ['', Validators.required]
  })


  constructor(private service: AuthService,private formbuilder: FormBuilder) {
   
    this.GetAllAlbum();
   
   }
     ngOnInit(): void {
  }
  addAlbums(){
    debugger;
    this.albumForm.value.Year=Number(this.albumForm.value.Year);
    this.albumForm.value.GenreId=Number(this.albumForm.value.GenreId);
      this.service.AddAlbums(this.albumForm.value).subscribe(resp => {
        debugger;
        this.GetAllAlbum();
         if (resp["status"] == 200) {
          alert("YeS!! document inserted....");
         
      }
      else {
        alert(resp["data"]);
      }
    })
  }
 
GetAllAlbum() {
 debugger;
  this.service.GetAllAlbums().subscribe(resp => {
   
    if (resp["status"] == 200) {
      console.log(resp["data"]);
      this.getallalbums = resp["data"];
    }
    else {
      alert(resp["data"]);
    }
  })
}

editAlbum(val){
  debugger;
  this.editedId = val;
  console.log(val);
  this.service.GetAlbumById(val).subscribe(res =>{
  console.log(res);
  this.albumById = res['data'];
  console.log( this.albumById.albumName);
  this.albumForm.get("AlbumName").setValue(this.albumById.albumName);
  this.albumForm.get("Year").setValue(this.albumById.year);
  this.albumForm.get("GenreId").setValue(this.albumById.genreId);
})
}

updateAlbums() {
  debugger;
 let obj ={
   albumId: this.editedId,
   albumName: this.albumForm.value.AlbumName,
   year: Number(this.albumForm.value.Year),
   genreId: Number(this.albumForm.value.GenreId)
 }
 this.service.updateAlbum(obj).subscribe(resp => {
    if (resp["status"] == 200) {
     this.GetAllAlbum();
     // alert(resp["data"]);
   }
   else {
     // alert(resp["data"]);
   }
 })
}

deleteAlbum(id){
  alert("!are you sure delete document");
  this.service.deleteAlbum(id).subscribe(resp => {
    if (resp["status"] == 200) {
      alert("yes!! documnet deleted....");
     this.GetAllAlbum();
     // alert(resp["data"]);
   }
   else {
     // alert(resp["data"]);
   }
 })
}
}

