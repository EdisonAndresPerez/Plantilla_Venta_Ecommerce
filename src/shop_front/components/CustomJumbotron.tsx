interface Props {
  badgeText?: string;
  title: {
    primary?: string;
    secondary?: string;
  };
  subtitle: {
    intro?: string;
    highlights: {
      text1?: string;
      text2?: string;
      text3?: string;
    };
  };
}

export const CustomJumbotron = ({ badgeText, title, subtitle }: Props) => {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 px-4 lg:px-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-secondary/20 blur-3xl animate-pulse" />
        <div className="absolute top-40 right-1/4 h-48 w-48 rounded-full bg-accent/20 blur-3xl animate-pulse" />

        <div className="container mx-auto text-center relative z-10">
          {badgeText && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-float">
              {badgeText}
            </div>
          )}

          <h1 className="text-5xl lg:text-8xl font-bold tracking-tight mb-6">
            <span className="text-gradient">{title.primary}</span>{" "}
            <span className="text-gradient-secondary">{title.secondary}</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            {subtitle.intro}
            <span className="text-primary font-medium">
              {" "}
              {subtitle.highlights.text1}
            </span>
            ,
            <span className="text-purple-500 font-semibold">
              {" "}
              {subtitle.highlights.text2}
            </span>{" "}
            y
            <span className="text-pink-500 font-semibold">
              {" "}
              {subtitle.highlights.text3}
            </span>
            .
          </p>
        </div>
      </section>
    </>
  );
};
