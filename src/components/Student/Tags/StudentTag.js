import React, {useState}  from 'react'

import './StudentTag.css';

function StudentTag(props) {
    const {student, addTag} = props;

    const [tagInput, setTagInput] = useState("");

    function handleTagSubmit(event) {
        event.preventDefault();

        //checks if field is empty
        if (tagInput.trim().length) {
            addTag(tagInput, student);
            setTagInput("");
        } else {
            alert('Invalid Tag');
        }
    }
    function handleTagInput(event) {
        event.preventDefault();

        setTagInput(event.target.value);   
    }
    return (
        <>  
                    {/* <div className='tag'>{tag}</div> */}
             <form className='tagForm' onSubmit={(event) => handleTagSubmit(event)}>
                   <input 
                   className='submitTag'
                   placeholder='Add a tag'
                   type='text'
                   value={tagInput}
                  onChange={(event) => handleTagInput(event)}
                   />
                   <input type='hidden' />
              </form>
        </>
    )
}

export default StudentTag
