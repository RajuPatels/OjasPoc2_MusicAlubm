import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { element } from 'protractor';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {
  getalltitles=[];
  titleById: any;
  editedId: any;
  resultSong:any;
  titleForm: FormGroup = this.formbuilder.group({
    TitleName: ['', Validators.required],
    AlbumId: ['', Validators.required]
  })
  audioResult: any;
  filteredObj: any[];
  res: any;
  

  constructor(private service: AuthService,private formbuilder: FormBuilder) {
   
    this.GetAllTitle();
    
   }
     ngOnInit(): void {
  }
  
  addTitles(){

    this.titleForm.value.AlbumId=Number(this.titleForm.value.AlbumId);
      this.service.AddTitles(this.titleForm.value).subscribe(resp => {
   
        this.GetAllTitle();
         if (resp["status"] == 200) {
          alert("YeS!! document inserted....");
         alert(resp["data"]);
      }
      else {
        alert(resp["data"]);
      }
    })
  }
 
GetAllTitle() {

 let data;
  this.service.GetAllTitles().subscribe(resp => {
   
    if (resp["status"] == 200) {
      console.log(resp["data"]);
      data = resp["data"];
      for(let i of data)
      {
        i.titleName=i.titleName.replaceAll(" ","/");
      }
      this.getalltitles=data;
      console.log(this.getalltitles,"get")

    }
    else {
      alert(resp["data"]);
    }
  })
}

editTitle(val){

  this.editedId = val;
  console.log(val);
  this.service.GetTitleById(val).subscribe(res =>{
console.log(res);
this.titleById = res['data'];
console.log( this.titleById.titleName);
this.titleForm.get("TitleName").setValue(this.titleById.titleName);
this.titleForm.get("AlbumId").setValue(this.titleById.albumId);
 })
}

updateTitles() {

 let obj ={
   titleId: this.editedId,
   titleName: this.titleForm.value.TitleName,
   albumId:Number(this.titleForm.value.AlbumId)
 }

 this.service.updateTitle(obj).subscribe(resp => {
    if (resp["status"] == 200) {
     this.GetAllTitle();
     // alert(resp["data"]);
   }
   else {
     // alert(resp["data"]);
   }
 })
}

deleteTitle(id){
  alert("!are you sure delete document");
  this.service.deleteTitle(id).subscribe(resp => {
    if (resp["status"] == 200) {
      alert("yes!! documnet deleted....");
     this.GetAllTitle();
     // alert(resp["data"]);
   }
   else {
     // alert(resp["data"]);
   }
 })
}
changeSong(e){
   console.log(e.target.value);
   this.res = e.target.value;

  this.getalltitles.filter(element=>{

    if(element.titleId == this.res){
      this.audioResult = element.titleName;
   
      console.log(this.audioResult ,"hsdgshdgsdg");
  
     
    }
    
  })
  // let dsata = this.getalltitles.filter(ele=>{
  //   if(ele.titleId==e.target.value){
  //     console.log(ele.titleName);
  //  var z=ele.titleName.filter(ele=>{
  //    return ele
  //  })
  //  return z;
  //   }
  // })



 
  
}
}
