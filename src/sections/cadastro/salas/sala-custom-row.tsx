import type { ISala } from 'src/api/services/salas/sala.types';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { Iconify } from 'src/components/iconify';

interface SalaCustomRowProps {
  row: ISala;
  onDelete?: (id: string) => void;
  onDetails?: (id: string) => void;
}

export function SalaCustomRow({ row, onDelete, onDetails }: SalaCustomRowProps) {
  return (
    <TableRow hover>
      <TableCell>{row.identificacao_sala}</TableCell>
      <TableCell>{row.capacidade_maxima}</TableCell>
      <TableCell>
        <Chip
          label={row.uso_restrito ? 'Sim' : 'Não'}
          color={row.uso_restrito ? 'error' : 'success'}
          size="small"
        />
      </TableCell>
      <TableCell>{row.curso_restrito || '-'}</TableCell>
      <TableCell align="right">
        <Stack direction="row" justifyContent="flex-end" spacing={1}>
          <Tooltip title="Detalhes">
            <IconButton
              color="info"
              onClick={() => onDetails?.(row.id)}
            >
              <Iconify icon="solar:eye-bold" />
            </IconButton>
          </Tooltip>
          {onDelete && (
            <Tooltip title="Excluir">
              <IconButton
                color="error"
                onClick={() => onDelete(row.id)}
              >
                <Iconify icon="solar:trash-bin-trash-bold" />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </TableCell>
    </TableRow>
  );
} 