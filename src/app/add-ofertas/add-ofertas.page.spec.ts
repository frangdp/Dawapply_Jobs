import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddOfertasPage } from './add-ofertas.page';

describe('AddOfertasPage', () => {
  let component: AddOfertasPage;
  let fixture: ComponentFixture<AddOfertasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOfertasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddOfertasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
