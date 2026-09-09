import Reveal from "./Reveal.jsx";

export default function SectionHead({ num, title, note }) {
  return (
    <Reveal className="sec__head">
      <div>
        <p className="eyebrow"><span className="section-index">{num}</span> / The archive</p>
        <h2 className="sec__title">{title}</h2>
      </div>
      {note && <p className="sec__note">{note}</p>}
    </Reveal>
  );
}
