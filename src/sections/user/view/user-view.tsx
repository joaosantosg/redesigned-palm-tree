import type { IUsuario } from 'src/api/services/usuario/usuario.types';

import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import InputAdornment from '@mui/material/InputAdornment';
import TablePagination from '@mui/material/TablePagination';

import { useBoolean } from 'src/hooks/use-boolean';

import { DashboardContent } from 'src/layouts/dashboard';
import { UsuarioService } from 'src/api/services/usuario/usuario.service';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { TableNoData } from '../table-no-data';
import { UserCreateModal } from '../user-create-modal';

export function UsuariosView() {
  const [users, setUsers] = useState<IUsuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const createModal = useBoolean();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterName, setFilterName] = useState('');

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await UsuarioService.listarUsuarios({
        nome: filterName || undefined,
        pagina: page + 1,
        tamanho: rowsPerPage,
      });
      
      if (response.dados && response.paginacao) {
        setUsers(response.dados);
        setTotalItems(response.paginacao.total);
      } else {
        setUsers([]);
        setTotalItems(0);
      }
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      setUsers([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  }, [filterName, page, rowsPerPage]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterName(event.target.value);
    setPage(0);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await UsuarioService.removerUsuario(id);
      fetchUsers();
    } catch (error) {
      console.error('Erro ao remover usuário:', error);
    }
  };

  // Calcula os valores de exibição da paginação
  const getDisplayRange = () => {
    if (totalItems === 0) return { from: 0, to: 0 };
    
    const from = (page * rowsPerPage) + 1;
    const to = Math.min((page + 1) * rowsPerPage, totalItems);
    
    return { from, to };
  };

  const { from, to } = getDisplayRange();

  return (
    <DashboardContent>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Usuários</Typography>

        <Button
          variant="contained"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={createModal.onTrue}
        >
          Novo Usuário
        </Button>
      </Stack>

      <Card>
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            value={filterName}
            onChange={handleFilterName}
            placeholder="Buscar usuário..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>E-mail</TableCell>
                  <TableCell>Matrícula</TableCell>
                  <TableCell>Curso</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Ações</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>{user.nome}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.matricula}</TableCell>
                    <TableCell>{user.curso}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.ativo ? 'Ativo' : 'Inativo'}
                        color={user.ativo ? 'success' : 'error'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Excluir">
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Iconify icon="solar:trash-bin-trash-bold" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}

                {!loading && !users.length && (
                  <TableNoData searchQuery={filterName} />
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
          onPageChange={handleChangePage}
          rowsPerPageOptions={[10, 25, 50]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Itens por página"
          labelDisplayedRows={() => (loading ? '...' : `${from}-${to} de ${totalItems}`)}
        />
      </Card>

      <UserCreateModal
        open={createModal.value}
        onClose={createModal.onFalse}
        onSuccess={fetchUsers}
      />
    </DashboardContent>
  );
}
