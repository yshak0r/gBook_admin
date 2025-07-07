import { useState } from "react";
import { useReports, useReviewReport } from "@/hooks/useReports";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye } from "lucide-react";
import { toast } from "sonner";

const reviewSchema = z.object({
  status: z.enum(["reviewed", "resolved", "dismissed"]),
  reviewNotes: z.string().optional(),
});

type ReviewForm = z.infer<typeof reviewSchema>;

export default function Reports() {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    status: "",
    type: "",
  });
  const [selectedReport, setSelectedReport] = useState<any>(null);

  const { data, isLoading } = useReports(filters);
  const reviewReport = useReviewReport();

  const reviewForm = useForm<ReviewForm>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { status: "reviewed", reviewNotes: "" },
  });

  const handleReview = async (data: ReviewForm) => {
    if (!selectedReport) return;

    try {
      await reviewReport.mutateAsync({
        reportId: selectedReport.id,
        ...data,
      });
      toast.success("Report reviewed successfully");
      setSelectedReport(null);
      reviewForm.reset();
    } catch (error) {
      toast.error("Failed to review report");
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      pending:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
      reviewed:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      resolved:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      dismissed:
        "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
    };
    return (
      <Badge
        variant="secondary"
        className={colors[status as keyof typeof colors]}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      inappropriate_content:
        "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
      harassment:
        "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
      fake_profile:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
      spam: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400",
      other: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
    };

    const labels = {
      inappropriate_content: "Inappropriate Content",
      harassment: "Harassment",
      fake_profile: "Fake Profile",
      spam: "Spam",
      other: "Other",
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
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Reports
        </h2>
        <p className="text-muted-foreground text-lg">
          Review and manage user reports
        </p>
      </div>

      <Card className="flex-1 flex flex-col min-h-0 w-full">
        <CardHeader className="pb-6">
          <CardTitle className="text-foreground">Report Management</CardTitle>
          <CardDescription>Filter and review user reports</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col min-h-0 space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="dismissed">Dismissed</SelectItem>
                </SelectContent>
              </Select>
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
                  <SelectItem value="inappropriate_content">
                    Inappropriate Content
                  </SelectItem>
                  <SelectItem value="harassment">Harassment</SelectItem>
                  <SelectItem value="fake_profile">Fake Profile</SelectItem>
                  <SelectItem value="spam">Spam</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex-1 min-h-0 rounded-md border w-full">
            <div className="h-full overflow-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-muted/50">
                  <TableRow>
                    <TableHead className="w-80">Reporter</TableHead>
                    <TableHead className="w-80">Reported User</TableHead>
                    <TableHead className="w-48">Type</TableHead>
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
                          <span className="ml-2">Loading reports...</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : data?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-12">
                        <div className="text-muted-foreground">
                          No reports found
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    data?.map((report) => (
                      <TableRow key={report.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={report.reporter.profilePicture}
                                alt={report.reporter.username}
                              />
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                {report.reporter.firstName[0]}
                                {report.reporter.lastName[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-foreground">
                                {report.reporter.firstName}{" "}
                                {report.reporter.lastName}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                @{report.reporter.username}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={report.reportedUser.profilePicture}
                                alt={report.reportedUser.username}
                              />
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                {report.reportedUser.firstName[0]}
                                {report.reportedUser.lastName[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-foreground">
                                {report.reportedUser.firstName}{" "}
                                {report.reportedUser.lastName}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                @{report.reportedUser.username}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getTypeBadge(report.type)}</TableCell>
                        <TableCell>{getStatusBadge(report.status)}</TableCell>
                        <TableCell className="text-foreground">
                          {new Date(report.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedReport(report)}
                                className="hover:bg-accent"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl w-full">
                              <DialogHeader>
                                <DialogTitle>Report Details</DialogTitle>
                                <DialogDescription>
                                  Review and take action on this report
                                </DialogDescription>
                              </DialogHeader>

                              {selectedReport && (
                                <div className="space-y-6">
                                  <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                      <h4 className="font-medium mb-2">
                                        Reporter
                                      </h4>
                                      <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10">
                                          <AvatarImage
                                            src={
                                              selectedReport.reporter
                                                .profilePicture
                                            }
                                          />
                                          <AvatarFallback className="bg-primary text-primary-foreground">
                                            {
                                              selectedReport.reporter
                                                .firstName[0]
                                            }
                                            {
                                              selectedReport.reporter
                                                .lastName[0]
                                            }
                                          </AvatarFallback>
                                        </Avatar>
                                        <div>
                                          <div className="font-medium text-foreground">
                                            {selectedReport.reporter.firstName}{" "}
                                            {selectedReport.reporter.lastName}
                                          </div>
                                          <div className="text-sm text-muted-foreground">
                                            @{selectedReport.reporter.username}
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div>
                                      <h4 className="font-medium mb-2">
                                        Reported User
                                      </h4>
                                      <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10">
                                          <AvatarImage
                                            src={
                                              selectedReport.reportedUser
                                                .profilePicture
                                            }
                                          />
                                          <AvatarFallback className="bg-primary text-primary-foreground">
                                            {
                                              selectedReport.reportedUser
                                                .firstName[0]
                                            }
                                            {
                                              selectedReport.reportedUser
                                                .lastName[0]
                                            }
                                          </AvatarFallback>
                                        </Avatar>
                                        <div>
                                          <div className="font-medium text-foreground">
                                            {
                                              selectedReport.reportedUser
                                                .firstName
                                            }{" "}
                                            {
                                              selectedReport.reportedUser
                                                .lastName
                                            }
                                          </div>
                                          <div className="text-sm text-muted-foreground">
                                            @
                                            {
                                              selectedReport.reportedUser
                                                .username
                                            }
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="space-y-4">
                                    <div>
                                      <h4 className="font-medium mb-2">
                                        Report Information
                                      </h4>
                                      <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                          <span className="text-sm font-medium">
                                            Type:
                                          </span>
                                          {getTypeBadge(selectedReport.type)}
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <span className="text-sm font-medium">
                                            Status:
                                          </span>
                                          {getStatusBadge(
                                            selectedReport.status
                                          )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <span className="text-sm font-medium">
                                            Reason:
                                          </span>
                                          <span className="text-sm text-foreground">
                                            {selectedReport.reason}
                                          </span>
                                        </div>
                                        {selectedReport.description && (
                                          <div>
                                            <span className="text-sm font-medium">
                                              Description:
                                            </span>
                                            <p className="text-sm text-muted-foreground mt-1">
                                              {selectedReport.description}
                                            </p>
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    {selectedReport.status !== "pending" && (
                                      <div>
                                        <h4 className="font-medium mb-2">
                                          Review Information
                                        </h4>
                                        <div className="space-y-2">
                                          <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium">
                                              Reviewed:
                                            </span>
                                            <span className="text-sm text-foreground">
                                              {new Date(
                                                selectedReport.reviewedAt
                                              ).toLocaleDateString()}
                                            </span>
                                          </div>
                                          {selectedReport.reviewNotes && (
                                            <div>
                                              <span className="text-sm font-medium">
                                                Notes:
                                              </span>
                                              <p className="text-sm text-muted-foreground mt-1">
                                                {selectedReport.reviewNotes}
                                              </p>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    )}

                                    {selectedReport.status === "pending" && (
                                      <form
                                        onSubmit={reviewForm.handleSubmit(
                                          handleReview
                                        )}
                                        className="space-y-4"
                                      >
                                        <div>
                                          <Label htmlFor="review-status">
                                            Action
                                          </Label>
                                          <Select
                                            onValueChange={(value) =>
                                              reviewForm.setValue(
                                                "status",
                                                value as any
                                              )
                                            }
                                            value={reviewForm.watch("status")}
                                          >
                                            <SelectTrigger className="mt-2">
                                              <SelectValue placeholder="Select action" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="reviewed">
                                                Mark as Reviewed
                                              </SelectItem>
                                              <SelectItem value="resolved">
                                                Resolve Report
                                              </SelectItem>
                                              <SelectItem value="dismissed">
                                                Dismiss Report
                                              </SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>

                                        <div>
                                          <Label htmlFor="review-notes">
                                            Review Notes (Optional)
                                          </Label>
                                          <Textarea
                                            id="review-notes"
                                            {...reviewForm.register(
                                              "reviewNotes"
                                            )}
                                            placeholder="Add any notes about your review..."
                                            className="mt-2"
                                          />
                                        </div>

                                        <DialogFooter>
                                          <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() =>
                                              setSelectedReport(null)
                                            }
                                          >
                                            Cancel
                                          </Button>
                                          <Button
                                            type="submit"
                                            disabled={reviewReport.isPending}
                                          >
                                            {reviewReport.isPending
                                              ? "Submitting..."
                                              : "Submit Review"}
                                          </Button>
                                        </DialogFooter>
                                      </form>
                                    )}
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
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
                total reports)
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
