export default function Placeholder({ title }: { title: string }) {
  return (
    <div className="max-w-4xl mx-auto space-y-8 p-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-text-primary mb-4">{title}</h1>
        <p className="text-text-secondary">This page is under development.</p>
      </div>
    </div>
  );
}
