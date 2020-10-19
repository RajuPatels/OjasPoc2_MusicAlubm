import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  getmusic = [];
  getallartists= [];
  addartist=[];

  artistForm: FormGroup = this.formbuilder.group({
    ArtistName: ['', Validators.required],
    Profession: ['', Validators.required],
    TitleId: ['', Validators.required],
    MusicdirectorName: ['', Validators.required]
  })
  editedId: any;
  artistById: any;

  constructor(private service: AuthService,private formbuilder: FormBuilder) {
   
    this.GetAllArtist();
  
   }
     ngOnInit(): void {
  }
   addArtists(){
    debugger;
      this.artistForm.value.TitleId=Number(this.artistForm.value.TitleId);
      this.service.AddArtists(this.artistForm.value).subscribe(resp => {
        debugger;
        this.GetAllArtist();
         if (resp["status"] == 200) {
          alert("YeS!! document inserted....");
         alert(resp["data"]);
      }
      else {
        alert(resp["data"]);
      }
    })
  }
 
  GetAllArtist() {
 debugger;
  this.service.GetAllArtists().subscribe(resp => {
   
    if (resp["status"] == 200) {
      console.log(resp["data"]);
      this.getallartists = resp["data"];
    }
    else {
      alert(resp["data"]);
    }
  })
}

editArtist(val){
  debugger;
  this.editedId = val;
  console.log(val);
  this.service.GetArtistById(val).subscribe(res =>{
console.log(res);
this.artistById = res['data'];
console.log( this.artistById.artistName);
this.artistForm.get("ArtistName").setValue(this.artistById.artistName);
this.artistForm.get("Profession").setValue(this.artistById.profession);
this.artistForm.get("TitleId").setValue(this.artistById.titleId);
this.artistForm.get("MusicdirectorName").setValue(this.artistById.musicdirectorName);
})
}

updateArtist() {
  debugger;
 let obj ={
   artistId: this.editedId,
   artistName: this.artistForm.value.ArtistName,
   profession: this.artistForm.value.Profession,
   titleId: Number(this.artistForm.value.TitleId),
   musicdirectorName: this.artistForm.value.MusicdirectorName

 }
 this.service.updateArtist(obj).subscribe(resp => {
    if (resp["status"] == 200) {
     this.GetAllArtist();
     // alert(resp["data"]);
   }
   else {
     // alert(resp["data"]);
   }
 })
}

deleteArtist(id){
  alert("!are you sure delete document");
  this.service.deleteArtist(id).subscribe(resp => {
    if (resp["status"] == 200) {
      alert("yes!! documnet deleted....");
     this.GetAllArtist();
     // alert(resp["data"]);
   }
   else {
     // alert(resp["data"]);
   }
 })
}

}