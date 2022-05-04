import { HttpClient } from '@angular/common/http';
import { ArtistService } from './../../../services/artist/artist.service';
import { Component, OnInit,ViewChild } from '@angular/core';
import { Artist } from 'src/app/models/artist';
import { Person } from 'src/app/models/Person';
import {NgForm} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from 'src/app/services/person/person.service';
@Component({
  selector: 'app-configuration-artist',
  templateUrl: './configuration-artist.component.html',
  styleUrls: ['./configuration-artist.component.css']
})
export class ConfigurationArtistComponent implements OnInit {

  artistdata!: Artist;
  userdata!: Person;
  idnumber!:number
  vinculos=false
  facebook=false
  facebooklink!:string
  instagramlink!:string
  twitterlink!:string
  twitter=false
  instgram=false
  numberuser : number = 3;
  dataSource!: MatTableDataSource<any>;
  arraygenders : string[] = [];
  aleatorygender: string[] = ["Progresive Rock","Sound Engineering","2000 Wave","Complex","2010 Wave","Hard Rock","Classic Metal"]

  @ViewChild('UserForm', {static: false})
  UserForm!: NgForm;

  @ViewChild('ArtistForm', {static: false})
  ArtistForm!: NgForm;

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;

  constructor(private artistService: ArtistService,private userService: PersonService,private dialog:MatDialog,private route:ActivatedRoute,private httpClient: HttpClient) {
    this.artistdata = {} as Artist;
    this.userdata = {} as   Person;
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit():void{
    this.dataSource.paginator = this.paginator;
    console.log(this.arraygenders);
    this.getAllArtists();
    
    let pod=parseInt(this.route.snapshot.paramMap.get('id')!);
    let id= pod;
    this.idnumber=id;
    
    this.getArtistByUserId();
    
    
  }

  AddGenders(){
    var n = this.aleatorygender.length;
    console.log(n);
    var i = Math.floor(Math.random() * (n-0)) + 0;
    console.log(i);
    var genderselection = this.aleatorygender[i];
    console.log(genderselection)
    this.arraygenders.push(genderselection);
    console.log(this.arraygenders);
  }

  getAllArtists() {
    this.artistService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
      this.dataSource.paginator=this.paginator;

      
    });
  }

  

  updateArtist() {
    console.log(this.artistdata.id)
    this.artistService.update(this.artistdata.id, this.artistdata).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((o: Artist) => {
        if (o.id === response.id) {
          o = response;
        }
        return o;
      });
    });
  }

  updateUser() {
    console.log(this.userdata.id);
    this.userService.update(this.userdata.id, this.userdata).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((o: Person) => {
        if (o.id === response.id) {
          o = response;
        }
        return o;
      });
    });
  }

updatefacebookaccount(){
  console.log(this.artistdata)
  this.artistService.updatefacebook(this.artistdata.id,this.artistdata).subscribe((response: any)=>{
    console.log(response)
        this.facebooklink=response.facebookLink
  })
}

updateinstgramaccount(){
  this.artistService.updateinstgram(this.artistdata.id,this.artistdata).subscribe((response: any)=>{
       this.instagramlink=response.instagramLink
  })
}
updatetwitteraccount(){
  this.artistService.updatetwitter(this.artistdata.id,this.artistdata).subscribe((response: any)=>{
      this.twitterlink=response.twitterLink
  })
}

  getByIdArtist(id:number) {
    this.artistService.getById(id).subscribe((response: any) => {
      this.dataSource.data = response;
      this.dataSource.paginator=this.paginator;

      
    });
  }

  getByIdUser(id:number) {
    this.userService.getById(id).subscribe((response: any) => {
      this.dataSource.data = response;
      this.dataSource.paginator=this.paginator;
      this.userdata = response;
      
    });
  }

  getArtistByUserId(){
      console.log(this.idnumber)
      this.artistService.getById(this.idnumber).subscribe((response: any) => {
        this.dataSource.data = response;
        this.dataSource.paginator=this.paginator;
        this.artistdata = response;
        this.getfacelink()
        this.getinstagramlink()
        this.gettwitterlink()
        console.log(this.facebooklink)
        this.getImage()
        this.userService.getById(this.artistdata.id).subscribe((response: any) => {
          this.dataSource.data = response;
          this.dataSource.paginator=this.paginator;
          this.userdata = response;
          

        });
    });
  }


opensetvinculation(){
  if(this.vinculos==false){

    this.vinculos=true

  }else{
    this.vinculos=false
  }
  
}

facebutton(){
  if(this.facebook==false){

    this.facebook=true
    this.instgram=false
    this.twitter=false

  }else{
    this.facebook=false
  }


}
instabutton(){


  if(this.instgram==false){

    this.instgram=true
    this.twitter=false
    this.facebook=false

  }else{
    this.instgram=false
  }
}
twitterbut(){

  if(this.twitter==false){

    this.twitter=true
    this.facebook=false
    this.instgram=false
  }else{
    this.twitter=false
  }
}



getfacelink(){

  console.log(this.artistdata)
 if(this.artistdata.facebookLink==null){
   this.facebooklink="http://facebook.com"
 }else{
   this.facebooklink=this.artistdata.facebookLink
 }




}
gettwitterlink(){

  if(this.artistdata.twitterLink==null){
    this.twitterlink="http://twitter.com"
  }else{
    this.twitterlink=this.artistdata.twitterLink
  }



}
getinstagramlink(){


  if(this.artistdata.instagramLink==null){
    this.instagramlink="http://instagram.com"
  }else{
    this.instagramlink=this.artistdata.instagramLink
  }



}

selectedFile!: File;
public onFileChanged(event:any) {
  //Select File
  this.selectedFile = event.target.files[0];
  const uploadImageData = new FormData();
    uploadImageData.append('file', this.selectedFile, this.selectedFile.name);
  console.log(this.selectedFile)
  this.httpClient.put("https://fortlom-isw-backend.herokuapp.com/api/v1/users/"+this.userdata.id+"/updatephoto", uploadImageData, { observe: 'response' })
  .subscribe((response) => {
    if (response.status === 200) {
      console.log('Image uploaded successfully');
      this.getImage()
    } else {
       console.log('Image not uploaded successfully')
    }
  }
  );





}
retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
getImage(){
  console.log("artist")
  console.log(this.artistdata)
  this.httpClient.get('https://fortlom-isw-backend.herokuapp.com/api/v1/users/image/' + this.artistdata.id)
  .subscribe(
    res => {
      this.retrieveResonse = res;
      this.base64Data = this.retrieveResonse.image;
      this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
    });
}


updatepassword() {
  console.log(this.userdata.id);
  this.userService.updatepassword(this.userdata.id, this.userdata).subscribe((response: any) => {
    this.dataSource.data = this.dataSource.data.map((o: Person) => {
      if (o.id === response.id) {
        o = response;
      }
      return o;
    });
  });
}

}
