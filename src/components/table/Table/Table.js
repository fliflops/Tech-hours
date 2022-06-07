import React from 'react';
import MUITable from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableFooter from '@mui/material/TableFooter'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Spinner from '../../spinner'
import {useTable,usePagination,useResizeColumns,useFlexLayout,useFilters,useGlobalFilter} from 'react-table';
import TablePaginationAction from './Pagination';
import {GlobalFilter as GlobalSearchFilter} from '../../table/Filters'

function Table({
	columns,
	fetchData,
	loading
}) {
	const [state,setState] = React.useState({
		data:[],
		pageCount:0,
	})

	//const [filters,setFilters] = React.useState({})

	const data = React.useMemo(()=>state.data,[state.data])

	const defaultColumn = React.useMemo(()=>({
		minWidth: 50,
		width: 150,
		maxWidth: 400,
		// Filter: DefaultFilter
	}),[])

	const {
		getTableProps,
		headerGroups,
		getTableBodyProps,
		prepareRow,
		page,
		pageOptions,
		gotoPage,
		setPageSize,
		preGlobalFilteredRows,
		setGlobalFilter,
		state:{
			pageIndex,
			pageSize,
			filters,
			globalFilter
		}
	} = useTable({
		columns,
		data:data,
		initialState:{
			pageSize:10,
			pageIndex:0
		},
		autoResetFilters:false,
		manualPagination:true,
		manualFilters:true,
		manualGlobalFilter:true,
		pageCount:state.pageCount,
		defaultColumn,
	},
	useFilters,
	useGlobalFilter,
	usePagination,
	useResizeColumns,
	useFlexLayout
	)

	const handleChangePage = (event, newPage) => {
		gotoPage(newPage)
	}
	
	const handleChangeRowsPerPage = event => {
		setPageSize(Number(event.target.value))
	}

	const renderFilters = () => {
		const headers = headerGroups.map(item => item.headers)[0].filter(item => item.Filter)
		return (
			<Grid item container component='div' marginBottom={1}>
				{
					headers.map(column => (<Grid key={column.id} item md={3} xs={12}>
						{column.render('Filter')}
					</Grid>))
				}
			</Grid>
		)
	}

	const filterValues = (data) => {

		const initialValue={}
		return data.reduce((obj,item)=> {
			return {
				...obj,
				...item
			}
		},initialValue)
	}

	React.useEffect(() => {
		// console.log(filters)
		const data = filters.map(i => {
			return {
				[i.id]:i.value?.value || undefined
			}
		})

		let filterVal = filterValues(data);

		if(globalFilter){
			filterVal = {
				...filterVal,
				search:globalFilter
			}
		}

		const callBack = (result) => {
			setState({
				...state,
				data:result.data,
				pageCount:result.count
			})
		}

		fetchData({pageIndex,pageSize,filters:filterVal},callBack)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[
		fetchData,
		pageIndex,
		pageSize,
		filters,
		globalFilter
	])

	return (
		<Grid sx={{padding:1}} item container md={12} component={Paper} elevation={0} variant='outlined'>
			{renderFilters()}
			<Spinner loading={loading}/>
			<Grid item md={12}>
				<div style={{display:'flex'}}>
					<GlobalSearchFilter 
						preGlobalFilteredRows={preGlobalFilteredRows}
						globalFilter={globalFilter}
						setGlobalFilter={setGlobalFilter}
					/>
					<div style={{flexGrow:1}}/>
					<Typography variant='overline'>
							Count: <strong>{state.pageCount}</strong>
					</Typography> 
				</div>
			</Grid>
			<Grid item md={12} >
				<Paper elevation={0} variant='outlined'>
				<TableContainer>
					<MUITable size='small' stickyHeader {...getTableProps()}>
						<TableHead>
							{
								headerGroups.map(headerGroup => (
									<TableRow {...headerGroup.getHeaderGroupProps()}>
										{
											headerGroup.headers.map(column => (
												<TableCell {...column.getHeaderProps()}>
													<Typography variant='button'>{column.render('Header')}</Typography>
													<div {...column.getResizerProps()} style={{display:'inline-block',
																background: '#9C9C9C',
																width: '10px',
																height: '100%',
																position: 'absolute',
																right: 0,
																top: 0,
																transform: 'translateX(50%)',
																zIndex:10,
																touchAction:'none',
																cursor:'e-resize'
													}}/>
												</TableCell>
											))
										}
									</TableRow>
								))
							}
						</TableHead>
						<Body page={page} prepareRow={prepareRow} getTableBodyProps={getTableBodyProps}/>
						<TableFooter>
							<TableRow>
								
							</TableRow>
						</TableFooter>
					</MUITable>
				</TableContainer> 
				<TablePagination
					component='div'
					rowsPerPageOptions={[5,10,20,25,50,100]}
					count={pageOptions.length}
					rowsPerPage={pageSize}
					page={pageIndex}
					SelectProps={{
						inputProps: { 'aria-label': 'rows per page' },
						native: true,
					}}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
					ActionsComponent={TablePaginationAction}
				/>
				</Paper>
			</Grid>
		</Grid>
	);
}

const Body = React.memo(({page,prepareRow,getTableBodyProps})=> {
	return (
		<TableBody {...getTableBodyProps()}>
			{
				page.map((row,i) => {
					prepareRow(row)
					return (
						<TableRow {...row.getRowProps()}>
							{row.cells.map(cell => {
								return (
								<TableCell {...cell.getCellProps()}>
										<div style={{
											display: 'block',
											maxWidth: 'inherit',
											whiteSpace: 'nowrap',
											overflow: 'hidden',
											textOverflow: 'ellipsis'
										}}>
											{cell.render('Cell')}
										</div>
								</TableCell>
								)
							})}
						</TableRow>
					)
				})
			}
		</TableBody>
	)
})

Table.defaultProps = {
	columns:[],
	data:[],
	fetchData:()=>{},
	pageCount:0,
	loading:false
}

export default Table;