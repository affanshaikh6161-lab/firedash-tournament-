"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Match } from "@/lib/types";
import { MatchCountdown } from "./MatchCountdown";
import { Shield, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function MatchCard({ match }: { match: Match }) {
  return (
    <Card className="overflow-hidden bg-card/40 border-border hover:border-primary/50 transition-all duration-300 group neon-border">
      <CardContent className="p-0">
        <div className="bg-primary/5 p-4 flex justify-between items-center border-b border-border">
          <Badge variant="outline" className="text-primary border-primary/20 font-headline uppercase tracking-wider">
            {match.tournamentName}
          </Badge>
          <MatchCountdown date={match.date} />
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col items-center text-center flex-1">
              <div className="relative w-16 h-16 md:w-20 md:h-20 mb-3">
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/20 transition-all"></div>
                <Image 
                  src={match.teamA.logo} 
                  alt={match.teamA.name}
                  width={80}
                  height={80}
                  className="rounded-full relative z-10 border-2 border-primary/20"
                />
              </div>
              <h3 className="font-headline font-bold text-sm md:text-base">{match.teamA.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">Rank #{match.teamA.rank}</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <span className="text-xs font-bold text-muted-foreground italic">VS</span>
              </div>
            </div>

            <div className="flex flex-col items-center text-center flex-1">
              <div className="relative w-16 h-16 md:w-20 md:h-20 mb-3">
                <div className="absolute inset-0 bg-secondary/10 rounded-full blur-xl group-hover:bg-secondary/20 transition-all"></div>
                <Image 
                  src={match.teamB.logo} 
                  alt={match.teamB.name}
                  width={80}
                  height={80}
                  className="rounded-full relative z-10 border-2 border-secondary/20"
                />
              </div>
              <h3 className="font-headline font-bold text-sm md:text-base">{match.teamB.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">Rank #{match.teamB.rank}</p>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6 pt-0 flex gap-3">
          <Link href={`/pay/${match.id}`} className="flex-1">
            <Button className="w-full bg-primary hover:bg-primary/90 text-white font-headline tracking-wide rounded-sm group-hover:neon-glow transition-all">
              <Zap className="w-4 h-4 mr-2" />
              JOIN MATCH
            </Button>
          </Link>
          <Button variant="outline" className="flex-1 border-border hover:bg-muted font-headline tracking-wide rounded-sm">
            DETAILS
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
