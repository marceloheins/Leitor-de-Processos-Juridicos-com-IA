import React, { useEffect, useState } from 'react';
import api from '../services/api';

interface Stats {
    totalUsers: number;
    totalProcesses: number;
}

export default function AdminDashboard() {
    const [overview, setOverview] = useState<Stats | null>(null);


    useEffect(() => {
        api.get('/admin/stats')
            .then(res => setOverview(res.data))
            .catch(err => console.log("Erro ao buscar estatísticas", err));
       
    },[]);

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold">PAINEL ADMINISTRATIVO</h2>

            {overview && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded shadow text-center">
                        <p className="text-sm text-gray-600">Usuários</p>
                        <p className="text-xl font-bold ">{overview.totalUsers}</p>
                    </div>

                    <div className="bg-white p-4 rounded shadow text-center">
                        <p className="text-sm text-gray-600">Processos</p>
                        <p className="text-xl font-bold ">{overview.totalProcesses}</p>
                    </div>
                </div>
            )}  
        </div>
    );
}