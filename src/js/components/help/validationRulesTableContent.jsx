/**
 * validationRulesTableContent.jsx
 * Created by Emily Gullo 9/15/2016
 **/

import React from 'react';

import { generateProtectedUrls } from '../../helpers/util.js';
import { loadValidationTable } from '../../helpers/helpHelper.js';

import ValidationTable from './validationTable/validationTable.jsx';


export default class ValidationRulesTableContent extends React.Component {

    constructor(props) {
        super(props);

		this.urlPromise = null;

        this.state = {
            fullData: [],
			validationRulesUrl: '#',
            domainValuesUrl: '#'
        };
    }

    componentDidMount() {
		// also load the remaining URLs
		this.urlPromise = generateProtectedUrls();
		this.urlPromise.promise
			.then((urls) => {
				this.setState({
					validationRulesUrl: urls['Validation_Rules.xlsx']
				});

				this.urlPromise = null;
		});



        loadValidationTable()
            .then((results) => {
                // logic
                this.setState({
                    fullData: results.data
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

	componentWillUnmount() {
        // cancel in-flight S3 signing requests when the component unmounts
        if (this.urlPromise) {
            this.urlPromise.cancel();
        }
    }

    render() {        
        return (
            <div className="usa-da-help-content">
                <div className="validation-table">
                	<h2>Validations</h2>
                    <p>Below is a cumulative table of validations in the RSS and IDD. The status column indicates whether they are currently implemented in the Broker. The table has been revised to match the latest Validations Rules spreadsheet. The Validations Rules spreadsheet, with change log, is available for download.  <a href={this.state.validationRulesUrl} target="_blank">Download file</a></p>
                    <p>In response to agency feedback, Treasury has changed some validations in the Broker from critical errors to warnings in order to allow agencies to continue past their File A-C validations and access the file extracts for D1 and D2 more easily. The validations that have been modified are marked in the validation rules table that can be accessed via the Help page. These validation rules will revert back to critical errors at a later date.</p>
                    <ValidationTable fullData={this.state.fullData} />
                    </div>
            </div>
        );
    }
}
