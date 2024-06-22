import React, { useState } from 'react';
import axios from 'axios';
import InputMask from 'react-input-mask';

export default function ElementoListaCliente(props) {
    const { nome, dataNascimento, cpf, dataEmissaoCpf, rg, telefone, id, onUpdate: getClientes } = props;
    const [status, setStatus] = useState();
    const [editData, setEditData] = useState({
        id,
        nome,
        dataNascimento,
        cpf,
        dataEmissaoCpf,
        rg,
        telefone
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    };

    const handleSave = () => {
        axios.put(`http://localhost:32831/cliente/atualizar`, editData)
            .then(response => {
                alert('Cliente atualizado com sucesso!');
                console.log('Cliente atualizado com sucesso:', response.data);
                setStatus(1);
                getClientes();
            })
            .catch(error => {
                console.error('Erro ao atualizar cliente:', error);
                setStatus(2);
            });
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:32831/cliente/excluir`, { data: { id } })
            .then(response => {
                console.log('Cliente excluído com sucesso:', response.data);
                getClientes();
            })
            .catch(error => {
                console.error('Erro ao excluir cliente:', error);
            });
    };

    return (
        <div>
            <div className="list-group list-group-flush" style={{ display: "flex", flexDirection: "row", margin: "0.5vh" }}>
                <a href="#" className="list-group-item list-group-item-action" data-bs-toggle="collapse" data-bs-target={`#${id}`} aria-expanded="false" aria-controls={id}>
                    {nome}
                </a>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#modalEditar-${id}`} style={{ marginRight: '1vh' }}>Editar</button>
                <button type="button" className="btn btn-danger" onClick={() => handleDelete(id)}>Excluir</button>
            </div>
            <div className="collapse" id={id} style={{ margin: "2vh 3vh" }}>
                <div className="row">
                    <div className="col">
                        <h5>Dados do cliente</h5>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Nome</span>
                            <span className="form-control">{nome}</span>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Data de Nascimento</span>
                            <span className="form-control">{dataNascimento}</span>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">CPF</span>
                            <span className="form-control">{cpf}</span>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Data de Emissão CPF</span>
                            <span className="form-control">{dataEmissaoCpf}</span>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">RG</span>
                            <span className="form-control">{rg}</span>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Telefone</span>
                            <span className="form-control">{telefone}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id={`modalEditar-${id}`} tabIndex="-1" aria-labelledby="modalEditarLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Atualização de cliente</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div style={{ display: 'none' }}>
                                    <p>Identificação:</p><p value={editData.id}>{id}</p>
                                </div>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Nome" name="nome" value={editData.nome} onChange={handleInputChange} />
                                </div>
                                <div className="input-group mb-3">
                                    <InputMask
                                        mask="99/99/9999"
                                        className="form-control"
                                        placeholder="Data de Nascimento"
                                        name="dataNascimento"
                                        value={editData.dataNascimento}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <InputMask
                                        mask="999.999.999-99"
                                        className="form-control"
                                        placeholder="CPF"
                                        name="cpf"
                                        value={editData.cpf}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <InputMask
                                        mask="99/99/9999"
                                        className="form-control"
                                        placeholder="Data de Emissão CPF"
                                        name="dataEmissaoCpf"
                                        value={editData.dataEmissaoCpf}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="RG" name="rg" value={editData.rg} onChange={handleInputChange} />
                                </div>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Telefone" name="telefone" value={editData.telefone} onChange={handleInputChange} />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                                    <button type="button" className="btn btn-primary" onClick={handleSave}>Salvar mudanças</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}