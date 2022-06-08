import { Component, OnInit,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FanaticForumcommentComponent } from '../Fanatic-Forumcomment.component'; 

export interface DialogData{
  reportdescriptiondialog:string;
}

@Component({
  selector: 'dialog-report-comment',
  templateUrl: './dialogreportcomment.component.html',
})

export class DialogreportcommentComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogreportcommentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
