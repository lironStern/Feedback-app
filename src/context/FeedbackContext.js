import {createContext, useState, useEffect } from 'react'

const FeedbackContext = createContext()


export const FeedbackProvider = ({children}) => {
    const [feedback, setFeedback] = useState([])

    const [editFeedbackState, setEditFeedbackState] = useState({
        item: {},
        edit: false
    })

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchFeedback()
    }, [])

    const fetchFeedback = async() => {

        const response = await fetch('/feedback?_sort=id&_order=desc')
        const data = await response.json()
        setFeedback(data)
        setIsLoading(false)

    }

    const funcEditState = (item) => {
        setEditFeedbackState({item, edit: true})
    }



    const updateFeedback = async (id, updItem) => {


        const response = await fetch(`/feedback/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(updItem)
        })


        const data = await response.json()


        setFeedback(feedback.map((item) => item.id === id ? {...item, ...data } : item))
        setEditFeedbackState({item: {}, edit: false})
    }  


   

    const handleDelete = async (id) => {
        if(window.confirm('Are you sure you wont to delete?'))

            await fetch(`/feedback/${id}`, {method: 'DELETE'})
            setFeedback(feedback.filter((item)=> item.id !== id ))
        
     }

     const addFeedback = async (newFeedback) =>{
        const response = await fetch('/feedback', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newFeedback),
          })


        const data = await response.json()


        setFeedback([data, ...feedback]);
    }



    return <FeedbackContext.Provider value={{feedback, editFeedbackState, handleDelete, addFeedback, funcEditState, updateFeedback, isLoading}}>

        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext