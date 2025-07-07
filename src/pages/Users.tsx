import { useState } from "react";
import { Link } from "react-router-dom";
import { useUsers, useDeactivateUser, useActivateUser } from "@/hooks/useUsers";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import {
  Search as SearchIcon,
  Visibility as EyeIcon,
  PersonOff as UserXIcon,
  PersonAdd as UserCheckIcon,
} from '@mui/icons-material';
import { useSnackbar } from "@/hooks/useSnackbar";
import { User } from "@/types";

export default function Users() {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    role: "",
    status: "",
  });
  const [deactivateDialog, setDeactivateDialog] = useState<{ open: boolean; user: User | null }>({
    open: false,
    user: null,
  });

  const { data, isLoading } = useUsers(filters);
  const deactivateUser = useDeactivateUser();
  const activateUser = useActivateUser();
  const { toast } = useSnackbar();

  const handleDeactivate = async (userId: string) => {
    try {
      await deactivateUser.mutateAsync(userId);
      toast.success("User deactivated successfully");
      setDeactivateDialog({ open: false, user: null });
    } catch (error) {
      toast.error("Failed to deactivate user");
    }
  };

  const handleActivate = async (userId: string) => {
    try {
      await activateUser.mutateAsync(userId);
      toast.success("User activated successfully");
    } catch (error) {
      toast.error("Failed to activate user");
    }
  };

  const getRoleBadge = (role: string) => {
    const colors = {
      graduate: "success",
      guest: "primary",
      admin: "secondary",
    };
    return (
      <Chip
        label={role.charAt(0).toUpperCase() + role.slice(1)}
        color={colors[role as keyof typeof colors] as any}
        size="small"
      />
    );
  };

  const getStatusBadge = (isActive: boolean) => {
    return (
      <Chip
        label={isActive ? "Active" : "Inactive"}
        color={isActive ? "success" : "default"}
        size="small"
      />
    );
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Users
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Manage users across your platform
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            User Management
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Search, filter, and manage all users
          </Typography>

          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search by name, email, or username..."
                value={filters.search}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    search: e.target.value,
                    page: 1,
                  }))
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                select
                fullWidth
                label="Role"
                value={filters.role}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    role: e.target.value === "all" ? "" : e.target.value,
                    page: 1,
                  }))
                }
              >
                <MenuItem value="all">All roles</MenuItem>
                <MenuItem value="graduate">Graduate</MenuItem>
                <MenuItem value="guest">Guest</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                select
                fullWidth
                label="Status"
                value={filters.status}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    status: e.target.value === "all" ? "" : e.target.value,
                    page: 1,
                  }))
                }
              >
                <MenuItem value="all">All statuses</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Campus</TableCell>
                  <TableCell>Joined</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                      <CircularProgress />
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Loading users...
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                      <Typography color="text.secondary">
                        No users found
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  Array.isArray(data) &&
                  data.map((user: User) => (
                    <TableRow key={user.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar
                            src={user.profilePicture}
                            alt={user.username}
                            sx={{ width: 40, height: 40 }}
                          >
                            {user.firstName[0]}{user.lastName[0]}
                          </Avatar>
                          <Box>
                            <Typography fontWeight={500}>
                              {user.firstName} {user.lastName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {user.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{getStatusBadge(user.isActive)}</TableCell>
                      <TableCell>
                        {user.campus?.name || "N/A"}
                      </TableCell>
                      <TableCell>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton
                            component={Link}
                            to={`/users/${user.id}`}
                            size="small"
                          >
                            <EyeIcon />
                          </IconButton>
                          {user.isActive ? (
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() =>
                                setDeactivateDialog({ open: true, user })
                              }
                            >
                              <UserXIcon />
                            </IconButton>
                          ) : (
                            <IconButton
                              size="small"
                              color="success"
                              onClick={() => handleActivate(user.id)}
                              disabled={activateUser.isPending}
                            >
                              <UserCheckIcon />
                            </IconButton>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Dialog
        open={deactivateDialog.open}
        onClose={() => setDeactivateDialog({ open: false, user: null })}
      >
        <DialogTitle>Deactivate User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to deactivate{" "}
            {deactivateDialog.user?.firstName} {deactivateDialog.user?.lastName}?
            This action can be reversed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeactivateDialog({ open: false, user: null })}>
            Cancel
          </Button>
          <Button
            onClick={() => handleDeactivate(deactivateDialog.user!.id)}
            disabled={deactivateUser.isPending}
            color="error"
            variant="contained"
          >
            Deactivate
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}