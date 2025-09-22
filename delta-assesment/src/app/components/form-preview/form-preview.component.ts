import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { selectFormById } from '../store/forms/forms.selectors';


@Component({
  selector: 'app-form-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-preview.component.html'
})
export class FormPreviewComponent {
  template:any;
  constructor(private store: Store, private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.store.select(selectFormById(id)).subscribe(t => this.template = t);
  }
}
