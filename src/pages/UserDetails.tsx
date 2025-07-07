import { useParams, Link, useNavigate } from "react-router-dom";
import { useUser, useDeactivateUser, useActivateUser } from "@/hooks/useUsers";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Chip,
  Grid,
  Paper,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  IconButton,
} from '@mui/material';
import {
  ArrowBack as ArrowLeftIcon,
  PersonOff as UserXIcon,
  PersonAdd as UserCheckIcon,
  Message as MessageSquareIcon,
  Visibility as EyeIcon,
  Favorite as HeartIcon,
  CalendarToday as CalendarIcon,
  Email as MailIcon,
  School as GraduationCapIcon,
  Business as BuildingIcon,
  LocationOn as MapPinIcon,
  Launch as ExternalLinkIcon,
} from '@mui/icons-material';
import { useState } from "react";
import { useSnackbar } from "@/hooks/useSnackbar";

export default function UserDetails() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { data: user, isLoading } = useUser(userId!);
  const deactivateUser = useDeactivateUser();
  const activateUser = useActivateUser();
  const { toast } = useSnackbar();
  const [deactivateDialog, setDeactivateDialog] = useState(false);

  const handleDeactivate = async () => {
    if (!userId) return;
    try {
      await deactivateUser.mutateAsync(userId);
      toast.success("User deactivated successfully");
      setDeactivateDialog(false);
    } catch (error) {
      toast.error("Failed to deactivate user");
    }
  };

  const handleActivate = async () => {
    if (!userId) return;
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
      />
    );
  };

  const getStatusBadge = (isActive: boolean) => {
    return (
      <Chip
        label={isActive ? "Active" : "Inactive"}
        color={isActive ? "success" : "default"}
      />
    );
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          User not found
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          The user you're looking for doesn't exist.
        </Typography>
        <Button
          variant="contained"
          startIcon={<ArrowLeftIcon />}
          onClick={() => navigate("/users")}
        >
          Back to Users
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={() => navigate("/users")}>
            <ArrowLeftIcon />
          </IconButton>
          <Box>
            <Typography variant="h3" fontWeight="bold">
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              @{user.username}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<MessageSquareIcon />}
            component={Link}
            to={`/posts?userId=${user.id}`}
          >
            View Posts
          </Button>
          {user.isActive ? (
            <Button
              variant="contained"
              color="error"
              startIcon={<UserXIcon />}
              onClick={() => setDeactivateDialog(true)}
            >
              Deactivate
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              startIcon={<UserCheckIcon />}
              onClick={handleActivate}
              disabled={activateUser.isPending}
            >
              Activate
            </Button>
          )}
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Profile Information
              </Typography>

              <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
                <Avatar
                  src={user.profilePicture}
                  alt={user.username}
                  sx={{ width: 96, height: 96 }}
                >
                  {user.firstName[0]}{user.lastName[0]}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    {getRoleBadge(user.role)}
                    {getStatusBadge(user.isActive)}
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <MailIcon fontSize="small" color="action" />
                    <Typography variant="body2">{user.email}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarIcon fontSize="small" color="action" />
                    <Typography variant="body2">
                      Joined {new Date(user.createdAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {user.bio && (
                <>
                  <Divider sx={{ my: 3 }} />
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      Bio
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user.bio}
                    </Typography>
                  </Box>
                </>
              )}

              <Divider sx={{ my: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    Academic Information
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {user.campus && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <MapPinIcon fontSize="small" color="action" />
                        <Typography variant="body2">{user.campus}</Typography>
                      </Box>
                    )}
                    {user.college && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <BuildingIcon fontSize="small" color="action" />
                        <Typography variant="body2">{user.college}</Typography>
                      </Box>
                    )}
                    {user.department && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <GraduationCapIcon fontSize="small" color="action" />
                        <Typography variant="body2">{user.department}</Typography>
                      </Box>
                    )}
                    {user.graduationYear && (
                      <Typography variant="body2" color="text.secondary">
                        Class of {user.graduationYear}
                      </Typography>
                    )}
                  </Box>
                </Grid>

                {user.socialLinks && user.socialLinks.length > 0 && (
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      Social Links
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {user.socialLinks.map((link, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <ExternalLinkIcon fontSize="small" color="action" />
                          <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                            {link.platform}:
                          </Typography>
                          <Typography
                            variant="body2"
                            component="a"
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                          >
                            @{link.username}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {user.stats && (
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Statistics
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Paper elevation={0} sx={{ p: 2, backgroundColor: 'action.hover' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <MessageSquareIcon fontSize="small" color="action" />
                          <Typography variant="body2" fontWeight={500}>Posts</Typography>
                        </Box>
                        <Typography variant="h6" fontWeight="bold">
                          {user.stats.postsCount}
                        </Typography>
                      </Box>
                    </Paper>
                    <Paper elevation={0} sx={{ p: 2, backgroundColor: 'action.hover' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <HeartIcon fontSize="small" color="action" />
                          <Typography variant="body2" fontWeight={500}>Likes Received</Typography>
                        </Box>
                        <Typography variant="h6" fontWeight="bold">
                          {user.stats.likesReceived}
                        </Typography>
                      </Box>
                    </Paper>
                    <Paper elevation={0} sx={{ p: 2, backgroundColor: 'action.hover' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <MessageSquareIcon fontSize="small" color="action" />
                          <Typography variant="body2" fontWeight={500}>Comments Received</Typography>
                        </Box>
                        <Typography variant="h6" fontWeight="bold">
                          {user.stats.commentsReceived}
                        </Typography>
                      </Box>
                    </Paper>
                    <Paper elevation={0} sx={{ p: 2, backgroundColor: 'action.hover' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <EyeIcon fontSize="small" color="action" />
                          <Typography variant="body2" fontWeight={500}>Profile Views</Typography>
                        </Box>
                        <Typography variant="h6" fontWeight="bold">
                          {user.stats.profileViews}
                        </Typography>
                      </Box>
                    </Paper>
                  </Box>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Account Details
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">User ID</Typography>
                    <Typography variant="body2" fontFamily="monospace" fontSize="0.75rem">
                      {user.id}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">Created</Typography>
                    <Typography variant="body2">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">Last Updated</Typography>
                    <Typography variant="body2">
                      {new Date(user.updatedAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>

      <Dialog open={deactivateDialog} onClose={() => setDeactivateDialog(false)}>
        <DialogTitle>Deactivate User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to deactivate {user.firstName} {user.lastName}?
            This action can be reversed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeactivateDialog(false)}>Cancel</Button>
          <Button
            onClick={handleDeactivate}
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