// components/PublicGoalItem.tsx
'use client';
import { cn } from '@/lib/utils';
import { Goal } from '@/types';
import { Check } from 'lucide-react';

interface PublicGoalItemProps {
  goal: Goal;
}

export default function PublicGoalItem({ goal }: PublicGoalItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
        {goal.isComplete && <Check className="h-5 w-5 text-green-500" />}
        <div>
          <p
            className={cn(
              'font-medium text-3xl',
              goal.isComplete && 'text-muted-foreground line-through'
            )}
          >
            {goal.goal}
          </p>
        </div>
      </div>
    </div>
  );
}
