import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, FormFeedback } from 'reactstrap';
import Select from 'react-select';
import { ErrorMessage } from 'formik';

SelectField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  options: PropTypes.array,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

SelectField.defaultProps = {
  options: [],
  label: '',
  placeholder: '',
  disabled: false
}

function SelectField(props) {
  const {
    field, form,
    options, label, placeholder, disabled
  } = props;
  const { name, value } = field;
  const { errors, touched } = form;
  const showErrors = errors[name] && touched[name];
  const optionValue = options.find(option => option.value === value);
  const handleSelectedOptionChange = selectedOption => {
    const selectedValue = selectedOption ? selectedOption.value : selectedOption;

    const changeEvent = {
      target: {
        value: selectedValue,
        name: name
      }
    }
    field.onChange(changeEvent);
  }
  return (
    <FormGroup>
      {label && <Label for={name}>{label}</Label>}
      <Select
        id={name}
        {...field}
        value={optionValue}
        onChange={handleSelectedOptionChange}
        disabled={disabled}
        placeholder={placeholder}
        options={options}
        className={showErrors ? 'is-invalid' : ''}
      />
      <ErrorMessage name={name} component={FormFeedback} />
    </FormGroup>
  );
}

export default SelectField;