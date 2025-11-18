import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white px-6">
            <div className="max-w-xl text-center">
                <h1 className="text-4xl font-bold text-blue-700 mb-4">Bem-vindo ao Análisador Jurídico IA</h1>
                <p className="text-lg text-gray-700 mb-6">
                    Faça upload de documentos jurídicos, gere relatórios inteligentes e interaja com os resultados. Tudo em um só lugar.
                </p>
                <div className="flex gap-4 justify-center">
                    <Link
                        to="/login">
                        <div className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                        >Login
                        </div>
                    </Link>
                    <Link
                        to="/register"
                        className="bg-white text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition"
                    >Registrar
                    </Link>
                </div>
            </div>
        </div>
    );
}
        