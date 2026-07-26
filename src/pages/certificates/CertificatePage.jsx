import { Link } from "react-router-dom";
import Seo from "../../components/Seo.jsx";
import Reveal from "../../components/Reveal.jsx";
import { ArrowBack, ArrowOut } from "../../components/icons.jsx";

export default function CertificatePage({ title, description, path, heading, meta, image, alt, body }) {
  return (
    <>
      <Seo title={title} description={description} path={path} />

      <main id="main" className="wrap">
        <Reveal className="pagehead">
          <Link className="back mono" to="/#recognition">
            <ArrowBack />
            Recognition
          </Link>
          <h1>{heading}</h1>
          <p className="mono muted mt-note">{meta}</p>
        </Reveal>

        <Reveal className="rail band band--end">
          <p className="mono muted">Certificate</p>
          <div className="prose">
            <p>{body}</p>
            <img src={image} alt={alt} />
            <p className="mt-4xl">
              <Link className="arrowlink lnk" to="/#recognition">
                All recognition
                <ArrowOut />
              </Link>
            </p>
          </div>
        </Reveal>
      </main>
    </>
  );
}
