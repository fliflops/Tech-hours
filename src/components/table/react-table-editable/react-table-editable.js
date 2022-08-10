import React from 'react'
import {
    useTable,
    usePagination,
    useResizeColumns,
    useFlexLayout,
    useExpanded,
    useGlobalFilter,
    useSortBy,
    useFilters
} from 'react-table';

import {Typography} from '@mui/material';
import {ArrowUpward,ArrowDownward} from '@mui/icons-material';

import {GlobalFilter as GlobalSearchFilter} from '../Filters';
import Pagination from './Pagination';

import './table.scss';

const cellProps = (props, { cell }) => getStyles(props, cell.column.align)

const getStyles = (props, align = 'left') => [
    props,
    {
      style: {
        justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
        alignItems: 'flex-start',
        display: 'flex',
      },
    },
]
const ReactTableEditable = ({
    columns,
    data,
    updateData,
    isEdit
}) => {
    const [autoReset,setAutoReset] = React.useState({
        autoResetPage:         false,
        autoResetExpanded:     false,
        autoResetGroupBy:      false,
        autoResetSelectedRows: false,
        autoResetSortBy:       false,
        autoResetFilters:      false,
        autoResetRowState:     false
    })

    const defaultColumn = React.useMemo(() => ({
        minWidth: 30,
        width: 150,
        maxWidth: 250,
    }),[])

    const {
        getTableProps,
        getTableBodyProps,
        prepareRow,
        headerGroups,
        page,
        pageOptions,
        canPreviousPage,
        canNextPage,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        preGlobalFilteredRows,
        setGlobalFilter,
        state:{
          pageIndex,
          filters,
          globalFilter,
          pageSize,
          sortBy
        }  
    } = useTable({
        columns,
        data,
        defaultColumn,
        initialState:{
            pageSize:10,
            pageIndex:0
        },
        autoResetPage:         autoReset.autoResetPage,
        autoResetExpanded:     autoReset.autoResetExpanded,
        autoResetGroupBy:      autoReset.autoResetGroupBy,
        autoResetSelectedRows: autoReset.autoResetSelectedRows,
        autoResetSortBy:       autoReset.autoResetSortBy,
        autoResetFilters:      autoReset.autoResetFilters,
        autoResetRowState:     autoReset.autoResetRowState,
        updateData: updateData
    },
        useFilters,
        useGlobalFilter,
        useSortBy,
        useFlexLayout,
        useResizeColumns,
        useExpanded,
        usePagination
    )

    return (
        <div className='react-table'>
            <div className='search-container'>
              <GlobalSearchFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
              <div style={{flexGrow:1}}/>
              <Typography className='count' variant='overline'>
                  Count: <strong>{data.length}</strong>
              </Typography> 
            </div>
            <div className='table' {...getTableProps()}>
                <div>
                    {headerGroups.map(headerGroup=>(
                    <div {...headerGroup.getHeaderGroupProps({})} className='tr'> 
                      {headerGroup.headers.map(column => (
                      <div {...column.getHeaderProps(column.getSortByToggleProps())} className="th">
                        {column.render('Header')}
                        {/* Add a sort direction indicator */}
                        <span>
                          {
                            column.isSorted ? 
                            column.isSortedDesc ? 
                            <ArrowDownward fontSize='small'/> :
                            <ArrowUpward fontSize='small'/> :
                            ''
                          }
                        </span>
                        {/* Use column.getResizerProps to hook up the events correctly */}
                        {column.canResize && (
                          <div
                            {...column.getResizerProps()}
                            className={`resizer ${column.isResizing ? 'isResizing' : ''}`}
                            onClick={e => {e.preventDefault();e.stopPropagation()}}
                          />
                        )}
                      </div>
                      ))}
                     </div>
                  ))}
                </div>
                <div  {...getTableBodyProps()} className='tbody'>
                  {
                    page.map((row,index) => {
                      prepareRow(row)
                      return(
                        <React.Fragment  key={index}>
                           <div {...row.getRowProps()} className="tr">
                            {row.cells.map(cell => {
                                return <div {...cell.getCellProps(cellProps)} className="td">
                                    {cell.render('Cell')}
                                </div>
                            })}
                          </div>
                        </React.Fragment>
                      )
                    })
                  }
                </div>
            </div>
            <Pagination
                 count = {pageOptions.length}
                 pageCount = {pageCount}
                 page = {pageIndex} 
                 pageSize = {pageSize} 
                 rowsPerPageOptions={[5,10,20,25,50,100]}
                 gotoPage = {gotoPage}
                 setPageSize = {setPageSize}
                 nextPage = {nextPage}
                 previousPage = {previousPage}
                 canNextPage = {canNextPage}
                 canPreviousPage = {canPreviousPage}
            />
        </div>
    )
}

ReactTableEditable.defaultProps = {
    columns:[],
    subComponent: ()=>{ return <div></div>},
  //updateData:()=>{},
    fetchData:()=>{},
    handleNew:()=>{
        return []
    },
    isEdit:false
}

export default ReactTableEditable