import { useAnalytics } from "@/hooks/useAnalytics";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  Users,
  MessageSquare,
  AlertTriangle,
  TrendingUp,
  Eye,
  Heart,
  Calendar,
  Activity,
} from "lucide-react";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
  "#84CC16",
];

export default function Analytics() {
  const { data: analytics, isLoading } = useAnalytics();

  if (isLoading) {
    return (
      <div className="h-full flex flex-col space-y-8 w-full">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="h-32">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-7 w-16 mb-1" />
                <Skeleton className="h-3 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="flex-1">
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-80 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Users",
      value: analytics?.totalUsers || 0,
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Total Posts",
      value: analytics?.totalPosts || 0,
      change: "+5%",
      icon: MessageSquare,
      color: "text-green-600",
    },
    {
      title: "Pending Reports",
      value: analytics?.pendingReports || 0,
      change: "-2%",
      icon: AlertTriangle,
      color: "text-orange-600",
    },
    {
      title: "Active Users",
      value: analytics?.activeUsers || 0,
      change: "+8%",
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ];

  const userTypeData = [
    {
      name: "Graduates",
      value: analytics?.totalGraduates || 0,
      color: "#3B82F6",
    },
    { name: "Guests", value: analytics?.totalGuests || 0, color: "#10B981" },
  ];

  // Mock data for additional analytics
  const engagementData = [
    { name: "Jan", likes: 1200, comments: 800, shares: 400 },
    { name: "Feb", likes: 1400, comments: 900, shares: 450 },
    { name: "Mar", likes: 1600, comments: 1100, shares: 500 },
    { name: "Apr", likes: 1800, comments: 1200, shares: 600 },
    { name: "May", likes: 2000, comments: 1400, shares: 700 },
    { name: "Jun", likes: 2200, comments: 1500, shares: 750 },
  ];

  const deviceData = [
    { name: "Mobile", value: 65, color: "#3B82F6" },
    { name: "Desktop", value: 25, color: "#10B981" },
    { name: "Tablet", value: 10, color: "#F59E0B" },
  ];

  const timeData = [
    { hour: "00:00", users: 120 },
    { hour: "04:00", users: 80 },
    { hour: "08:00", users: 300 },
    { hour: "12:00", users: 450 },
    { hour: "16:00", users: 380 },
    { hour: "20:00", users: 520 },
  ];

  return (
    <div className="h-full flex flex-col space-y-8 w-full">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Analytics
        </h2>
        <p className="text-muted-foreground text-lg">
          Comprehensive insights and platform analytics
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="h-32 hover:shadow-md transition-shadow"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {stat.value.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-600 font-medium">
                  {stat.change}
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs
        defaultValue="overview"
        className="flex-1 flex flex-col min-h-0 w-full"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>

        <TabsContent
          value="overview"
          className="flex-1 flex flex-col min-h-0 space-y-6"
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 min-h-96">
            <Card className="col-span-4 flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle className="text-foreground">User Growth</CardTitle>
                <CardDescription>
                  Monthly user registration trends
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analytics?.userGrowth || []}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="opacity-30"
                    />
                    <XAxis
                      dataKey="date"
                      tick={{ fill: "hsl(var(--muted-foreground))" }}
                    />
                    <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--popover))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        color: "hsl(var(--foreground))",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="users"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="col-span-3 flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle className="text-foreground">User Types</CardTitle>
                <CardDescription>Distribution of user types</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={userTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {userTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--popover))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        color: "hsl(var(--foreground))",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 min-h-96">
            <Card className="flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle className="text-foreground">Post Activity</CardTitle>
                <CardDescription>Daily post creation trends</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analytics?.postActivity || []}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="opacity-30"
                    />
                    <XAxis
                      dataKey="date"
                      tick={{ fill: "hsl(var(--muted-foreground))" }}
                    />
                    <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--popover))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        color: "hsl(var(--foreground))",
                      }}
                    />
                    <Bar dataKey="posts" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle className="text-foreground">Top Campuses</CardTitle>
                <CardDescription>Campuses with most users</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-4">
                  {analytics?.topCampuses?.map((campus, index) => (
                    <div
                      key={campus.name}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center space-x-3">
                        <Badge
                          variant="secondary"
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                        >
                          {index + 1}
                        </Badge>
                        <span className="font-medium text-foreground">
                          {campus.name}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground font-medium">
                        {campus.userCount} users
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent
          value="users"
          className="flex-1 flex flex-col min-h-0 space-y-6"
        >
          <div className="grid gap-6 md:grid-cols-2 min-h-96">
            <Card className="flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle className="text-foreground">
                  User Activity by Time
                </CardTitle>
                <CardDescription>Peak usage hours</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timeData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="opacity-30"
                    />
                    <XAxis
                      dataKey="hour"
                      tick={{ fill: "hsl(var(--muted-foreground))" }}
                    />
                    <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--popover))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        color: "hsl(var(--foreground))",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="users"
                      stroke="#8B5CF6"
                      strokeWidth={2}
                      dot={{ fill: "#8B5CF6" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle className="text-foreground">Device Usage</CardTitle>
                <CardDescription>User device preferences</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name} ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--popover))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        color: "hsl(var(--foreground))",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent
          value="content"
          className="flex-1 flex flex-col min-h-0 space-y-6"
        >
          <div className="grid gap-6 md:grid-cols-2 min-h-96">
            <Card className="flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle className="text-foreground">
                  Content Performance
                </CardTitle>
                <CardDescription>Post engagement metrics</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <Heart className="h-5 w-5 text-red-500" />
                      <span className="text-sm font-medium">
                        Average Likes per Post
                      </span>
                    </div>
                    <span className="font-bold text-lg text-foreground">
                      24.5
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-5 w-5 text-blue-500" />
                      <span className="text-sm font-medium">
                        Average Comments per Post
                      </span>
                    </div>
                    <span className="font-bold text-lg text-foreground">
                      8.2
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <Eye className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-medium">
                        Average Views per Post
                      </span>
                    </div>
                    <span className="font-bold text-lg text-foreground">
                      156.7
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle className="text-foreground">Content Types</CardTitle>
                <CardDescription>Distribution of post types</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-4 rounded-full bg-purple-500" />
                      <span className="text-sm font-medium">Last Words</span>
                    </div>
                    <span className="font-bold text-lg text-foreground">
                      68%
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-4 rounded-full bg-blue-500" />
                      <span className="text-sm font-medium">
                        Question Responses
                      </span>
                    </div>
                    <span className="font-bold text-lg text-foreground">
                      32%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent
          value="engagement"
          className="flex-1 flex flex-col min-h-0 space-y-6"
        >
          <Card className="flex-1 flex flex-col min-h-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-foreground">
                Engagement Trends
              </CardTitle>
              <CardDescription>
                Likes, comments, and shares over time
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                  />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--foreground))",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="likes"
                    stroke="#EF4444"
                    strokeWidth={2}
                    name="Likes"
                  />
                  <Line
                    type="monotone"
                    dataKey="comments"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    name="Comments"
                  />
                  <Line
                    type="monotone"
                    dataKey="shares"
                    stroke="#10B981"
                    strokeWidth={2}
                    name="Shares"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
