import { useEffect, useState } from 'react';
import { useFoodDataMutate } from '../../hooks/useFoodDataMutate';
import { useFoodData } from '../../hooks/useFoodData';
import { FoodData } from '../../interface/FoodData';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import "./modal.css";

export function CreateModal({ onClose }) {
    const [rows, setRows] = useState<FoodData[]>([]);
    const { mutate, isSuccess, isLoading } = useFoodDataMutate();
    const { data } = useFoodData();

    const handleSave = () => {
        mutate(rows); 
    };

    const handleEdit = (index: number, field: keyof FoodData, value: string | number) => {
        const updatedRows = [...rows];
        updatedRows[index] = { ...updatedRows[index], [field]: value };
        setRows(updatedRows);
    };

    const handleDelete = (index: number) => {
        const updatedRows = rows.filter((_, rowIndex) => rowIndex !== index);
        setRows(updatedRows);
    };

    const handleInsertRow = () => {
        const newRow: FoodData = { nome: '', preco: 0, urlFoto: '' };
        setRows([...rows, newRow]);
    };

    useEffect(() => {
        if (data && !isLoading) {
            setRows(data);
        }
    }, [data, isLoading]);

    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <IconButton className="close-button" onClick={onClose}>
                    <CloseIcon />
                </IconButton>
                <h2>Cadastre um novo item</h2>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 1200 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell>Preço</TableCell>
                                <TableCell>URL da Imagem</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((foodData, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <TextField fullWidth
                                            value={foodData.nome}
                                            onChange={(e) => handleEdit(index, 'nome', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField fullWidth
                                            value={foodData.preco}
                                            onChange={(e) => handleEdit(index, 'preco', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField fullWidth
                                            value={foodData.urlFoto}
                                            onChange={(e) => handleEdit(index, 'urlFoto', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleDelete(index)}>
                                            <CloseIcon />
                                        </IconButton>

                                        {/* Você pode adicionar um botão de editar aqui */}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button onClick={handleInsertRow} className="btn-inserir-produto" disabled={isLoading} variant="contained" disableElevation>
                    <AddIcon fontSize="small"/>
                </Button>
                <div className="button-container">
                    <Button onClick={handleSave} className="btn-secondary" disabled={isLoading}>
                        {isLoading ? 'Salvando...' : 'Salvar'}
                    </Button>
                </div>
            </div>
        </div>
    );
}