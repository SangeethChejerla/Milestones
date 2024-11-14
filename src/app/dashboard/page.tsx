import AddGoalForm from '@/components/AddNew';

export default async function DashboardPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="mb-4">
        <AddGoalForm />
      </div>
    </div>
  );
}
