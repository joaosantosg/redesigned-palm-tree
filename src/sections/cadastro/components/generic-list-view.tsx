import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

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

interface GenericListViewProps {
  title: string;
  columns: Column[];
  data: any[];
  CreateModal: React.ComponentType<{ open: boolean; onClose: () => void; onSuccess: () => void }>;
  handleDelete?: (id: string) => Promise<void>;
  loading?: boolean;
}

export function GenericListView({
  title,
  columns,
  data,
  CreateModal,
  handleDelete,
  loading = false,
}: GenericListViewProps) {
  const createModal = useBoolean();

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
                {data.map((row) => (
                  <TableRow key={row.id} hover>
                    {columns.map((column) => (
                      <TableCell key={column.id} align={column.align}>
                        {row[column.id]}
                      </TableCell>
                    ))}
                    {handleDelete && (
                      <TableCell align="right">
                        <Button
                          color="error"
                          onClick={() => handleDelete(row.id)}
                          startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                        >
                          Excluir
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}

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
      </Card>

      <CreateModal
        open={createModal.value}
        onClose={createModal.onFalse}
        onSuccess={() => {
          createModal.onFalse();
          // Aqui você pode adicionar uma função para recarregar os dados
        }}
      />
    </DashboardContent>
  );
} 