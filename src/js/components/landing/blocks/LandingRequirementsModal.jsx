/**
  * LandingRequirementsModal.jsx
  * Created by Kevin Li 5/17/16
  **/

import React from 'react';
import Modal from 'react-aria-modal';


import * as Icons from '../../SharedComponents/icons/Icons.jsx';

export default class LandingRequirementsModal extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isOpen: false
		};
	}

	openModal() {
		this.setState({
			isOpen: true
		});
	}

	closeModal(e) {
		if (e) {
			e.preventDefault();
		}

		this.setState({
			isOpen: false
		});
	}

	render() {
		return (
			<Modal mounted={this.state.isOpen} onExit={this.closeModal.bind(this)} underlayClickExists={false}
					verticallyCenter={true} titleId="usa-da-landing-modal">
				<div className="usa-da-modal-page">
					<div id="usa-da-landing-modal" className="usa-da-landing-modal">
						<div className="usa-da-landing-modal-close usa-da-icon usa-da-icon-times">
							<a href="#" onClick={this.closeModal.bind(this)}>
								<Icons.Times />
							</a>
						</div>

						<div className="usa-da-landing-modal-content">
							<h4>You'll need the following files in order to complete your submission</h4>
							<p>
								You may download and use the following sample data files if you don't have the required files on hand. The sample files can be downloaded below.
							</p>

							<ul>
								<li>
									File A: Appropriation Account data (<a href="https://s3-us-gov-west-1.amazonaws.com/prod-data-act-web-static-files/sample-files/appropValid.csv" target="_blank" rel="noopener noreferrer">Download sample file</a>)
								</li>
								<li>
									File B: Object Class and Program Activity data (<a href="https://s3-us-gov-west-1.amazonaws.com/prod-data-act-web-static-files/sample-files/programActivityValid.csv" target="_blank" rel="noopener noreferrer">Download sample file</a>)
								</li>
								<li>
									File C: Award Financial data (<a href="https://s3-us-gov-west-1.amazonaws.com/prod-data-act-web-static-files/sample-files/awardFinancialValid.csv" target="_blank" rel="noopener noreferrer">Download sample file</a>)
								</li>
							</ul>

								<p className="mt-30"><strong>Files D1, D2, E, and F will be generated for you based on the reporting period you provide.</strong></p>

							<ul>
								<li>
									File D1: Procurement Awards data (Award and Awardee Attributes)
								</li>
								<li>
									File D2: Financial Assistance data (Award and Awardee Attributes) (<a href="https://s3-us-gov-west-1.amazonaws.com/prod-data-act-web-static-files/sample-files/awardValid.csv" target="_blank" rel="noopener noreferrer">download sample file</a>)
								</li>
								<li>
									File E: Additional Awardee Attributes data
								</li>
								<li>
									File F: Sub-award Attributes data
								</li>
							</ul>
						</div>
					</div>
				</div>
			</Modal>
		)
	}
}