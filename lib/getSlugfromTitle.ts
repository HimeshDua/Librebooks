export function generateSlug(
  title: string,
  id: number,
  gutenberg_id: number,
  opts: {lowercase?: boolean; maxLen?: number} = {}
): string {
  const {lowercase = true, maxLen = 80} = opts;

  let s = title.normalize('NFKD').replace(/[\u0300-\u036f]/g, '');

  s = s.replace(/['’`"“”]/g, '');

  s = s
    .replace(/[^A-Za-z0-9\s-]+/g, ' ')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  if (s.length > maxLen) {
    const cut = s.slice(0, maxLen);
    const lastHyphen = cut.lastIndexOf('-');
    s = lastHyphen > 0 ? cut.slice(0, lastHyphen) : cut.slice(0, maxLen);
    s = s.replace(/-+$/g, '');
  }

  if (lowercase) s = s.toLowerCase();

  if (!s) s = `untitled-${gutenberg_id}`;

  return id ? `${s}-${id}${Math.floor(Math.random() * 100)}` : s;
}
