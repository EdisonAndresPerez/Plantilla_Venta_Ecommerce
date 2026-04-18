
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
      <div  className="flex sm:flex-row gap-6 justify-center items-center mt-8 mb-12">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient">
              {stat.value}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </>
  );
};
