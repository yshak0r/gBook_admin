import { useState } from "react";
import {
  useQuestions,
  useCreateQuestion,
  useUpdateQuestion,
  useDeleteQuestion,
} from "@/hooks/useQuestions";
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
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

const questionSchema = z.object({
  text: z.string().min(1, "Question text is required"),
  type: z.enum(["lastword", "profile", "post"]),
  category: z.string().optional(),
});

type QuestionForm = z.infer<typeof questionSchema>;

export default function Questions() {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    type: "",
    category: "",
  });
  const [editingQuestion, setEditingQuestion] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data, isLoading } = useQuestions(filters);
  const createQuestion = useCreateQuestion();
  const updateQuestion = useUpdateQuestion();
  const deleteQuestion = useDeleteQuestion();

  const form = useForm<QuestionForm>({
    resolver: zodResolver(questionSchema),
    defaultValues: { text: "", type: "lastword", category: "" },
  });

  const handleCreate = async (data: QuestionForm) => {
    try {
      await createQuestion.mutateAsync(data);
      toast.success("Question created successfully");
      form.reset();
      setIsDialogOpen(false);
    } catch (error) {
      toast.error("Failed to create question");
    }
  };

  const handleUpdate = async (data: QuestionForm) => {
    if (!editingQuestion) return;

    try {
      await updateQuestion.mutateAsync({
        questionId: editingQuestion.id,
        ...data,
      });
      toast.success("Question updated successfully");
      form.reset();
      setEditingQuestion(null);
      setIsDialogOpen(false);
    } catch (error) {
      toast.error("Failed to update question");
    }
  };

  const handleDelete = async (questionId: string) => {
    try {
      await deleteQuestion.mutateAsync(questionId);
      toast.success("Question deleted successfully");
    } catch (error) {
      toast.error("Failed to delete question");
    }
  };

  const openCreateDialog = () => {
    setEditingQuestion(null);
    form.reset({ text: "", type: "lastword", category: "" });
    setIsDialogOpen(true);
  };

  const openEditDialog = (question: any) => {
    setEditingQuestion(question);
    form.reset({
      text: question.text,
      type: question.type,
      category: question.category || "",
    });
    setIsDialogOpen(true);
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      lastword:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
      profile:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      post: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    };

    const labels = {
      lastword: "Last Word",
      profile: "Profile",
      post: "Post",
    };

    return (
      <Badge
        variant="secondary"
        className={colors[type as keyof typeof colors]}
      >
        {labels[type as keyof typeof labels] || type}
      </Badge>
    );
  };

  return (
    <div className="h-full flex flex-col space-y-8 w-full">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Manage questions for user profiles and posts
          </p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Add Question
        </Button>
      </div>

      <Card className="flex-1 flex flex-col min-h-0 w-full">
        <CardHeader className="pb-6">
          <CardTitle className="text-foreground">Question Management</CardTitle>
          <CardDescription>
            Search, filter, and manage questions
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col min-h-0 space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor="search" className="text-sm font-medium">
                Search Questions
              </Label>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by question text..."
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
                Type
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
                  <SelectItem value="profile">Profile</SelectItem>
                  <SelectItem value="post">Post</SelectItem>
                </SelectContent>
              </Select>
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
          </div>

          <div className="flex-1 min-h-0 rounded-md border w-full">
            <div className="h-full overflow-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-muted/50">
                  <TableRow>
                    <TableHead className="w-96">Question</TableHead>
                    <TableHead className="w-32">Type</TableHead>
                    <TableHead className="w-32">Category</TableHead>
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
                          <span className="ml-2">Loading questions...</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : data?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-12">
                        <div className="text-muted-foreground">
                          No questions found
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    data?.map((question) => (
                      <TableRow key={question.id} className="hover:bg-muted/50">
                        <TableCell>
                          <p className="text-sm text-foreground">
                            {question.text}
                          </p>
                        </TableCell>
                        <TableCell>{getTypeBadge(question.type)}</TableCell>
                        <TableCell>
                          {question.category ? (
                            <Badge variant="outline">{question.category}</Badge>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              question.isActive ? "default" : "secondary"
                            }
                            className={
                              question.isActive
                                ? "bg-green-600 text-white dark:bg-green-700"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                            }
                          >
                            {question.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-foreground">
                          {new Date(question.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEditDialog(question)}
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
                                    Delete Question
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete this
                                    question? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(question.id)}
                                    disabled={deleteQuestion.isPending}
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
                total questions)
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
              {editingQuestion ? "Edit Question" : "Create New Question"}
            </DialogTitle>
            <DialogDescription>
              {editingQuestion
                ? "Update the question details below."
                : "Add a new question to the platform."}
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={form.handleSubmit(
              editingQuestion ? handleUpdate : handleCreate
            )}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="question-text">Question Text</Label>
              <Input
                id="question-text"
                {...form.register("text")}
                placeholder="Enter the question text"
                className="mt-2"
              />
              {form.formState.errors.text && (
                <p className="text-sm text-destructive mt-1">
                  {form.formState.errors.text.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="question-type">Type</Label>
              <Select
                onValueChange={(value) => form.setValue("type", value as any)}
                value={form.watch("type")}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select question type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lastword">Last Word</SelectItem>
                  <SelectItem value="profile">Profile</SelectItem>
                  <SelectItem value="post">Post</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.type && (
                <p className="text-sm text-destructive mt-1">
                  {form.formState.errors.type.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="question-category">Category (Optional)</Label>
              <Input
                id="question-category"
                {...form.register("category")}
                placeholder="Enter category (e.g., personal, academic)"
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
                  editingQuestion
                    ? updateQuestion.isPending
                    : createQuestion.isPending
                }
              >
                {editingQuestion
                  ? updateQuestion.isPending
                    ? "Updating..."
                    : "Update Question"
                  : createQuestion.isPending
                  ? "Creating..."
                  : "Create Question"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
