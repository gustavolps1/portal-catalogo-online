import { useState } from 'react'
import './App.css'
import { Card } from './components/card/card';
import { useFoodData } from './hooks/useFoodData';
import { CreateModal } from './components/create-modal/create-modal';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

function App() {
  const { data } = useFoodData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
}

  return (
    <div className="container">
      <h1>Catálogo Online</h1>
      <div className="card-grid">
        {data?.map(foodData => 
          <Card
            preco={foodData.preco} 
            nome={foodData.nome} 
            urlFoto={foodData.urlFoto}
          />
        )}
      </div>
      {isModalOpen && <CreateModal onClose={handleCloseModal}/>}
      <IconButton className="btnCadastro" onClick={handleOpenModal} aria-label="delete" size="large">
        <ModeEditIcon fontSize="inherit" />
      </IconButton>
    
    </div>
    
  )
}

export default App
