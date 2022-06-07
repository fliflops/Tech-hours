import React from 'react';

const DefaultFilter = ({
	column//:{filterValue, preFilteredRows, setFilter}
}) => {

	React.useEffect(()=> {
		// console.log(column)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

	return (
		<div>
			<input
				value={column.filterValue || ''}
				onChange={e => {
					column.setFilter(e.target.value || undefined)
				}}
			/>
		</div>
	)
}

export default DefaultFilter
