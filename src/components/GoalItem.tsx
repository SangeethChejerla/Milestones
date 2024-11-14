// components/GoalItem.tsx
'use client';
import { deleteGoal } from '@/actions/goal';
import { cn } from '@/lib/utils';
import { Check, MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { EditGoalDialog } from './EditGoalDialog';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
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
interface GoalItemProps {
  goal: Goal;
}

export default function GoalItem({ goal }: GoalItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteGoal(goal.id);
      router.refresh();
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
    setIsDeleting(false);
  };

  return (
    <div
      className={cn('flex items-center justify-between p-4 ', goal.isComplete)}
    >
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

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <EditGoalDialog goal={goal} />
          <DropdownMenuItem
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-600"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
