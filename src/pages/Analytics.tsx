import { useAnalytics } from "@/hooks/useAnalytics";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Skeleton,
  Chip,
  Paper,
  Tabs,
  Tab,
} from '@mui/material';
import {
  People as UsersIcon,
  Message as MessageSquareIcon,
  Warning as AlertTriangleIcon,
  TrendingUp,
  Visibility as EyeIcon,
  Favorite as HeartIcon,
  CalendarToday as CalendarIcon,
  Activity as ActivityIcon,
} from '@mui/icons-material';
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
import { useState } from "react";

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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`analytics-tabpanel-${index}`}
      aria-labelledby={`analytics-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Analytics() {
  const { data: analytics, isLoading } = useAnalytics();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (isLoading) {
    return (
      <Box>
        <Box sx={{ mb: 4 }}>
          <Skeleton variant="text" width={200} height={40} />
          <Skeleton variant="text" width={400} height={24} />
        </Box>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {[...Array(4)].map((_, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Card>
                <CardContent>
                  <Skeleton variant="text" width={100} height={20} />
                  <Skeleton variant="text" width={80} height={32} />
                  <Skeleton variant="text" width={120} height={16} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Card>
          <CardContent>
            <Skeleton variant="text" width={150} height={24} />
            <Skeleton variant="rectangular" width="100%" height={400} />
          </CardContent>
        </Card>
      </Box>
    );
  }

  const stats = [
    {
      title: "Total Users",
      value: analytics?.totalUsers || 0,
      change: "+12%",
      icon: UsersIcon,
      color: "primary",
    },
    {
      title: "Total Posts",
      value: analytics?.totalPosts || 0,
      change: "+5%",
      icon: MessageSquareIcon,
      color: "success",
    },
    {
      title: "Pending Reports",
      value: analytics?.pendingReports || 0,
      change: "-2%",
      icon: AlertTriangleIcon,
      color: "warning",
    },
    {
      title: "Active Users",
      value: analytics?.activeUsers || 0,
      change: "+8%",
      icon: TrendingUp,
      color: "secondary",
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
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Analytics
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Comprehensive insights and platform analytics
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <Grid item xs={12} sm={6} md={3} key={stat.title}>
              <Card sx={{ height: '100%', transition: 'all 0.2s', '&:hover': { transform: 'translateY(-2px)' } }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" fontWeight={500}>
                      {stat.title}
                    </Typography>
                    <IconComponent color={stat.color as any} />
                  </Box>
                  <Typography variant="h4" fontWeight="bold" gutterBottom>
                    {stat.value.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <Typography component="span" color="success.main" fontWeight={600}>
                      {stat.change}
                    </Typography>{" "}
                    from last month
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Overview" />
            <Tab label="Users" />
            <Tab label="Content" />
            <Tab label="Engagement" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    User Growth
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Monthly user registration trends
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={analytics?.userGrowth || []}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="users"
                          stroke="#3B82F6"
                          fill="#3B82F6"
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    User Types
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Distribution of user types
                  </Typography>
                  <Box sx={{ height: 300 }}>
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
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Post Activity
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Daily post creation trends
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={analytics?.postActivity || []}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="posts" fill="#10B981" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Top Campuses
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Campuses with most users
                  </Typography>
                  <Box>
                    {analytics?.topCampuses?.map((campus, index) => (
                      <Paper
                        key={campus.name}
                        elevation={0}
                        sx={{
                          p: 2,
                          mb: 2,
                          backgroundColor: 'action.hover',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Chip
                            label={index + 1}
                            size="small"
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: '50%',
                              fontWeight: 600,
                            }}
                          />
                          <Typography fontWeight={500}>
                            {campus.name}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" fontWeight={500}>
                          {campus.userCount} users
                        </Typography>
                      </Paper>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    User Activity by Time
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Peak usage hours
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={timeData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="hour" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="users"
                          stroke="#8B5CF6"
                          strokeWidth={2}
                          dot={{ fill: "#8B5CF6" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Device Usage
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    User device preferences
                  </Typography>
                  <Box sx={{ height: 300 }}>
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
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Content Performance
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Post engagement metrics
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Paper elevation={0} sx={{ p: 2, backgroundColor: 'action.hover' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <HeartIcon fontSize="small" color="error" />
                          <Typography variant="body2" fontWeight={500}>Average Likes per Post</Typography>
                        </Box>
                        <Typography variant="h6" fontWeight="bold">24.5</Typography>
                      </Box>
                    </Paper>
                    <Paper elevation={0} sx={{ p: 2, backgroundColor: 'action.hover' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <MessageSquareIcon fontSize="small" color="primary" />
                          <Typography variant="body2" fontWeight={500}>Average Comments per Post</Typography>
                        </Box>
                        <Typography variant="h6" fontWeight="bold">8.2</Typography>
                      </Box>
                    </Paper>
                    <Paper elevation={0} sx={{ p: 2, backgroundColor: 'action.hover' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <EyeIcon fontSize="small" color="success" />
                          <Typography variant="body2" fontWeight={500}>Average Views per Post</Typography>
                        </Box>
                        <Typography variant="h6" fontWeight="bold">156.7</Typography>
                      </Box>
                    </Paper>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Content Types
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Distribution of post types
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Paper elevation={0} sx={{ p: 2, backgroundColor: 'action.hover' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box sx={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: '#8B5CF6' }} />
                          <Typography variant="body2" fontWeight={500}>Last Words</Typography>
                        </Box>
                        <Typography variant="h6" fontWeight="bold">68%</Typography>
                      </Box>
                    </Paper>
                    <Paper elevation={0} sx={{ p: 2, backgroundColor: 'action.hover' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box sx={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: '#3B82F6' }} />
                          <Typography variant="body2" fontWeight={500}>Question Responses</Typography>
                        </Box>
                        <Typography variant="h6" fontWeight="bold">32%</Typography>
                      </Box>
                    </Paper>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Engagement Trends
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Likes, comments, and shares over time
              </Typography>
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
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
              </Box>
            </CardContent>
          </Card>
        </TabPanel>
      </Card>
    </Box>
  );
}