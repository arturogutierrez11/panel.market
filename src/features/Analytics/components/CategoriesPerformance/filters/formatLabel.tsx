function formatLabel(key: string) {
  return key
    .replace('min', 'Mín ')
    .replace('max', 'Máx ')
    .replace(/([A-Z])/g, ' $1')
    .trim();
}