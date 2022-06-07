import React from 'react';
import {
	useTheme,
	Box,
	IconButton,
	TextField
} from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import PropTypes from 'prop-types';

function TablePaginationActions(props) {
	const theme = useTheme();
	const { count, page, rowsPerPage, onPageChange } = props;
	

	const handleFirstPageButtonClick = (event) => {
		onPageChange(event, 0);
	};
	
	const handleBackButtonClick = (event) => {
		onPageChange(event, page - 1);
	};
	
	const handleNextButtonClick = (event) => {
		onPageChange(event, page + 1);
	};
	
	const handleLastPageButtonClick = (event) => {
		onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	const handlePageChange = (event) => {
		if(event.target.value === ''){
			event.preventDefault()
		}

		onPageChange(event,parseInt(event.target.value))
	}

	return (
		<Box sx={{ flexShrink: 0, ml: 2.5 }}>
			<TextField	
				disabled={count === 0}
				placeholder='Go To Page'
				type='number'
				variant='outlined'
				size='small'
				value={page}
				onChange={handlePageChange}
				onClick={e => e.target.select()}
				// onKeyDown={handleKeyPress}
				/>
			<IconButton
			onClick={handleFirstPageButtonClick}
			disabled={page === 0}
			aria-label="first page"
			>
			{theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
			</IconButton>
			<IconButton
			onClick={handleBackButtonClick}
			disabled={page === 0}
			aria-label="previous page"
			>
			{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
			</IconButton>
			<IconButton
			onClick={handleNextButtonClick}
			disabled={page >= Math.ceil(count / rowsPerPage) - 1}
			aria-label="next page"
			>
			{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
			</IconButton>
			<IconButton
			onClick={handleLastPageButtonClick}
			disabled={page >= Math.ceil(count / rowsPerPage) - 1}
			aria-label="last page"
			>
			{theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
			</IconButton>
		</Box>
	);
	}
	
	TablePaginationActions.propTypes = {
	count: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
	};

	export default TablePaginationActions