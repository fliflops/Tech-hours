import React from 'react';
import {useSelector} from 'react-redux';
import {
	 MasterSelect
} from '../../select';
// import {setValue} from '../../../store/filters/filters.slice';

const MasterSelectFilter = ({
	column:{filterValue, preFilteredRows, setFilter},
	variant,
	label,
	name,
	quickCodeType
}) => {
	// const dispatch = useDispatch()
	const reducer = useSelector(state => state.filters)
	
	React.useEffect(()=>{
		setFilter(reducer[variant] || undefined)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

	return (
		<MasterSelect
			type={variant}
			label={label}
			name={name}
			quickCodeType={quickCodeType}
			value={reducer[variant] || filterValue}
			handleChange={(e)=>{
				setFilter(e || undefined)
			//	dispatch(setValue({
			//		 variant,
			//		 value:e||undefined
			//	}))
			}}
		/>
	)
}

export default MasterSelectFilter