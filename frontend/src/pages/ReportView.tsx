import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useParams, Link } from 'react-router-dom';

interface Interaction {
    id: string;
    question: string;
    answer: string;
    createdAt: string;
}

interface Report {
    id: string;
    content: string;
    createdAt: string;
    interactions: Interaction[];
}


export default function ReportView() {
    const { processId} = useParams<{ processId: string}>();

    const [report, setReport] = useState<Report | null>(null);
    const [question, setQuestion] = useState('');
    const [interactions, setInteractions] = useState<Interaction[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
       if(processId) {
        loadReport();
       }
    },[processId]);

    const loadReport = async () => {
        try {
            const response = await api.get(`/report/${processId}`);
            setReport(response.data);
            setInteractions(response.data.interactions || []);
        } catch (err: any) {
            console.error('Erro ao carregar relatório:', err);
            setError('Erro ao carregar relatório');
        }
    };

    const handleAsk = async () => {
        if (!question.trim()) {
            setError('Digite uma pergunta');
            return;
        }

        try {
            setLoading(true);
            setError('');

            const response = await api.post(
                `/interact/${report?.id}`,
                { question },
            );

            setInteractions([...interactions, response.data]);
            setQuestion('');
        } catch (err: any) {
            console.error('Erro ao fazer pergunta:', err);
            setError(err.response?.data?.message || 'Erro ao fazer pergunta');
        } finally {
            setLoading(false);
        }
    };

    //logica de Carregando

    if (!report) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">Carregando relatório...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 px-4 sm:px-6 lg:px-8 py-6">
            <Link 
            to="/process"
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
            >Voltar para Lista</Link>
                

            <h2 className="text-2xl font-bold">Relatório de Análise</h2>

            {error && (
                <div className="p-3 bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            )}

            <div className="bg-gray-100 p-6 rounded shadow max-h-[400px] overflow-y-auto text-sm whitespace-pre-wrap">
                {report.content}
            </div>

            <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Fazer Pergunta</h3>
                <div className="flex flex-col sm:flex-row gap-2">
                    <input
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Faça uma pergunta sobre o relatório..."
                        className="flex-1 border px-3 py-2 rounded"
                        disabled={loading}
                        onKeyPress={(e) => e.key === 'Enter' && handleAsk()}
                    />
                    <button
                        onClick={handleAsk}
                        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
                        disabled={loading}
                    >
                        {loading ? 'Enviando...' : 'Perguntar'}
                    </button>
                </div>
            </div>

            {interactions.length > 0 && (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Histórico de Perguntas</h3>
                    {interactions.map((interaction, index) => (
                        <div key={interaction.id || index} className="bg-white p-4 rounded shadow border">
                            <p className="mb-2">
                                <strong className="text-blue-600">Pergunta:</strong> {interaction.question}
                            </p>
                            <p>
                                <strong className="text-green-600">Resposta:</strong> {interaction.answer}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                                {new Date(interaction.createdAt).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}