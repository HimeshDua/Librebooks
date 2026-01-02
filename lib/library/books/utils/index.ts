type bookDescriptionMetaDataProps = {
  title: string;
  author: string;
  description: string | null;
};
export const bookDescriptionMetaData = ({
  title,
  author,
  description,
}: bookDescriptionMetaDataProps) => {
  return description
    ? `${description.substring(0, 160)}...`
    : `Read "${title}" by ${author || 'Unknown Author'} online for free. Download EPUB format.`;
};
