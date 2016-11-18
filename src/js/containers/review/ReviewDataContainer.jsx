/**
 * ReviewDataContainer.jsx
 * Created by Mike Bray 6/8/16
 **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Q from 'q';

import * as ReviewHelper from '../../helpers/reviewHelper.js';
import * as AgencyHelper from '../../helpers/agencyHelper.js';

import ReviewDataPage from '../../components/reviewData/ReviewDataPage.jsx';

class ReviewDataContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        	jobs: null,
            cgac_code: null,
            agency_name: '--',
            reporting_period_start_date: null,
            reporting_period_end_date: null,
            number_of_errors: null,
            number_of_rows: null,
            created_on: null,
            ready: false,
            total_obligations: null,
            total_assistance_obligations: null,
            total_procurement_obligations: null
        }
    }

    componentDidMount() {
    	this.loadData();
    }

    componentDidUpdate(prevProps, prevState) {
    	if (this.props.params.submissionID != prevProps.params.submissionID) {
    		// URL submission ID changed, reload
    		this.loadData();
    	}
    }

    loadStatusData(toUpdate) {
        return ReviewHelper.fetchStatus(this.props.params.submissionID)
            .then((data) => {
                data.ready = true;
                Object.assign(toUpdate, data);

                return AgencyHelper.fetchAgencyName(data.cgac_code);
            })
            .then((name) => {
                toUpdate.agency_name = name;
            });
    }

    loadObligationData(toUpdate) {
        return ReviewHelper.fetchObligations(this.props.params.submissionID)
            .then((data) => {
                toUpdate.total_obligations = data.total_obligations;
                toUpdate.total_assistance_obligations = data.total_assistance_obligations;
                toUpdate.total_procurement_obligations = data.total_procurement_obligations;
            });
    }

    loadData() {

        let submission = {};

        Q.all([this.loadStatusData(submission),
               this.loadObligationData(submission)])
            .then((ignored) => {
                this.setState(submission);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <ReviewDataPage {...this.props} data={this.state} />
        );
    }
}

export default connect(
    state => ({ session: state.session })
)(ReviewDataContainer)
