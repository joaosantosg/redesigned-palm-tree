import { useState, useEffect } from 'react';

import { SalaCreateModal } from './sala-create-modal';
import { GenericListView } from '../components/generic-list-view';

const COLUMNS = [
  { id: 'nome', label: 'Nome' },
  { id: 'tipo', label: 'Tipo' },
  { id: 'capacidade', label: 'Capacidade' },
  { id: 'bloco', label: 'Bloco' },
];

export function SalasView() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Aqui você irá integrar com a API
    // const fetchData = async () => {
    //   try {
    //     setLoading(true);
    //     const response = await SalaService.listar();
    //     setData(response.data);
    //   } catch (error) {
    //     console.error('Erro ao buscar salas:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      // await SalaService.deletar(id);
      setData((prevData) => prevData.filter((item: any) => item.id !== id));
    } catch (error) {
      console.error('Erro ao deletar sala:', error);
    }
  };

  return (
    <GenericListView
      title="Salas"
      columns={COLUMNS}
      data={data}
      loading={loading}
      createModal={SalaCreateModal}
      onDelete={handleDelete}
    />
  );
} 