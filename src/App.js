import Header from './components/Header'
import FeedbackList from './components/FeedbackList'
import FeedbackState from './components/FeedbackState'
import FeedbackForm from './components/FeedbackForm'
import AboutPage from './pages/AboutPage'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AboutIconLink from './components/AbouteIconLinks'
import { FeedbackProvider } from './context/FeedbackContext'


function App() {
   

  return (
    <FeedbackProvider>
    <BrowserRouter>
            <Header />
        <div className="container">
            <Routes>
                <Route path="/" element={
                <>
                <FeedbackForm />
                <FeedbackState />
               <FeedbackList />
               </>
                 } />

                 <Route path="/about" element={<AboutPage />}/>
           </Routes>
           <AboutIconLink />

        </div>
    
    </BrowserRouter>
    </FeedbackProvider>
  );
}

export default App;
