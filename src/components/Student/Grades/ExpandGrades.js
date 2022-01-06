import React from 'react'

function ExpandGrades(props) {
    const { isCollapsed, toggle} = props
    return (
        <div className='expandedGrades'>
             <div className="expandGrades" onClick={() => toggle()}>
            {isCollapsed ? '+' : '-'}
        </div>

        </div>
    )
}

export default ExpandGrades
