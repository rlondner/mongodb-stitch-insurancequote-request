import React from 'react';
import { render } from 'react-dom';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import { withFormik, Form, Field } from 'formik';
import Yup from 'yup';
import logo from './lemonade-logo.svg';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const App = ({
    values,
    errors,
    touched,
    isSubmitting
}) => (
    <div className="container">
        <img src={logo} alt="logo" width="200" />
        <h1 className="text-center">Request A Quote</h1>
        <Form>
            <div className="form-group">
                <label>
                    Select a policy type
                    <Field component="select" name="type" className="form-control">
                        <option value="renters">Renters</option>
                        <option value="condo">Condo</option>
                        <option value="homeowners">Homeowners</option>
                    </Field>
                </label>
            </div>
            <div className="form-group">
                <label>Name</label>
                <div className="input-group">
                    <Field name="first_name" placeholder="First" className="form-control" />
                    <Field name="last_name" placeholder="Last" className="form-control" />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label>
                        Date of Birth
                        <Field type="date" name="date_of_birth" placeholder="Date of Birth" className="form-control" />
                    </label>
                </div>
                <div className="form-group col-md-6">
                    <label>
                        Email
                        <Field type="email" name="email" placeholder="Email" className="form-control" />
                    </label>
                    { touched.email && errors.email && <p>{errors.email}</p> }
                </div>
            </div>
            <div className="form-group">
                <label>Address</label>
                <div className="input-group">
                    <Field name="street_number" placeholder="Street Number" className="form-control" />
                    <Field name="street" placeholder="Street" className="form-control" />
                    <Field name="unit" placeholder="Unit/Apt #" className="form-control" />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label>
                        City
                        <Field name="city" placeholder="City" className="form-control" />
                    </label>
                </div>
                <div className="form-group col-md-4">
                    <label>
                        State
                        <Field name="state" placeholder="State" className="form-control" />
                    </label>
                </div>
                <div className="form-group col-md-2">
                    <label>
                        Zip
                        <Field name="postal_code" placeholder="Zip" className="form-control" />
                    </label>
                </div>
            </div>
            { values.type !== 'renters' &&
                <div className="form-group row">
                    <label className="col-sm-8 col-form-label">Square Footage</label>
                    <div className="col-sm-4">
                        <Field type="number" name="square_ft" placeholder="Square Footage" className="form-control" />
                    </div>
                </div>
            }
            { values.type === 'homeowners' &&
                <div className="form-group row">
                    <label className="col-sm-8 col-form-label">
                        Is this a single family house?
                    </label>
                    <div className="col-sm-4">
                        <Field component="select" name="single_family" className="form-control">
                            <option value=""></option>
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </Field>
                    </div>
                </div>
            }
            { ['homeowners', 'condo'].includes(values.type) &&
                <div className="form-group row">
                    <label className="col-sm-8 col-form-label">
                        Is this your primary residence?
                    </label>
                    <div className="col-sm-4">
                        <Field component="select" name="primary_home" className="form-control" >
                            <option value=""></option>
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </Field>
                    </div>
                </div>
            }
            <div className="form-group row">
                <label className="col-sm-8 col-form-label">
                    Does this property have a burglar alarm?
                </label>
                <div className="col-sm-4">
                    <Field component="select" name="burglar_alarm" className="form-control">
                        <option value=""></option>
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </Field>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-8 col-form-label">
                    Does this property have a fire alarm?
                </label>
                <div className="col-sm-4">
                    <Field component="select" name="fire_alarm" className="form-control">
                        <option value=""></option>
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </Field>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-8 col-form-label">
                    Does this property have a mortgage?
                </label>
                <div className="col-sm-4">
                    <Field component="select" name="mortgage" className="form-control">
                        <option value=""></option>
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </Field>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-8 col-form-label">
                    Do you own a dog with a history of biting?
                </label>
                <div className="col-sm-4">
                    <Field component="select" name="dog_biting_history" className="form-control">
                        <option value=""></option>
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </Field>
                </div>
            </div>
            <button disabled={isSubmitting} className="btn btn-dark pink">Submit</button>
        </Form>
    </div>
)

const FormikApp = withFormik({
    mapPropsToValues() {
        return {
            type: '',
            first_name: '',
            last_name: '',
            date_of_birth: '',
            email: '',
            street_number: "",
            street: "",
            unit: "",
            city: "",
            state: "",
            postal_code: "",
            square_ft: "",
            single_family: "",
            primary_home: "",
            burglar_alarm: "",
            fire_alarm: "",
            mortgage: "",
            dog_biting_history: ""
        }
    },
    validationSchema: Yup.object().shape({
        type: Yup.string().required(),
        first_name: Yup.string().required(),
        last_name: Yup.string().required(),
        date_of_birth: Yup.date().required(),
        email: Yup.string().email('Email not valid').required('Email is required'),
        street_number: Yup.string().required(),
        street: Yup.string().required(),
        city: Yup.string().required(),
        state: Yup.string().required(),
        postal_code: Yup.string().required(),
        unit: Yup.string(),
        square_ft: Yup.number()
            .when('type', {
                is: 'renters',
                then: Yup.number().integer(),
                otherwise: Yup.number().integer().required()
            }),
        single_family: Yup.boolean()
            .when('type', {
                is: 'homeowners',
                then: Yup.boolean().required()
            }),
        primary_home: Yup.boolean()
            .when('type', {
                is: 'renters',
                then: Yup.boolean(),
                otherwise: Yup.boolean().required()
            }),
        burglar_alarm: Yup.boolean(),
        fire_alarm: Yup.boolean(),
        dog_biting_history: Yup.boolean().required(),
        mortgage: Yup.boolean()

    }),
    handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
        setTimeout(() => {
            resetForm()
            setSubmitting(false)
        }, 2000)
        console.log(values)
    }
})(App)

render(<FormikApp />, document.getElementById('root'));
// registerServiceWorker();
