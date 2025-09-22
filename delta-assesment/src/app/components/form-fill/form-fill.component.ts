import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
  ReactiveFormsModule,
  AbstractControl
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { v4 as uuid } from 'uuid';
import { Store } from '@ngrx/store';
import { MockApiService } from '../services/mock-api.service';
import { selectFormById } from '../store/forms/forms.selectors';
import { addSubmission } from '../store/subscriptions/submissions.actions';

import { take } from 'rxjs/operators';
import { FormSubmission, FormTemplate } from '../services/model';

@Component({
  selector: 'app-form-fill',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './form-fill.component.html',
})
export class FormFillComponent implements OnInit {
  template!: FormTemplate;
  form!: FormGroup;
  submitting = false;
  message = '';

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private fb: FormBuilder,
    private api: MockApiService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.store.select(selectFormById(id)).pipe(take(1)).subscribe(template => {
      if (template) {
        this.template = template;
        this.buildForm();
      }
    });
  }

  buildForm() {
    const group: { [key: string]: AbstractControl } = {};

    this.template.fields.forEach(field => {
      if (field.type === 'checkbox') {
        const arr = (field.options || []).map(() => this.fb.control(false));
        group[field.id] = this.fb.array(arr, field.required ? this.minSelected(1) : null);
      } else {
        const validators: any[] = [];

        if (field.required) validators.push(Validators.required);
        if (field.validations?.minLength) validators.push(Validators.minLength(Number(field.validations.minLength)));
        if (field.validations?.maxLength) validators.push(Validators.maxLength(Number(field.validations.maxLength)));
        if (field.validations?.pattern) validators.push(Validators.pattern(field.validations.pattern));

        group[field.id] = this.fb.control('', validators);
      }
    });

    this.form = this.fb.group(group);
  }

  minSelected(min = 1) {
    return (control: AbstractControl) => {
      const arr = control as FormArray;
      const selectedCount = arr.controls.filter(c => c.value).length;
      return selectedCount >= min ? null : { required: true };
    };
  }

  getCheckboxControl(fieldId: string, index: number): FormControl {
    return (this.form.get(fieldId) as FormArray).at(index) as FormControl;
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;

    const submission: FormSubmission = {
      id: uuid(),
      formId: this.template.id,
      data: this.form.value,
      submittedAt: new Date()
    };

    this.api.submit(submission).subscribe({
      next: () => {
        this.store.dispatch(addSubmission({ submission }));
        this.message = 'Submitted successfully';
        this.submitting = false;
        setTimeout(() => this.router.navigate(['/forms']), 900);
      },
      error: (err) => {
        this.message = 'Submission failed: ' + (err.message || 'Unknown error');
        this.submitting = false;
      }
    });
  }
}
