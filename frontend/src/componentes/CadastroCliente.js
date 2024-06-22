import React, { useState } from 'react';
import axios from 'axios';
import InputMask from 'react-input-mask';
import '../index.css';

export default function FormularioCadastroCliente() {
    const [formData, setFormData] = useState({
        nome: '',
        dataNascimento: '',
        cpf: '',
        dataEmissaoCpf: '',
        rg: '',
        telefone: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:32831/cliente/cadastrar', formData)
            .then(response => {
                alert('Cadastrado com sucesso');
                console.log('Cliente cadastrado com sucesso:', response.data);
                setFormData({
                    nome: '',
                    dataNascimento: '',
                    cpf: '',
                    dataEmissaoCpf: '',
                    rg: '',
                    telefone: ''
                });
            })
            .catch(error => {
                console.error('Erro ao cadastrar cliente:', error);
            });
    };

    return (
        <div className="container mt-5">
            <h2>Cadastrar Cliente</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <InputMask
                        mask="99/99/9999"
                        className="form-control"
                        placeholder="Data de Nascimento (dd/mm/yyyy)"
                        name="dataNascimento"
                        value={formData.dataNascimento}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <InputMask
                        mask="999.999.999-99"
                        className="form-control"
                        placeholder="CPF"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <InputMask
                        mask="99/99/9999"
                        className="form-control"
                        placeholder="Data de emissão CPF (dd/mm/yyyy)"
                        name="dataEmissaoCpf"
                        value={formData.dataEmissaoCpf}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="RG"
                        name="rg"
                        value={formData.rg}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Telefone"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="btn custom-btn">Cadastrar</button>
            </form>
        </div>
    );
}