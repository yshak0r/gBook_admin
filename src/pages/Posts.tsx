import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { usePosts, useSoftDeletePost } from "@/hooks/usePosts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Search, Trash2, Heart, MessageSquare, Share } from "lucide-react";
import { toast } from "sonner";

export default function Posts() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    type: "",
    userId: searchParams.get("userId") || "",
  });

  const { data, isLoading } = usePosts(filters);
  const softDeletePost = useSoftDeletePost();

  const handleSoftDelete = async (postId: string) => {
    try {
      await softDeletePost.mutateAsync(postId);
      toast.success("Post deleted successfully");
    } catch (error) {
      toast.error("Failed to delete post");
    }
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      lastword:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
      question:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    };
    return (
      <Badge
        variant="secondary"
        className={colors[type as keyof typeof colors]}
      >
        {type === "lastword" ? "Last Word" : "Question"}
      </Badge>
    );
  };

  const truncateContent = (content: string, maxLength: number = 100) => {
    if (content?.length <= maxLength) return content;
    return content?.substring(0, maxLength) + "...";
  };

  return (
    <div className="h-full flex flex-col space-y-8 w-full">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Posts
        </h2>
        <p className="text-muted-foreground text-lg">
          Manage posts and content across the platform
        </p>
      </div>

      <Card className="flex-1 flex flex-col min-h-0 w-full">
        <CardHeader className="pb-6">
          <CardTitle className="text-foreground">Post Management</CardTitle>
          <CardDescription>Search, filter, and moderate posts</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col min-h-0 space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="search" className="text-sm font-medium">
                Search Posts
              </Label>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by content..."
                  value={filters.search}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      search: e.target.value,
                      page: 1,
                    }))
                  }
                  className="pl-9"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="type" className="text-sm font-medium">
                Post Type
              </Label>
              <Select
                value={filters.type}
                onValueChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    type: value === "all" ? "" : value,
                    page: 1,
                  }))
                }
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All types</SelectItem>
                  <SelectItem value="lastword">Last Word</SelectItem>
                  <SelectItem value="question">Question</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex-1 min-h-0 rounded-md border w-full">
            <div className="h-full overflow-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-muted/50">
                  <TableRow>
                    <TableHead className="w-80">Author</TableHead>
                    <TableHead className="w-96">Content</TableHead>
                    <TableHead className="w-32">Type</TableHead>
                    <TableHead className="w-40">Engagement</TableHead>
                    <TableHead className="w-32">Created</TableHead>
                    <TableHead className="w-24">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-12">
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                          <span className="ml-2">Loading posts...</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : data.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-12">
                        <div className="text-muted-foreground">
                          No posts found
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    data?.map((post) => (
                      <TableRow key={post.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={post.user.profilePicture}
                                alt={post.user.username}
                              />
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                {post.user.firstName[0]}
                                {post.user.lastName[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-foreground">
                                {post.user.firstName} {post.user.lastName}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                @{post.user.username}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="text-sm text-foreground">
                              {truncateContent(post.content)}
                            </p>
                            {post.question && (
                              <p className="text-xs text-muted-foreground">
                                Q: {truncateContent(post.question.text, 50)}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{getTypeBadge(post.type)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Heart className="h-3 w-3" />
                              {post.likesCount}
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" />
                              {post.commentsCount}
                            </div>
                            <div className="flex items-center gap-1">
                              <Share className="h-3 w-3" />
                              {post.sharesCount}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-foreground">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="hover:bg-destructive/10 hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Post</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this post?
                                  This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleSoftDelete(post.id)}
                                  disabled={softDeletePost.isPending}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {data?.pagination && (
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="text-sm text-muted-foreground">
                Showing {data.pagination.currentPage} of{" "}
                {data.pagination.totalPages} pages ({data.pagination.totalItems}{" "}
                total posts)
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setFilters((prev) => ({ ...prev, page: prev.page - 1 }))
                  }
                  disabled={data.pagination.currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setFilters((prev) => ({ ...prev, page: prev.page + 1 }))
                  }
                  disabled={
                    data.pagination.currentPage === data.pagination.totalPages
                  }
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
