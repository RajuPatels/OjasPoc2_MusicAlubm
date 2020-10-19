import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {
  getallgenre;
  genereById;
  editedId: any;
  constructor(private service: AuthService,private formbuilder: FormBuilder) {
  }
  ngOnInit() {
    this.getAllGenre();
  }
   genreForm: FormGroup = this.formbuilder.group({
    GenereName: ['', Validators.required]
  })
  getAllGenre() {
    this.service.getallgenre().subscribe(resp => {
      // debugger;
      if (resp["status"] == 200) {
        this.getallgenre = resp["data"];
      }
      else {
        alert(resp["data"]);
      }
    })
  }
  addGenre() {
    this.service.addgenre(this.genreForm.value).subscribe(resp => {
      // debugger;
      if (resp["status"] == 200) {
        alert("YeS!! document inserted....");
        this.getAllGenre();
       
      }
      else {
        alert(resp["data"]);
      }
    })
  }
  editGenere(val){
     this.editedId = val;
     console.log(val);
     this.service.GetGenreById(val).subscribe(res =>{
  console.log(res);
  this.genereById = res['data'];
  console.log( this.genereById.genereName);
  this.genreForm.get("GenereName").setValue(this.genereById.genereName);
})
}
updateGenere() {
    let obj ={
      genreId: this.editedId,
      genereName: this.genreForm.value.GenereName
    }
    this.service.updateGenere(obj).subscribe(resp => {
       if (resp["status"] == 200) {
        this.getAllGenre();
        // alert(resp["data"]);
      }
      else {
        // alert(resp["data"]);
      }
    })
  }
  deleteGenre(id){

    alert("!are you sure delete document");
     this.service.deleteGenere(id).subscribe(resp => {
       if (resp["status"] == 200) {
        alert("yes!! documnet deleted....");
        this.getAllGenre();
        // alert(resp["data"]);
      }
      else {
        // alert(resp["data"]);
      }
    })
  }
}