import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavDraggableComponent } from './sidenav-draggable.component';

describe('SidenavDraggableComponent', () => {
  let component: SidenavDraggableComponent;
  let fixture: ComponentFixture<SidenavDraggableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavDraggableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidenavDraggableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
