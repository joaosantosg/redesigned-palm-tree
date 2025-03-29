import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';

interface TableNoDataProps {
  searchQuery?: string;
}

export function TableNoData({ searchQuery }: TableNoDataProps) {
  return (
    <TableRow>
      <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
          {searchQuery ? 'Nenhum usuário encontrado' : 'Nenhum usuário cadastrado'}
        </Typography>
        <Iconify icon="mingcute:user-off-line" width={72} sx={{ color: 'text.disabled' }} />
      </TableCell>
    </TableRow>
  );
}
