import React from 'react';
import { render } from 'react-dom';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import { StitchClient } from 'mongodb-stitch';
import { withFormik, Form, Field } from 'formik';
import Yup from 'yup';
import logo from './lemonade-logo.svg';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

let appId = 'insurance_quote_requests-owijb';
let stitchClient = new StitchClient(appId);

const states = [ 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY' ];

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
                { touched.type && errors.type && <small className="form-text text-danger">{errors.type}</small> }
            </div>
            <div className="form-group">
                <label>Name</label>
                <div className="input-group">
                    <Field name="first_name" placeholder="First" className="form-control" />
                    <Field name="last_name" placeholder="Last" className="form-control" />
                </div>
                { touched.first_name && errors.first_name && <small className="form-text text-danger">{errors.first_name}</small> }
                { touched.last_name && errors.last_name && <small className="form-text text-danger">{errors.last_name}</small> }
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label>
                        Date of Birth
                        <Field type="date" name="date_of_birth" placeholder="Date of Birth" className="form-control" />
                    </label>
                    { touched.date_of_birth && errors.date_of_birth && <small className="form-text text-danger">{errors.date_of_birth}</small> }
                </div>
                <div className="form-group col-md-6">
                    <label>
                        Email
                        <Field type="email" name="email" placeholder="Email" className="form-control" />
                    </label>
                    { touched.email && errors.email && <small className="form-text text-danger">{errors.email}</small> }
                </div>
            </div>
            <div className="form-group">
                <label>Address</label>
                <div className="input-group">
                    <Field name="street_number" placeholder="Street Number" className="form-control" />
                    <Field name="street" placeholder="Street" className="form-control" />
                    <Field name="unit" placeholder="Unit/Apt #" className="form-control" />
                </div>
                { touched.street_number && errors.street_number && <small className="form-text text-danger">{errors.street_number}</small> }
                { touched.street && errors.street && <small className="form-text text-danger">{errors.street}</small> }
                { touched.unit && errors.unit && <small className="form-text text-danger">{errors.unit}</small> }
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label>
                        City
                        <Field name="city" placeholder="City" className="form-control" />
                    </label>
                    { touched.city && errors.city && <small className="form-text text-danger">{errors.city}</small> }
                </div>
                <div className="form-group col-md-4">
                    <label>
                        State
                        <Field component="select" name="state" placeholder="State" className="form-control">
                            <option value=""></option>
                            { states.map((state) => (<option value={state} key={state}>{state}</option>)) }
                        </Field>
                    </label>
                    { touched.state && errors.state && <small className="form-text text-danger">{errors.state}</small> }
                </div>
                <div className="form-group col-md-2">
                    <label>
                        Zip
                        <Field name="postal_code" placeholder="Zip" className="form-control" />
                    </label>
                    { touched.postal_code && errors.postal_code && <small className="form-text text-danger">{errors.postal_code}</small> }
                </div>
            </div>
            { values.type !== 'renters' &&
                <div className="form-group row">
                    <label className="col-sm-8 col-form-label">
                        Square Footage
                        { touched.square_ft && errors.square_ft && <small className="form-text text-danger">{errors.square_ft}</small> }
                    </label>
                    <div className="col-sm-4">
                        <Field type="number" name="square_ft" placeholder="Square Footage" className="form-control" />
                    </div>
                </div>
            }
            { values.type === 'homeowners' &&
                <div className="form-group row">
                    <label className="col-sm-8 col-form-label">
                        Is this a single family house?
                        { touched.single_family && errors.single_family && <small className="form-text text-danger">{errors.single_family}</small> }
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
                        { touched.primary_home && errors.primary_home && <small className="form-text text-danger">{errors.primary_home}</small> }
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
                    { touched.burglar_alarm && errors.burglar_alarm && <small className="form-text text-danger">{errors.burglar_alarm}</small> }
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
                    { touched.fire_alarm && errors.fire_alarm && <small className="form-text text-danger">{errors.fire_alarm}</small> }
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
                    { touched.mortgage && errors.mortgage && <small className="form-text text-danger">{errors.mortgage}</small> }
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
                    { touched.dog_biting_history && errors.dog_biting_history && <small className="form-text text-danger">{errors.dog_biting_history}</small> }
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
            type: 'renters',
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
        type: Yup.string().required('Policy Type is required'),
        first_name: Yup.string().required('First Name is required'),
        last_name: Yup.string().required('Last Name is required'),
        date_of_birth: Yup.date().required('Date of Birth is required'),
        email: Yup.string().email('Email not valid').required('Email is required'),
        street_number: Yup.string().required('Street Number is required'),
        street: Yup.string().required('Street is required'),
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required'),
        postal_code: Yup.string().required('Zip is required'),
        unit: Yup.string(),
        square_ft: Yup.number()
            .when('type', {
                is: 'renters',
                then: Yup.number().integer(),
                otherwise: Yup.number().integer().required('Square Footage is required')
            }),
        single_family: Yup.boolean()
            .when('type', {
                is: 'homeowners',
                then: Yup.boolean().required('This question is required')
            }),
        primary_home: Yup.boolean()
            .when('type', {
                is: 'renters',
                then: Yup.boolean(),
                otherwise: Yup.boolean().required('This question is required')
            }),
        burglar_alarm: Yup.boolean(),
        fire_alarm: Yup.boolean(),
        dog_biting_history: Yup.boolean().required('This question is required.'),
        mortgage: Yup.boolean()

    }),
    handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
        stitchClient.login()
            .then(() => {
                console.log(`logged in as: ${stitchClient.authedId()}`)
                stitchClient.executeFunction('Submit_Quote', values)
                    .then(() => {
                        resetForm()
                        setSubmitting(false)
                    })
            })
            .catch(e => {
                console.log('error: ', e)
                setSubmitting(false)
            });
        console.log(values)
    }
})(App)

render(<FormikApp />, document.getElementById('root'));
// registerServiceWorker();
