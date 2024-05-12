import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbItemsComponent } from './breadcrumb-items.component';

describe('BreadcrumbItemsComponent', () => {
  let component: BreadcrumbItemsComponent;
  let fixture: ComponentFixture<BreadcrumbItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbItemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BreadcrumbItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
