import React from 'react'

const Numeric = ({
    value: initialValue,
    row: { index },
    column: {id},
    updateData
}) => {
    const [value,setValue] = React.useState(initialValue || 0)
    return (
        <div className='input_field'>
            <input 
                min={0}
                type='number'
                value={value}
                onFocus={(e)=>e.target.select()}
                onChange={(e)=>setValue(e.target.value)}
                onBlur={()=>{
                    updateData(index,id,value)
                }}
            />
        </div>
    )
}

export default Numeric