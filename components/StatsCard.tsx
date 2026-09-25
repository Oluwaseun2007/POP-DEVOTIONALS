interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color?: string;
}

export default function StatsCard({ title, value, icon, color = 'primary' }: StatsCardProps) {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    green: 'bg-green-100 text-green-700',
    yellow: 'bg-yellow-100 text-yellow-700',
    gray: 'bg-gray-100 text-gray-700',
    blue: 'bg-blue-100 text-blue-700',
  }[color];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${colorClasses}`}>{icon}</div>
      </div>
    </div>
  );
}