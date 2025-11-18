import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/OrgRegister';
import Upload from './pages/Upload';
import ProcessList from './pages/ProcessList';
import ReportView from './pages/ReportView';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import { useAuth } from './context/AuthContext'; 


function App() {
    const { isAuthenticated, logout, user } = useAuth();

    return (
        <BrowserRouter>
            <div className="min-h-screen bg-gray-50">
                {isAuthenticated && <Navbar onLogout={logout} />}

                {isAuthenticated && user && (
                    <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-2 bg-blue-50 border-b border-blue-200'>
                        <p className='text-sm text-blue-800'>
                            Bem vindo(a), <span className='font-semibold'>{user.name}!</span>
                        </p>
                    </div>

                )}

                <main className='container mx-auto px-4 sm:px-6 lg:px-8 py-6'>

                    <Routes>
                        {/* Rotas Públicas */}
                         <Route path="/" element={<Home />} />
                            <Route
                                path="/login"
                                element={
                                isAuthenticated ? (
                                <Navigate to="/processes" />
                                    ) : (
                                     <Login />
                                    )
                                }
                            />
                        <Route
                            path="/register"
                            element={
                            isAuthenticated ? (
                                <Navigate to="/processes" />
                            ) : (
                                <Register />
                            )
                        }
                    />

                    {/* Rotas Protegidas */}
                    {isAuthenticated? (
                        <>
                            <Route path="/upload" element={<Upload />} />
                            <Route path="/processes"element={<ProcessList />} />
                            

                            <Route
                                path="/report/:processId"
                                element={<ReportView />} 
                            />
                            <Route path="/admin" element={<AdminDashboard />} />

                        </>
                    ) : (
                        <Route path="*" element={<Navigate to="/login" />} />
                    )}
                </Routes>
            </main>
            </div>
        </BrowserRouter>
    );
}

export default App;