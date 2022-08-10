import React from 'react'

const Date = ({
    value: initialValue,
    row: { index },
    column: {id},
    updateData
}) => {
    const [value,setValue] = React.useState(initialValue)

    return (
        <div className='input_field'>
            <input 
                type='date' 
                value={value || ''}
                onChange={(e)=>setValue(e.target.value)}
                onBlur={()=>{
                    updateData(index,id,value)
                }}
            />
        </div>
    )
}

export default Date