# Approved source draft: AI agent governance checklist

Status: Approved and published 2026-08-23
Published slug: `/blog/ai-agent-governance-checklist`
Canonical query owner: This article owns `AI agent governance checklist`. `/product/security` remains the owner of broad `AI agent security`, Worktree-specific control facts, data handling, and product-security intent.

## Editorial brief

- **Primary query:** `AI agent governance checklist`
- **Secondary variants:** `agentic AI governance checklist`; `AI agent governance framework`; `AI agent governance best practices`; `AI agent controls checklist`; `AI agent risk assessment`; `AI agent human oversight`; `AI agent deployment checklist`
- **Search intent:** Informational risk review and production preparation. The reader wants a practical list of decisions and evidence before an agent receives real access or authority.
- **Audience:** Operations, IT, security, risk, legal, product, and functional leaders at established mid-market businesses.
- **Funnel stage:** Consideration and pre-deployment validation.
- **Primary parent:** `/product/security`

## SERP and competitor findings

Reviewed for US results on 2026-08-23.

- The exact-match SERP is active and unusually recent. It includes [Red Brick Labs' operations-leader checklist, published May 26, 2026](https://www.redbricklabs.io/blog/ai-agent-governance-checklist-for-operations-leaders), [Remova's pre-production checklist, published April 30, 2026](https://www.remova.org/blog/ai-agent-governance-checklist), and [Handover's interactive review tool, accessed August 23, 2026](https://handover.sh/tools/ai-agent-governance-checklist).
- Common checklist items are inventory, ownership, identity, permissions, tool boundaries, human approval, logging, monitoring, incident response, rollback, vendor responsibility, and offboarding.
- Many ranking pages use compliance-adjacent language without tying each control to a specific workflow action or citing primary standards. The authoritative backdrop is stronger than the average article: NIST provides risk-management guidance, and OWASP released a dedicated Top 10 for Agentic Applications in December 2025.
- The approved public baseline shows the importance of maintaining the modifier boundary: `AI agent security` had a 32 relative average, while `AI agent governance` had 9 in the US authority comparison. The broad security phrase belongs to `/product/security`; the checklist modifier creates a distinct informational job.

## Cannibalization and internal-link plan

The article teaches a review method. It does not restate Worktree's full product-security posture, target `AI agent security` in its title or H1, or imply certification or framework compliance.

Recommended links in reading order:

1. `/product/security` after the six plain questions — anchor: `Worktree's security and access controls`.
2. Sibling `/blog/ai-implementation-roadmap` in the design-before-build section — anchor: `place the controls in the implementation roadmap`.
3. `/services/ai-implementation` when the reader needs execution — anchor: `implement the workflow and its control boundaries`.
4. Sibling `/blog/monitor-ai-agents-in-production` in evidence and response — anchor: `monitor the agent in production`.
5. `/services/managed-ai` in the change and operating-ownership section — anchor: `keep the accepted controls current after launch`.
6. Sibling `/blog/ai-automation-cost` in the planning close — anchor: `include control work in the automation cost estimate`.
7. `/deploy` after the checklist — anchor: `review the workflow, systems, access, and authority`.

## Proposed search fields

- **Title tag:** AI Agent Governance Checklist for Production
- **Meta description:** Review an AI agent's purpose, owner, data, tools, permissions, approvals, evaluation, evidence, incident path, changes, and removal before launch.
- **H1:** An AI agent governance checklist built around the work.

## Proposed outline

1. Governance begins with six plain questions.
2. How to use the checklist without mistaking it for compliance.
3. The twelve-part pre-production checklist.
4. A simple action-and-approval matrix.
5. What evidence should exist before launch.
6. What must stay current after launch.
7. FAQ.

## FAQ candidates

- What is AI agent governance?
- Why do AI agents need different controls from chatbots?
- What should be in an AI agent inventory?
- Which AI agent actions need human approval?
- How should prompt injection risk be handled?
- What should an AI agent audit trail contain?
- Is this checklist enough for compliance?

---

# An AI agent governance checklist built around the work.

AI agent governance becomes practical when it answers six questions about one real job:

1. What starts the work?
2. What can the agent see?
3. What can it do?
4. What requires a person?
5. How will the team know when it is wrong or outside scope?
6. How can the work be stopped, recovered, or removed?

Those questions turn governance from a policy statement into an operating design.

An agent that only prepares an internal draft has a different control surface from one that can update customer records, send messages, approve an exception, or trigger downstream work. The checklist should follow that difference. It should become more demanding as the data, authority, irreversibility, and impact increase.

## What this checklist can and cannot do

This guide is a practical review for one agent-enabled workflow. It is not a certification, legal opinion, security guarantee, or substitute for sector-specific requirements.

NIST's AI Risk Management Framework is voluntary and use-case agnostic. Its Generative AI Profile notes that organizations may apply or revise existing risk tiers for generative AI and may need additional human review, tracking, documentation, and management oversight. See the [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework) and [Generative AI Profile](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf).

OWASP's Top 10 for Agentic Applications adds an agent-specific security view. The project highlights risks including behavior hijacking, tool misuse, and identity or privilege abuse. See the [OWASP release and supporting resources](https://genai.owasp.org/2025/12/09/owasp-genai-security-project-releases-top-10-risks-and-mitigations-for-agentic-ai-security/).

Use those resources with the organization's existing security, privacy, legal, procurement, and risk practices. Use this checklist to make one deployment discussable.

## 1. Name the purpose, owner, and prohibited uses

Write the agent's job in operational terms.

Record:

- The workflow name and purpose.
- The event that starts it.
- The intended users and affected people.
- The business process owner.
- The technical owner.
- The person or team with final authority.
- Explicit out-of-scope and prohibited uses.

Avoid descriptions such as “general operations assistant.” A useful scope is narrower:

> Prepare a customer review packet from approved account and project sources; route commercial exceptions to the account owner; do not send externally or change commercial terms.

The named owner is accountable for the workflow's result and policy. The technical owner is accountable for the implementation and system path. They may collaborate closely, but one should not silently inherit the other's decisions.

**Evidence to retain:** approved use statement, owners, review date, and exclusions.

## 2. Classify the consequence, not the novelty

Do not assign risk because the system is called an agent. Examine what can happen.

Consider:

- Sensitivity of the data it can reach.
- Whether it can identify or affect a person.
- Whether it can create financial, contractual, legal, safety, employment, or customer consequences.
- Whether an action is reversible.
- How quickly an error could repeat.
- Whether the result reaches outside the organization.
- How much independent action the workflow permits.
- Whether existing policies or legal requirements already govern the activity.

The classification should determine the depth of testing, review, approval, monitoring, and response—not become a label with no operational effect.

**Evidence to retain:** consequence assessment, rationale, and the controls that follow from it.

## 3. Inventory the systems and data sources

List every source the agent can search, read, receive, or infer from.

For each one, record:

- The system or data owner.
- The approved records, workspaces, or fields.
- The source of truth when information conflicts.
- Data sensitivity and relevant handling rules.
- Required freshness.
- Retention and deletion expectations.
- Whether the content can include instructions from an untrusted party.

Do not treat search as harmless. If a user cannot open a restricted record directly, an agent should not reveal its title, summary, or metadata through retrieval.

**Evidence to retain:** data-source register, access decision, and a denied-access test.

## 4. Give the agent a distinct identity and bounded credentials

An agent's actions should not disappear behind a shared human account.

Where the selected systems support it, use a distinct, single-purpose identity or delegated connection. Scope credentials to the workflow, store them outside prompts and ordinary content, define who owns rotation, and make removal possible.

Review:

- Which identity performs each tool call.
- Whether read and write access can be separated.
- Whether environments are separated.
- How credentials are issued, stored, rotated, and revoked.
- What happens to scheduled work when access is removed.

**Evidence to retain:** identity record, credential owner, granted scopes, last review, and tested revocation path.

## 5. Define allowed tools, actions, and limits

List what the agent may do, not only the applications it can open.

A system connection might allow hundreds of operations. The workflow may need three.

Classify actions as:

| Action class | Example | Default review question |
| --- | --- | --- |
| Read | Retrieve selected account fields | Is every field needed for this job? |
| Prepare | Draft a review brief | Who checks quality before use? |
| Change | Update an internal status | Is the field, value, and condition bounded? |
| Submit | Send, publish, approve, spend, delete, or trigger | What authorization is required before execution? |
| Stop | Refuse or route an exception | Does the right person receive enough context to act? |

Add budgets and stopping conditions for loops, retries, fan-out, time, volume, and spend where relevant. Tool descriptions and prompts are not enforcement by themselves; validate the boundary at the execution layer available in the selected system.

**Evidence to retain:** tool-and-action matrix, enforced limits, and negative tests for denied operations.

## 6. Treat external content as input, not authority

An agent may encounter instructions inside emails, documents, web pages, tickets, retrieved records, or tool output. That content may be irrelevant, malicious, or simply inconsistent with the agent's approved role.

OWASP's agentic guidance highlights behavior hijacking and tool misuse because an agent can turn untrusted content into real actions. The practical response is layered:

- Keep system and workflow instructions separate from retrieved content.
- Identify untrusted sources and constrain what they can influence.
- Validate tool arguments and destinations before execution.
- Require approval for consequential actions.
- Limit credentials and available tools so a manipulated instruction has less reach.
- Test known injection patterns and out-of-scope requests.
- Stop or route cases when the source and instruction conflict.

No prompt can carry the whole security design. The boundary must also exist in identity, permissions, tool policy, approval, and monitoring.

**Evidence to retain:** threat scenarios, injection and tool-misuse tests, and the observed result.

## 7. Place human approval at the consequential action

“Human in the loop” is not specific enough.

For every action with material consequence, decide whether a person must:

- Review the prepared output.
- Confirm the target and action.
- Supply missing judgment.
- Approve an exception.
- Authorize a higher limit or broader scope.

An approval packet should show the relevant context, proposed action, source, reason for escalation, and available choices. Approval should be attributable and limited to the action being authorized, not a blanket permission for future cases.

Also define the timeout and rejection path. A workflow that waits forever or interprets silence as approval has not preserved human authority.

**Evidence to retain:** approval matrix, reviewer roles, approval record, expiry, rejection path, and tests.

## 8. Define representative evaluation cases

The team needs a shared answer to “Did it work?”

Build an evaluation set from real workflow patterns:

- Normal cases.
- Difficult variations.
- Missing or stale information.
- Contradictory sources.
- Out-of-scope requests.
- Unauthorized actions.
- Tool failure or partial completion.
- Content intended to redirect the agent.
- Cases that require human judgment.

For each case, state the expected action, required approval, unacceptable result, and review method. Some checks can be exact; others require a trained reviewer using a clear rubric.

Place this work in the [AI implementation roadmap](/blog/ai-implementation-roadmap) before production rather than treating governance as a final sign-off.

**Evidence to retain:** versioned evaluation set, results, reviewer, known limitations, and acceptance decision.

## 9. Record the events needed to understand material action

Logging everything is neither necessary nor automatically safe. Logging nothing makes review impossible.

Choose evidence based on the workflow. A material execution may need:

- Workflow, agent, and version identifier.
- Trigger and initiating identity.
- References to the context used.
- Tools called and action outcomes.
- Approval, rejection, or exception.
- Material output or destination.
- Evaluation result where applied.
- Errors, retries, and stop reason.
- Timestamp and correlation identifier.

Decide how sensitive prompts, content, tool arguments, and results are filtered or protected. OpenTelemetry's current generative-AI conventions include attributes for agent identity and version, conversations, tool calls, evaluation scores, and usage, while warning that some recorded fields can contain sensitive information. See the [OpenTelemetry GenAI semantic conventions](https://opentelemetry.io/docs/specs/semconv/registry/attributes/gen-ai/).

Evidence should serve a decision: verify an action, trace an exception, investigate an incident, evaluate quality, allocate cost, or support deletion. Retention follows that purpose and the organization's requirements.

**Evidence to retain:** event schema, sensitive-data handling decision, access to logs, retention period, and sample record.

## 10. Prepare the stop, response, and recovery path

Before launch, decide how to contain a problem.

The response plan should name:

- Who can disable the workflow or revoke access.
- Which schedules, queues, or downstream actions must stop.
- How affected actions are identified.
- How evidence is preserved without increasing exposure.
- Who assesses business, technical, security, privacy, and legal impact.
- How an incorrect change is corrected or rolled back where possible.
- How affected people are informed when required.
- What tests are required before restart.

Run a stop test. A recovery path that exists only in a diagram is still an assumption.

**Evidence to retain:** contact path, containment steps, stop result, recovery result, and restart authority.

## 11. Control material changes after acceptance

An accepted workflow can change when its prompt, model, tools, source data, permissions, policy, volume, or business purpose changes.

Define which changes require:

- A version update.
- Regression evaluation.
- Security or privacy review.
- Process-owner approval.
- A staged release.
- Updated user communication.
- A new commercial or implementation scope.

The original evaluation set should remain a reference point, with new production failures added where they represent a useful future test. [Monitoring the agent in production](/blog/monitor-ai-agents-in-production) supplies the evidence that tells the team when a change is needed.

If an outside partner owns evaluation, response, and documented change, make that responsibility explicit. Worktree's [managed AI service keeps accepted controls current after launch](/services/managed-ai) within the agreed workflow and support model.

**Evidence to retain:** current version, material-change history, evaluation result, approver, known limitation, and next review.

## 12. Define offboarding and removal

Governance includes the end of the workflow.

Plan how to:

- Stop scheduled and event-driven work.
- Revoke identities, credentials, and delegated access.
- Remove the agent from groups and workspaces.
- Address queued or partially completed actions.
- Transfer necessary records and operating knowledge.
- Apply agreed retention and verified deletion processes.
- Confirm that downstream connections no longer accept the identity.
- Notify owners that the workflow is no longer active.

Test the removal path before it is urgent.

**Evidence to retain:** offboarding owner, access-removal checklist, data decision, completion record, and unresolved dependency.

## The pre-production review table

Use this table to make gaps visible. `Not applicable` should include a reason.

| Area | Decision | Evidence | Owner | Status |
| --- | --- | --- | --- | --- |
| Purpose | Job, users, exclusions | Approved use statement | Business owner |  |
| Consequence | Impact and reversibility | Risk rationale | Risk/process owner |  |
| Data | Sources and handling | Source register and denied test | Data owner |  |
| Identity | Account and credentials | Scope and revocation test | Technical owner |  |
| Tools | Allowed actions and limits | Enforced matrix and negative tests | Technical owner |  |
| Untrusted input | Injection and misuse paths | Threat cases and results | Security/technical owner |  |
| Approval | Human authority | Approval tests and records | Business owner |  |
| Evaluation | Accepted behavior | Versioned cases and results | Process owner |  |
| Evidence | Reviewable events | Schema, sample, retention decision | Operations/security |  |
| Response | Stop and recover | Exercise result | Incident owner |  |
| Change | Retest and approval | Version and change record | Joint owners |  |
| Removal | Offboard and delete | Completion record | Joint owners |  |

The purpose is not to make every row green at any cost. It is to ensure that a deliberate owner sees and accepts what remains unresolved before the agent receives production authority.

## Where Worktree's product-security page fits

This checklist is general guidance. It does not state which controls Worktree has implemented for every possible deployment.

[Worktree's security and access controls](/product/security) provide the factual product-specific answer: how Worktree currently describes workflow scope, credential boundaries, authority, human review, operating evidence, data handling, and access removal. The exact design still depends on the selected workflow and systems.

When the checklist reveals that the workflow needs hands-on integration and control design, [implement the workflow and its control boundaries](/services/ai-implementation). Include that work when you [estimate the AI automation cost](/blog/ai-automation-cost). To discuss one proposed workflow, [review the workflow, systems, access, and authority](/deploy).

## Frequently asked questions

### What is AI agent governance?

AI agent governance is the set of decisions, owners, controls, and evidence that define what an agent is for, what it can access and do, when people must act, how operation is evaluated, and how the workflow is changed or removed.

### Why do AI agents need different controls from chatbots?

An agent may use tools and take actions across systems rather than only produce text for a person. That adds identity, permission, tool-use, approval, evidence, and recovery questions. The control depth should follow the actual capability and consequence.

### What should be in an AI agent inventory?

At minimum: name, purpose, business owner, technical owner, users, environment, model or provider where relevant, data sources, tools, identities, permissions, approval paths, current version, risk decision, and operating status.

### Which AI agent actions need human approval?

The answer depends on business policy and consequence. External communication, spending, deletion, access changes, contractual commitments, exceptions, and high-impact record changes commonly warrant explicit review. The workflow should classify each material action rather than apply one generic rule.

### How should prompt-injection risk be handled?

Use layers: treat external content as untrusted, separate instructions from retrieved data, validate tool calls, narrow permissions, require approval for consequential actions, test attack patterns, monitor behavior, and provide a stop path. A stronger prompt alone is not a complete control.

### What should an AI agent audit trail contain?

Retain the evidence needed for the workflow's decisions, such as identity and version, trigger, relevant context references, tool calls, approvals, action outcomes, exceptions, evaluation, and stop reason. Protect sensitive content and set retention according to purpose and applicable requirements.

### Is this checklist enough for compliance?

No. It is an operational review aid. Legal, regulatory, contractual, privacy, security, and sector requirements must be assessed by the appropriate qualified owners for the specific organization and use case.

---

## Source notes

### Externally supported facts

| Draft statement | Support | Notes |
| --- | --- | --- |
| NIST provides a voluntary, use-case-agnostic AI risk framework and a GenAI Profile that discusses risk tiering, human review, tracking, documentation, and oversight. | [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework) and [NIST AI 600-1](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf) | Primary US government sources. |
| OWASP's Top 10 for Agentic Applications highlights behavior hijacking, tool misuse, and identity/privilege abuse among agentic risks. | [OWASP GenAI Security Project release, 2025-12-10](https://genai.owasp.org/2025/12/09/owasp-genai-security-project-releases-top-10-risks-and-mitigations-for-agentic-ai-security/) | Primary OWASP project source. |
| OpenTelemetry defines GenAI attributes for agent identity/version, conversation, tool calls, evaluation, and usage and warns that some content may be sensitive. | [OpenTelemetry GenAI semantic conventions](https://opentelemetry.io/docs/specs/semconv/registry/attributes/gen-ai/), accessed 2026-08-23 | Primary technical specification; the page marks several conventions as moved/development, so the draft treats them as examples, not stable requirements. |
| SERP composition and query relationship. | Linked current result pages above and `docs/seo-query-priorities.md` | Competitors support search-format observations only. |

### Editorial guidance and Worktree-specific posture

- The twelve-part checklist, action classes, evidence examples, review table, and suggested operating decisions are Worktree editorial guidance synthesized from the cited primary sources and approved brand posture.
- The article does not claim that following the checklist creates compliance, security, certification, or a risk-free deployment.
- Worktree-specific security facts are intentionally summarized only at link depth; `/product/security` remains authoritative.
- Examples are illustrative and do not represent customer deployments.

## Suggested anchors

- Parent product: `Worktree's security and access controls`
- Implementation service: `implement the workflow and its control boundaries`
- Managed service: `keep the accepted controls current after launch`
- Roadmap sibling: `place the controls in the implementation roadmap`
- Monitoring sibling: `monitor the agent in production`
- Cost sibling: `include control work in the automation cost estimate`
