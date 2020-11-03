import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Button, Spinner } from 'reactstrap';
import { PHOTO_CATEGORY_OPTIONS } from 'contants/global';
import { Formik, Form, FastField } from 'formik';
import InputField from 'custom-fields/InputField';
import SelectField from 'custom-fields/SelectField';
import RandomPhotoField from 'custom-fields/RandomPhotoField';
import * as Yup from 'yup';

PhotoForm.propTypes = {
  onSubmit: PropTypes.func,
  isAddMode: PropTypes.bool,
  initialValues: PropTypes.object,
};

PhotoForm.defaultProps = {
  onSubmit: null,
  isAddMode: null,
  initialValues: null
}

function PhotoForm(props) {
  const { onSubmit, isAddMode, initialValues } = props;
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('This fied a required'),

    categoryId: Yup.number().required('This fied a required').nullable(),

    photo: Yup.string().when('categoryId', {
      is: 1,
      then: Yup.string().required('This field a required'),
      otherwise: Yup.string().notRequired()
    })
  });
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {formikProps => {
        const { values, errors, touched, isSubmitting } = formikProps;
        console.log({ values, errors, touched });
        return (
          <Form>
            <FastField
              name="title"
              component={InputField}

              label="Title"
              placeholder="Eg: Wow nature ..."
            />
            <FastField
              name="categoryId"
              component={SelectField}

              label="Category"
              placeholder="What's your photo category"
              options={PHOTO_CATEGORY_OPTIONS}
            />

            <FastField
              name="photo"
              component={RandomPhotoField}

              label="Photo"
            />
            <FormGroup>
              <Button
                type="submit"
                color={isAddMode ? "primary" : "success"}
              >
                {isSubmitting && <Spinner size='sm' />}
                {isAddMode ? 'Add to album' : 'Update Photo'}
              </Button>
            </FormGroup>
          </Form>
        );
      }}
    </Formik>
  );
}

export default PhotoForm;