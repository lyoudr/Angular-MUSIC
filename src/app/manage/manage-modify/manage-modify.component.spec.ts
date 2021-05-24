import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageModifyComponent } from './manage-modify.component';

describe('ManageModifyComponent', () => {
  let component: ManageModifyComponent;
  let fixture: ComponentFixture<ManageModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
