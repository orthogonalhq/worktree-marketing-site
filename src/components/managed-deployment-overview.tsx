export function ManagedDeploymentOverview() {
  const rows = [
    ["Agent", "Revenue operations", "Operating"],
    ["Workflow", "Account follow-through", "Live"],
    ["Authority", "Scoped credentials", "Controlled"],
    ["Approvals", "2 human checkpoints", "Supervised"],
    ["Evaluation", "Current standard", "Passing"],
  ];

  return (
    <div className="managed-overview" aria-label="Illustrative managed deployment overview">
      <div className="managed-overview-header">
        <div>
          <p>Managed deployment</p>
          <h2>Revenue operations Agent</h2>
        </div>
        <span><i /> Worktree managed</span>
      </div>
      <div className="managed-overview-score">
        <div>
          <span>Production status</span>
          <strong>Healthy</strong>
        </div>
        <div className="managed-overview-pulse" aria-hidden="true">
          <span /><span /><span /><span /><span /><span /><span /><span />
        </div>
      </div>
      <div className="managed-overview-rows">
        {rows.map(([label, value, status]) => (
          <div className="managed-overview-row" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
            <em>{status}</em>
          </div>
        ))}
      </div>
      <div className="managed-overview-footer">
        <span>Last operational review</span>
        <strong>Today · Evidence current</strong>
      </div>
    </div>
  );
}
