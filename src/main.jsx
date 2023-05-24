import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthProvider from './context/AuthContext';
import ThemeProvider from './context/ThemeContext';
import NotificationProvider from './context/NotificationContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <ThemeProvider>
                <NotificationProvider>
                    <App />
                </NotificationProvider>
            </ThemeProvider>
        </AuthProvider>
    </React.StrictMode>
);