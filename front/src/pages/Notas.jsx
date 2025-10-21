import React from 'react';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";

const Notas = () => {
    const [dados, setDados] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);
    const [mostrarForm, setMostrarForm] = useState(false);
    const [editandoId, setEditandoId] = useState(null);
    
    const [formData, setFormData] = useState({
        titulo: '',
        texto: ''
    });

    useEffect(() => {
        buscaDados();
    }, []);

    const buscaDados = async () => {
        try {
            setCarregando(true);
            setErro(null);
            
            const resposta = await axios.get('http://localhost:8081/notas');
            setDados(resposta.data);
            
        } catch (erro) {
            console.error('Erro ao carregar notas:', erro);
            setErro('Erro ao carregar notas. Verifique se o servidor está rodando.');
        } finally {
            setCarregando(false);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            if (editandoId) {
                await axios.put(`${'http://localhost:8081/notas'}/${editandoId}`, formData);
            } else {
                await axios.post('http://localhost:8081/notas', formData);
            }
            
            limparForm();
            await buscaDados();
            
        } catch (erro) {
            console.error('Erro ao salvar nota:', erro);
            alert('Erro ao salvar nota. Tente novamente.');
        }
    }

    const editarNota = (nota) => {
        setFormData({
            titulo: nota.titulo,
            texto: nota.texto
        });
        setEditandoId(nota.id);
        setMostrarForm(true);
    }

    const deletarNota = async (id, titulo) => {
        if (window.confirm(`Tem certeza que deseja excluir a nota "${titulo}"?`)) {
            try {
                await axios.delete(`${'http://localhost:8081/notas'}/${id}`);
                await buscaDados();
            } catch (erro) {
                console.error('Erro ao excluir nota:', erro);
                alert('Erro ao excluir nota. Tente novamente.');
            }
        }
    }

    const limparForm = () => {
        setFormData({
            titulo: '',
            texto: ''
        });
        setEditandoId(null);
        setMostrarForm(false);
    }

    const cancelarEdicao = () => {
        limparForm();
    }

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>

                <h2>Gerenciamento de Notas</h2>
                <Link to="/" style={{ textDecoration: 'none', color: '#007bff' }}> Voltar para Home </Link>
            </div>

            <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
                <button onClick={() => setMostrarForm(true)}style={{padding: '10px 20px',backgroundColor: '#007bff',color: 'white',border: 'none',borderRadius: '5px',cursor: 'pointer'}}>
                    + Nova Nota
                </button>
                
                <button onClick={buscaDados}style={{padding: '10px 20px',backgroundColor: '#17a2b8',color: 'white',border: 'none',borderRadius: '5px',cursor: 'pointer'}}>
                    Recarregar
                </button>
            </div>

            {erro && (
                <div style={{padding: '15px',backgroundColor: '#f8d7da',color: '#721c24',border: '1px solid #f5c6cb',borderRadius: '5px',marginBottom: '20px'}}>
                    {erro}
                </div>
            )}

            {mostrarForm && (
                <div style={{border: '1px solid #ddd',padding: '20px',borderRadius: '8px',marginBottom: '30px',backgroundColor: '#f9f9f9'}}>
                    <h3 style={{ marginTop: 0 }}>
                        {editandoId ? 'Editar Nota' : 'Criar Nova Nota'}
                    </h3>
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                Título:
                            </label>
                            <input type="text"name="titulo" value={formData.titulo} onChange={handleInputChange} required style={{ width: '100%',padding: '8px',border: '1px solid #ccc',borderRadius: '4px', boxSizing: 'border-box'}}placeholder="Digite o título da nota"/>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                Texto:
                            </label>
                            <textarea name="texto" value={formData.texto} onChange={handleInputChange} required rows="6" style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', resize: 'vertical'}} placeholder="Digite o conteúdo da nota"/>
                        </div>

                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button
                                type="submit"style={{padding: '10px 20px',backgroundColor: editandoId ? '#ffc107' : '#28a745',color: 'white',border: 'none',borderRadius: '5px',cursor: 'pointer'}}>
                                {editandoId ? 'Atualizar Nota' : 'Criar Nota'}
                            </button>
                            
                            <button type="button"onClick={cancelarEdicao}style={{padding: '10px 20px',backgroundColor: '#6c757d',color: 'white',border: 'none',borderRadius: '5px',cursor: 'pointer'}}>
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {carregando ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                    <p>Carregando notas...</p>
                </div>
            ) : (
                <div>
                    <h3>Notas Existentes ({dados.length})</h3>
                    {dados.length > 0 ? (
                        <div style={{ display: 'grid', gap: '15px' }}>
                            {dados.map((nota) => (
                                <div key={nota.id} style={{border: '1px solid #ddd',padding: '15px',borderRadius: '8px',backgroundColor: 'white',position: 'relative'}}>
                                    <div style={{position: 'absolute',top: '10px',right: '10px',display: 'flex',gap: '5px'}}>
                                        <button onClick={() => editarNota(nota)}style={{padding: '5px 10px',backgroundColor: '#17a2b8',color: 'white',border: 'none',borderRadius: '3px',cursor: 'pointer',fontSize: '12px'}}>
                                            Editar
                                        </button>
                                        <button onClick={() => deletarNota(nota.id, nota.titulo)}style={{padding: '5px 10px',backgroundColor: '#dc3545',color: 'white',border: 'none', borderRadius: '3px',cursor: 'pointer', fontSize: '12px' }}>
                                            Excluir
                                        </button>
                                    </div>

                                    <h4 style={{ margin: '0 0 10px 0', color: '#333',paddingRight: '100px'}}>
                                        {nota.titulo}
                                    </h4>
                                    <p style={{ margin: '0 0 10px 0', color: '#666',whiteSpace: 'pre-wrap'}}>
                                        {nota.texto}
                                    </p>
                                    <small style={{ color: '#888' }}>ID: {nota.id} | Criada em: {nota.created_at ? new Date(nota.created_at).toLocaleDateString('pt-BR') : 'N/A'} |Atualizada em: {nota.updated_at ? new Date(nota.updated_at).toLocaleDateString('pt-BR') : 'N/A'}</small>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{padding: '40px',textAlign: 'center',border: '2px dashed #ddd',borderRadius: '8px',backgroundColor: '#fafafa'}}>
                            <p style={{ fontSize: '18px', color: '#666', margin: 0 }}>
                                Nenhuma nota encontrada. 
                                <br />
                                <strong>Clique em "Nova Nota" para criar a primeira!</strong>
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Notas;