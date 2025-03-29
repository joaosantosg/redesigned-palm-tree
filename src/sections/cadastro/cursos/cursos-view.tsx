import { useState, useEffect } from 'react';

import { CursoCreateModal } from './curso-create-modal';
import { GenericListView } from '../components/generic-list-view';

const COLUMNS = [
  { id: 'nome', label: 'Nome' },
  { id: 'codigo', label: 'Código' },
  { id: 'coordenador', label: 'Coordenador' },
  { id: 'descricao', label: 'Descrição' },
];

export function CursosView() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Aqui você irá integrar com a API
    // const fetchData = async () => {
    //   try {
    //     setLoading(true);
    //     const response = await CursoService.listar();
    //     setData(response.data);
    //   } catch (error) {
    //     console.error('Erro ao buscar cursos:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      // await CursoService.deletar(id);
      setData((prevData) => prevData.filter((item: any) => item.id !== id));
    } catch (error) {
      console.error('Erro ao deletar curso:', error);
    }
  };

  return (
    <GenericListView
      title="Cursos"
      columns={COLUMNS}
      data={data}
      loading={loading}
      CreateModal={CursoCreateModal}
      handleDelete={handleDelete}
    />
  );
} 