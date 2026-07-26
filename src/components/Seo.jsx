import { Head } from "vite-react-ssg";

const ORIGIN = "https://sharmahr.github.io";

/**
 * Per-route document head. Rendered into the prerendered HTML at build
 * time, so crawlers and link unfurlers see real metadata.
 */
export default function Seo({ title, description, path = "/", image = "/assets/images/og.png", type = "website", children }) {
  const url = `${ORIGIN}${path}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${ORIGIN}${image}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      {children}
    </Head>
  );
}
