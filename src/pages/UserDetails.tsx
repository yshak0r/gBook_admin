import { useParams, Link, useNavigate } from "react-router-dom";
import { useUser, useDeactivateUser, useActivateUser } from "@/hooks/useUsers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
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
import {
  ArrowLeft,
  UserX,
  UserCheck,
  MessageSquare,
  Eye,
  Heart,
  Calendar,
  Mail,
  GraduationCap,
  Building,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";

export default function UserDetails() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { data: user, isLoading } = useUser(userId!);
  const deactivateUser = useDeactivateUser();
  const activateUser = useActivateUser();

  const handleDeactivate = async () => {
    if (!userId) return;
    try {
      await deactivateUser.mutateAsync(userId);
      toast.success("User deactivated successfully");
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

  if (isLoading) {
    return (
      <div className="h-full flex flex-col space-y-8 w-full">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3 flex-1">
          <Card className="md:col-span-2 h-96">
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
          <div className="space-y-6">
            <Card className="h-48">
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-32 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-full flex flex-col items-center justify-center space-y-4 w-full">
        <h2 className="text-2xl font-bold text-foreground">User not found</h2>
        <p className="text-muted-foreground">
          The user you're looking for doesn't exist.
        </p>
        <Button onClick={() => navigate("/users")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Users
        </Button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col space-y-8 w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/users")}
            className="hover:bg-accent"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-muted-foreground text-lg">@{user.username}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" asChild>
            <Link to={`/posts?userId=${user.id}`}>
              <MessageSquare className="mr-2 h-4 w-4" />
              View Posts
            </Link>
          </Button>
          {user.isActive ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <UserX className="mr-2 h-4 w-4" />
                  Deactivate
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Deactivate User</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to deactivate {user.firstName}{" "}
                    {user.lastName}? This action can be reversed.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeactivate}
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
              onClick={handleActivate}
              disabled={activateUser.isPending}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <UserCheck className="mr-2 h-4 w-4" />
              Activate
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 flex-1 min-h-0">
        <Card className="md:col-span-2 flex flex-col">
          <CardHeader className="pb-6">
            <CardTitle className="text-foreground">
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 space-y-6">
            <div className="flex items-start gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.profilePicture} alt={user.username} />
                <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                  {user.firstName[0]}
                  {user.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  {getRoleBadge(user.role)}
                  {getStatusBadge(user.isActive)}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    {user.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Joined {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>

            {user.bio && (
              <>
                <Separator />
                <div>
                  <h4 className="font-medium mb-3 text-foreground">Bio</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {user.bio}
                  </p>
                </div>
              </>
            )}

            <Separator />

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <h4 className="font-medium text-foreground">
                  Academic Information
                </h4>
                <div className="space-y-2 text-sm">
                  {user.campus && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{user.campus}</span>
                    </div>
                  )}
                  {user.college && (
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{user.college}</span>
                    </div>
                  )}
                  {user.department && (
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{user.department}</span>
                    </div>
                  )}
                  {user.graduationYear && (
                    <div className="text-muted-foreground">
                      Class of {user.graduationYear}
                    </div>
                  )}
                </div>
              </div>

              {user.socialLinks && user.socialLinks.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Social Links</h4>
                  <div className="space-y-2">
                    {user.socialLinks.map((link, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm"
                      >
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        <span className="capitalize text-foreground">
                          {link.platform}:
                        </span>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          @{link.username}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {user.stats && (
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-foreground">Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Posts</span>
                  </div>
                  <span className="font-bold text-foreground">
                    {user.stats.postsCount}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Likes Received</span>
                  </div>
                  <span className="font-bold text-foreground">
                    {user.stats.likesReceived}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      Comments Received
                    </span>
                  </div>
                  <span className="font-bold text-foreground">
                    {user.stats.commentsReceived}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Profile Views</span>
                  </div>
                  <span className="font-bold text-foreground">
                    {user.stats.profileViews}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-foreground">Account Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">User ID</span>
                  <span className="font-mono text-xs text-foreground">
                    {user.id}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Created</span>
                  <span className="text-foreground">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last Updated</span>
                  <span className="text-foreground">
                    {new Date(user.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
