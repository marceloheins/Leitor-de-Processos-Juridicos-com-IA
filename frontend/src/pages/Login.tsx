import React, { useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const {login}= useAuth();

    const handleLogin = async () =>{
        setError('');
        if (!email || !password){
            setError("Por favor, preencha o email e a senha");
            return;
        }

        setLoading(true);
        try{
            const res = await api.post('/login', {email, password});

            login(res.data.token, res.data.user);
        }catch (err: any){
            console.error("Erro no login:", err);
            setError(err.response?.data?.message || "Falha no login. Verifique suas credenciais. ");

        } finally{
            setLoading(false);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) =>{
        if (event.key === "Enter" && !loading){
            handleLogin();
        }
    }

    return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Login</h2>
            
                    {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rouded text-sm">
                        {error}
                    </div>
                    )}
                        <div className='mb-4'>
                        <label htmlFor="email" className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
                             <input   
                                id="email"
                                className='w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                                placeholder="seuemail@exemplo.com"
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                disabled={loading}
                            />
                    </div>

                    <div className='mb-6'>
                        <label htmlFor='password' className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                            <input 
                                id="password"
                                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus-blue-500"
                                type="password" 
                                placeholder="Senha" 
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                onKeyDown={handleKeyDown}
                                 disabled={loading}
                            />
                    </div>

                     <div className="text-right mb-6">
                        <Link to="/forgot-password" // Aponta para a futura rota
                            className="text-sm text-blue-600 hover:underline">
                            Esqueceu a senha?
                        </Link>
                     </div>

                <button
                    className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition disabled:bg-gray-400"
                    onClick={handleLogin}
                    disabled={loading} // Desabilitar durante carregamento
                >
                {loading ? 'Entrando...' : 'Entrar'}
                </button>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Não tem uma conta?{' '}
                    <Link to="/register" className="text-blue-600 hover:underline">
                        Registre-se
                    </Link>
                </p>
        </div>
    )};
  