// components/PublicYearSection.tsx
'use client';
import { getMoreGoals } from '@/actions/goal';
import { Goal } from '@/types';
import { useState } from 'react';

import PublicGoalItem from './PublicList';
import { Button } from './ui/button';

interface YearSectionProps {
  year: number;
  initialGoals: Goal[];
}

export default function PublicYearSection({
  year,
  initialGoals,
}: YearSectionProps) {
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
          <PublicGoalItem key={goal.id} goal={goal} />
        ))}
      </div>
      {hasMore && (
        <Button
          variant="outline"
          className="w-full mt-4"
          onClick={loadMore}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'View More'}
        </Button>
      )}
    </div>
  );
}
