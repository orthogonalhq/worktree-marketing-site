# Approved source draft: how to monitor AI agents in production

Status: Approved and published 2026-08-23
Published slug: `/blog/monitor-ai-agents-in-production`
Canonical query owner: This article owns informational `how to monitor AI agents in production`. `/services/managed-ai` remains the owner of commercial `managed AI services` and Worktree's ongoing managed-operation offer.

## Editorial brief

- **Primary query:** `how to monitor AI agents in production`
- **Secondary variants:** `AI agent monitoring metrics`; `AI agent observability`; `AI agent evaluation in production`; `production AI monitoring`; `how to evaluate AI agents`; `AI agent performance monitoring`; `AI agent maintenance`
- **Search intent:** Informational operating guidance. The reader wants to know what to instrument, measure, evaluate, alert on, review, and change after launch.
- **Audience:** Operations, technical, product, risk, and functional leaders responsible for a deployed or near-production AI workflow.
- **Funnel stage:** Consideration and post-pilot planning, with a natural bridge to managed service evaluation.
- **Primary parent:** `/services/managed-ai`

## SERP and competitor findings

Reviewed for US results on 2026-08-23.

- The exact-question SERP is active and technical. Representative results include [AgentCenter, published January 19, 2026](https://www.agentcenter.cloud/blogs/how-to-monitor-ai-agents-production), [LangChain, published February 26, 2026](https://www.langchain.com/blog/production-monitoring), [AgentOps, published April 27, 2026](https://agentops.ca/blog/ai-agent-monitoring/), and [OpenBox, published May 28, 2026](https://www.openbox.ai/blog/how-to-monitor-ai-agents-in-production-a-technical-guide).
- Common topics are traces, tool calls, latency, errors, token cost, completion rate, quality scoring, alerting, and debugging. Vendor-led results often use the article to sell an observability platform.
- The repeated SERP argument is that ordinary application telemetry can show whether a request completed without showing whether the result was useful. The Worktree opening is to connect technical telemetry with workflow quality, authority, exceptions, business outcome, and a named review decision.
- The approved public baseline shows related demand without authorizing a duplicate commercial page: `AI agent evaluation` recorded an 11 relative average, `AI agent monitoring` 9, and `AI agent maintenance` 6 in the 2026-08-20 US comparison. Exact long-tail monthly volume was not independently captured.

## Cannibalization and internal-link plan

The article owns the how-to method. It does not target `managed AI services` in the title or H1, promise Worktree monitoring coverage, or position Worktree as a generic observability, MLOps, or cloud-infrastructure vendor.

Recommended links in reading order:

1. Sibling `/blog/ai-implementation-roadmap` in the pre-launch section — anchor: `plan monitoring before the implementation reaches production`.
2. Sibling `/blog/ai-agent-governance-checklist` in control signals — anchor: `connect monitoring to the agent governance decisions`.
3. `/product/security` in access, evidence, and incident review — anchor: `review the workflow's security and access boundaries`.
4. `/services/managed-ai` after the operating loop and ownership table — anchor: `managed AI services for a production workflow`.
5. Sibling `/blog/ai-automation-cost` in cost-per-task planning — anchor: `account for ongoing AI automation cost`.
6. `/services/ai-implementation` in regression and change planning — anchor: `carry the workflow through controlled implementation`.
7. `/deploy` in the close — anchor: `review the operating responsibility`.

## Proposed search fields

- **Title tag:** How to Monitor AI Agents in Production
- **Meta description:** Monitor a production AI agent across execution, quality, controls, cost, exceptions, and business outcomes—then turn the evidence into decisions.
- **H1:** How to monitor AI agents in production—and know what to do next.

## Proposed outline

1. Monitoring starts with accepted behavior, not a dashboard.
2. The six layers of production evidence.
3. Define metrics by workflow, not by category.
4. Build an evaluation set before launch.
5. Record the smallest useful execution evidence.
6. Separate stop-now alerts, review queues, and trends.
7. Use the operating loop: observe, evaluate, respond, improve, record, review.
8. Assign ownership and change control.
9. A 30-day setup for one production workflow.
10. FAQ.

## FAQ candidates

- What should you monitor for an AI agent?
- Is AI agent observability the same as monitoring?
- How do you evaluate an AI agent in production?
- Which AI agent metrics matter most?
- Should every agent run be reviewed by a person?
- How do you monitor AI agent cost?
- Who should own monitoring and maintenance after launch?

---

# How to monitor AI agents in production—and know what to do next.

A production AI agent can be available, fast, and wrong.

The service can return a successful response while the workflow uses stale context, calls the wrong tool, prepares an unacceptable result, misses an approval, or quietly turns an unusual case into routine work.

That is why monitoring begins before the first dashboard. The team needs an accepted description of the job:

- What starts the workflow.
- Which context and systems it may use.
- Which actions it may take.
- What needs human approval.
- What a useful result looks like.
- Which exceptions should stop or route.
- Who decides what happens when the evidence changes.

Without that reference point, observability produces more data but not necessarily a decision.

## Start with the operating standard accepted before launch

Build a small evaluation set before production. Use representative normal cases, difficult variations, missing context, approval cases, out-of-scope requests, and known failures.

For each case, record:

- Expected behavior.
- Allowed tools and actions.
- Required human involvement.
- Exact checks where possible.
- Human-quality criteria where necessary.
- Unacceptable outcomes.

This becomes the baseline for regression tests and production review. A new production failure can become a future evaluation case when it represents a repeatable risk.

NIST's AI RMF Core treats risk management as continuous across the AI lifecycle. Its Playbook includes monitoring, drift, incidents, human oversight, testing, evaluation, and continual improvement across its suggested actions. See the [NIST AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) and [Playbook](https://airc.nist.gov/airmf-resources/playbook/).

If the standard and launch boundary are still undefined, [plan monitoring before the implementation reaches production](/blog/ai-implementation-roadmap).

## Monitor six layers of the workflow

No single metric can describe an agent-enabled workflow. Use six layers, each tied to a different operating question.

### 1. Availability and performance

**Question:** Can the technical path run at the required level?

Possible signals:

- Request and workflow availability.
- Latency by step and complete case.
- Timeouts and dependency failures.
- Queue depth and throughput.
- Model, tool, retrieval, and integration errors.
- Resource saturation.

These are familiar software signals. They matter, but they cannot show whether the result was good.

### 2. Execution and tool behavior

**Question:** What path did the agent take?

Possible signals:

- Workflow, agent, prompt, and model version.
- Steps and tool calls per case.
- Tool arguments and results, protected according to data policy.
- Retries, loops, fan-out, and stop reasons.
- Identity and permission denials.
- Partial completion and duplicate action.
- State transition from request to recorded result.

Trace one complete workflow, not only the model call. The business consequence often occurs in a tool or integration after generation.

### 3. Quality and task outcome

**Question:** Did the workflow produce a useful result?

Possible signals:

- Completion against the intended task.
- Required fields or evidence present.
- Factual grounding in approved sources.
- Correct tool and destination.
- Human rubric score.
- Acceptance, edit, rejection, or escalation.
- Rework required after the result.
- Performance by case type, not only the overall average.

Quality should be evaluated against the accepted use case. “Helpful” is not a sufficient production metric when the job is to prepare a specific review packet or update a specific record.

### 4. Authority and control behavior

**Question:** Did the workflow stay inside its permitted role?

Possible signals:

- Attempts to access denied data or tools.
- Actions that required approval.
- Approval, rejection, timeout, and expiry.
- Out-of-scope request and refusal.
- Unexpected destinations or action types.
- Policy or permission violations.
- Stop, rollback, and credential-revocation events.

Connect these signals to the decisions in the [AI agent governance checklist](/blog/ai-agent-governance-checklist). Monitoring cannot repair an authority boundary that was never defined.

### 5. Cost and resource use

**Question:** What does a completed case consume?

Possible signals:

- Input and output tokens.
- Model calls, tool calls, and retrieval operations.
- Cost per completed workflow or task type.
- Cost of retries, failures, and exceptions.
- Human review time.
- Fixed infrastructure and software allocation.
- Spend by workflow version, team, or environment.

Google Cloud's AI cost guidance recommends granular unit-cost measurement, including cost per inference or task, connected to business KPIs and assigned owners. See [Google Cloud's AI and ML cost-optimization guidance](https://docs.cloud.google.com/architecture/framework/perspectives/ai-ml/cost-optimization?hl=en).

Use the observed unit cost to [account for ongoing AI automation cost](/blog/ai-automation-cost), not only to reduce token use.

### 6. Business and human outcome

**Question:** Is the workflow improving the operation it was built for?

Possible signals:

- Cycle time from trigger to accepted result.
- Cases completed without avoidable coordination.
- Rework, corrections, and exception burden.
- Adoption by intended users.
- Time to human decision for routed cases.
- Customer or employee impact where appropriate.
- Capacity redirected to other work.
- The original business measure selected before implementation.

This layer prevents a technically efficient agent from being declared successful when the surrounding workflow has not improved.

## Choose a small metric set for each workflow

A production review is easier when every signal has a purpose.

Use a table like this:

| Metric | Why it matters | Segment | Decision |
| --- | --- | --- | --- |
| Accepted completion rate | Shows whether the workflow produces a usable end state | Case type and version | Investigate a decline or weak segment |
| Approval rate | Shows how often the workflow reaches consequential judgment | Action type and owner | Revisit scope or reviewer load |
| Exception rate | Shows where real cases exceed the normal path | Exception reason | Add context, change instructions, or keep human |
| Tool failure rate | Shows integration reliability | Tool and error type | Repair dependency or change fallback |
| Cost per accepted case | Connects usage with a usable result | Case type and version | Optimize path or reassess value |
| Cycle time | Measures the complete operation | Normal vs. exception | Find waiting or review bottlenecks |
| Human edit or rejection | Supplies quality feedback | Reviewer and case type, used carefully | Refine evaluation or workflow design |
| Out-of-scope attempts | Tests purpose and authority boundary | Source and request type | Restrict, educate, or investigate |

Do not copy another team's threshold. Establish a baseline during testing, decide which deviation requires action, and adjust as production evidence accumulates.

## Use evaluation in three places

### Before launch: representative evaluation

Test the workflow against the cases and acceptance criteria selected during implementation. Include normal cases, exceptions, denied actions, tool failures, and recovery paths.

### During operation: sampled and event-driven evaluation

Review a meaningful sample of normal operation and automatically or manually route higher-risk events. Sampling should reflect case types; a random average can miss a small but important segment.

Event-driven review may include:

- A consequential action.
- A denied or unexpected tool call.
- A low-confidence or failed exact check.
- A new exception type.
- A significant cost or latency deviation.
- A user rejection or correction.
- A changed source, policy, model, or integration.

### Before change: regression evaluation

Run the accepted cases and relevant production failures against a proposed change. Compare quality, control behavior, cost, and latency. Do not approve a change because one broken example improved while other cases silently regressed.

Evaluation can combine exact tests, programmatic checks, model-based graders, and human review. Calibrate automated evaluators against human judgments for the selected task; do not treat an evaluator score as ground truth by default.

## Record the smallest evidence that can explain a material result

More logging is not automatically better. Prompts, retrieved content, tool arguments, and outputs can contain sensitive information. Decide what is needed, who can see it, and how long it remains.

For one workflow execution, useful evidence may include:

- Correlation or run identifier.
- Workflow and agent version.
- Trigger time and initiating identity.
- References to the selected context.
- Step, model, retrieval, and tool events.
- Approval or exception events.
- Action outcome and final status.
- Evaluation result.
- Token, latency, and cost data.
- Error, retry, and stop reason.

OpenTelemetry's current generative-AI conventions include attributes for agent identity and version, conversation, model, tool calls, evaluation scores, workflow name, and token usage. The specification also warns that message, retrieval, instruction, tool-argument, and tool-result fields may contain sensitive information. See the [OpenTelemetry GenAI semantic conventions](https://opentelemetry.io/docs/specs/semconv/registry/attributes/gen-ai/).

The conventions are still evolving; use them as a route toward consistent instrumentation, not as a reason to capture sensitive content by default.

Review [the workflow's security and access boundaries](/product/security) before deciding that complete prompts or results belong in a broadly accessible observability system.

## Separate three kinds of signal

If every unusual event pages someone, the team will stop listening. If everything waits for a monthly review, a consequential failure can repeat.

### Stop now

Use immediate containment or a hard gate for events such as:

- Attempted denied or destructive action.
- Credential or identity anomaly.
- Repeated action or runaway loop.
- Unexpected external destination.
- Material policy violation.
- Cost or volume outside a hard budget.
- Known unsafe condition for the workflow.

The exact list follows the workflow's consequence and policy.

### Review soon

Create an owned queue for:

- Failed or partially completed cases.
- Human rejection or substantial correction.
- New exception types.
- Quality below the accepted threshold.
- Tool or integration degradation.
- Meaningful cost, latency, or volume deviation.
- Ambiguous cases routed by design.

Each item needs an owner, context, status, and next decision.

### Review as a trend

Use periodic review for:

- Acceptance and edit rate by case type.
- Cost per accepted case.
- Exception mix.
- Approval burden.
- Cycle time.
- Model or workflow-version comparison.
- Adoption and business outcome.
- Repeated issues that suggest a process change.

The review cadence should follow risk, volume, and the agreed support model. Monitoring does not mean that a person watches every run around the clock.

## Turn evidence into an operating loop

Dashboards do not maintain a workflow. People and responsibilities do.

Use a six-step loop:

1. **Observe.** Gather the relevant technical, quality, control, cost, and business evidence.
2. **Evaluate.** Compare it with the accepted standard and current workflow boundary.
3. **Respond.** Follow up on failures, exceptions, questions, and incidents through the defined support path.
4. **Improve.** Test a focused change when evidence shows that the workflow, integration, instruction, or evaluation needs attention.
5. **Record.** Update the current account of material instructions, controls, evaluations, changes, limitations, risks, and next actions.
6. **Review.** Decide what is working, what remains true, and what happens next.

The loop distinguishes maintenance from an untracked prompt edit. A change has a reason, a test, an owner, and a visible result.

When the customer does not want to build this complete function internally, [managed AI services for a production workflow](/services/managed-ai) give evaluation, support, exceptions, documented change, and improvement a defined commercial owner.

## Assign the operating responsibility before launch

Use a responsibility table that names people, not departments alone.

| Responsibility | Typical owner question |
| --- | --- |
| Business standard | Who decides what a useful result is? |
| Workflow policy | Who decides which actions and exceptions are allowed? |
| Instrumentation | Who ensures the relevant events exist and remain usable? |
| Evaluation | Who runs exact checks, reviews samples, and resolves disagreement? |
| Alert response | Who sees each class of signal and by when under the agreed model? |
| Incident decision | Who can stop, contain, communicate, and restart? |
| Change | Who proposes, tests, approves, and records a material update? |
| Cost | Who owns spend and business value together? |
| Decommissioning | Who can remove access and end the workflow safely? |

The process owner retains business policy and final authority. Technical and operating partners can carry implementation, evaluation, and follow-through, but the boundary should be explicit.

## A practical first 30 days for one workflow

The timing below is an operating-review sequence, not a universal implementation promise.

### Before day one

- Confirm the accepted workflow and version.
- Load representative evaluation cases.
- Verify run correlation, tool, approval, error, usage, and cost events.
- Test denied actions, stop path, and alert routing.
- Name the owners and review cadence.

### First production cases

- Review the complete path closely enough to verify instrumentation and assumptions.
- Compare normal and exception cases.
- Confirm that people receive usable approval and escalation context.
- Check that unit cost and latency match the tested range.
- Record limitations rather than hiding them.

### After a representative sample

- Segment quality, exceptions, cost, and cycle time by case type.
- Add important production failures to the regression set.
- Remove noisy signals with no decision attached.
- Adjust thresholds using observed evidence.
- Decide whether to expand, hold, narrow, or stop the launch boundary.

### At the first operating review

- What met the accepted standard?
- What failed or required unexpected human work?
- Did any access, authority, or data assumption change?
- Which change is supported by evidence?
- What remains a known limitation?
- Who owns the next action?

If the review identifies a material redesign, [carry the workflow through controlled implementation](/services/ai-implementation) rather than making a production change with no acceptance path.

## The goal is a useful workflow, not a perfect dashboard

A good monitoring system makes material questions answerable:

- What happened?
- Was the result useful?
- Did the workflow stay within its authority?
- What did the case cost?
- Who needs to respond?
- Is this an isolated issue, a trend, or a changed requirement?
- What should be tested before anything changes?

Start with the evidence required for those decisions. Add detail when the operation demonstrates that it is necessary.

To review an existing or planned workflow, its accepted standard, systems, exception path, and post-launch ownership, [review the operating responsibility](/deploy).

## Frequently asked questions

### What should you monitor for an AI agent?

Monitor availability and latency, the complete execution path, tool and permission behavior, task quality, approvals and exceptions, cost per accepted case, and the business outcome the workflow was built to improve.

### Is AI agent observability the same as monitoring?

Observability is the evidence that helps the team understand internal behavior, often through traces, metrics, logs, and events. Monitoring applies selected signals, thresholds, reviews, and alerts to known operating questions. A managed operating process also decides how to respond and change the workflow.

### How do you evaluate an AI agent in production?

Begin with representative pre-launch cases and acceptance criteria. In production, combine sampled review, exact checks, event-driven review, user feedback, and regression testing before material changes. Segment results by case type and version.

### Which AI agent metrics matter most?

The most useful metric set depends on the workflow. A practical minimum often includes accepted completion, exception rate, approval behavior, tool failures, cost per accepted case, cycle time, and one business outcome.

### Should every agent run be reviewed by a person?

Not necessarily. Review depth should follow consequence, uncertainty, and the accepted operating model. Some actions require approval every time; normal low-consequence cases may be sampled, while failures and unusual events are routed for review.

### How do you monitor AI agent cost?

Attribute model, tool, retrieval, infrastructure, and human-review cost to a completed workflow or task type. Track retries and failed cases separately, and compare cost with accepted quality and business value.

### Who should own monitoring and maintenance after launch?

The business process owner should retain the standard and final authority. Technical and operating owners should be named for instrumentation, evaluation, support, incidents, changes, cost, and decommissioning. An outside managed partner can carry agreed responsibilities, but the division must remain explicit.

---

## Source notes

### Externally supported facts

| Draft statement | Support | Notes |
| --- | --- | --- |
| NIST frames AI risk work as continuous across the lifecycle and includes monitoring, testing/evaluation, incidents, human oversight, and continual improvement in its framework resources. | [NIST AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) and [Playbook](https://airc.nist.gov/airmf-resources/playbook/) | Primary US government sources; the six-step Worktree loop is not presented as NIST's sequence. |
| OpenTelemetry's GenAI conventions include attributes for agent identity/version, workflow, tool calls, evaluation, model, conversation, and usage, with sensitive-data warnings. | [OpenTelemetry GenAI semantic conventions](https://opentelemetry.io/docs/specs/semconv/registry/attributes/gen-ai/), accessed 2026-08-23 | Primary technical specification; the draft notes that conventions are evolving. |
| Granular AI unit costs and business KPIs should be connected and have assigned owners. | [Google Cloud AI and ML cost optimization](https://docs.cloud.google.com/architecture/framework/perspectives/ai-ml/cost-optimization?hl=en), accessed 2026-08-23 | Primary vendor architecture guidance. |
| The current SERP emphasizes traces, tools, errors, cost, quality, and the limits of traditional monitoring. | Linked current result pages above | Competitors support result-composition observations only; their thresholds and metrics are not copied. |
| Related query evidence. | `docs/seo-query-priorities.md`, approved 2026-08-20 | Directional public baseline, not exact monthly volume. |

### Editorial guidance and Worktree-specific posture

- The six monitoring layers, metric table, three signal classes, operating loop, ownership table, and first-30-days sequence are Worktree editorial guidance.
- No claim is made that every run is watched, every event is retained, Worktree supplies 24/7 coverage, or a particular metric threshold is universal.
- Examples are illustrative. They are not customer results or evidence of current Worktree monitoring coverage.
- Worktree-specific service statements follow the approved managed-AI copy and remain subject to its operational sign-offs.

## Suggested anchors

- Parent service: `managed AI services for a production workflow`
- Implementation service: `carry the workflow through controlled implementation`
- Security product: `review the workflow's security and access boundaries`
- Roadmap sibling: `plan monitoring before the implementation reaches production`
- Governance sibling: `connect monitoring to the agent governance decisions`
- Cost sibling: `account for ongoing AI automation cost`
