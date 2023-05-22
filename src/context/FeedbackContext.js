import {createContext, useState, useEffect} from 'react'
import { db } from '../config/firebase-config'
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [feedback, setFeedback] = useState([])
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })
    const feedbackCollectionRef = collection(db, "Feedback")
    useEffect(() => {
        getFeedback()
    }, []);

    //fetch feedback
    const getFeedback = async () => {
        try{
        const data = await getDocs(feedbackCollectionRef)
        
        const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
        setFeedback(filteredData)
        setIsLoading(false);
        } catch(err){
            console.error(err)
        }
    };

    // JSON-server
    // const fetchFeedback = async () => {
    //     const response = await fetch("/feedback?_sort=id=desc")
    //     const data = await response.json()
    //     setFeedback(data)
    //     setIsLoading(false)
    // }

    //Add feedback
    const addFeedback = async (newFeedback) =>{
        try {
        await addDoc(feedbackCollectionRef, newFeedback)
        getFeedback()
        } catch(err){
            console.error(err)
        }
    }
    // JSON-Server
    // const addFeedback = async (newFeedback) => {
    //     const response = await fetch('/feedback', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(newFeedback),
    //         })
    //         const data = await response.json()
    //         setFeedback([data, ...feedback])
    // }


    //Delete feedback
    const deleteFeedback = async (id) => {
        if(window.confirm('Are you sure you want to delete =')){
        const feedbackDoc = doc(db, "Feedback", id)
        console.log(feedbackDoc)
        await deleteDoc(feedbackDoc);
        setFeedback(feedback.filter((item => item.id !== id)))
        getFeedback()
        }
    }
    // JSON-Server
    // const deleteFeedback = async (id) => {
    //     if(window.confirm('Are you sure you want to delete=')){
    //         await fetch(`/feedback/${id}`, {method: 'DELETE'})
    //         setFeedback(feedback.filter((item => item.id !== id)))
    //     }
    //}

    // Update
        const updateFeedback = async (id, updItem) => {
            const movieDoc = doc(db, "Feedback", id);
            await updateDoc(movieDoc, updItem);
            console.log(movieDoc)
            setFeedback(feedback.map((item) => item.id === id ? {item, ...updItem}: item))
        }

    // JSON-Server
    // const updateFeedback = async (id, updItem) => {
    //     const response = await fetch(`/feedback/${id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(updItem)
    //     })
    //     const data = await response.json()

    //     setFeedback(feedback.map((item) => item.id === id ? {item, ...data}: item))
    // }

    //Set item to be updated
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true,
        })
    }

    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
    }}>
        {children}
    </FeedbackContext.Provider>
}
export default FeedbackContext