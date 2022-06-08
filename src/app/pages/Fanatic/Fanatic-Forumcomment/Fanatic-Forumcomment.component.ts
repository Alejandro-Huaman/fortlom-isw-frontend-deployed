import { ActivatedRoute } from '@angular/router';
import { ForumcommentService } from 'src/app/services/forumcomment/forumcomment.service';
import { Forumcomment } from './../../../models/forumcomment';
import { Component, OnInit,ViewChild,Input } from '@angular/core';
import {NgForm} from "@angular/forms";
import { DatePipe } from '@angular/common';
import {formatDate} from '@angular/common';
import { MatSort } from '@angular/material/sort';
import {MatPaginator} from "@angular/material/paginator";
import { MatTableDataSource } from '@angular/material/table';
import { Forum } from 'src/app/models/forum';
import { ForumService } from 'src/app/services/forum/forum.service';
import { Report } from 'src/app/models/report';
import { ReportService } from 'src/app/services/report/report.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogreportcommentComponent } from './dialogreportcomment/dialogreportcomment.component';
@Component({
  selector: 'app-Fanatic-Forumcomment',
  templateUrl: './Fanatic-Forumcomment.component.html',
  styleUrls: ['./Fanatic-Forumcomment.component.css'],
  providers: [DatePipe]
})
export class FanaticForumcommentComponent implements OnInit {

  commentdata !:Forumcomment;
  commentdatabyid !:Forumcomment;
  reportdescriptiondialog!:string;
  dataSource!:MatTableDataSource<any>;
  @ViewChild('commentdataForm', {static: false})
  commentdataForm !: NgForm;
  forumbyid!:Forum;
  fecha!:string;
     report!:Report
  displayedColumns: string[] = ['id', 'CommentDescription','forum','Date','actions'];
   @Input() comentarios!:number;
  @ViewChild(MatSort) sort !:MatSort;
  @ViewChild(MatPaginator,{static: false}) paginator !:MatPaginator;
  searchKey!:string;
  isEditMode = false;
  paso:string="vacio";
  myDate !: Date;
  proDate = new Date();
  proDatevalue!:string;
  userid!:number
  forumid!:number
  latest_date!:string
  constructor(private service:ForumcommentService,private serviceext:ForumService,private datePipe: DatePipe,
    private reportService:ReportService,private route:ActivatedRoute, public dialog:MatDialog) {
     this.commentdata={} as Forumcomment;
     this.commentdatabyid={} as Forumcomment;
     this.forumbyid={}as Forum;
     this.report={} as Report;
     this.dataSource=new MatTableDataSource<any>();

      
  }

  ngOnInit(): void {


    console.log(this.comentarios)
    //this.getAllcommentsperaforum() cambiar despues de la tb3
    //console.log(this.paso)
    //this.getAllComments()//cambiar despues de exponer
    this.getAllcommentsperaforum()

  }

  getAllComments(){
    this.service.getAll().subscribe((response: any) => {
      this.dataSource.data = response.content;
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
      console.log("datos");
      console.log(this.dataSource.data)

    });


  }
  getAllcommentsperaforum(){
    console.log(this.comentarios)
    this.service.getallcommentsperforum(this.comentarios).subscribe((response: any) => {
      this.dataSource.data = response.content;
      console.log(this.dataSource.data)
    });


  }

getname(){

 this.paso=this.forumbyid.forumname;
  return this.paso;
}
getidComment(id:number){

this.service.getById(id).subscribe((response:any)=>{

  this.commentdatabyid=response;
  console.log(this.commentdatabyid.forum);

});


}

getidForum(id:number){
console.log("entro")
this.serviceext.getById(id).subscribe((response=>this.forumbyid=response))
console.log("medio")
console.log(this.forumbyid)
}


getfecha(sr:string){
this.fecha=sr;
}


  OnSearchClear(){
    this.searchKey="";
    this.applyfilter();


    }
    

    cancelEdit() {
      this.isEditMode = false;
      this.commentdataForm.resetForm();
    }

    applyfilter(){

      this.dataSource.filter=this.searchKey.trim().toLowerCase();


      }

      deleteItem(id: number) {
        this.service.delete(id).subscribe((response: any) => {
          this.dataSource.data = this.dataSource.data.filter((o: Forumcomment) => {
            return o.id !== id ? o : false;
          });
        });
        console.log(this.dataSource.data);
      }




addcomment(userid:number,forumid:number){

  console.log("user")
  console.log(userid)
  this.service.create(this.commentdata,userid,forumid).subscribe((response: any) => {
    this.dataSource.data.push( {...response});
    this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
  });


}



updatecomment() {
  this.service.update(this.commentdata.id, this.commentdata).subscribe((response: any) => {
    this.dataSource.data = this.dataSource.data.map((o: Forumcomment) => {
      if (o.id === response.id) {
        o = response;
      }
      return o;
    });
    this.cancelEdit();
  });
}


getfechacomment(fecha:Date){




this.proDate=fecha

this.proDatevalue = this.datePipe.transform(fecha, 'yyyy-MM-dd')!;


return this.proDatevalue

}
getUserId(id :number){


  return this.dataSource.data[id-1].user.id


  }




onSubmit(){
this.myDate=new Date();
this.latest_date =this.datePipe.transform(this.myDate, 'yyyy-MM-dd')!;
//this.commentdata.registerdate=this.myDate
  if (this.commentdataForm.form.valid) {
    console.log(this.commentdata );
    if (this.isEditMode) {
      console.log("se actualiza")
      this.updatecomment();
    } else {
      this.userid=1
      this.addcomment(this.userid,this.forumid);
    }
    }
    else{
      console.log('Invalid data');
    }






}

openDialog(id:number){
    console.log(id);
    const dialogRef = this.dialog.open(DialogreportcommentComponent, {
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
  console.log(descriptiondialog);
  this.report.reportDescription=descriptiondialog
  this.reportService.create(this.report,+this.route.snapshot.params['id'],id)
    .subscribe((response: any) => {
      alert("reporte enviado")
      console.log(response);
    });
}
}
