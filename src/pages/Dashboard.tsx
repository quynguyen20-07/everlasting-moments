import { Eye, Heart, Menu, MessageCircle, Plus, Users } from "lucide-react";
import { WeddingList } from "@/components/wedding/WeddingList";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    { label: "Total Weddings", value: "2", icon: Heart },
    { label: "Total Views", value: "245", icon: Eye },
    { label: "Total RSVPs", value: "89", icon: Users },
    { label: "Pending Wishes", value: "12", icon: MessageCircle },
  ];

  return (
    <div>
      <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <h1 className="font-display text-2xl font-semibold">Dashboard</h1>
          </div>
          <Button variant="gold" asChild>
            <Link to="/dashboard/create">
              <Plus className="w-4 h-4" />
              New Wedding
            </Link>
          </Button>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-card border border-border shadow-soft"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <p className="text-3xl font-display font-bold mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Weddings List */}
        <div className="bg-card rounded-2xl border border-border shadow-soft">
          <div className="p-6 border-b border-border">
            <WeddingList />
          </div>
          {/* <div className="p-6 border-b border-border">
              <h2 className="font-display text-xl font-semibold">
                My Weddings
              </h2>
            </div>
            <div className="divide-y divide-border">
              {mockWeddings.map((wedding, index) => (
                <motion.div
                  key={wedding.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 flex items-center justify-between hover:bg-secondary/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center">
                      <Heart className="w-8 h-8 text-primary fill-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold">
                        {wedding.brideName} & {wedding.groomName}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-1">
                        {new Date(wedding.weddingDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            wedding.status === "published"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {wedding.status}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {wedding.template}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <p className="font-semibold">{wedding.views}</p>
                        <p className="text-muted-foreground">Views</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold">{wedding.rsvps}</p>
                        <p className="text-muted-foreground">RSVPs</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/wedding/${wedding.id}`}>
                          <Eye className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/dashboard/edit/${wedding.id}`}>
                          <Edit className="w-4 h-4" />
                        </Link>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuItem>Export Guests</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div> */}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-secondary to-blush-light border border-border"
          >
            <h3 className="font-display text-lg font-semibold mb-2">
              Need Help?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Check our guides and tutorials to create the perfect invitation.
            </p>
            <Button variant="outline" size="sm">
              View Tutorials
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-champagne-light/20 to-cream border border-border"
          >
            <h3 className="font-display text-lg font-semibold mb-2">
              Upgrade to Pro
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Unlock premium templates and remove branding.
            </p>
            <Button variant="gold" size="sm">
              View Plans
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="p-6 rounded-2xl bg-card border border-border"
          >
            <h3 className="font-display text-lg font-semibold mb-2">
              Contact Support
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Have questions? Our team is here to help.
            </p>
            <Button variant="outline" size="sm">
              Get in Touch
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
