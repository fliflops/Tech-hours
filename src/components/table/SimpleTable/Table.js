import React from 'react';
import {Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead ,
    TablePagination ,
    TableRow,
    // TableFooter,
    Paper,
    Grid,
    Typography,
    
} from '@mui/material';
import {useGlobalFilter,useTable,usePagination,useResizeColumns,useFlexLayout} from 'react-table';
import {GlobalFilter as GlobalSearchFilter} from '../Filters'
import TablePaginationAction from '../Table/Pagination';

function SimpleTable({
    columns,
    data,
    size,
    updateData,
    disablePageResetOnDataChange 
}) {
    
    const defaultColumn = React.useMemo(()=>({
        minWidth: 10,
        width: 150,
        maxWidth: 400,
    }),[])
    const {
        getTableProps,
        headerGroups,
        getTableBodyProps,
        prepareRow,
        page,
        // pageOptions,
        gotoPage,
        setPageSize,
        preGlobalFilteredRows,
        setGlobalFilter,
        // pageCount,
        // canNextPage,
        // canPreviousPage,
        state:{
            pageIndex,
            globalFilter,
            pageSize,
            
    
        }
    } = useTable({
        columns,
        data:data,
        initialState:{
            pageSize:10,
            pageIndex:0
        },
        disablePageResetOnDataChange,
        defaultColumn:defaultColumn,
        updateData
    },
    useGlobalFilter,
    usePagination,
    useResizeColumns,
    useFlexLayout)

    const handleChangePage = (event, newPage) => {
        // console.log(newPage)
        gotoPage(newPage)
    }
    
    const handleChangeRowsPerPage = event => {
        setPageSize(Number(event.target.value))
        
    }

    
    return (   
        <Grid sx={{padding:1}} item container md={size}  component={Paper} elevation={0} variant='outlined'>
        <Grid item md={12}>
            <div style={{display:'flex'}}>
                    <GlobalSearchFilter 
                        preGlobalFilteredRows={preGlobalFilteredRows}
                        globalFilter={globalFilter}
                        setGlobalFilter={setGlobalFilter}
                    />
                    <div style={{flexGrow:1}}/>
                    <Typography variant='overline'>
                        Count: <strong>{data.length}</strong>
                    </Typography> 
            </div>
        </Grid>
        <Grid item md={12}>
            <Paper elevation={0} variant='outlined'>
                <TableContainer>
                    <Table size='small' stickyHeader {...getTableProps()}>
                        <TableHead>
                            {
                                headerGroups.map(headerGroup => (
                                    <TableRow {...headerGroup.getHeaderGroupProps()}>
                                        {
                                            headerGroup.headers.map(column => (
                                                <TableCell {...column.getHeaderProps()}>
                                                    <Typography variant='overline'>{column.render('Header')}</Typography>
                                                    <div  {...column.getResizerProps()} style={{
                                                        display:'inline-block',
                                                        background:'#9C9C9C',
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
                    </Table>
                </TableContainer>
                <TablePagination
                    component='div'
                    // colSpan={3}
                    rowsPerPageOptions={[10,20,50]}
                    count={data.length}
                    rowsPerPage={pageSize === 0 ? -1 : pageSize}
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

SimpleTable.defaultProps = {
    columns:[],
    data:[],
    size:12,
    updateData:()=>{},
    disablePageResetOnDataChange:false
}

export default SimpleTable;