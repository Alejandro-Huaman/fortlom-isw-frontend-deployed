import { FanaticService } from 'src/app/services/fanatic/fanatic.service';
import { ArtistService } from './../../services/artist/artist.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common'
import { Forum } from 'src/app/models/forum';
import { Person } from 'src/app/models/Person';
import { Forumcomment } from 'src/app/models/forumcomment';
import { ForumService } from 'src/app/services/forum/forum.service';
import { ForumcommentService } from 'src/app/services/forumcomment/forumcomment.service';
import { PersonService } from 'src/app/services/person/person.service';
import { ReportService } from 'src/app/services/report/report.service';
import { Report } from 'src/app/models/report';
import { ForumRules } from 'src/app/models/ForumRules';
import { MatDialog } from '@angular/material/dialog';
import { DialogreportforumComponent } from './dialogreportforum/dialogreportforum.component';

@Component({
  selector: 'app-ForumPage',
  templateUrl: './ForumPage.component.html',
  styleUrls: ['./ForumPage.component.css'],
  providers: [DatePipe]
})
export class ForumPageComponent implements OnInit {
  isHidden=true
  forum!:Forum
  ForumRules!:ForumRules
  reportid!:number
  forumname!:string;
  reportdescriptiondialog!:string;
  usuario!:Person
  username!:string;
  userlastname!:string
  forumdescription!:string
  conductrules!:string
  iddepaso!:number
  newcommentform!:FormGroup
  rules!:FormGroup
  public idforum!:number
  Forumcomment!:Forumcomment
  dataSource1 !:MatTableDataSource<any>;
  idactualuser!:number
  date!:Date
  report!:Report
  constructor(private service:ForumService,private route:ActivatedRoute,private service2:PersonService,private formBuilder:FormBuilder,private servecommen:ForumcommentService,public datepipe: DatePipe
    ,private artistService:ArtistService,private fanaticService:FanaticService,private reportService:ReportService, public dialog:MatDialog) {
   this.forum={}as Forum
   this.usuario={}as Person
   this.ForumRules={}as ForumRules
   this.Forumcomment={}as Forumcomment
   this.dataSource1 = new MatTableDataSource<any>();
   this.report={}as Report

   }

  ngOnInit() {
    let pod=parseInt(this.route.snapshot.paramMap.get('forumid')!);
    let id= pod;
    this.idforum=id;
    this.getidforum(this.idforum)
    let pad=parseInt(this.route.snapshot.paramMap.get('id')!);
    let id2= pad;
    this.iddepaso=+this.route.snapshot.params['id']
    this.getfanatic()
    this.getartists()
    this.idactualuser=id2;
    this.newcommentform=this.formBuilder.group({

      comment:['',Validators.required]




    })
    this.rules=this.formBuilder.group({

       setrules:[this.conductrules,Validators.required]


    })

  }
  getidforum(id:number){

    this.service.getById(id).subscribe((response:any)=>{

     this.forum=response;
     console.log("inicio");
      //console.log(this.forum);
      this.forumname=this.forum.forumname;
      this.reportid=this.forum.person.id
      this.forumdescription=this.forum.forumdescription
      this.conductrules=this.forum.conductrules
      //console.log(this.forum.user)
      this.getidUser(this.forum.person.id)

    });


  }
  getidUser(id:number){

    this.service2.getById(id).subscribe((response:any)=>{

      this.usuario=response;
       //console.log(this.usuario);
       this.username=this.usuario.realname
       this.Forumcomment.commentdescription
       this.userlastname=this.usuario.lastname;

    });


  }

  openDialog(id:number){
    console.log(id);
    const dialogRef = this.dialog.open(DialogreportforumComponent, {
      width: '500px',
      data: {reportdescriptiondialog: this.reportdescriptiondialog},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.reportdescriptiondialog = result;
      console.log(this.reportdescriptiondialog);
      if(this.reportdescriptiondialog != null){
        this.flagPost(id,this.reportdescriptiondialog);
      }
    });
  }

  flagPost(id:number,descriptiondialog:string) {
    console.log(descriptiondialog)
    this.report.reportDescription=descriptiondialog
    this.reportService.create(this.report,+this.route.snapshot.params['id'],id)
      .subscribe((response: any) => {
        alert("reporte enviado")
        console.log(response);
      });
  }

  createrules(){

    this.service.update(this.idforum,this.ForumRules)
    .subscribe((response:any)=>{


    })



  }














  NewForumComment(userid:number,forumid:number){

    this.servecommen.create(this.Forumcomment,userid,forumid).subscribe((response: any) => {
      this.dataSource1.data.push( {...response});
      this.dataSource1.data = this.dataSource1.data.map((o: any) => { return o; });
      alert("se agrego un comentario")

    },err=>{
      alert("ponga un comentario")
    });


  }

crearcomentariodeforo(){
  this.date=new Date();
//this.Forumcomment.user=this.idactualuser
let latest_date =this.datepipe.transform(this.date, 'yyyy-MM-dd')!;
//this.Forumcomment.registerdate=this.date
//this.Forumcomment.forum=this.idforum
console.log(this.Forumcomment)
console.log(this.idactualuser,this.idforum)
this.NewForumComment(this.idactualuser,this.idforum)
//this.newcommentform.reset();



}


Limpiar(){

this.newcommentform.reset();



}
Limpiar2(){

  this.rules.reset();
  
  
  
  }
  


getartists(){

  this.artistService.getAll().subscribe((response: any)=>{

    const ap=response.content.find((a:any)=>{
      console.log('idactual')
        console.log(a.id)
        console.log('requerido')
        console.log(this.iddepaso)
        return  a.id === this.iddepaso



    })

    if(ap){

      this.isHidden=false

    }






   })



  }
getfanatic(){

this.fanaticService.getAll().subscribe((response: any)=>{

  const ap=response.content.find((a:any)=>{
    console.log('idactual')
      console.log(a.id)
      console.log('requerido')
      console.log(this.iddepaso)
      return  a.id === this.iddepaso



  })

  if(ap){

    this.isHidden=true

  }






 })


}





















}
