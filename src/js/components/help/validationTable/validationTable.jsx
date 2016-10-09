/**
  * validationTable.jsx
  * Created by Kevin Li
  **/

import React from 'react';
import Reactable from 'reactable';

const defaultProps = {
	fullData: []
};

export default class ValidationTable extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [],
			header: []
		};

		this.sortFunction = (a, b) => {
            const reA = /[^a-zA-Z]/g;
            const reN = /[^0-9]/g;
            const aA = a.replace(reA, "");
            const bA = b.replace(reA, "");
            if (aA === bA) {
                const aN = parseInt(a.replace(reN, ""), 10);
                const bN = parseInt(b.replace(reN, ""), 10);
                return aN === bN ? 0 : aN > bN ? 1 : -1;
            } else {
                return aA > bA ? 1 : -1;
            }
        };
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.fullData != this.props.fullData) {
			this.loadFullData();
		}
	}


	loadFullData() {
		// restore the table data with the full data set
		this.setState({
			data: this.props.fullData
		}, () => {
			this.buildHeaderRow();
		});
	}

	

	buildHeaderRow() {
		const columns = [];
        if (this.props.fullData.length > 0) {
            let i = 0;
            Object.keys(this.props.fullData[0]).forEach((col) => {
                const header = <Reactable.Th column={col} key={i}>
	                    {col}
                </Reactable.Th>;

                columns.push(header);
                i++;
            });
        }

        this.setState({
        	header: columns
        });
	}


	clickedHeader(col, e) {
		console.log(col);
	}
	sorted(col, dir) {
		console.log(col);
	}

	render() {

		return (
			<Reactable.Table className="table usa-da-table table-bordered"
	            data={this.state.data} filterable={['Rule Detail']}
	            sortable={
	                [
	                    {
	                        column: 'Rule Name',
	                        sortFunction: this.sortFunction
	                    }
	                ]
	            }
	            defaultSort={{column: 'Rule Name', direction: 'asc'}}
	            filterPlaceholder="Rule Detail Search..."
	            noDataText="No matching records found."
	            onSort={this.sorted.bind(this)}>
	            <Reactable.Thead>
	                {this.state.header}
	            </Reactable.Thead>
	        </Reactable.Table>
	    )
	}
}

ValidationTable.defaultProps = defaultProps;