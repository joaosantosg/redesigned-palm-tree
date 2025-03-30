import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { useBoolean } from 'src/hooks/use-boolean';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
}

interface GenericListViewPaginatedProps {
  title: string;
  columns: Column[];
  customRowComponent?: React.ComponentType<{ row: any }>;
  data: any[];
  CreateModal: React.ComponentType<{ open: boolean; onClose: () => void; onSuccess: () => void }>;
  handleDelete?: (id: string) => Promise<void>;
  handleDetails?: (id: string) => void;
  loading?: boolean;
  totalItems: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function GenericListViewPaginated({
  title,
  columns,
  customRowComponent: CustomRow,
  data,
  CreateModal,
  handleDelete,
  handleDetails,
  loading = false,
  totalItems,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: GenericListViewPaginatedProps) {
  const navigate = useNavigate();
  const createModal = useBoolean();

  // Calcula os valores de exibição da paginação
  const getDisplayRange = () => {
    if (totalItems === 0) return { from: 0, to: 0 };
    
    const from = (page * rowsPerPage) + 1;
    const to = Math.min((page + 1) * rowsPerPage, totalItems);
    
    return { from, to };
  };

  const { from, to } = getDisplayRange();

  const handleDetailsClick = (id: string) => {
    if (handleDetails) {
      handleDetails(id);
    } else {
      // Default behavior: navigate to details page
      navigate(`/cadastros/${title.toLowerCase()}/${id}`);
    }
  };

  return (
    <DashboardContent>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">{title}</Typography>

        <Button
          variant="contained"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={createModal.onTrue}
        >
          Novo
        </Button>
      </Stack>

      <Card>
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                  {handleDelete && <TableCell align="right">Ações</TableCell>}
                </TableRow>
              </TableHead>

              <TableBody>
                {data.map((row) => {
                  if (CustomRow) {
                    return <CustomRow key={row.id} row={row} />;
                  }

                  return (
                    <TableRow key={row.id} hover>
                      {columns.map((column) => (
                        <TableCell key={column.id} align={column.align}>
                          {row[column.id]}
                        </TableCell>
                      ))}
                      <TableCell align="right">
                        <Stack direction="row" justifyContent="flex-end" spacing={1}>
                          <Tooltip title="Detalhes">
                            <IconButton
                              color="info"
                              onClick={() => handleDetailsClick(row.id)}
                            >
                              <Iconify icon="solar:eye-bold" />
                            </IconButton>
                          </Tooltip>
                          {handleDelete && (
                            <Tooltip title="Excluir">
                              <IconButton
                                color="error"
                                onClick={() => handleDelete(row.id)}
                              >
                                <Iconify icon="solar:trash-bin-trash-bold" />
                              </IconButton>
                            </Tooltip>
                          )}
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })}

                {!loading && !data.length && (
                  <TableRow>
                    <TableCell
                      align="center"
                      colSpan={columns.length + (handleDelete ? 1 : 0)}
                      sx={{ py: 3 }}
                    >
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                          Nenhum registro encontrado
                        </Typography>
                        <Iconify
                          icon="mingcute:inbox-line"
                          width={72}
                          sx={{ color: 'text.disabled' }}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={totalItems}
          rowsPerPage={rowsPerPage}
          onPageChange={onPageChange}
          rowsPerPageOptions={[10, 25, 50]}
          onRowsPerPageChange={onRowsPerPageChange}
          labelRowsPerPage="Itens por página"
          labelDisplayedRows={() => (loading ? '...' : `${from}-${to} de ${totalItems}`)}
        />
      </Card>

      <CreateModal
        open={createModal.value}
        onClose={createModal.onFalse}
        onSuccess={() => {
          createModal.onFalse();
        }}
      />
    </DashboardContent>
  );
} 