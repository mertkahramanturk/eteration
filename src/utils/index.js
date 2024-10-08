import i18n from '../translations/index';
const intervals = [
  { label: 'year', seconds: 31536000 },
  { label: 'month', seconds: 2592000 },
  { label: 'day', seconds: 86400 },
  { label: 'hour', seconds: 3600 },
  { label: 'minute', seconds: 60 },
  { label: 'second', seconds: 1 }
];

export function timeSince(date) {
  const t = i18n.t;
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (seconds) {
    const interval = intervals.find(i => i.seconds < seconds);
    const count = Math.floor(seconds / interval.seconds);
    return `${count} ${t(`time_interval.${interval.label}${count !== 1 ? 's' : ''}`)}`;
  } else {
    return ""
  }

}