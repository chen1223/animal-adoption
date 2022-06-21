import { Component, OnInit, forwardRef, Input, AfterViewInit, HostBinding, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'filter-select',
  templateUrl: './filter-select.component.html',
  host: { 'class': 'filter-select' },
  styleUrls: ['./filter-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilterSelectComponent),
      multi: true
    }
  ]
})
export class FilterSelectComponent implements OnInit, AfterViewInit, ControlValueAccessor {

  faCaretDown = faCaretDown;
  faCaretUp = faCaretUp;

  // Current selected value
  selectedValue: any = null;
  propagateChange = (_: any) => {};

  // Dropdown options that are passed in as input
  @Input() options: FilterOptions[] = [];
  @Input() ctrl: FormControl;

  // Dictionary to map key and value
  optionDict = {};
  constructor() { }

  // Determine if the dropdown menu is open: 'expanded' or closed: 'collapsed'
  status: string = 'collapsed';

  ngOnInit() {
    this.prepareDict();
  }

  ngAfterViewInit() {
    if (this.ctrl) {
      this.ctrl.valueChanges.subscribe(value => {
        if (value !== undefined) {
          this.setValue(value);
        }
      });
    }
  }

  // Prepare dictionary based on input options
  prepareDict(): void {
    this.optionDict = {};
    this.options.forEach(option => {
      this.optionDict[option.key] = option.description;
    });
  }

  // Get description based on given value
  getDesc(value: string): string {
    return this.optionDict[value] ? this.optionDict[value] : '';
  }

  // Set value
  setValue(value: string) {
    if (value !== this.selectedValue) {
      this.selectedValue = value;
      if (this.ctrl) {
        this.ctrl.setValue(this.selectedValue);
      }
      this.propagateChange(this.selectedValue);
    }
  }

  // Toggle status
  toggleClass(): void {
    this.status = this.status === 'collapsed' ? 'expanded' : 'collapsed';
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.selectedValue = value;
    }
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }
}
export interface FilterOptions {
  description: string;
  key: string;
}
