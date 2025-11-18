import React from 'react';
import { Process }  from '../entities/Process';

interface Process{
    id: string;
    title:string;
    createdAt: string;
    status: string;
    report: { id: string} | null;
}

interface ProcessCardProps {
    process: Process;
    onView:() => void;
    onAnalyze: () => void;
    onDelete: () => void;

}

export function ProcessCard({ process, onView, onAnalyze, onDelete }: ProcessCardProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'concluido':
                return 'bg-green-100 text-green-800';
            case 'processando':
                return 'bg-yellow-100 text-yellow-800';
            case 'erro':
                return 'bg-red-100 text-red-800';   
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'pendente':
                return 'Pendente';
            case 'processando':
                return 'Processando';
            case 'concluido':
                return 'Concluído';
            case 'erro':
                return 'Erro';
            default:
                return status;

        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{process.title}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(process.status)}`}>
                    {getStatusText(process.status)}
                </span>
            </div>

            <div className="space-y-2 mb-4">
            <p className="text-sm text-gray-600">
                {new Date(process.createdAt).toLocaleDateString('pt-BR')}
            </p>
            </div>

            <div className="flex gap-2">
                {process.status === 'pendente' && (
                    <button
                        onClick={onAnalyze }
                        className="flex-1 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition text-sm">
                        Analisar
                    </button>
                )}

                {process.report && process.status === 'concluido' && (
                    <button
                        onClick={onView}
                        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm">
                        Ver Relatório
                    </button>
                )}

                <button
                    onClick={onDelete}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition text-sm">
                    Deletar
                </button>
            </div>
        </div>
    );  
}

                   