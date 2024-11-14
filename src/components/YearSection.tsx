// components/YearSection.tsx
'use client';
import { useState } from 'react';

import { getMoreGoals } from '@/actions/goal';
import GoalItem from './GoalItem';
import { Button } from './ui/button';

interface Goal {
  id: number;
  goal: string;
  year: number;
  isComplete: boolean;
}
interface YearSectionProps {
  year: number;
  initialGoals: Goal[];
}

export default function YearSection({ year, initialGoals }: YearSectionProps) {
  const [goals, setGoals] = useState(initialGoals);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialGoals.length >= 5);

  const loadMore = async () => {
    setIsLoading(true);
    try {
      const moreGoals = await getMoreGoals(year, goals.length);
      if (moreGoals.length < 5) {
        setHasMore(false);
      }
      setGoals([...goals, ...moreGoals]);
    } catch (error) {
      console.error('Error loading more goals:', error);
    }
    setIsLoading(false);
  };

  return (
    <div className="mx-auto max-w-3xl p-20">
      <h2 className="text-6xl font-bold mb-8">{year}</h2>
      <div className="space-y-3">
        {goals.map((goal) => (
          <GoalItem key={goal.id} goal={goal} />
        ))}
      </div>
      {hasMore && (
        <Button
          variant="outline"
          className="w-full"
          onClick={loadMore}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'View More'}
        </Button>
      )}
    </div>
  );
}
