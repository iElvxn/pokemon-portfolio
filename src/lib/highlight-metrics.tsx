import { Fragment } from 'react';

/* Matches quantified impact — percentages, multipliers, and count/scale
   numbers (500+, 1000+, 123K+) — so recruiters skimming bullets can spot
   the metrics without reading full sentences. */
const METRIC_PATTERN = /(\d+(?:\.\d+)?%|\d+(?:\.\d+)?[Kk]?\+|\d+(?:\.\d+)?[x×])/g;

export function highlightMetrics(text: string, color: string) {
  // str.split() with a capturing-group regex always puts matches at odd
  // indices — no need for a second (stateful, global-flag-buggy) test.
  const parts = text.split(METRIC_PATTERN);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} style={{ color, fontWeight: 700 }}>
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}
