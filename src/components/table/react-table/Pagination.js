import React from 'react'

const Pagination = (props) => {
    const { count, page,pageSize, rowsPerPageOptions, gotoPage, setPageSize, nextPage,previousPage, canNextPage, canPreviousPage} = props;
	
    return (
        <div className='pagination'>
            <div className='btn-flex'> 
                <button onClick={()=>previousPage()} disabled={!canPreviousPage} className='pagination-btn'>Previous</button>
            </div>
            <div className='center'>
                <span className='page-info'>Go to Page {' '}
                    <input type='number' min={1} defaultValue={page+1} onFocus={e=>e.target.select()} onChange={(e)=>{
                        const page = e.target.value ? Number(e.target.value) - 1 : 0
                        gotoPage(page)
                    }}/> {' '}
                    <span> Page {page + 1} of {count}</span>
                </span>
                <span className='page-size-option'>
                    <select aria-label='rows per page' value={pageSize} onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}>
                        {rowsPerPageOptions.map((row,index)=> {
                            return <option key={index} value={row}>
                                {row} Rows
                            </option>
                        })}
                    </select>
                </span>
            </div>
            <div className='btn-flex'> 
                <button onClick={()=>{
                    nextPage()
                }} disabled={!canNextPage} className='pagination-btn'>Next</button>
            </div>       
        </div>
    )
}

export default Pagination