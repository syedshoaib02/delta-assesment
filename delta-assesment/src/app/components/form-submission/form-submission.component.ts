import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectSubmissionsByForm } from '../store/subscriptions/submissions.selector';


@Component({
  selector: 'app-form-submission',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-submission.component.html'
})
export class FormSubmissionComponent {
  submissions:any[] = [];
  constructor(private route: ActivatedRoute, private store: Store) {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.store.select(selectSubmissionsByForm(id)).subscribe(x => this.submissions = x);
  }
}
