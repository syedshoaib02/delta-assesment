import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { v4 as uuid } from 'uuid';
import { ActivatedRoute, Router } from '@angular/router';
import { addForm, updateForm } from '../store/forms/forms.action';
import { take } from 'rxjs/operators';
import { FormTemplate } from '../services/model';
import { AuthService } from '../services/auth.service';
import { CommonModule as AngularCommonModule } from '@angular/common';

@Component({
  selector: 'app-form-builder',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DragDropModule],
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {
  form!: FormGroup;
  editingId: string | null = null;
  types = ['text', 'textarea', 'dropdown', 'checkbox', 'radio', 'date'];
  previewMode = false;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      fields: this.fb.array([])
    });

    const edit = this.route.snapshot.queryParamMap.get('edit');
    if (edit) {
      this.editingId = edit;
      this.store
        .select((state: any) => state.forms.forms)
        .pipe(take(1))
        .subscribe((forms: FormTemplate[]) => {
          const existingForm = forms.find(f => f.id === edit);
          if (existingForm) this.loadForm(existingForm);
        });
    }
  }

  // --- Role Checks ---
  canEdit(): boolean {
    return this.auth.isAdmin();
  }

  // --- FormArray helpers ---
  get fields(): FormArray {
    return this.form.get('fields') as FormArray;
  }

  createField(data?: any): FormGroup {
    const type = data?.type || 'text';
    const optionsArray =
      type === 'dropdown' || type === 'checkbox' || type === 'radio'
        ? (data?.options || []).map((o: any) => new FormControl(o))
        : [];

    return this.fb.group({
      id: [data?.id || uuid()],
      type: [type, Validators.required],
      label: [data?.label || '', Validators.required],
      required: [!!data?.required],
      helpText: [data?.helpText || ''],
      options: this.fb.array(optionsArray),
      validations: this.fb.group({
        minLength: [data?.validations?.minLength || ''],
        maxLength: [data?.validations?.maxLength || ''],
        pattern: [data?.validations?.pattern || '']
      })
    });
  }

  addField(type?: string) {
    if (!this.canEdit()) return;
    this.fields.push(this.createField({ type: type || 'text' }));
  }

  removeField(index: number) {
    if (!this.canEdit()) return;
    this.fields.removeAt(index);
  }

  addOption(fieldIndex: number) {
    if (!this.canEdit()) return;
    const options = this.fields.at(fieldIndex).get('options') as FormArray;
    options.push(new FormControl('Option'));
  }

  removeOption(fieldIndex: number, optionIndex: number) {
    if (!this.canEdit()) return;
    const options = this.fields.at(fieldIndex).get('options') as FormArray;
    options.removeAt(optionIndex);
  }

drop(event: CdkDragDrop<AbstractControl[]>) {
  moveItemInArray(this.fields.controls, event.previousIndex, event.currentIndex);
  this.fields.updateValueAndValidity();
}


  loadForm(f: FormTemplate) {
    this.form.patchValue({ id: f.id, name: f.name });
    this.fields.clear();
    (f.fields || []).forEach(field => this.fields.push(this.createField(field)));
  }

  getOptions(fieldIndex: number): FormControl[] {
    const options = this.fields.at(fieldIndex).get('options');
    return options instanceof FormArray ? options.controls.map(c => c as FormControl) : [];
  }

  getValidations(fieldIndex: number): FormGroup {
    const validations = this.fields.at(fieldIndex).get('validations');
    return validations instanceof FormGroup ? validations : this.fb.group({});
  }

  togglePreview() {
    this.previewMode = !this.previewMode;
  }

  save() {
    if (!this.canEdit()) return;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const tpl = this.form.value as FormTemplate;
    tpl.id = tpl.id || uuid();

    if (this.editingId) {
      this.store.dispatch(updateForm({ form: tpl }));
    } else {
      this.store.dispatch(addForm({ form: tpl }));
    }

    this.router.navigate(['/forms']);
  }

checkPattern(value: string, pattern?: string): boolean {
  if (!pattern) return true; // no pattern means valid
  try {
    return new RegExp(pattern).test(value);
  } catch (e) {
    return true;
  }
}

}
