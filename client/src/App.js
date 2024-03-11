import { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Main from './components/Main';
import Signup from './components/Singup';
import Login from './components/Login';
import HashLoader from 'react-spinners/HashLoader'; // Import the HashLoader

function App() {
    const user = localStorage.getItem('token');
    const [loading, setLoading] = useState(true); // Initialize loading state

    // Simulate a loading process (e.g., check user authentication)
    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 5000); // Set a timeout for the loader

        return () => clearTimeout(timeout); // Cleanup the timeout
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <HashLoader color='blue' loading={loading} size={60} />
            </div>
        );
    }

    return (
        <div>
            <Routes>
                {user && <Route path="/" exact element={<Main />} />}
                <Route path="/signup" exact element={<Signup />} />
                <Route path="/login" exact element={<Login />} />
                <Route path="/" element={<Navigate replace to="/login" />} />
            </Routes>
        </div>
    );
}

export default App;