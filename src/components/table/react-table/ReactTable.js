import React from 'react';
import {
  useTable,
  usePagination,
  useResizeColumns,
  useFlexLayout,
  useExpanded,
  useGlobalFilter,
  useSortBy,
  useFilters} from 'react-table';
import {Collapse,Typography,Grid} from '@mui/material';
import {ArrowUpward,ArrowDownward} from '@mui/icons-material';
import './table.scss';

import Pagination from './Pagination';
import {GlobalFilter as GlobalSearchFilter} from '../Filters';

//const headerProps = (props, { column }) => getStyles(props, column.align)

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


function ReactTable({
    columns,
    fetchData,
    loading,
    subComponent,
}) {
    const skipPageResetRef = React.useRef(false)
    const [autoReset,setAutoReset] = React.useState({
      autoResetPage:         false,
      autoResetExpanded:     false,
      autoResetGroupBy:      false,
      autoResetSelectedRows: false,
      autoResetSortBy:       false,
      autoResetFilters:      false,
      autoResetRowState:     false
    })
    const defaultColumn = React.useMemo(
      () => ({
        minWidth: 30,
        width: 150,
        maxWidth: 250,
      }),
      []
    )

    const SubComponent = subComponent;
    const [state,setState] = React.useState({
      data:[],
      pageCount:0,
      totalCount:0
    })

    const updateData = (index,id,value)=>{
      skipPageResetRef.current = true
      let temp = [...state.data]
      temp[index][id] = value

      setState({
        ...state,
        data:temp
      })
    }

    const {
        getTableProps,
        getTableBodyProps,
        prepareRow,
        headerGroups,
        page,
        pageOptions,
        canPreviousPage,
        canNextPage,
        //pageCount,
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
      } = useTable(
        {
          columns,
          data:state.data,
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
          updateData: updateData,
          manualPagination:true,
          pageCount:state.pageCount,
          manualFilters:true,
          manualSortBy:true,
          manualGlobalFilter:true,
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        useFlexLayout,
        useResizeColumns,
        useExpanded,
        usePagination,  
    ) 

    const filterValues = (data) => {
      const initialValue={}
      return data.reduce((obj,item)=> {
        return {
          ...obj,
          ...item
        }
      },initialValue)
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

    React.useEffect(()=>{
      skipPageResetRef.current = true
      setAutoReset({
        ...autoReset,
        autoResetExpanded:true
      })

      let orderBy;

      if(sortBy.length > 0) {
        const tempSort = sortBy[0];
        orderBy = [tempSort.id,tempSort.desc ? 'DESC' : 'ASC']
      }

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
          pageCount:Math.ceil(result.count/pageSize),
          totalCount:result.count
        })

        setAutoReset({
          ...autoReset,
          autoResetExpanded:false
        })
      }

      fetchData({
        pageIndex,
        pageSize,
        orderBy,
        filters:filterVal
      },
      callBack
      )
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[
      pageIndex,
      pageSize,
      globalFilter,
      filters,
      sortBy,
    ])
    
    return (
        <div className='react-table'>
            {renderFilters()}
            <div className='search-container'>
              <GlobalSearchFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
              <div style={{flexGrow:1}}/>
              <Typography className='count' variant='overline'>
                  Count: <strong>{state.totalCount}</strong>
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
                          <Collapse in={row.isExpanded} className='tr' timeout="auto" unmountOnExit>
                            <div className='collapse-div'> 
                                <SubComponent {...row.original} updateData={updateData} index={row.index}/>
                            </div>
                          </Collapse>
                        </React.Fragment>
                      )
                    })
                  }
                </div>
            </div>
            <Pagination 
              count = {pageOptions.length}
              pageCount = {state.pageCount}
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

ReactTable.defaultProps = {
  columns:[],
  subComponent: ()=>{ return <div></div>},
  //updateData:()=>{},
  fetchData:()=>{},
  handleNew:()=>{
    return []
  },
  isEdit:false
  //disablePageResetOnDataChange:false
}

export default ReactTable