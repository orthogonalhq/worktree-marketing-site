const calendarEmbedUrl = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3POHvWS7BtFPcNsLO9xNh63T2nvpcQSJySDLebMDBHY-pZn8BNAiAAeZUT3022Fnv-t2ofQXBB?gv=true";

export function BookingPageContent() {
  return (
    <section className="booking-section" aria-labelledby="booking-heading">
      <div className="booking-shell mx-auto max-w-7xl">
        <div className="booking-intro">
          <p className="hero-eyebrow text-[var(--nous-page-preheader-fg)]">Deployment introduction</p>
          <h1 id="booking-heading">Book a deployment call.</h1>
          <p>Choose a time to walk through the workflow, the systems it touches, and what a first managed agent deployment could look like.</p>
        </div>
        <div className="booking-frame-wrap">
          <iframe
            src={calendarEmbedUrl}
            title="Book a Worktree deployment introduction"
            width="100%"
            height="760"
          />
        </div>
      </div>
    </section>
  );
}
