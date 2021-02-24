import React from 'react';
import Input from './Input';
/* ----------
  Material imports
---------- */
import { Button, FormControl, Grid } from '@material-ui/core';

// This component takes in objects the names and values of forms about to be rendered.
// Iterating over these objects it will dynamically create a form depending on the objects passed in.
const FormField = ({inputNames, inputValues, submitValue, handleChange, handleSubmit}) => {

  const renderInputs = () => {
    const inputs = []

    for (const i in inputNames) {
      // Grab needed values from both inputNames and inputValues simultaneously
      const name = inputNames[i]
      const value = inputValues[i]

      inputs.push(
        <Grid item key={name}>
          <Input
            key={name}
            name={name}
            value={value}
            handleChange={handleChange}
          />
        </Grid>
      );
    }

    return inputs;
  }

  return (
        <FormControl onSubmit={handleSubmit} noValidate autoComplete="off">
          <Grid container alignItems="center">
            {renderInputs()}
            <Grid item>
              <Button type='submit'>{submitValue}</Button>
            </Grid>
          </Grid>
        </FormControl>
  );
};

export default FormField;