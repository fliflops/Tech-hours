import React from 'react';
import {Search as SearchIcon} from '@mui/icons-material'
import {SearchIconWrapper,Search as StyledSearch ,StyledInputBase} from './style';

import {useAsyncDebounce} from 'react-table'

function GlobalFilter({
	preGlobalFilteredRows,
	globalFilter,
	setGlobalFilter
}) {

	const [value,setValue] = React.useState(globalFilter)
	
	const onChange = useAsyncDebounce(value => {
		setGlobalFilter(value || undefined)
	}, 200)
	
	return (
		<StyledSearch>
		<SearchIconWrapper>
			<SearchIcon/>
		</SearchIconWrapper>
		<StyledInputBase
			placeholder='Search'
			onChange={(e)=>{
				setValue(e.target.value)
				onChange(e.target.value)
			}}
			inputProps={{ 'aria-label': 'search' }}
			value={value || ''}
		/>
	</StyledSearch>
	)
}

export default GlobalFilter
