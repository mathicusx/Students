import React, {useState} from 'react';

import Grades from '../Grades/StudentGrades';
import Student from '../Student';
import StudentTag from '../Tags/StudentTag';
import ExpandGrades from '../Grades/ExpandGrades';
import './StudentPanel.css';

function StudentPanel(props) {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const { student, addTag } = props;

    function handleClick() {   
        setIsCollapsed(!isCollapsed);
    }

    function showGrades() {
        return student.grades.map((grade, id) => {
            return <Grades 
            key={id}
            id={id}
            grade={grade}/>
        })
          
    }
    function showTags() {
        return student.tags.map((tag, id) => {
        return (
            <p className='createdTag'
             key={id}
             student={student}
             >
                 {tag}</p>
     
        )} );
           

    }
  
    return (
                      <div className='panelContainer'>
                        <>
                        <ExpandGrades toggle={handleClick} isCollapsed={isCollapsed}/>
                           <Student student={student} />
                           
                           {isCollapsed ? null : (
                               <div>
                                   {showGrades()}
                               </div>
                           )}   
                              <div className='tagsContainer'>
                                  {showTags()}
                                <StudentTag
                                key={student.email + Math.random()}
                                addTag={addTag}
                                student={student} 
                                />
                                
                           </div>
                           <hr/>
                          </>
                      </div>
    );
}

export default StudentPanel;
