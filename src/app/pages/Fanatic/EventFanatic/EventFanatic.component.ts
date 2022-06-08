import { ArtistService } from './../../../services/artist/artist.service';
import { Component, OnInit, ViewChild  } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {NgForm} from "@angular/forms";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Person } from 'src/app/models/Person';
import { EventService } from 'src/app/services/event/event.service';
import { Event } from 'src/app/models/event';

@Component({
  selector: 'app-EventFanatic',
  templateUrl: './EventFanatic.component.html',
  styleUrls: ['./EventFanatic.component.css']
})
export class EventFanaticComponent implements OnInit {

  
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
  conditionaltype : string = "Test";
  displayedColumns: string[] = ['id','EventName','EventDescription','ArtistID','Likes'];
  showeventartist = false;
   checklink=true
  @ViewChild('EventForm', {static: false})
  EventForm!: NgForm;

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;

  constructor(private eventService: EventService,private ArtistService:ArtistService,private dialog:MatDialog) {
    this.eventdata = {} as Event;
    this.userdata = {} as Person;
    this.dataSource = new MatTableDataSource<any>();
    this.dataSource2 = new MatTableDataSource<any>();
  }


  ngOnInit():void {
    this.dataSource.paginator = this.paginator;
    this.getAllEvents();
    this.getListArtist();
  }

  getAllEvents() {
    this.eventService.getAll().subscribe((response: any) => {
      this.dataSource.data = response.content;
      this.dataSource.paginator=this.paginator;
      this.arrayevents = response.content;
      console.log(this.arrayevents)
    });
  }

  getListArtist(){
    this.eventService.getAll().subscribe((response: any) => {
      this.dataSource.data = response.content;
      this.dataSource.paginator=this.paginator;
      this.arrayevents = response.content;

      let n = this.arrayevents.length;

      this.ArtistService.getAll().subscribe((response: any) => {
        this.dataSource2.data = response;
        this.dataSource2.paginator=this.paginator;
        this.arrayusers = response.content;
        console.log(this.arrayusers)

        let n2 = this.arrayusers.length;

        for(let i = 0; i<n2;i++){
          if(this.arrayevents[0].ArtistID == this.arrayusers[i].id){
            this.listusers.push(this.arrayusers[i]);
          }
        }

        for(let i = 0; i<n;i++){
          for(let j = 0; j<n2;j++){
            if(this.arrayevents[i].ArtistID == this.arrayusers[j].id){
              if(this.listusers[j] != this.arrayusers[j])this.listusers.push(this.arrayusers[j]);
            }
          }
        }

      });
      console.log(this.listusers)
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

  ShowEventsArtist(){
    this.showeventartist = true;
    this.checklink=false
    console.log(this.showeventartist)
    console.log("s")
    console.log(this.checklink)
  }

  NotShowEventsArtist(){
    this.showeventartist = false;
    console.log(this.showeventartist)
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


  checkislickisinevent(link:string){

        
        if(link=="" || link==null){
          
          return false
        }
        return true
        

  }








}
