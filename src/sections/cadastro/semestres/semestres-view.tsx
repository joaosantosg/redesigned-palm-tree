import type { ISemestre } from 'src/api/services/semestres/semestre.types';

import { useState, useEffect } from 'react';

import Chip from '@mui/material/Chip';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { fDate } from 'src/utils/format-time';

import { SemestreService } from 'src/api/services/semestres/semestre.service';

import { SemestreCreateModal } from './semestre-create-modal';
import { GenericListView } from '../components/generic-list-view';

const COLUMNS = [
  { id: 'identificador', label: 'Identificador' },
  { id: 'data_inicio', label: 'Data de Início' },
  { id: 'data_fim', label: 'Data de Fim' },
  { id: 'ativo', label: 'Status' },
];

function CustomRow({ row }: { row: ISemestre }) {
  console.info('Row', row);
  return (
    <TableRow hover>
      <TableCell>{row?.identificador}</TableCell>
      <TableCell>{fDate(row?.data_inicio)}</TableCell>
      <TableCell>{fDate(row?.data_fim)}</TableCell>
      <TableCell>
        <Chip
          label={row?.ativo ? 'Ativo' : 'Inativo'}
          color={row?.ativo ? 'success' : 'error'}
          size="small"
        />
      </TableCell>
    </TableRow>
  );
}

export function SemestresView() {
  const [data, setData] = useState<ISemestre[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await SemestreService.listarSemestres();
        setData(response.dados);
        console.log(response.dados);
      } catch (error) {
        console.error('Erro ao buscar semestres:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <GenericListView
      title="Semestres"
      columns={COLUMNS}
      data={data}
      loading={loading}
      CreateModal={SemestreCreateModal}
      customRowComponent={CustomRow}
    />
  );
} 