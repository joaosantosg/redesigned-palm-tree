import { useState, useEffect } from 'react';

import { GenericListView } from '../components/generic-list-view';
import { DisciplinaCreateModal } from './disciplina-create-modal';

const COLUMNS = [
  { id: 'nome', label: 'Nome' },
  { id: 'codigo', label: 'Código' },
  { id: 'cargaHoraria', label: 'Carga Horária' },
  { id: 'curso', label: 'Curso' },
  { id: 'professor', label: 'Professor' },
  { id: 'tipo', label: 'Tipo' },
];

export function DisciplinasView() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Aqui você irá integrar com a API
    // const fetchData = async () => {
    //   try {
    //     setLoading(true);
    //     const response = await DisciplinaService.listar();
    //     setData(response.data);
    //   } catch (error) {
    //     console.error('Erro ao buscar disciplinas:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      // await DisciplinaService.deletar(id);
      setData((prevData) => prevData.filter((item: any) => item.id !== id));
    } catch (error) {
      console.error('Erro ao deletar disciplina:', error);
    }
  };

  return (
    <GenericListView
      title="Disciplinas"
      columns={COLUMNS}
      data={data}
      loading={loading}
      CreateModal={DisciplinaCreateModal}
      handleDelete={handleDelete}
    />
  );
} 