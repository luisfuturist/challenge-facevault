import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonAddComponent } from './person-add.component';

describe('PersonAddComponent', () => {
  let component: PersonAddComponent;
  let fixture: ComponentFixture<PersonAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
