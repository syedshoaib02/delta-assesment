import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { FormBuilderComponent } from './form-builder.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('FormBuilderComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormBuilderComponent, ReactiveFormsModule],
      providers: [provideMockStore({})]
    }).compileComponents();
  });

  it('creates and adds a field', () => {
    const fixture = TestBed.createComponent(FormBuilderComponent);
    const comp = fixture.componentInstance;
    comp.addField('text');
    expect(comp.fields.length).toBeGreaterThan(0);
  });
});
