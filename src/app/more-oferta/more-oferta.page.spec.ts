import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoreOfertaPage } from './more-oferta.page';

describe('MoreOfertaPage', () => {
  let component: MoreOfertaPage;
  let fixture: ComponentFixture<MoreOfertaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreOfertaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoreOfertaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
