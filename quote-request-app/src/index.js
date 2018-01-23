import React from 'react';
import { render } from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import { withFormik, Form, Field } from 'formik';
import Yup from 'yup';

const App = ({
    values,
    errors,
    touched,
    isSubmitting
}) => (
    <Form>
        <div>
            <label>
                Select a policy type
                <Field component="select" name="type">
                    <option value="renters">Renters</option>
                    <option value="condo">Condo</option>
                    <option value="homeowners">Homeowners</option>
                </Field>
            </label>
        </div>
        <div>
            <Field name="first_name" placeholder="First Name" />
            <Field name="last_name" placeholder="Last Name" />
        </div>
        <div>
            <label>
                Date of Birth
                <Field type="date" name="date_of_birth" placeholder="Date of Birth" />
            </label>
        </div>
        <div>
            { touched.email && errors.email && <p>{errors.email}</p> }
            <Field type="email" name="email" placeholder="Email" />
        </div>
        <div>
            <Field name="street_number" placeholder="Street Number" />
            <Field name="street" placeholder="Street" />
            <Field name="unit" placeholder="Unit/Apt #" />
        </div>
        <div>
            <Field name="city" placeholder="City" />
            <Field name="state" placeholder="State" />
            <Field name="postal_code" placeholder="Zip" />
        </div>
        { values.type !== 'renters' &&
            <div>
                <Field type="number" name="square_ft" placeholder="Square Footage" />
            </div>
        }
        { values.type === 'homeowners' &&
            <div>
                <label>
                    Is this a single family house?
                    <Field component="select" name="single_family">
                        <option value=""></option>
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </Field>
                </label>
            </div>
        }
        { ['homeowners', 'condo'].includes(values.type) &&
            <div>
                <label>
                    Is this your primary residence?
                    <Field component="select" name="primary_home" >
                        <option value=""></option>
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </Field>
                </label>
            </div>
        }
        <div>
            <label>
                Does this property have a burglar alarm?
                <Field component="select" name="burglar_alarm">
                    <option value=""></option>
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                </Field>
            </label>
        </div>
        <div>
            <label>
                Does this property have a fire alarm?
                <Field component="select" name="fire_alarm">
                    <option value=""></option>
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                </Field>
            </label>
        </div>
        <div>
            <label>
                Does this property have a mortgage?
                <Field component="select" name="mortgage">
                    <option value=""></option>
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                </Field>
            </label>
        </div>

        <div>
            <label>
                Do you own a dog with a history of biting?
                <Field component="select" name="dog_biting_history">
                    <option value=""></option>
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                </Field>
            </label>
        </div>
        <button disabled={isSubmitting}>Submit</button>
    </Form>
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
