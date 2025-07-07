import { useState } from "react";
import { Link } from "react-router-dom";
import { useUsers, useDeactivateUser, useActivateUser } from "@/hooks/useUsers";
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
import { Search, Eye, UserX, UserCheck } from "lucide-react";
import { toast } from "sonner";
import { User } from "@/types";

export default function Users() {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    role: "",
    status: "",
  });

  const { data, isLoading } = useUsers(filters);
  const deactivateUser = useDeactivateUser();
  const activateUser = useActivateUser();

  const handleDeactivate = async (userId: string) => {
    try {
      await deactivateUser.mutateAsync(userId);
      toast.success("User deactivated successfully");
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
      graduate:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      guest: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      admin:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
    };
    return (
      <Badge
        variant="secondary"
        className={colors[role as keyof typeof colors]}
      >
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </Badge>
    );
  };

  const getStatusBadge = (isActive: boolean) => {
    return (
      <Badge
        variant={isActive ? "default" : "secondary"}
        className={
          isActive
            ? "bg-green-600 text-white dark:bg-green-700"
            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
        }
      >
        {isActive ? "Active" : "Inactive"}
      </Badge>
    );
  };

  return (
    <div className="h-full flex flex-col space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Users
        </h2>
        <p className="text-muted-foreground text-lg">
          Manage users across your platform
        </p>
      </div>

      <Card className="flex-1 flex flex-col min-h-0">
        <CardHeader className="pb-6">
          <CardTitle className="text-foreground">User Management</CardTitle>
          <CardDescription>
            Search, filter, and manage all users
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col min-h-0 space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-1">
              <Label htmlFor="search" className="text-sm font-medium">
                Search Users
              </Label>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by name, email, or username..."
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
              <Label htmlFor="role" className="text-sm font-medium">
                Role
              </Label>
              <Select
                value={filters.role}
                onValueChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    role: value === "all" ? "" : value,
                    page: 1,
                  }))
                }
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="All roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All roles</SelectItem>
                  <SelectItem value="graduate">Graduate</SelectItem>
                  <SelectItem value="guest">Guest</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
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

          <div className="flex-1 min-h-0 rounded-md border">
            <div className="h-full overflow-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-muted/50">
                  <TableRow>
                    <TableHead className="w-80">User</TableHead>
                    <TableHead className="w-32">Role</TableHead>
                    <TableHead className="w-32">Status</TableHead>
                    <TableHead className="w-48">Campus</TableHead>
                    <TableHead className="w-32">Joined</TableHead>
                    <TableHead className="w-32">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-12">
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                          <span className="ml-2">Loading users...</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : data.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-12">
                        <div className="text-muted-foreground">
                          No users found
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    Array.isArray(data) &&
                    data.map((user: User) => (
                      <TableRow key={user.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={user.profilePicture}
                                alt={user.username}
                              />

                              <AvatarFallback className="bg-primary text-primary-foreground">
                                {user.firstName[0]}

                                {user.lastName[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-foreground">
                                {user.firstName} {user.lastName}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getRoleBadge(user.role)}</TableCell>
                        <TableCell>{getStatusBadge(user.isActive)}</TableCell>
                        <TableCell className="text-foreground">
                          {user.campus.name || "N/A"}
                        </TableCell>
                        <TableCell className="text-foreground">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              asChild
                              className="hover:bg-accent"
                            >
                              <Link to={`/users/${user.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            {user.isActive ? (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="hover:bg-destructive/10 hover:text-destructive"
                                  >
                                    <UserX className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Deactivate User
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to deactivate{" "}
                                      {user.firstName} {user.lastName}? This
                                      action can be reversed.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDeactivate(user.id)}
                                      disabled={deactivateUser.isPending}
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      Deactivate
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleActivate(user.id)}
                                disabled={activateUser.isPending}
                                className="hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-900/30 dark:hover:text-green-400"
                              >
                                <UserCheck className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* {data?.pagination && (
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="text-sm text-muted-foreground">
                Showing {data.pagination.currentPage} of{" "}
                {data.pagination.totalPages} pages ({data.pagination.totalItems}{" "}
                total users)
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
          )} */}
        </CardContent>
      </Card>
    </div>
  );
}
