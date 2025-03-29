import { useState, useEffect } from 'react';
import { GenericListView } from '../components/generic-list-view';
import { BlocoCreateModal } from './bloco-create-modal';

const COLUMNS = [
  { id: 'nome', label: 'Nome', minWidth: 170 },
  { id: 'descricao', label: 'Descrição', minWidth: 200 },
];

export function BlocosView() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Aqui você irá integrar com a API
    // const fetchData = async () => {
    //   try {
    //     const response = await BlocoService.listar();
    //     setData(response.dados);
    //   } catch (error) {
    //     console.error('Erro ao buscar blocos:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchData();
    setLoading(false);
  }, []);

  const handleDelete = async (id: string) => {
    try {
      // await BlocoService.remover(id);
      // Atualizar a lista após deletar
      setData(data.filter((item: any) => item.id !== id));
    } catch (error) {
      console.error('Erro ao remover bloco:', error);
    }
  };

  return (
    <GenericListView
      title="Blocos"
      columns={COLUMNS}
      data={data}
      loading={loading}
      CreateModal={BlocoCreateModal}
      handleDelete={handleDelete}
    />
  );
} 