import React, {Fragment, useEffect, useRef, useState} from 'react';

import API from '../api/index';
import SearchBar from './Student/SearchBar/SearchBar';
import StudentPanel from './Student/Panel/StudentPanel';
import './Students.css';

function Students() {
    // useRef creates a plain javascript object that gives us the same ref object on render,
    // and it doesn't cause re-Render when we call the .current method.
    const valueRef = useRef({}); 

    const [students, setStudents] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchTag, setSearchTag] = useState("");


    useEffect(() =>  {
        parallelAPIrequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function parallelAPIrequests() {
        try {
            const fetchFunctions = [getStudentsData()];
            await Promise.all(fetchFunctions);
        } catch (err) {
            return;
        }
    }

    const searchByName = () => {
            return students && searchName !== ""
                ? students.filter(student => {
                    if (!searchName) {
                        return true;
                    }
                     return student.firstName.toLowerCase().startsWith(searchName)  ||
                     student.lastName.toLowerCase().startsWith(searchName)}) : students;
            };
            
    const searchByTag = (arr) => {
        return arr.filter((student) => {
            let studentIsTagged = false;
            let studentToLower;

             student.tags.forEach((tag) => {
               studentToLower = tag.toLowerCase().trim();
                if(studentToLower.includes(searchTag)) {
                    studentIsTagged = true;
                }
            });
            return studentIsTagged;
        });
    }

    function addTag(newTag, student) {
            const index = students.findIndex((studentIndex) => studentIndex.id === student.id);
            let isUnique = true;

            students[index].tags.forEach((tag) => { 
                // check if tag is unique
                if(tag.toLowerCase() === newTag.toLowerCase()) {
                    isUnique = false;
                }
            });
            if(isUnique) { // if we dont have a tag that is unique then we create a new tag and push it to current student
                const response = [...students];
                response[index].tags.push(newTag);
                setStudents(response);
            } else { 
                // else throw an alert that tells us that the tag you are trying to create is already created,
                // and doesn't allow you to create a tag that already exists on the student
                alert("Tag should be Unique");
            }
    }
     async function getStudentsData() {
        if (students.length > 0 ) {
            return
        } try {
            let data;
            if (valueRef.current["studentsAPI"]) {
                data = valueRef.current["studentsAPI"];
            } else {
                data = await API.fetchStudents();
                valueRef.current["studentsAPI"] = data;
            }
            const studentsWithTags = pushTags(data.students);
            setStudents((stu) => [...stu, ...studentsWithTags]);
            
        } catch (error) {
            return;
        }
    }
    
     function pushTags(students) {
        const response = [];

        students.forEach((student) => {
            if(!student.tags) {
                Object.assign(student, {tags: [] });
            }
            response.push(student);
        });
        return response;
    }
    function showStudentPanel() {

        if(students.length){
            let response;

            if(searchName.length && valueRef.current[searchName]){
                response = valueRef.current[searchName];
            }else{
                response = [...students];
                if (searchName.length) {
                    response = searchByName(response);
                }
                if (searchTag.length) {
                    response = searchByTag(response);
                }
                searchByName(response);
            }
            return response.map((student) => {
                return (
                    <StudentPanel 
                    key={student.id}
                    student={student}
                    addTag={addTag}
                    className='hrLine'
                    /> 
                    
                );
            });
        }
    }
    


    return (
    <Fragment>
        <div className='studentContainer'>
            <div className='studentContent'>
                <SearchBar
                    type={"name"}
                    searchInput={setSearchName}
                 />
                <SearchBar
                    type={"tag"}
                    searchInput={setSearchTag}
                />
               {showStudentPanel()}
               </div>   
        </div>
   </Fragment>
    )
}

export default Students;
