// @flow

import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import type { FieldProps } from 'redux-form/lib/FieldProps.types.js.flow';

type TextFieldProps = FieldProps & {
  className: String,
  label: String,
  title?: String,
  helperText?: String,
  fullWidth: Boolean,
  forceShrink: Boolean,
  type: String,
  required: Boolean,
};

const TextField = ({
  className,
  input,
  meta,
  label,
  title,
  helperText,
  forceShrink,
  required,
  ...inputProps
}: TextFieldProps) => (
  <FormControl className={className} error={!!meta.error && meta.touched} fullWidth>
    {title && <FormLabel htmlFor={input.name} required={required}>{title}</FormLabel>}
    <FormGroup>
      <FormControlLabel
        control={<Checkbox required={required} {...input} {...inputProps} />}
        label={label}
      />
    </FormGroup>
  </FormControl>
);

export default TextField;
