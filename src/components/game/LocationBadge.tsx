interface LocationBadgeProps {
  name: string;
}

export function LocationBadge({ name }: LocationBadgeProps) {
  return (
    <div className="location-badge" role="status" aria-label={`Current area: ${name}`}>
      {name}
    </div>
  );
}
