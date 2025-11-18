import React, { useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


export default function Register() {
    const { login} = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleRegister = async () => {
        setError('');
        if (!name || !email || !password || !confirmPassword) {
            setError('Preencha todos os campos');
            return;
        }

        if (password !== confirmPassword) {
            setError('As senhas não coincidem');
            return;
        }

        if (password.length < 6) {
            setError('A senha deve ter no mínimo 6 caracteres');
            return;
        }

        setLoading(true);
        try {
             // Registrar
            await api.post('/register', {name,email,password,});

            // Fazer login automático
            const loginResponse = await api.post('/login', {
                email,
                password,
            });

            login(loginResponse.data.token, loginResponse.data.user);

            } catch (err: any) {
                console.error('Erro no registro:', err);
                setError(err.response?.data?.message || 'Erro ao registrar');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
                    Criar Conta
                </h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                        {error}
                    </div>
                )}

              <div className='mb-3'>
                <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-'>Nome Completo</label>

                <input
                id="name"
                    className="w-full mb-3 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                />
                </div>

                <div className='mb-3'>
                    <label htmlFor='email-register' className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
                        <input
                        id="email-register"
                            className="w-full mb-3 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="seuemail@exemplo.com"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                        />
                </div>

                <div className='mb-3'>
                  <label htmlFor="password-register" className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                  <input
                  id="password-register"
                    className="w-full mb-3 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="password"
                    placeholder="Crie uma senha (mín. 6 caracteres)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                />
                </div>

                <div className='mb-4'>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirmar Senha</label>
                    <input
                        id="confirmPassword"
                        className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="password"
                        placeholder="Confirmar Senha"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleRegister()}
                        disabled={loading}
                    />
                </div>

                <button
                    className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition disabled:bg-gray-400"
                    onClick={handleRegister}
                    disabled={loading}
                >
                    {loading ? 'Registrando...' : 'Registrar'}
                </button>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Já tem uma conta?{' '}
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Faça login
                    </Link>
                </p>
            </div>
        </div>
    );
}