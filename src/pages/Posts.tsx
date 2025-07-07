import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { usePosts, useSoftDeletePost } from "@/hooks/usePosts";
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
  Delete as Trash2Icon,
  Favorite as HeartIcon,
  Message as MessageSquareIcon,
  Share as ShareIcon,
} from '@mui/icons-material';
import { useState as useStateDialog } from "react";
import { useSnackbar } from "@/hooks/useSnackbar";

export default function Posts() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    type: "",
    userId: searchParams.get("userId") || "",
  });
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; postId: string | null }>({
    open: false,
    postId: null,
  });

  const { data, isLoading } = usePosts(filters);
  const softDeletePost = useSoftDeletePost();
  const { toast } = useSnackbar();

  const handleSoftDelete = async (postId: string) => {
    try {
      await softDeletePost.mutateAsync(postId);
      toast.success("Post deleted successfully");
      setDeleteDialog({ open: false, postId: null });
    } catch (error) {
      toast.error("Failed to delete post");
    }
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      lastword: "secondary",
      question: "primary",
    };
    return (
      <Chip
        label={type === "lastword" ? "Last Word" : "Question"}
        color={colors[type as keyof typeof colors] as any}
        size="small"
      />
    );
  };

  const truncateContent = (content: string, maxLength: number = 100) => {
    if (content?.length <= maxLength) return content;
    return content?.substring(0, maxLength) + "...";
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Posts
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Manage posts and content across the platform
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Post Management
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Search, filter, and moderate posts
          </Typography>

          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search by content..."
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
            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Post Type"
                value={filters.type}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    type: e.target.value === "all" ? "" : e.target.value,
                    page: 1,
                  }))
                }
              >
                <MenuItem value="all">All types</MenuItem>
                <MenuItem value="lastword">Last Word</MenuItem>
                <MenuItem value="question">Question</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Author</TableCell>
                  <TableCell>Content</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Engagement</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                      <CircularProgress />
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Loading posts...
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                      <Typography color="text.secondary">
                        No posts found
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  data?.map((post) => (
                    <TableRow key={post.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar
                            src={post.user.profilePicture}
                            alt={post.user.username}
                            sx={{ width: 40, height: 40 }}
                          >
                            {post.user.firstName[0]}{post.user.lastName[0]}
                          </Avatar>
                          <Box>
                            <Typography fontWeight={500}>
                              {post.user.firstName} {post.user.lastName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              @{post.user.username}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2">
                            {truncateContent(post.content)}
                          </Typography>
                          {post.question && (
                            <Typography variant="caption" color="text.secondary">
                              Q: {truncateContent(post.question.text, 50)}
                            </Typography>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>{getTypeBadge(post.type)}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <HeartIcon fontSize="small" color="action" />
                            <Typography variant="body2">{post.likesCount}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <MessageSquareIcon fontSize="small" color="action" />
                            <Typography variant="body2">{post.commentsCount}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <ShareIcon fontSize="small" color="action" />
                            <Typography variant="body2">{post.sharesCount}</Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {new Date(post.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() =>
                            setDeleteDialog({ open: true, postId: post.id })
                          }
                        >
                          <Trash2Icon />
                        </IconButton>
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
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, postId: null })}
      >
        <DialogTitle>Delete Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this post? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, postId: null })}>
            Cancel
          </Button>
          <Button
            onClick={() => handleSoftDelete(deleteDialog.postId!)}
            disabled={softDeletePost.isPending}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}