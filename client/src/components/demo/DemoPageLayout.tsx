interface DemoPageLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function DemoPageLayout({ title, description, children }: DemoPageLayoutProps) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">{title}</h2>
        <p className="text-lg text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
}