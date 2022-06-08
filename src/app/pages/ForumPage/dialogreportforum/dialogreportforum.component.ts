import { Component, OnInit,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ForumPageComponent } from '../ForumPage.component';

export interface DialogData{
  reportdescriptiondialog:string;
}

@Component({
  selector: 'dialog-report-forum',
  templateUrl: './dialogreportforum.component.html',
})

export class DialogreportforumComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogreportforumComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
