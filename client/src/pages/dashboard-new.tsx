import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";
import { 
  Calculator, 
  LogOut, 
  User, 
  Settings, 
  Bell, 
  Search,
  DollarSign,
  Video,
  Bot,
  GraduationCap,
  UserCheck,
  ChevronRight,
  TrendingUp,
  Target,
  Activity
} from "lucide-react";
import navLogoPath from "@assets/Nav Logo_1753431362883.png";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const { user, logoutMutation } = useAuth();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  // Mock weather data
  const weather = { temp: 72, condition: 'sunny', location: 'Marina Del Rey, CA' };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#253e31] to-[#75c29a] animate-in fade-in duration-1000">
      {/* Transparent Header */}
      <header className="bg-transparent z-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <img src={navLogoPath} alt="Seed Financial" className="h-8" />
              </div>
            </Link>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="relative p-2 hover:bg-white/10 text-white">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-orange-500 rounded-full"></span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2 p-2 hover:bg-white/10 text-white">
                    <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                      {user?.email?.charAt(0).toUpperCase()}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  <div className="px-3 py-2 border-b">
                    <p className="font-medium text-gray-900 text-sm">{user?.email?.split('@')[0]}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <DropdownMenuItem className="text-sm">
                    <User className="mr-2 h-3 w-3" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-sm">
                    <Settings className="mr-2 h-3 w-3" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 text-sm">
                    <LogOut className="mr-2 h-3 w-3" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-light text-white mb-2">
            {getGreeting()}, {user?.email?.split('@')[0]}
          </h1>
          <p className="text-white/70 text-sm">{weather.temp}°F and {weather.condition} in {weather.location}</p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-sm hover:shadow-md transition-all">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-2xl font-light text-gray-900 mb-1">$127.3K</p>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Pipeline Value</p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-sm hover:shadow-md transition-all">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-3">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-2xl font-light text-gray-900 mb-1">18</p>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Active Leads</p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-sm hover:shadow-md transition-all">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-3">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
              <p className="text-2xl font-light text-gray-900 mb-1">$89.2K</p>
              <p className="text-xs text-gray-500 uppercase tracking-wide">MTD Revenue</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-xl font-light text-white mb-6 text-center">Quick Actions</h2>
          <div className="grid grid-cols-4 gap-8 justify-items-center">
            <Link href="/calculator">
              <div className="group flex flex-col items-center justify-center w-36 h-36 bg-white/20 backdrop-blur-md border border-white/30 rounded-full hover:bg-white/30 hover:border-orange-500/50 hover:scale-110 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-2xl px-4">
                <div className="p-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full mb-4 group-hover:from-orange-400 group-hover:to-orange-500 transition-all duration-300">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-sm font-semibold text-center text-white mb-2 leading-tight">Quote Calculator</h3>
                <p className="text-xs text-white/70 text-center leading-relaxed">Generate pricing</p>
              </div>
            </Link>

            <div className="group flex flex-col items-center justify-center w-36 h-36 bg-white/20 backdrop-blur-md border border-white/30 rounded-full hover:bg-white/30 hover:border-orange-500/50 hover:scale-110 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-2xl px-4">
              <div className="p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-4 group-hover:from-green-400 group-hover:to-green-500 transition-all duration-300">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-sm font-semibold text-center text-white mb-2 leading-tight">Commission Tracker</h3>
              <p className="text-xs text-white/70 text-center leading-relaxed">Track earnings</p>
            </div>

            <div className="group flex flex-col items-center justify-center w-36 h-36 bg-white/20 backdrop-blur-md border border-white/30 rounded-full hover:bg-white/30 hover:border-orange-500/50 hover:scale-110 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-2xl px-4">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mb-4 group-hover:from-blue-400 group-hover:to-blue-500 transition-all duration-300">
                <UserCheck className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-sm font-semibold text-center text-white mb-2 leading-tight">Client Intel</h3>
              <p className="text-xs text-white/70 text-center leading-relaxed">AI snapshots</p>
            </div>

            <div className="group flex flex-col items-center justify-center w-36 h-36 bg-white/20 backdrop-blur-md border border-white/30 rounded-full hover:bg-white/30 hover:border-orange-500/50 hover:scale-110 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-2xl px-4">
              <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full mb-4 group-hover:from-purple-400 group-hover:to-purple-500 transition-all duration-300">
                <Video className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-sm font-semibold text-center text-white mb-2 leading-tight">Meeting Vault</h3>
              <p className="text-xs text-white/70 text-center leading-relaxed">View recordings</p>
            </div>
          </div>
        </div>

        {/* Sales Dashboard */}
        <div className="grid grid-cols-3 gap-8 mb-16">
          {/* Main Sales Inbox */}
          <div className="col-span-2">
            <Card className="bg-white/30 backdrop-blur-md border border-white/40 shadow-xl h-fit">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-medium text-white">Sales Inbox</CardTitle>
                    <CardDescription className="text-sm text-white/80">Active leads requiring attention</CardDescription>
                  </div>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white text-xs">View All</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Lead 1 */}
                <div className="flex items-center justify-between p-4 bg-red-400/20 border-l-4 border-l-red-400 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-red-400/30 rounded-full flex items-center justify-center">
                      <span className="text-red-200 font-bold text-sm">🔥</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-white text-sm">TechFlow Solutions</h3>
                      <p className="text-xs text-white/70">Software Startup • $2M ARR • Ready to buy</p>
                    </div>
                  </div>
                  <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white text-xs">Open in HubSpot</Button>
                </div>

                {/* Lead 2 */}
                <div className="flex items-center justify-between p-4 bg-orange-400/20 border-l-4 border-l-orange-400 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-orange-400/30 rounded-full flex items-center justify-center">
                      <span className="text-orange-200 font-bold text-sm">⚡</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-white text-sm">Wellness Hub Inc</h3>
                      <p className="text-xs text-white/70">Healthcare • $850K ARR • Warm prospect</p>
                    </div>
                  </div>
                  <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white text-xs">Open in HubSpot</Button>
                </div>

                {/* Lead 3 */}
                <div className="flex items-center justify-between p-4 bg-blue-400/20 border-l-4 border-l-blue-400 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-400/30 rounded-full flex items-center justify-center">
                      <span className="text-blue-200 font-bold text-sm">🧊</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-white text-sm">Local Bakery Co</h3>
                      <p className="text-xs text-white/70">Food Service • $125K ARR • Price shopper</p>
                    </div>
                  </div>
                  <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white text-xs">Open in HubSpot</Button>
                </div>

                {/* Lead 4 */}
                <div className="flex items-center justify-between p-4 bg-green-400/20 border-l-4 border-l-green-400 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-400/30 rounded-full flex items-center justify-center">
                      <span className="text-green-200 font-bold text-sm">💰</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-white text-sm">Quantum Dynamics</h3>
                      <p className="text-xs text-white/70">Manufacturing • $3.5M ARR • Needs consultation</p>
                    </div>
                  </div>
                  <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white text-xs">Open in HubSpot</Button>
                </div>

                {/* Lead 5 */}
                <div className="flex items-center justify-between p-4 bg-purple-400/20 border-l-4 border-l-purple-400 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-purple-400/30 rounded-full flex items-center justify-center">
                      <span className="text-purple-200 font-bold text-sm">💎</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-white text-sm">Elite Consulting Group</h3>
                      <p className="text-xs text-white/70">Professional Services • $1.2M ARR • Follow up needed</p>
                    </div>
                  </div>
                  <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white text-xs">Open in HubSpot</Button>
                </div>

                {/* Lead 6 */}
                <div className="flex items-center justify-between p-4 bg-yellow-400/20 border-l-4 border-l-yellow-400 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-yellow-400/30 rounded-full flex items-center justify-center">
                      <span className="text-yellow-200 font-bold text-sm">⭐</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-white text-sm">Urban Property Management</h3>
                      <p className="text-xs text-white/70">Real Estate • $890K ARR • Proposal requested</p>
                    </div>
                  </div>
                  <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white text-xs">Open in HubSpot</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Tools */}
          <div className="space-y-6">
            {/* Knowledge Base */}
            <Card className="bg-white/40 backdrop-blur-md border border-white/50 shadow-xl">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Bot className="h-4 w-4" />
                  Knowledge Base
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 text-white/60" />
                  <Input placeholder="Ask anything..." className="pl-9 text-xs h-8 bg-white/30 border-white/40 text-white placeholder:text-white/60" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-white hover:text-white cursor-pointer py-1 px-2 hover:bg-white/20 rounded">S-Corp Election Process</div>
                  <div className="text-xs text-white hover:text-white cursor-pointer py-1 px-2 hover:bg-white/20 rounded">Tax Planning 2024</div>
                  <div className="text-xs text-white hover:text-white cursor-pointer py-1 px-2 hover:bg-white/20 rounded">Client Onboarding SOP</div>
                </div>
              </CardContent>
            </Card>

            {/* Seed Academy */}
            <Card className="bg-white/40 backdrop-blur-md border border-white/50 shadow-xl">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold text-white">
                  <GraduationCap className="h-4 w-4" />
                  Seed Academy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">XP: 2,450</span>
                  <Badge className="bg-orange-500 text-white text-xs">Level 7</Badge>
                </div>
                <div className="text-xs text-white bg-white/20 p-2 rounded">Tax Planning 201 - In Progress (75%)</div>
                <Button className="w-full text-xs h-7 bg-white/30 hover:bg-white/40 text-white border-white/40">View Courses</Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white/40 backdrop-blur-md border border-white/50 shadow-xl">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Bell className="h-4 w-4" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div>
                    <p className="text-xs font-semibold text-white">New lead added</p>
                    <p className="text-xs text-white/80">TechFlow Solutions • 5 min ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div>
                    <p className="text-xs font-semibold text-white">Commission earned</p>
                    <p className="text-xs text-white/80">+$450 • 2h ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div>
                    <p className="text-xs font-semibold text-white">Document uploaded</p>
                    <p className="text-xs text-white/80">Tax Guide 2024 • 4h ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Full-Width Footer Section */}
        <div className="bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl p-8 mt-8">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Activity className="h-4 w-4 text-orange-500" />
                Today's Performance
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/90">Quotes Generated</span>
                  <span className="text-white font-bold">7</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/90">Calls Made</span>
                  <span className="text-white font-bold">12</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/90">Meetings Booked</span>
                  <span className="text-white font-bold">3</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Target className="h-4 w-4 text-green-400" />
                Goals Progress
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/90">Monthly Target</span>
                    <span className="text-white font-bold">68%</span>
                  </div>
                  <div className="w-full bg-white/30 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{width: '68%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/90">Quarterly Goal</span>
                    <span className="text-white font-bold">45%</span>
                  </div>
                  <div className="w-full bg-white/30 rounded-full h-2">
                    <div className="bg-orange-400 h-2 rounded-full" style={{width: '45%'}}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-400" />
                Recent Wins
              </h3>
              <div className="space-y-3">
                <div className="text-sm">
                  <p className="text-white font-bold">$15K Deal Closed</p>
                  <p className="text-white/90">MarketPro Inc • Yesterday</p>
                </div>
                <div className="text-sm">
                  <p className="text-white font-bold">Referral Received</p>
                  <p className="text-white/90">From TechFlow • 2 days ago</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <ChevronRight className="h-4 w-4 text-purple-400" />
                Quick Links
              </h3>
              <div className="space-y-2">
                <Button variant="ghost" size="sm" className="w-full justify-start text-sm text-white hover:text-white hover:bg-white/20 p-2">
                  Weekly Reports
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-sm text-white hover:text-white hover:bg-white/20 p-2">
                  Team Calendar
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-sm text-white hover:text-white hover:bg-white/20 p-2">
                  Training Materials
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}