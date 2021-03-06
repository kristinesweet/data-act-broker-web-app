/**
  * ComparisonTable.jsx
  * Created by Kevin Li 6/15/16
  **/

import React from 'react';
import _ from 'lodash';
import ScrollableTable from '../../SharedComponents/table/ScrollableTable.jsx';
import * as ReviewHelper from '../../../helpers/reviewHelper.js';

export default class ComparisonTable extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			sortDirection: 'asc',
			sortColumn: 0,
			data: {}
		};
	}

	buildRow() {

		const data = [];
		this.props.data.forEach((item) => {

			let description = 'Rule ' + item.original_label + ': ' + item.rule_failed + '.';
			const row = {
				source: ReviewHelper.globalFileData[item.source_file].name,
				description: description,
				occurrences: item.occurrences
			};

			data.push(row);
		});

		const sortFields = ['source', 'description', 'occurrences'];

		const sortedData = _.orderBy(data, sortFields[this.state.sortColumn], this.state.sortDirection);

		const output = [];
		sortedData.forEach((row) => {
			output.push([row.source, row.description, row.occurrences]);
		});

		return output;
	}

	sortTable(direction, column) {
		this.setState({
			sortColumn: column,
			sortDirection: direction
		});
	}

	render() {
		const headers = ['Source File', 'Error Message', 'Occurrences'];

		const data = this.buildRow();

		return (
			<div className="comparison-table">
				<ScrollableTable headers={headers} data={data} sortable={true} onSort={this.sortTable.bind(this)} />
			</div>
		)
	}
}