import { EventService } from './../../../services/event/event.service';
import { Component, OnInit,ViewChild } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {NgForm} from "@angular/forms";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Person } from 'src/app/models/Person';
import { PersonService } from 'src/app/services/person/person.service';
import { ActivatedRoute } from '@angular/router';
import { Event } from 'src/app/models/event';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-ArtistEvent',
  templateUrl: './ArtistEvent.component.html',
  styleUrls: ['./ArtistEvent.component.css'],
  providers: [DatePipe]
})
export class ArtistEventComponent implements OnInit {

  eventdata!: Event;
  idevent !:number;
  userdata!: Person;
  cont : number = 0;
  listusers : Person[] = [];
  events:Event[]=[];
  dataSource!: MatTableDataSource<any>;
  dataSource2!: MatTableDataSource<any>;
  arrayusers !: any;
  arrayevents!: any;
  eventbyid!:any;
  name!:string;
  lastname!:string;
  conditionaltype : string = "Test";
  displayedColumns: string[] = ['id','EventName','EventDescription','ArtistID','Likes'];

  @ViewChild('EventForm', {static: false})
  EventForm!: NgForm;

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;

  isEditMode = false;

  showeventartist = false;

  showformevent = false;

  proDate = new Date();
  proDatevalue!:string;

  constructor(private eventService: EventService,private userService: PersonService,private dialog:MatDialog, private route:ActivatedRoute,private datePipe: DatePipe) {
    this.eventdata = {} as Event;
    this.userdata = {} as Person;
    this.dataSource = new MatTableDataSource<any>();
    this.dataSource2 = new MatTableDataSource<any>();
  }

  ngOnInit():void{
    this.dataSource.paginator = this.paginator;
    this.getAllEvents();
    let pod=parseInt(this.route.snapshot.paramMap.get('id')!);
    let id = pod;
    this.idevent=id;
    console.log(this.idevent);
    
  this.getByIdUser(1)
  }

  getAllEvents() {
    this.eventService.getAll().subscribe((response: any) => {
      this.dataSource.data = response.content;
      this.dataSource.paginator=this.paginator;
      this.arrayevents = response.content;
      console.log("array")
      console.log(this.arrayevents)
    });
  }






  setfecha( event: MatDatepickerInputEvent<Date>){
    console.log(event.value)
    this.eventdata.registerdate=event.value!
  }


 

  addEvent() {
    console.log(this.idevent);
    console.log(this.eventdata);
    this.eventdata.eventlikes=0
    this.eventService.create(this.idevent,this.eventdata).subscribe((response: any) => {
     
      this.arrayevents.push( {...response});
      this.arrayevents = this.arrayevents.map((o: any) => { return o; });
    },err=>{
      alert("campos mal puestos")
    });
  }

  

  cancelEdit() {
    this.isEditMode = false;
    this.EventForm.resetForm();
  }

  

  

  updateEvent() {
    this.eventService.update(this.eventdata.id, this.eventdata).subscribe((response: any) => {
      this.arrayevents = this.arrayevents.map((o: Event) => {
        if (o.id === response.id) {
          o = response;
        }
        return o;
      });
      this.cancelEdit();
    });
  }

  onSubmit() {
      console.log(this.eventdata);
      if (this.isEditMode) {
        this.updateEvent();
        console.log("se actualizo")
      } else {
        this.addEvent();
      }
  }

  getEventsById(id:number){
    this.eventService.getById(id).subscribe((response: any) => {
      this.dataSource.data = response;
      this.dataSource.paginator=this.paginator;

      console.log(response)
    });
  }

  Increasinglikes(id:number){
    this.eventService.getById(id).subscribe((response: any) => {
      this.dataSource.data = response;
      this.dataSource.paginator=this.paginator;
      this.eventdata = response

      var presentlikes = this.eventdata.eventlikes;
      var finalLikes = presentlikes + 1;
      this.eventdata.eventlikes = finalLikes

      this.eventService.update(this.eventdata.id, this.eventdata).subscribe((response: any) => {
        this.arrayevents = this.arrayevents.map((o: Event) => {
          if (o.id === response.id) {
            o = response;
          }
          return o;
        });
      });

    });

  }
  decreaselikes(id:number){
    this.eventService.getById(id).subscribe((response: any) => {
      this.dataSource.data = response;
      this.dataSource.paginator=this.paginator;
      this.eventdata = response

      var presentlikes = this.eventdata.eventlikes;
      var finalLikes = presentlikes - 1;
      this.eventdata.eventlikes = finalLikes

      this.eventService.update(this.eventdata.id, this.eventdata).subscribe((response: any) => {
        this.arrayevents = this.arrayevents.map((o: Event) => {
          if (o.id === response.id) {
            o = response;
          }
          return o;
        });
      });

    });

  }




  ShowEventsArtist(){
    this.showeventartist = true;
    console.log(this.showeventartist)
  }

  NotShowEventsArtist(){
    this.showeventartist = false;
    console.log(this.showeventartist)
  }

  ShowFormEvent(){
    this.showformevent = true;
    console.log(this.showformevent)
  }

  NotShowFormEvent(){
    this.showformevent = false;
    console.log(this.showformevent)
  }

  ClearForm(){
    this.EventForm.resetForm();
  }

  getuserinformation(id:number){
    this.userService.getById(id).subscribe((response: any) => {
      this.dataSource.data = response;
      this.userdata = response;
      this.name=this.userdata.realname
      this.lastname=this.userdata.lastname
      return this.name
    });



  }


getByIdUser(id:number) {
    this.userService.getById(id).subscribe((response: any) => {
      this.dataSource.data = response;
      this.userdata = response;
      this.name=this.userdata.realname
      this.lastname=this.userdata.lastname
      console.log(this.userdata);
    });
  }


  getfechacomment(fecha:Date){




    this.proDate=fecha
    
    this.proDatevalue = this.datePipe.transform(fecha, 'yyyy-MM-dd')!;
    
    
    return this.proDatevalue
    
    }


    checkislickisinevent(link:string){

       
      if(link=="" || link==null){
        
        return false
      }
      return true
      

}

}
