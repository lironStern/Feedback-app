import {createContext, useState } from 'react'
import {v4 as uuidv4} from 'uuid'

const FeedbackContext = createContext()


export const FeedbackProvider = ({children}) => {
    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: 'This is from context',
            rating: 10
        },
        {
            id: 2,
            text: 'This is feedback 2',
            rating: 9
        },
        {
            id: 3,
            text: 'This is feedback 3',
            rating: 7
        }
    ])

    const [editFeedbackState, setEditFeedbackState] = useState({
        item: {},
        edit: false
    })

    const funcEditState = (item) => {
        setEditFeedbackState({item, edit: true})
    }

    const updateFeedback = (id, updateItem) => {
            
        setFeedback(feedback.map((item) => 
             item.id === id ? {...item, ...updateItem} : item
            ))
        
    }
   

    const handleDelete = (id) => {
        if(window.confirm('Are you sure you wont to delete?'))
            setFeedback(feedback.filter((item)=> item.id !== id ))
     }

     const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4();
        setFeedback([newFeedback, ...feedback])
     }


    return <FeedbackContext.Provider value={{feedback, editFeedbackState, handleDelete, addFeedback, funcEditState, updateFeedback}}>

        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext