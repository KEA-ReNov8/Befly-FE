export const formatDate = (isoString) => {
  const date = new Date(isoString);
  // UTC → KST (+9시간 보정)
  const offsetDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);

  const year = offsetDate.getFullYear();
  const month = String(offsetDate.getMonth() + 1).padStart(2, '0');
  const day = String(offsetDate.getDate()).padStart(2, '0');

  let hour = offsetDate.getHours();
  const minute = String(offsetDate.getMinutes()).padStart(2, '0');

  const isAM = hour < 12;
  const ampm = isAM ? '오전' : '오후';
  if (!isAM) hour -= 12;
  if (hour === 0) hour = 12;

  return `${year}. ${month}. ${day}. ${ampm} ${String(hour).padStart(2, '0')}:${minute}`;
};
