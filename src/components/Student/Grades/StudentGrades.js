import React from "react";

import './Grades.css';

function Grades(props) {
    const { grade, id, } = props;

    return (
        <>
        <div className="listGrades">
           Test{id + 1}: {grade}%
        </div>
       
        </>
    );
}

export default Grades;
