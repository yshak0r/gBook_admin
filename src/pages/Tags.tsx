import { useState } from "react";
import {
  useTags,
  useCreateTag,
  useUpdateTag,
  useDeleteTag,
} from "@/hooks/useTags";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Search, Plus, Edit, Trash2, Hash } from "lucide-react";
import { toast } from "sonner";

const tagSchema = z.object({
  name: z.string().min(1, "Tag name is required"),
  category: z.string().optional(),
});

type TagForm = z.infer<typeof tagSchema>;

export default function Tags() {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    category: "",
    status: "",
  });
  const [editingTag, setEditingTag] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data, isLoading } = useTags(filters);
  const createTag = useCreateTag();
  const updateTag = useUpdateTag();
  const deleteTag = useDeleteTag();

  const form = useForm<TagForm>({
    resolver: zodResolver(tagSchema),
    defaultValues: { name: "", category: "" },
  });

  const handleCreate = async (data: TagForm) => {
    try {
      await createTag.mutateAsync(data);
      toast.success("Tag created successfully");
      form.reset();
      setIsDialogOpen(false);
    } catch (error) {
      toast.error("Failed to create tag");
    }
  };

  const handleUpdate = async (data: TagForm) => {
    if (!editingTag) return;

    try {
      await updateTag.mutateAsync({
        tagId: editingTag.id,
        ...data,
      });
      toast.success("Tag updated successfully");
      form.reset();
      setEditingTag(null);
      setIsDialogOpen(false);
    } catch (error) {
      toast.error("Failed to update tag");
    }
  };

  const handleDelete = async (tagId: string) => {
    try {
      await deleteTag.mutateAsync(tagId);
      toast.success("Tag deleted successfully");
    } catch (error) {
      toast.error("Failed to delete tag");
    }
  };

  const openCreateDialog = () => {
    setEditingTag(null);
    form.reset({ name: "", category: "" });
    setIsDialogOpen(true);
  };

  const openEditDialog = (tag: any) => {
    setEditingTag(tag);
    form.reset({
      name: tag.name,
      category: tag.category || "",
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="h-full flex flex-col space-y-8 w-full">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Tags
          </h2>
          <p className="text-muted-foreground text-lg">
            Manage tags for user profiles and content
          </p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Add Tag
        </Button>
      </div>

      <Card className="flex-1 flex flex-col min-h-0 w-full">
        <CardHeader className="pb-6">
          <CardTitle className="text-foreground">Tag Management</CardTitle>
          <CardDescription>Search, filter, and manage tags</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col min-h-0 space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor="search" className="text-sm font-medium">
                Search Tags
              </Label>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by tag name..."
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
              <Label htmlFor="category" className="text-sm font-medium">
                Category
              </Label>
              <Input
                id="category"
                placeholder="Filter by category"
                value={filters.category}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    category: e.target.value,
                    page: 1,
                  }))
                }
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="status" className="text-sm font-medium">
                Status
              </Label>
              <Select
                value={filters.status}
                onValueChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    status: value === "all" ? "" : value,
                    page: 1,
                  }))
                }
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex-1 min-h-0 rounded-md border w-full">
            <div className="h-full overflow-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-muted/50">
                  <TableRow>
                    <TableHead className="w-80">Tag</TableHead>
                    <TableHead className="w-32">Category</TableHead>
                    <TableHead className="w-32">Usage Count</TableHead>
                    <TableHead className="w-32">Status</TableHead>
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
                          <span className="ml-2">Loading tags...</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : data?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-12">
                        <div className="text-muted-foreground">
                          No tags found
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    data?.map((tag) => (
                      <TableRow key={tag.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Hash className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium text-foreground">
                              {tag.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {tag.category ? (
                            <Badge variant="outline">{tag.category}</Badge>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                          >
                            {tag.usageCount} uses
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={tag.isActive ? "default" : "secondary"}
                            className={
                              tag.isActive
                                ? "bg-green-600 text-white dark:bg-green-700"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                            }
                          >
                            {tag.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-foreground">
                          {new Date(tag.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEditDialog(tag)}
                              className="hover:bg-accent"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
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
                                  <AlertDialogTitle>
                                    Delete Tag
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete the tag "
                                    {tag.name}"? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(tag.id)}
                                    disabled={deleteTag.isPending}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
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
                total tags)
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-full max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingTag ? "Edit Tag" : "Create New Tag"}
            </DialogTitle>
            <DialogDescription>
              {editingTag
                ? "Update the tag details below."
                : "Add a new tag to the platform."}
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={form.handleSubmit(
              editingTag ? handleUpdate : handleCreate
            )}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="tag-name">Tag Name</Label>
              <Input
                id="tag-name"
                {...form.register("name")}
                placeholder="Enter the tag name"
                className="mt-2"
              />
              {form.formState.errors.name && (
                <p className="text-sm text-destructive mt-1">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="tag-category">Category (Optional)</Label>
              <Input
                id="tag-category"
                {...form.register("category")}
                placeholder="Enter category (e.g., personality, behavior)"
                className="mt-2"
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={
                  editingTag ? updateTag.isPending : createTag.isPending
                }
              >
                {editingTag
                  ? updateTag.isPending
                    ? "Updating..."
                    : "Update Tag"
                  : createTag.isPending
                  ? "Creating..."
                  : "Create Tag"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
