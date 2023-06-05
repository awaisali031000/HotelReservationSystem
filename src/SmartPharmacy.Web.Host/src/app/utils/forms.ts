import { FormGroup } from "@angular/forms";

const fnCheckForm = function checkForm(form: FormGroup): boolean {
  Object.keys(form.controls).forEach((key) => {
    form.controls[key].markAsDirty();
    form.controls[key].updateValueAndValidity();
  });
  return !form.invalid;
};

export { fnCheckForm };
