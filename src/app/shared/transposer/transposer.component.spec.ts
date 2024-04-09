import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransposerComponent } from './transposer.component';

describe('TransposerComponent', () => {
  let component: TransposerComponent;
  let fixture: ComponentFixture<TransposerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransposerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransposerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
