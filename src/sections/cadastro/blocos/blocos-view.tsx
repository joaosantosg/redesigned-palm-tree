import type { IBloco } from 'src/api/services/blocos/bloco.types';

import { useState, useEffect, useCallback } from 'react';

import { BlocoService } from 'src/api/services/blocos/bloco.service';

import { BlocoCreateModal } from './bloco-create-modal';
import { GenericListViewPaginated } from '../components/generic-list-view-paginated';

const COLUMNS = [
  { id: 'nome', label: 'Nome', minWidth: 170 },
  { id: 'identificacao', label: 'Identificação', minWidth: 170 },
];

export function BlocosView() {
  const [data, setData] = useState<IBloco[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await BlocoService.listarBlocos({
        pagina: page + 1,
        tamanho: rowsPerPage,
      });
      setData(response.dados);
      setTotalItems(response.paginacao.total);
    } catch (error) {
      console.error('Erro ao buscar blocos:', error);
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
      // await BlocoService.remover(id);
      setData(data.filter((item) => item.id !== id));
      fetchData(); // Recarrega os dados após deletar
    } catch (error) {
      console.error('Erro ao remover bloco:', error);
    }
  };

  return (
    <GenericListViewPaginated
      title="Blocos"
      columns={COLUMNS}
      data={data}
      loading={loading}
      CreateModal={BlocoCreateModal}
      handleDelete={handleDelete}
      totalItems={totalItems}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
} 