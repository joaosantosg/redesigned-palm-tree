import type { ISala } from 'src/api/services/salas/sala.types';

import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

import { SalaService } from 'src/api/services/salas/sala.service';

import { SalaCustomRow } from './sala-custom-row';
import { SalaCreateModal } from './sala-create-modal';
import { GenericListViewPaginated } from '../components/generic-list-view-paginated';

const COLUMNS = [
  { id: 'identificacao_sala', label: 'Identificação', minWidth: 170 },
  { id: 'capacidade_maxima', label: 'Capacidade', minWidth: 100 },
  { id: 'uso_restrito', label: 'Uso Restrito', minWidth: 120 },
  { id: 'curso_restrito', label: 'Curso Restrito', minWidth: 170 },
];

export function SalasView() {


  const customRowComponent = ({ row }: { row: ISala }) => (
    <SalaCustomRow row={row} onDetails={handleDetails} onDelete={handleDelete} />
  );

  const navigate = useNavigate();
  const [data, setData] = useState<ISala[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await SalaService.listarSalas({
        pagina: page + 1,
        tamanho: rowsPerPage,
      });
      setData(response.dados);
      setTotalItems(response.paginacao.total);
    } catch (error) {
      console.error('Erro ao buscar salas:', error);
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async (id: string) => {
    try {
      await SalaService.removerSala(id);
      fetchData();
    } catch (error) {
      console.error('Erro ao remover sala:', error);
    }
  };

  const handleDetails = (id: string) => {
    navigate(`/cadastros/salas/${id}`.toLowerCase());
  };

  return (
    <GenericListViewPaginated
      title="Salas"
      columns={COLUMNS}
      data={data}
      loading={loading}
      CreateModal={SalaCreateModal}
      handleDelete={handleDelete}
      handleDetails={handleDetails}
      totalItems={totalItems}
      customRowComponent={customRowComponent}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
} 