/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DialogreportforumComponent } from './dialogreportforum.component';

describe('DialogreportforumComponent', () => {
  let component: DialogreportforumComponent;
  let fixture: ComponentFixture<DialogreportforumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogreportforumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogreportforumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
