import { HttpClient } from '@angular/common/http';
import { Person } from 'src/app/models/Person';
import { Fanatic } from 'src/app/models/fanatic';
import { Component, OnInit,ViewChild } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {NgForm} from "@angular/forms";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FanaticService } from 'src/app/services/fanatic/fanatic.service';
import { PersonService } from 'src/app/services/person/person.service';
@Component({
  selector: 'app-configuration-fanatic',
  templateUrl: './configuration-fanatic.component.html',
  styleUrls: ['./configuration-fanatic.component.css']
})
export class ConfigurationFanaticComponent implements OnInit {

  fanaticdata!: Fanatic;
  userdata!: Person;
  idnumber!:number;
  numberuser : number = 5;
  dataSource!: MatTableDataSource<any>;
  arraygenders : string[] = [];
  aleatorygender: string[] = ["Progresive Rock","Sound Engineering","2000 Wave","Complex","2010 Wave","Hard Rock","Classic Metal"]

  @ViewChild('UserForm', {static: false})
  UserForm!: NgForm;

  @ViewChild('FanaticForm', {static: false})
  FanaticForm!: NgForm;

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;

  constructor(private fanaticService: FanaticService,private userService: PersonService,private dialog:MatDialog,private route:ActivatedRoute,private httpClient:HttpClient) {
    this.fanaticdata = {} as Fanatic;
    this.userdata = {} as Person;
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit():void {
    this.dataSource.paginator = this.paginator;
    console.log(this.arraygenders);
    
    

    let pod=parseInt(this.route.snapshot.paramMap.get('id')!);
    let id= pod;
    this.idnumber=id;

    this.getFanaticByUserId();
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

  getAllFanatics() {
    this.fanaticService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
      this.dataSource.paginator=this.paginator;

      console.log(response)
    });
  }



  updateFanatic() {
    console.log(this.fanaticdata.id)
    this.fanaticService.update(this.fanaticdata.id, this.fanaticdata).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((o: Fanatic) => {
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

  updatepassword() {
    console.log(this.userdata.id);
    this.userService.updatepassword(this.userdata.id, this.userdata).subscribe((response: any) => {
      alert("password change")
      this.dataSource.data = this.dataSource.data.map((o: Person) => {
        
        if (o.id === response.id) {
          o = response;
        }
        return o;
      });
    });
  }






  getByIdFanatic(id:number) {
    this.fanaticService.getById(id).subscribe((response: any) => {
      this.dataSource.data = response;
      this.dataSource.paginator=this.paginator;

      console.log(response);
    });
  }

  getByIdUser(id:number) {
    this.userService.getById(id).subscribe((response: any) => {
      this.dataSource.data = response;
      this.dataSource.paginator=this.paginator;
      this.userdata = response;
      console.log(this.userdata);
    });
  }

  getFanaticByUserId(){
    console.log(this.idnumber)
    this.fanaticService.getById(this.idnumber).subscribe((response: any) => {
      this.dataSource.data = response;
      this.dataSource.paginator=this.paginator;
      this.fanaticdata = response;
      console.log(this.fanaticdata);
         this.getImage()
        this.userService.getById(this.fanaticdata.id).subscribe((response: any) => {
          this.dataSource.data = response;
          this.dataSource.paginator=this.paginator;
          this.userdata = response;
          console.log(this.userdata)

        });
    });
  }





  selectedFile!: File;
  public onFileChanged(event:any) {
    //Select File
    this.selectedFile = event.target.files[0];
    const uploadImageData = new FormData();
      uploadImageData.append('file', this.selectedFile, this.selectedFile.name);
    console.log(this.selectedFile)
    this.httpClient.put("http://localhost:8080/api/v1/users/"+this.userdata.id+"/updatephoto", uploadImageData, { observe: 'response' })
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
    console.log("fanatic")
    console.log(this.fanaticdata)
    this.httpClient.get('http://localhost:8080/api/v1/users/image/' + this.fanaticdata.id)
    .subscribe(
      res => {
        this.retrieveResonse = res;
        this.base64Data = this.retrieveResonse.image;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
      });
  }








}
