// Derives the filter keys FindPartners searches on from a session's raw
// fields (location, date, time, capacity), since the backend stores plain
// text/numbers rather than precomputed filter buckets. Keeping this derived
// client-side avoids duplicating filter logic in the service as well.

export function deriveLocationKey(location) {
  const text = (location || '').toLowerCase();
  if (text.includes('librar')) return 'library';
  if (text.includes('life science')) return 'life-sciences';
  if (text.includes('commons')) return 'commons';
  return '';
}

export function deriveDateKey(dateString) {
  if (!dateString) return '';
  const date = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(date.getTime())) return '';

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  if (date.getTime() === today.getTime()) return 'today';
  if (date.getTime() === tomorrow.getTime()) return 'tomorrow';
  if (date.toLocaleDateString('en-US', { weekday: 'long' }) === 'Thursday') return 'thursday';
  return '';
}

export function deriveAvailability(timeString) {
  const hour = Number((timeString || '').split(':')[0]);
  return hour >= 17 ? 'evening' : 'afternoon';
}

export function deriveSize(capacity) {
  if (capacity <= 4) return 'small';
  if (capacity <= 6) return 'medium';
  return 'large';
}
