
interface Stat {
  value: string;
  label: string;
}

interface Props {
  stats: Stat[];
}

export const CustomjumStats = ({ stats }: Props) => {
  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-8 max-w-xl mx-auto mt-16">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-3xl lg:text-4xl font-bold text-gradient">
              {stat.value}
            </p>
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </>
  );
};
