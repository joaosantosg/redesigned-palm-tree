import { useState, useEffect } from 'react';

import { GenericListView } from '../components/generic-list-view';
import { SemestreCreateModal } from './semestre-create-modal';

const COLUMNS = [
  { id: 'nome', label: 'Nome' },
  { id: 'dataInicio', label: 'Data de Início' },
  { id: 'dataFim', label: 'Data de Fim' },
];

export function SemestresView() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Aqui você irá integrar com a API
    // const fetchData = async () => {
    //   try {
    //     setLoading(true);
    //     const response = await SemestreService.listar();
    //     setData(response.data);
    //   } catch (error) {
    //     console.error('Erro ao buscar semestres:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      // await SemestreService.deletar(id);
      setData((prevData) => prevData.filter((item: any) => item.id !== id));
    } catch (error) {
      console.error('Erro ao deletar semestre:', error);
    }
  };

  return (
    <GenericListView
      title="Semestres"
      columns={COLUMNS}
      data={data}
      loading={loading}
      CreateModal={SemestreCreateModal}
      handleDelete={handleDelete}
    />
  );
} 