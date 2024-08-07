const AnalyticsCard = ({
  children,
  title,
  subTitle,
}: {
  children: React.ReactNode;
  title: string;
  subTitle: string;
}) => {
  return (
    <div className="dark:bg-tertiary border bg-slate-100 rounded-md p-6 h-full">
      <div className="mb-3">
        <p>{title}</p>
        <span className="text-primary text-sm">
          {subTitle}
        </span>
      </div>
      {children}
    </div>
  );
};

export default AnalyticsCard;
