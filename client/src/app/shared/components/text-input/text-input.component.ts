import { Component, OnInit, ViewChild, ElementRef, Self, Input } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit, ControlValueAccessor {

  @ViewChild('input', {static: true}) inputEle: ElementRef;
  @Input() type = 'text';
  @Input() label: string;
  disabled: boolean;
  constructor(@Self() public controlDir: NgControl ) {
    this.controlDir.valueAccessor = this;
  }

  writeValue(obj: any): void {
    this.inputEle.nativeElement.value = obj || '';
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  onChange(event) {}
  onTouched() {}

  ngOnInit() {
    const control = this.controlDir.control;
    control.setValidators(control.validator ? [control.validator] : []);
    control.setAsyncValidators(control.asyncValidator ? [control.asyncValidator] : []);
    control.updateValueAndValidity();
  }

}
