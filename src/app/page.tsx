// app/page.tsx (public home page)
import { getYearlyGoals } from '@/actions/goal';
import PublicYearSection from '@/components/PublicYear';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const allGoals = await getYearlyGoals();

  return (
    <div className=" max-w-3xl mx-auto p-4">
      <Suspense fallback={<div>Loading goals...</div>}>
        <div className="space-y-8">
          {Object.entries(allGoals)
            .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
            .map(([year, goals]) => (
              <PublicYearSection
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
