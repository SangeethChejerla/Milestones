import { getYearlyGoals } from '@/actions/goal';
import YearSection from '@/components/YearSection';
import { Suspense } from 'react';

export default async function Home() {
  const allGoals = await getYearlyGoals();

  return (
    <div className="container mx-auto p-4">
      <Suspense fallback={<div>Loading goals...</div>}>
        <div className="space-y-8">
          {Object.entries(allGoals)
            .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
            .map(([year, goals]) => (
              <YearSection
                key={year}
                year={Number(year)}
                initialGoals={goals}
              />
            ))}
        </div>
      </Suspense>
    </div>
  );
}
