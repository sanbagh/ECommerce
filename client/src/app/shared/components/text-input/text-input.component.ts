import { Component, OnInit, ViewChild, ElementRef, Self, Input, Optional, forwardRef } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';

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
    if (this.controlDir !== null) {
    this.controlDir.valueAccessor = this;
    }
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
    if (this.controlDir !== null) {
    const control = this.controlDir.control;
    if (control !== null) {
      control.setValidators(control.validator ? [control.validator] : []);
      control.setAsyncValidators(control.asyncValidator ? [control.asyncValidator] : []);
      control.updateValueAndValidity();
    }
    }
  }

}
