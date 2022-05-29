export let errorsArr = [];
// ----------------------------------------------------------
export function clearErrorsArr() {
  errorsArr = [];
}
// ------------------------------------------------------------------
export function addError(message, field) {
  errorsArr.push({
    message,
    field,
  });
}
//-------------------------------------------------------------------
function checkRequired(value, field) {
  if (value === '') {
    addError('this field is required', field);
    return true;
  }
  return false;
}
// ---------------------------------------------------------------------
function checkMinLength(value, minLength, field) {
  if (value.length <= minLength) {
    addError(`length must be greater than ${minLength}`, field);
  }
}

// --------------------------------------------------------------------

export function checkInput(valueToCheck, field, rulesArr) {
  // eslint-disable-next-line no-restricted-syntax
  for (const rule of rulesArr) {
    // rule === required
    if (rule === 'required') {
      if (checkRequired(valueToCheck, field)) {
        return;
      }
    }
    // rule===@
    if (rule.split('-')[0] === 'include') {
      const check = rule.split('-')[1];

      if (valueToCheck.includes('@') === false) {
        addError(`email should include ${check}`, field);
        return;
      }
    }

    // rule === minLength-X
    if (rule.split('-')[0] === 'minLength') {
      const min = rule.split('-')[1];
      checkMinLength(valueToCheck, min, field);
    }
    // rule === maxLength-X
    if (rule.split('-')[0] === 'maxLength') {
      const max = rule.split('-')[1];
      if (valueToCheck.length >= max) {
        addError(`Too long. Length must be less than ${max}`, field);
      }
    }
    // ruke===positive
    if (rule === 'positive') {
      if (valueToCheck < 0) {
        addError('must be positive', field);
        return;
      }
    }
  }
}
