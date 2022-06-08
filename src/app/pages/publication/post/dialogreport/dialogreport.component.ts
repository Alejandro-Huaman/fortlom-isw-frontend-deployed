import { Component, OnInit,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PostComponent } from '../post.component';

export interface DialogData{
  reportdescriptiondialog:string;
}

@Component({
  selector: 'dialog-report',
  templateUrl: './dialogreport.component.html',
})

export class DialogOverviewReportDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewReportDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
