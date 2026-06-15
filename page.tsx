import { AppNavbar } from "@/components/AppNavbar";
import { MatchCard } from "@/components/MatchCard";
import { mockMatches } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Trophy, Users, Shield, Zap, ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const featuredMatch = mockMatches[0];

  return (
    <div className="pb-24 md:pt-20">
      <AppNavbar />
      
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10"></div>
          <Image 
            src="https://picsum.photos/seed/fire-arena/1200/600" 
            alt="Arena" 
            fill
            className="object-cover opacity-30 grayscale"
            priority
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest animate-pulse">
              <Star className="w-3 h-3 fill-primary" />
              Tournament Season Live
            </div>
            <h1 className="text-5xl md:text-7xl font-headline font-bold leading-tight">
              IGNITE YOUR <span className="text-primary">LEGACY</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Compete in high-stakes Free Fire tournaments on FireDash Tournament, climb the leaderboards, and become a tactical legend.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-headline px-8 rounded-sm neon-glow">
                JOIN NOW
              </Button>
              <Button size="lg" variant="outline" className="font-headline border-primary/30 hover:bg-primary/5 px-8 rounded-sm">
                VIEW LEAGUE
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Quick View */}
      <section className="container mx-auto px-4 -mt-10 relative z-30">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Active Players', value: '12,842', icon: Users, color: 'text-primary' },
            { label: 'Total Prize Pool', value: '$50,000', icon: Trophy, color: 'text-secondary' },
            { label: 'Matches Today', value: '24', icon: Zap, color: 'text-yellow-400' },
            { label: 'Pro Teams', value: '156', icon: Shield, color: 'text-blue-400' },
          ].map((stat, i) => (
            <div key={i} className="bg-card p-6 rounded-xl border border-border glass-morphism shadow-2xl">
              <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
              <div className="text-2xl font-bold font-headline">{stat.value}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Matches */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-headline font-bold">UPCOMING BATTLES</h2>
            <p className="text-muted-foreground">Don't miss the high-stakes action this week.</p>
          </div>
          <Link href="/matches">
            <Button variant="link" className="text-primary hover:text-primary/80 group">
              Full Schedule <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mockMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-primary/5 border border-primary/20 rounded-3xl p-12 text-center space-y-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -translate-y-1/2 translate-x-1/2 rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 blur-[100px] translate-y-1/2 -translate-x-1/2 rounded-full"></div>
          
          <h2 className="text-4xl font-headline font-bold">READY TO DEPLOY?</h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Your journey to the top of the FireDash Tournament leaderboard starts today. Secure your spot in the next tournament.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-headline px-12 h-14 rounded-sm text-lg neon-glow">
            REGISTER FREE
          </Button>
        </div>
      </section>
    </div>
  );
}
