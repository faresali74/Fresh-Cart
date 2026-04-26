interface SectionHeaderProps {
  title: string;
  highlight: string;
}

export default function SectionHeader({
  title,
  highlight,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8">
      <div className="flex items-center gap-3 my-8">
        <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full" />
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          {title} <span className="text-emerald-600">{highlight}</span>
        </h2>
      </div>
    </div>
  );
}
