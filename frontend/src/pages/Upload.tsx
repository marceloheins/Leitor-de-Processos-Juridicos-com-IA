import  React, { useState } from 'react';
import api from '../services/api';


export default function Upload() {
    const [title, setTitle] = useState('');
    const [files, setFiles ] = useState<FileList | null>(null);

    const handleUpload = async () => {
        const form = new FormData();
        form.append('title', title);
        if (files) {
            Array.from(files).forEach(f => form.append('files', f));
        }

        await api.post('/upload', form, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            });
            alert('Upload concluído!');
            setTitle('');
            setFiles(null);
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Novo Processo</h2>
            <input className="w-full mb-2 p-2 border rounded" placeholder="Título do Processo" value={title} onChange={e => setTitle(e.target.value)} />
            <input 
            className="w-full mb-2"
            type="file"
             multiple accept="application/pdf"
            onChange={e => setFiles(e.target.files)}/>
            
            <button className="w-full bg-blue-600 text-white p-2 rounded" onClick={handleUpload}>Enviar</button>
        </div>
    );
}
