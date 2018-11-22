import { Component, OnInit, Input } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { AwrFormService } from './awr-form.service';

@Component({
  selector: 'app-awr-form',
  templateUrl: './awr-form.component.html',
  styleUrls: ['./awr-form.component.css'],
  providers: [AwrFormService]
})
export class AwrFormComponent implements OnInit {
  @Input() requestId?: number;

  form: FormGroup;
  fields: FormlyFieldConfig[];
  model = {};
  options: {};

  constructor(private awrService: AwrFormService) { }

  ngOnInit() {
    this.form = new FormGroup({});
    this.fields = this.awrService.GetFormlyFields();
  }

  Cancel() {
    console.log('You clicked Cancel()!');
  }

  Get() { }

  GetById() { }

  Save() {
    console.log('You clicked Save()!');
  }

  Submit() { }

  Update() { }
}
