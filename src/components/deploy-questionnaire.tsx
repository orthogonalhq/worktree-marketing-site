"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type FormState = {
  role: string;
  roleOther: string;
  businessStage: string;
  functionArea: string;
  functionAreaOther: string;
  workflow: string;
  motivation: string;
  motivationOther: string;
  frequency: string;
  systems: string[];
  specificTools: string;
  timeline: string;
  email: string;
  name: string;
  company: string;
  phone: string;
  idempotencyKey: string;
  website: string;
  formStartedAt: number;
  privacyAccepted: boolean;
};

type SingleStep = {
  type: "single";
  key: keyof FormState;
  label: string;
  eyebrow: string;
  options: string[];
};

type TextStep = {
  type: "text";
  key: keyof FormState;
  label: string;
  eyebrow: string;
  placeholder: string;
};

type MultiStep = {
  type: "multi";
  key: "systems";
  label: string;
  eyebrow: string;
  options: string[];
};

type ContactStep = {
  type: "contact";
  label: string;
  eyebrow: string;
};

type Step = SingleStep | TextStep | MultiStep | ContactStep;

const initialState: FormState = {
  role: "",
  roleOther: "",
  businessStage: "",
  functionArea: "",
  functionAreaOther: "",
  workflow: "",
  motivation: "",
  motivationOther: "",
  frequency: "",
  systems: [],
  specificTools: "",
  timeline: "",
  email: "",
  name: "",
  company: "",
  phone: "",
  idempotencyKey: "",
  website: "",
  formStartedAt: 0,
  privacyAccepted: false,
};

const steps: Step[] = [
  {
    type: "single",
    key: "role",
    eyebrow: "Role",
    label: "What is your role?",
    options: ["Founder / executive", "Operations leader", "Revenue / customer leader", "Finance / admin leader", "Technical / systems leader", "Individual contributor", "Other"],
  },
  {
    type: "single",
    key: "businessStage",
    eyebrow: "Business stage",
    label: "What stage is the business at?",
    options: ["Just starting", "Under $500K annual revenue", "$500K–$1M annual revenue", "$1M–$5M annual revenue", "$5M–$10M annual revenue", "$10M+ annual revenue"],
  },
  {
    type: "single",
    key: "functionArea",
    eyebrow: "Function",
    label: "Where does this workflow live?",
    options: ["Revenue / sales", "Customer success", "Support", "Finance / admin", "Internal operations", "Cross-functional", "Other"],
  },
  {
    type: "text",
    key: "workflow",
    eyebrow: "Workflow candidate",
    label: "What recurring workflow do you want to improve?",
    placeholder: "Example: renewal risk review, inbound lead triage, onboarding follow-up, finance exception review, executive briefing...",
  },
  {
    type: "single",
    key: "motivation",
    eyebrow: "Motivation",
    label: "Why do you want this workflow handled by an agent?",
    options: [
      "Freeing yourself from repetitive work",
      "Unblocking team members",
      "Avoiding hiring for a small recurring job",
      "Keeping follow-ups from slipping",
      "Making the process run without constant supervision",
      "Other",
    ],
  },
  {
    type: "single",
    key: "frequency",
    eyebrow: "Frequency",
    label: "How often does this workflow happen?",
    options: ["Multiple times a minute", "Every few minutes", "Hourly", "Daily", "Weekly", "Monthly or less", "Not sure"],
  },
  {
    type: "multi",
    key: "systems",
    eyebrow: "Systems involved",
    label: "Which systems or sources does the workflow touch?",
    options: ["Email", "Slack / Teams", "CRM", "Support desk", "Docs / Drive / SharePoint", "Project / task system", "Billing / finance", "Data warehouse / BI", "Other"],
  },
  {
    type: "single",
    key: "timeline",
    eyebrow: "Timeline",
    label: "How soon do you want to explore this?",
    options: ["Now — we have a workflow in mind", "This quarter", "Researching options", "Not urgent yet"],
  },
  {
    type: "contact",
    eyebrow: "Contact",
    label: "Where should we send the deployment review?",
  },
];

type OtherTextField = "roleOther" | "functionAreaOther" | "motivationOther";

function getOtherField(key: keyof FormState): OtherTextField | null {
  if (key === "role") return "roleOther";
  if (key === "functionArea") return "functionAreaOther";
  if (key === "motivation") return "motivationOther";
  return null;
}

function getOtherPlaceholder(key: keyof FormState) {
  if (key === "role") return "What is your role?";
  if (key === "functionArea") return "Where does it live?";
  if (key === "motivation") return "What is the reason?";
  if (key === "systems") return "Which tools or sources?";
  return "Any specifics we should know?";
}

export function DeployQuestionnaire() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [form, setForm] = useState<FormState>(() => ({
    ...initialState,
    idempotencyKey: crypto.randomUUID(),
    formStartedAt: Date.now(),
  }));
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const step = steps[stepIndex];
  const progress = useMemo(() => Math.round(((stepIndex + 1) / steps.length) * 100), [stepIndex]);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setError("");
  }

  function isStepComplete(currentStep = step) {
    if (currentStep.type === "single") return Boolean(String(form[currentStep.key]).trim());
    if (currentStep.type === "text") return String(form[currentStep.key]).trim().length >= 8;
    if (currentStep.type === "multi") return form.systems.length > 0;
    return Boolean(form.email.trim() && form.name.trim() && form.company.trim() && form.privacyAccepted);
  }

  function goNext() {
    if (!isStepComplete()) {
      setError(step.type === "contact" ? "Please add your name, work email, company, and acknowledge the privacy notice." : "Please complete this step before continuing.");
      return;
    }

    setStepIndex((current) => Math.min(current + 1, steps.length - 1));
    setError("");
  }

  function goBack() {
    setStepIndex((current) => Math.max(current - 1, 0));
    setError("");
  }

  function toggleSystem(option: string) {
    const nextSystems = form.systems.includes(option) ? form.systems.filter((system) => system !== option) : [...form.systems, option];
    updateField("systems", nextSystems);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isStepComplete()) {
      setError("Please add your name, work email, company, and acknowledge the privacy notice.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/deploy/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Submission failed");

      const result = (await response.json()) as { canBook?: boolean };
      router.push(result.canBook ? "/deploy/book" : "/deploy/thanks");
    } catch {
      setSubmitting(false);
      setError("Something went wrong submitting your workflow. Please try again.");
    }
  }

  function renderStepBody(currentStep: Step) {
    return (
      <div className="deploy-questionnaire-step" key={currentStep.eyebrow}>
        <h2>{currentStep.label}</h2>
        {currentStep.type === "single" ? (
          <div className="deploy-option-grid">
            {currentStep.options.map((option) => {
              const otherField = option === "Other" ? getOtherField(currentStep.key) : null;

              return otherField ? (
                <div className="deploy-option deploy-option-other" data-selected={form[currentStep.key] === option} key={option}>
                  <button className="deploy-option-other-toggle" onClick={() => updateField(currentStep.key, option)} type="button">
                    <span>Other:</span>
                  </button>
                  <input
                    aria-label={`Other ${currentStep.eyebrow.toLowerCase()}`}
                    placeholder={getOtherPlaceholder(currentStep.key)}
                    value={form[otherField]}
                    onChange={(event) => updateField(otherField, event.target.value)}
                    onFocus={() => updateField(currentStep.key, option)}
                  />
                </div>
              ) : (
                <button className="deploy-option" data-selected={form[currentStep.key] === option} key={option} onClick={() => updateField(currentStep.key, option)} type="button">
                  <span>{option}</span>
                </button>
              );
            })}
          </div>
        ) : null}

        {currentStep.type === "text" ? (
          <textarea aria-label={currentStep.label} className="deploy-textarea" placeholder={currentStep.placeholder} rows={14} value={String(form[currentStep.key])} onChange={(event) => updateField(currentStep.key, event.target.value)} />
        ) : null}

        {currentStep.type === "multi" ? (
          <div className="deploy-option-grid deploy-option-grid-multi">
            {currentStep.options.map((option) => (
              option === "Other" ? (
                <div className="deploy-option deploy-option-other" data-selected={form.systems.includes(option)} key={option}>
                  <button className="deploy-option-other-toggle" onClick={() => toggleSystem(option)} type="button">
                    <span>Other:</span>
                  </button>
                  <input
                    aria-label="Other systems or sources"
                    placeholder={getOtherPlaceholder("systems")}
                    value={form.specificTools}
                    onChange={(event) => updateField("specificTools", event.target.value)}
                    onFocus={() => {
                      if (!form.systems.includes(option)) toggleSystem(option);
                    }}
                  />
                </div>
              ) : (
                <button className="deploy-option" data-selected={form.systems.includes(option)} key={option} onClick={() => toggleSystem(option)} type="button">
                  <span>{option}</span>
                </button>
              )
            ))}
          </div>
        ) : null}

        {currentStep.type === "contact" ? (
          <div className="deploy-contact-grid">
            <label>
              <span>Work email *</span>
              <input autoComplete="email" inputMode="email" type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} />
            </label>
            <label>
              <span>Name *</span>
              <input autoComplete="name" type="text" value={form.name} onChange={(event) => updateField("name", event.target.value)} />
            </label>
            <label>
              <span>Company *</span>
              <input autoComplete="organization" type="text" value={form.company} onChange={(event) => updateField("company", event.target.value)} />
            </label>
            <label>
              <span>Phone number (optional)</span>
              <input autoComplete="tel" inputMode="tel" type="tel" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} />
            </label>
            <label className="deploy-privacy-acknowledgement">
              <input checked={form.privacyAccepted} type="checkbox" onChange={(event) => updateField("privacyAccepted", event.target.checked)} />
              <span>I agree that Worktree can use this information under its <Link href="/legal/privacy" target="_blank">Privacy</Link> and <Link href="/legal/data-use" target="_blank">Data Use</Link> notices.</span>
            </label>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <section className="deploy-questionnaire-section" aria-labelledby="deploy-questionnaire-heading">
      <div className="deploy-questionnaire-shell mx-auto max-w-7xl">
        <div className="deploy-questionnaire-intro">
          <p className="hero-eyebrow text-[var(--nous-page-preheader-fg)]">Managed agent deployment</p>
          <h1 id="deploy-questionnaire-heading">Start the deployment review.</h1>
          <p>Tell us about the recurring workflow you want handled by an agent. We’ll use your answers to prepare the deployment conversation and follow up with the right next step.</p>
        </div>

        <form className="deploy-questionnaire-card" onSubmit={handleSubmit}>
          <div aria-hidden="true" className="deploy-honeypot">
            <label>
              <span>Website</span>
              <input autoComplete="off" tabIndex={-1} type="text" value={form.website} onChange={(event) => updateField("website", event.target.value)} />
            </label>
          </div>
          <div className="deploy-questionnaire-progress" aria-label={`Step ${stepIndex + 1} of ${steps.length}`}>
            <div>
              <span>{step.eyebrow}</span>
              <strong>{String(stepIndex + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}</strong>
            </div>
            <span className="deploy-questionnaire-progress-track"><span style={{ width: `${progress}%` }} /></span>
          </div>

          {renderStepBody(step)}

          <div className="deploy-questionnaire-status">
            {error ? <p className="deploy-questionnaire-error" role="alert">{error}</p> : null}
          </div>

          <div className="deploy-questionnaire-actions">
            <button disabled={stepIndex === 0 || submitting} onClick={goBack} type="button">Back</button>
            {stepIndex < steps.length - 1 ? (
              <button disabled={submitting} onClick={goNext} type="button">Next</button>
            ) : (
              <button disabled={submitting} type="submit">{submitting ? "Submitting..." : "Submit workflow for review"}</button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
