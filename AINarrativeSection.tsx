"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2, Quote } from "lucide-react";
import { generateMatchNarrative, GenerateMatchNarrativeOutput } from '@/ai/flows/generate-match-narrative';
import { Match } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function AINarrativeSection({ match }: { match: Match }) {
  const [loading, setLoading] = useState(false);
  const [narrative, setNarrative] = useState<GenerateMatchNarrativeOutput | null>(null);

  async function handleGenerate() {
    setLoading(true);
    try {
      const result = await generateMatchNarrative({
        teamA: match.teamA.name,
        teamB: match.teamB.name,
        teamAStats: match.teamA.stats,
        teamBStats: match.teamB.stats,
        tournamentName: match.tournamentName,
        matchDate: new Date(match.date).toLocaleDateString(),
        context: "High stakes qualifier for the FireDash Grand Finals."
      });
      setNarrative(result);
    } catch (error) {
      console.error("AI Generation failed", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      {!narrative && !loading && (
        <div className="text-center p-8 border-2 border-dashed border-primary/20 rounded-xl bg-primary/5">
          <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
          <h3 className="font-headline font-bold text-lg">AI Narrative Engine</h3>
          <p className="text-sm text-muted-foreground mb-4 max-w-sm mx-auto">
            Generate a hype-filled preview and rivalry breakdown using our advanced AI commentator.
          </p>
          <Button onClick={handleGenerate} className="bg-primary hover:bg-primary/90">
            Generate Pre-Match Hype
          </Button>
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center p-12 space-y-4">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-sm text-primary font-medium animate-pulse">Analyzing stats and calculating rivalry heat...</p>
        </div>
      )}

      {narrative && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
          <Card className="bg-card/30 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-primary font-headline uppercase tracking-tighter flex items-center gap-2">
                <Quote className="w-4 h-4" /> Match Narrative
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed italic">{narrative.matchDescription}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card/30 border-secondary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-secondary font-headline uppercase tracking-tighter flex items-center gap-2">
                <Quote className="w-4 h-4" /> Rivalry Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed italic">{narrative.rivalryPreview}</p>
            </CardContent>
          </Card>
          
          <div className="md:col-span-2 text-center">
            <Button variant="ghost" size="sm" onClick={() => setNarrative(null)} className="text-muted-foreground hover:text-primary">
              Clear AI Analysis
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}