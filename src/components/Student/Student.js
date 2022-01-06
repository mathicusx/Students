import React from 'react'
import '../Student/Student.css';

function Student(props) {

    const { student } = props;
    const initialValue = 0;

   

    return (
        <div className='student'>
            <img className="studentPic" src={student.pic} alt="studentpic"/>
            <div className="studentName">
                 {student.firstName.toUpperCase()}&nbsp;{student.lastName.toUpperCase()}
            </div>
            <div>Email:&nbsp;{student.email}</div>
            <div>City:&nbsp;{student.city}</div>
            <div>Skill:&nbsp;{student.skill}</div>
            <div>Average:&nbsp;{student.grades.reduce(
                  (prevValue, currentValue) => prevValue + parseInt(currentValue),initialValue) / student.grades.length}%
                   {/* we use reduce method to calculate previous value and current value then we parse the currentValue, and give it an initialValue of 0  */}     
            </div>  
        </div>
    );
}

export default Student
