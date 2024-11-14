// app/dashboard/page.tsx (admin dashboard)
import { getYearlyGoals } from '@/actions/goal';
import AddGoalForm from '@/components/AddNew';
import AdminYearSection from '@/components/AdminYear';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const allGoals = await getYearlyGoals();

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <AddGoalForm />
      </div>
      <Suspense fallback={<div>Loading goals...</div>}>
        <div className="space-y-8">
          {Object.entries(allGoals)
            .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
            .map(([year, goals]) => (
              <AdminYearSection
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
