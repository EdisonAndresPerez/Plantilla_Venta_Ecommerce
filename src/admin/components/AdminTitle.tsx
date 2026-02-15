interface AdminTitleProps {
  name: string;
  subTitle: string;
}
export const AdminTitle = ({ name, subTitle }: AdminTitleProps) => {

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Bienvenido! {name} ✌
      </h1>
      <p className="text-sm text-muted-foreground">{subTitle}</p>
    </div>
  );
};
