// app/actions.ts
'use server';

import { db } from '@/db/db';
import { goals } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export type Goal = typeof goals.$inferSelect;

export async function addGoal(data: {
  goal: string;
  year: number;
  isComplete: boolean;
}) {
  await db.insert(goals).values(data);
  revalidatePath('/dashboard');
}

export async function updateGoal(
  id: number,
  data: {
    goal: string;
    year: number;
    isComplete: boolean;
  }
) {
  await db.update(goals).set(data).where(eq(goals.id, id));
  revalidatePath('/dashboard');
}

export async function deleteGoal(id: number) {
  await db.delete(goals).where(eq(goals.id, id));
  revalidatePath('/dashboard');
}

export async function getYearlyGoals() {
  const allGoals = await db.select().from(goals).orderBy(goals.year);

  // Group goals by year
  return allGoals.reduce((acc: Record<number, Goal[]>, goal) => {
    if (!acc[goal.year]) {
      acc[goal.year] = [];
    }
    acc[goal.year].push(goal);
    return acc;
  }, {});
}

export async function getMoreGoals(year: number, offset: number = 0) {
  return await db
    .select()
    .from(goals)
    .where(eq(goals.year, year))
    .limit(5)
    .offset(offset);
}
