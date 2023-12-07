import Card from './shared/Card'
import Button from './shared/Button'
import {useState} from 'react'
import RatingSelect from './RatingSelect'
import { useContext, useEffect } from 'react'
import FeedbackContext from '../context/FeedbackContext'


function FeedbackForm() {

    const [text, setText] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [message, setMessage] = useState('')
    const [rating, setRating] = useState(10)

    const {addFeedback, editFeedbackState, updateFeedback} = useContext(FeedbackContext)

    useEffect(() => {
        if(editFeedbackState.edit === true){
            setBtnDisabled(false);
            setText(editFeedbackState.item.text)
            setRating(editFeedbackState.item.Rating)
        }
    },[editFeedbackState])

    const handleTextChange = (e) => {

        if(text === ''){
            setBtnDisabled(true);
            setMessage('You mast enter text')
        } else if(text!=='' && text.trim().length < 10){
            setBtnDisabled(true);
            setMessage('Text must be at least 10 characters');
        }else{
            setMessage('');
            setBtnDisabled(false);
            
        }
        setMessage(null);
        setText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(text.trim().length > 10){
            const newFeedback = {
                text, 
                rating,
            }
            if(editFeedbackState.edit === true){
                updateFeedback(editFeedbackState.item.id, newFeedback)
            }else{
                addFeedback(newFeedback)
            }
            
            setText('')
        }
    }


  return (
    <Card>
        <form onSubmit={handleSubmit}>
            <h2>How would you rate your service with us?</h2>
            <RatingSelect select={(rating) => setRating(rating)}/>
            <div className="input-group">
                <input 
                    type="text"
                    placeholder='Write A review'
                    value={text}
                    onChange={handleTextChange}
                />
                <Button type='submit' isDisabled={btnDisabled}>Send</Button>
                {message && <div className="message">{message}</div>}
            </div>
        </form>
    </Card>
  )
}

export default FeedbackForm