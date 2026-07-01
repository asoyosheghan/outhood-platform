import { Helmet } from "react-helmet-async";

interface SeoProps {
  title: string;
  description: string;
  path?: string;
}

export default function Seo({ title, description, path = "/" }: SeoProps) {
  const fullTitle = title.includes("Outhood") ? title : `${title} | Outhood`;
  const url = `https://outhood.africa${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
    </Helmet>
  );
}
