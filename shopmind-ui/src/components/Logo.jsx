export default function Logo({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <rect width="64" height="64" rx="18" fill="var(--surface2)" stroke="var(--line)" />
      <path d="M17 41c0-8.3 6.7-15 15-15s15 6.7 15 15" fill="none" stroke="var(--brand)" strokeWidth="5" strokeLinecap="round" />
      <circle cx="32" cy="21" r="5.2" fill="var(--brand)" />
    </svg>
  )
}
