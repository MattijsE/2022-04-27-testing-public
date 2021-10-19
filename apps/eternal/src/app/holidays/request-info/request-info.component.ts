import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-request-info',
  templateUrl: './request-info.component.html',
  styles: []
})
export class RequestInfoComponent implements OnInit {
  formGroup: FormGroup = this.formBuilder.group({
    address: []
  });
  title = 'Request More Information';
  @Input() address = '';
  submitter$ = new Subject<void>();
  lookupResult$: Observable<string> | undefined;
  lookuper = { lookup: (address: string) => of(false) };

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    if (this.address) {
      this.formGroup.setValue({ addresss: this.address });
    }

    this.lookupResult$ = this.submitter$.pipe(
      switchMap(() => this.lookuper.lookup(this.formGroup.value.address)),
      map((found) => (found ? 'Brochure sent' : 'Address not found'))
    );
  }

  search(): void {
    this.submitter$.next();
  }
}

@NgModule({
  declarations: [RequestInfoComponent],
  exports: [RequestInfoComponent],
  imports: [CommonModule, ReactiveFormsModule]
})
export class RequestInfoComponentModule {}
