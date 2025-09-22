import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { FormFillComponent } from './form-fill.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('FormFillComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFillComponent, ReactiveFormsModule],
      providers: [provideMockStore({ initialState: { forms: { forms: [{ id:'1', name:'T', fields: [] }] } } })]
    }).compileComponents();
  });

  it('builds empty form from template', () => {
    const fixture = TestBed.createComponent(FormFillComponent);
    const comp = fixture.componentInstance;
    comp['template'] = { id: '1', name: 'T', fields: [] };
    comp.buildForm();
    expect(comp.form).toBeTruthy();
  });
});
