import React, { useEffect, useState } from "react";
import api from '../services/api';
import { ProcessCard } from "../components/ProcessCard";
import {useNavigate } from 'react-router-dom';

interface Process{
    id: string;
    title: string;
    createdAt: string;
    status: string;
    report:{id: string} | null;
}

export default function ProcessList() {
    const [processes, setProcesses] = useState<Process[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadProcesses();
    }, []);
          
    const loadProcesses = () => {
        api.get('/processes')
            .then(res => setProcesses(res.data))
            .catch(err => console.error("Erro ao buscar processos", err));
    };
    
    const handleAnalyze = async (processId: string)=>{
        try{
            await api.post(`/analyze/${processId}`);
            alert('Análise iniciada! A lista será atualizada.');

            loadProcesses();
        } catch (err){
            alert('Erro ao iniciar análise.');

        }
        
    };

    const handleView = (processId: string) => {
        navigate(`/report/${processId}`);
    }

    const handleDelete = async (processId: string) =>{
        //A api ainda nao foi implementada
        //await api.delete(`/process/${processId}`);
        alert("Funçao deletar nao feita ainda");
        //loadProcess();

    };

    return (
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {/* Usar o ProcessCard em vez do div simples */}
            {processes.map(p => (
                <ProcessCard
                    key={p.id}
                    process={p}
                    onAnalyze={() => handleAnalyze(p.id)}
                    onView={() => handleView(p.id)}
                    onDelete={() => handleDelete(p.id)}
                />
            ))}
        </div>
          
    );
}
