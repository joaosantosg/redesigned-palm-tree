import { forwardRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

// ----------------------------------------------------------------------

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
};

export const RHFSelect = forwardRef<HTMLInputElement, Props>(
  ({ name, label, placeholder, options, ...other }, ref) => {
    const { control } = useFormContext();

    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            select
            fullWidth
            label={label}
            placeholder={placeholder}
            error={!!error}
            helperText={error?.message}
            ref={ref}
            {...other}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
    );
  }
); 