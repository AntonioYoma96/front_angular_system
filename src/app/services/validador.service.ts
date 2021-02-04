import { AbstractControl, FormGroup } from "@angular/forms";
import { Injectable } from "@angular/core";

 @Injectable({ providedIn: "root" })
export class ValidadorService {
  validateChar(control: AbstractControl): { [key: string]: any } | null {
    const regexp = /^(?=.*[a-z]).+$/;
    return regexp.test(control.value) ? null : { errorChar: { valid: false } };
  }
  validateUpper(control: AbstractControl): { [key: string]: any } | null {
    const regexp = /^(?=.*[A-Z]).+$/;
    return regexp.test(control.value) ? null : { errorUpper: { valid: false } };
  }
  validateNum(control: AbstractControl): { [key: string]: any } | null {
    const regexp = /^(?=.*[0-9]).+$/;
    return regexp.test(control.value) ? null : { errorNum: { valid: false } };
  }
  validateSymbols(control: AbstractControl): { [key: string]: any } | null {
    const regexp = /^(?=.*[@#$%^&+*!=]).+$/;
    return regexp.test(control.value)
      ? null
      : { errorSymbol: { valid: false } };
  }
  validateSpace(control: AbstractControl): { [key: string]: any } | null {
    const regexp = /^(?!.*[\s]).+$/;
    return regexp.test(control.value) ? null : { errorSpace: { valid: false } };
  }
}
