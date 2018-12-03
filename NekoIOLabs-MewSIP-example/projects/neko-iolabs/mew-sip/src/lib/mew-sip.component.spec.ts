import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MewSipComponent } from './mew-sip.component';

describe('MewSipComponent', () => {
  let component: MewSipComponent;
  let fixture: ComponentFixture<MewSipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MewSipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MewSipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
