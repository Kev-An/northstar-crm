"use client";

import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { brand } from "@/config/brand";
import { activities, companies, contacts as initialContacts, deals as initialDeals, formatCurrency, monthlyRevenue, stageOrder, type Contact, type Deal, type DealStage } from "@/lib/demo-data";

type PageKey = "Overview" | "Leads" | "Contacts" | "Companies" | "Deals" | "Activities";
type IconName = "grid" | "users" | "building" | "target" | "activity" | "chart" | "settings" | "help" | "search" | "plus" | "chevron" | "calendar" | "filter" | "download" | "dots" | "arrow-up" | "arrow-right" | "mail" | "phone" | "note" | "spark" | "close" | "check" | "clock" | "bell" | "menu";

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true as const };
  const paths: Record<IconName, ReactNode> = {
    grid: <><rect x="3.5" y="3.5" width="7" height="7" rx="2" /><rect x="13.5" y="3.5" width="7" height="7" rx="2" /><rect x="3.5" y="13.5" width="7" height="7" rx="2" /><rect x="13.5" y="13.5" width="7" height="7" rx="2" /></>,
    users: <><path d="M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20" /><circle cx="10" cy="7" r="3.5" /><path d="M16 4.2a3.5 3.5 0 0 1 0 6.7M19 15a3.5 3.5 0 0 1 2 3.2V20" /></>,
    building: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M9 21v-4h6v4M8 7h1m6 0h1M8 11h1m6 0h1" /></>,
    target: <><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.8" /><circle cx="12" cy="12" r="1" /></>,
    activity: <><path d="M3 12h4l3-8 4 16 3-8h4" /></>,
    chart: <><path d="M4 19.5h16M6.5 16V11m5 5V5m5 11V8" /><path d="m5 8 5-3 5 2 4-4" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="m19.4 15 .1.1a1.8 1.8 0 0 1-2.5 2.5l-.1-.1a1.8 1.8 0 0 0-3 .9v.2a1.8 1.8 0 0 1-3.6 0v-.2a1.8 1.8 0 0 0-3-.9l-.1.1a1.8 1.8 0 1 1-2.5-2.5l.1-.1a1.8 1.8 0 0 0-.9-3h-.2a1.8 1.8 0 0 1 0-3.6h.2a1.8 1.8 0 0 0 .9-3l-.1-.1a1.8 1.8 0 1 1 2.5-2.5l.1.1a1.8 1.8 0 0 0 3-.9v-.2a1.8 1.8 0 0 1 3.6 0v.2a1.8 1.8 0 0 0 3 .9l.1-.1a1.8 1.8 0 1 1 2.5 2.5l-.1.1a1.8 1.8 0 0 0 .9 3h.2a1.8 1.8 0 0 1 0 3.6h-.2a1.8 1.8 0 0 0-.9 3Z" /></>,
    help: <><circle cx="12" cy="12" r="9" /><path d="M9.6 9a2.5 2.5 0 1 1 4.7 1.2c-.7 1.1-2.3 1.5-2.3 3" /><path d="M12 17.5h.01" /></>,
    search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    chevron: <><path d="m7 10 5 5 5-5" /></>,
    calendar: <><rect x="3.5" y="5" width="17" height="16" rx="2" /><path d="M7.5 3v4m9-4v4M4 9.5h16" /></>,
    filter: <><path d="M4 6h16M7 12h10m-7 6h4" /></>,
    download: <><path d="M12 3v12m-4-4 4 4 4-4" /><path d="M5 16v4h14v-4" /></>,
    dots: <><circle cx="5" cy="12" r=".8" fill="currentColor" /><circle cx="12" cy="12" r=".8" fill="currentColor" /><circle cx="19" cy="12" r=".8" fill="currentColor" /></>,
    "arrow-up": <><path d="M7 17 17 7M8 7h9v9" /></>,
    "arrow-right": <><path d="M4 12h15m-6-6 6 6-6 6" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
    phone: <><path d="M7 3H4.5A1.5 1.5 0 0 0 3 4.5C3 13.6 10.4 21 19.5 21a1.5 1.5 0 0 0 1.5-1.5V17l-4.5-2-2 2a14 14 0 0 1-7-7l2-2L7 3Z" /></>,
    note: <><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z" /><path d="M14 3v6h6M8 13h8m-8 4h8" /></>,
    spark: <><path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3Z" /><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    check: <><path d="m5 12 4 4L19 6" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    bell: <><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></>,
    menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
  };
  return <svg {...common}>{paths[name]}</svg>;
}

function Avatar({ initials, color, size = "md" }: { initials: string; color: string; size?: "sm" | "md" | "lg" }) {
  return <span className={`avatar avatar-${size}`} style={{ backgroundColor: color }}>{initials}</span>;
}

function BrandMark() {
  return <span className="brand-mark" aria-hidden="true"><span /><span /><span /><span /></span>;
}

const navItems: { label: PageKey; icon: IconName; count?: string }[] = [
  { label: "Overview", icon: "grid" },
  { label: "Leads", icon: "spark", count: "12" },
  { label: "Contacts", icon: "users" },
  { label: "Companies", icon: "building" },
  { label: "Deals", icon: "target" },
  { label: "Activities", icon: "activity" },
];

export default function CrmShell() {
  const [activePage, setActivePage] = useState<PageKey>("Overview");
  const [contacts, setContacts] = useState(initialContacts);
  const [deals, setDeals] = useState(initialDeals);
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState<"contact" | "deal" | null>(null);
  const [toast, setToast] = useState("");
  const [mobileNav, setMobileNav] = useState(false);
  const [range, setRange] = useState("Last 12 months");
  const [contactFilter, setContactFilter] = useState("All contacts");

  const normalizedQuery = query.trim().toLowerCase();
  const visibleContacts = useMemo(() => contacts.filter((item) => {
    const matches = !normalizedQuery || `${item.name} ${item.company} ${item.email} ${item.role}`.toLowerCase().includes(normalizedQuery);
    const matchesFilter = contactFilter === "All contacts" || item.status === contactFilter.slice(0, -1);
    return matches && matchesFilter;
  }), [contacts, normalizedQuery, contactFilter]);
  const visibleDeals = useMemo(() => deals.filter((item) => !normalizedQuery || `${item.name} ${item.company} ${item.owner} ${item.stage}`.toLowerCase().includes(normalizedQuery)), [deals, normalizedQuery]);
  const visibleCompanies = useMemo(() => companies.filter((item) => !normalizedQuery || `${item.name} ${item.domain} ${item.category}`.toLowerCase().includes(normalizedQuery)), [normalizedQuery]);
  const searchMatches = normalizedQuery ? [
    ...contacts.filter((item) => `${item.name} ${item.company} ${item.email}`.toLowerCase().includes(normalizedQuery)).slice(0, 3).map((item) => ({ title: item.name, subtitle: `${item.company} · Contact`, page: "Contacts" as PageKey, initials: item.initials, color: item.color })),
    ...deals.filter((item) => `${item.name} ${item.company}`.toLowerCase().includes(normalizedQuery)).slice(0, 2).map((item) => ({ title: item.name, subtitle: `${item.company} · Deal`, page: "Deals" as PageKey, initials: item.initials, color: item.color })),
    ...companies.filter((item) => `${item.name} ${item.domain}`.toLowerCase().includes(normalizedQuery)).slice(0, 2).map((item) => ({ title: item.name, subtitle: `${item.domain} · Company`, page: "Companies" as PageKey, initials: item.initials, color: item.color })),
  ].slice(0, 6) : [];

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  }

  useEffect(() => {
    let timer: number | undefined;
    const onToast = (event: Event) => {
      const message = (event as CustomEvent<string>).detail;
      if (message) {
        setToast(message);
        window.clearTimeout(timer);
        timer = window.setTimeout(() => setToast(""), 2600);
      }
    };
    window.addEventListener("crm-toast", onToast);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("crm-toast", onToast);
    };
  }, []);

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "New contact");
    const company = String(formData.get("company") || "New company");
    const email = String(formData.get("email") || "");
    const role = String(formData.get("role") || "New contact");
    const initials = name.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase();
    setContacts((current) => [{ id: Date.now(), name, company, email, role, initials, color: "#e3e7ff", status: "Lead", owner: "Sofia Chen", lastActive: "Just now" }, ...current]);
    setModal(null);
    setActivePage("Contacts");
    notify(`${name} added to your contacts`);
  }

  function submitDeal(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "New opportunity");
    const company = String(formData.get("company") || "New company");
    const value = Number(formData.get("value") || 0);
    const stage = String(formData.get("stage") || "Qualification") as DealStage;
    setDeals((current) => [{ id: Date.now(), name, company, value, stage, owner: "Sofia Chen", due: "Oct 30, 2026", initials: company[0]?.toUpperCase() || "N", color: "#edf0ff" }, ...current]);
    setModal(null);
    setActivePage("Deals");
    notify(`${name} added to your pipeline`);
  }

  function handleExport() {
    const rows = activePage === "Deals" ? deals : contacts;
    const header = activePage === "Deals" ? "Name,Company,Value,Stage,Owner" : "Name,Role,Company,Email,Status,Owner";
    const body = rows.map((row) => "stage" in row
      ? [row.name, row.company, row.value, row.stage, row.owner].map(csv).join(",")
      : [row.name, row.role, row.company, row.email, row.status, row.owner].map(csv).join(",")).join("\n");
    const blob = new Blob([`${header}\n${body}`], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${activePage.toLowerCase()}-export.csv`;
    link.click();
    URL.revokeObjectURL(url);
    notify(`${activePage} exported as CSV`);
  }

  return (
    <main className="app-frame" style={{ ["--accent" as string]: brand.accent }}>
      <aside className={`sidebar ${mobileNav ? "sidebar-open" : ""}`}>
        <div className="sidebar-top">
          <div className="brand-lockup"><BrandMark /><span>{brand.name}<small>{brand.product}</small></span></div>
          <button className="mobile-close icon-button" onClick={() => setMobileNav(false)} aria-label="Close navigation"><Icon name="close" /></button>
          <button className="workspace-switcher" onClick={() => notify("Workspace switcher is ready for multi-workspace support")}>
            <Avatar initials="O" color="#e7e8ff" size="sm" />
            <span><strong>{brand.workspace}</strong><small>Free workspace</small></span>
            <Icon name="chevron" size={15} />
          </button>
          <div className="nav-section-label">WORKSPACE</div>
          <nav className="primary-nav" aria-label="Workspace navigation">
            {navItems.map(({ label, icon, count }) => <button key={label} className={`nav-link ${activePage === label ? "active" : ""}`} onClick={() => { setActivePage(label); setMobileNav(false); }}>
              <Icon name={icon} /><span>{label}</span>{count && <small className="nav-count">{count}</small>}
            </button>)}
          </nav>
          <div className="nav-section-label tools-label">TOOLS</div>
          <button className="nav-link" onClick={() => notify("Reporting is on the product roadmap")}><Icon name="chart" /><span>Reports</span><span className="soon-tag">Soon</span></button>
          <button className="nav-link" onClick={() => notify("Workspace settings are on the product roadmap")}><Icon name="settings" /><span>Settings</span></button>
        </div>
        <div className="sidebar-bottom">
          <div className="upgrade-card"><div className="upgrade-icon"><Icon name="spark" size={15} /></div><strong>Make room to grow</strong><p>Unlock more seats and smarter workflows.</p><button onClick={() => notify("Plan upgrades will be available in a future release")}>Explore plans <Icon name="arrow-right" size={14} /></button></div>
          <button className="nav-link help-link" onClick={() => notify("Help center coming soon")}><Icon name="help" /><span>Help center</span><span className="help-shortcut">?</span></button>
          <div className="profile-row"><Avatar initials="SC" color="#e7dcff" /><span><strong>Sofia Chen</strong><small>sofia@orbit.studio</small></span><button className="icon-button profile-menu" aria-label="Profile menu" onClick={() => notify("Profile settings coming soon")}><Icon name="dots" /></button></div>
        </div>
      </aside>

      <section className="main-column">
        <header className="topbar">
          <div className="breadcrumbs"><button className="mobile-menu icon-button" onClick={() => setMobileNav(true)} aria-label="Open navigation"><Icon name="menu" /></button><span>{brand.workspace}</span><span className="breadcrumb-slash">/</span><strong>{activePage}</strong></div>
          <div className="topbar-actions">
            <div className="search-wrap"><label className="search-box"><Icon name="search" size={17} /><input aria-label="Search" placeholder="Search anything..." value={query} onChange={(event) => setQuery(event.target.value)} /><kbd>⌘ K</kbd></label>{normalizedQuery && <div className="search-results">{searchMatches.length ? searchMatches.map((item, index) => <button key={`${item.subtitle}-${index}`} onClick={() => setActivePage(item.page)}><Avatar initials={item.initials} color={item.color} size="sm" /><span><strong>{item.title}</strong><small>{item.subtitle}</small></span><Icon name="arrow-right" size={14} /></button>) : <p>No matches yet</p>}</div>}</div>
            <button className="icon-button notification-button" aria-label="Notifications" onClick={() => notify("You're all caught up")}><Icon name="bell" size={18} /><span /></button>
            <Avatar initials="SC" color="#e7dcff" size="sm" />
          </div>
        </header>

        <div className="page-content">
          {activePage === "Overview" && <Overview deals={deals} onNavigate={setActivePage} onNewDeal={() => setModal("deal")} onExport={handleExport} range={range} setRange={setRange} />}
          {activePage === "Contacts" && <ContactsView contacts={visibleContacts} filter={contactFilter} setFilter={setContactFilter} onAdd={() => setModal("contact")} onExport={handleExport} query={query} />}
          {activePage === "Leads" && <LeadsView contacts={visibleContacts.filter((item) => item.status === "Lead" || item.status === "Prospect")} onAdd={() => setModal("contact")} onExport={handleExport} query={query} />}
          {activePage === "Companies" && <CompaniesView companies={visibleCompanies} query={query} onAdd={() => notify("Add company is coming soon")} />}
          {activePage === "Deals" && <DealsView deals={visibleDeals} onAdd={() => setModal("deal")} onExport={handleExport} query={query} />}
          {activePage === "Activities" && <ActivitiesView />}
        </div>
      </section>

      {modal && <Modal title={modal === "contact" ? "Add a contact" : "Create a deal"} subtitle={modal === "contact" ? "Add a person to your workspace." : "Start tracking a new opportunity."} onClose={() => setModal(null)}>
        {modal === "contact" ? <form className="modal-form" onSubmit={submitContact}>
          <label>Full name<input name="name" placeholder="e.g. Alex Morgan" required autoFocus /></label>
          <label>Email address<input name="email" placeholder="alex@company.com" type="email" required /></label>
          <div className="form-split"><label>Job title<input name="role" placeholder="e.g. Product Lead" /></label><label>Company<input name="company" placeholder="Company name" /></label></div>
          <div className="modal-actions"><button type="button" className="button button-quiet" onClick={() => setModal(null)}>Cancel</button><button className="button button-primary" type="submit"><Icon name="plus" size={16} /> Add contact</button></div>
        </form> : <form className="modal-form" onSubmit={submitDeal}>
          <label>Deal name<input name="name" placeholder="e.g. Annual platform plan" required autoFocus /></label>
          <label>Company<input name="company" placeholder="Company name" required /></label>
          <div className="form-split"><label>Deal value<input name="value" type="number" min="0" placeholder="12,000" required /></label><label>Pipeline stage<select name="stage" defaultValue="Qualification"><option>Qualification</option><option>Proposal</option><option>Negotiation</option></select></label></div>
          <div className="modal-actions"><button type="button" className="button button-quiet" onClick={() => setModal(null)}>Cancel</button><button className="button button-primary" type="submit"><Icon name="plus" size={16} /> Create deal</button></div>
        </form>}
      </Modal>}
      {toast && <div className="toast"><span className="toast-check"><Icon name="check" size={14} /></span>{toast}</div>}
    </main>
  );
}

function csv(value: string | number) { return `"${String(value).replaceAll('"', '""')}"`; }

function PageHeading({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: ReactNode }) {
  return <div className="page-heading"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div><div className="heading-actions">{children}</div></div>;
}

function Button({ children, onClick, variant = "secondary", icon }: { children: ReactNode; onClick: () => void; variant?: "secondary" | "primary" | "quiet"; icon?: IconName }) {
  return <button className={`button button-${variant}`} onClick={onClick}>{icon && <Icon name={icon} size={16} />}{children}</button>;
}

function Overview({ deals, onNavigate, onNewDeal, onExport, range, setRange }: { deals: Deal[]; onNavigate: (page: PageKey) => void; onNewDeal: () => void; onExport: () => void; range: string; setRange: (range: string) => void }) {
  const pipelineTotal = deals.reduce((total, deal) => total + deal.value, 0);
  return <>
    <PageHeading eyebrow="FRIDAY, OCTOBER 9, 2026" title="Good morning, Sofia ✨" description="Here's what's happening across your workspace today.">
      <Button onClick={onExport} icon="download">Export</Button><Button onClick={onNewDeal} variant="primary" icon="plus">New deal</Button>
    </PageHeading>
    <section className="metric-grid" aria-label="Key metrics">
      <MetricCard label="Total revenue" value="$284,560" change="12.8%" detail="vs. last month" icon="chart" tone="lavender" chart={[36, 44, 40, 52, 48, 63, 59, 76]} />
      <MetricCard label="Active deals" value="48" change="8.2%" detail="vs. last month" icon="target" tone="mint" chart={[32, 40, 38, 48, 42, 58, 55, 70]} />
      <MetricCard label="New contacts" value="126" change="18.4%" detail="vs. last month" icon="users" tone="peach" chart={[24, 30, 28, 42, 38, 52, 58, 76]} />
      <MetricCard label="Win rate" value="34.6%" change="4.3%" detail="vs. last month" icon="activity" tone="blue" chart={[33, 38, 35, 49, 44, 56, 62, 74]} />
    </section>
    <section className="dashboard-grid">
      <div className="panel revenue-panel">
        <div className="panel-heading"><div><h2>Revenue over time</h2><p>Track your performance against targets</p></div><div className="select-wrap"><select aria-label="Revenue time range" value={range} onChange={(event) => setRange(event.target.value)}><option>Last 12 months</option><option>Last 6 months</option><option>This year</option></select><Icon name="chevron" size={14} /></div></div>
        <div className="chart-legend"><span><i className="legend-dot actual" /> Revenue</span><span><i className="legend-dot target" /> Target</span></div>
        <RevenueChart />
        <div className="chart-foot"><span>Jan 2026</span><span>Jun 2026</span><span>Dec 2026</span></div>
      </div>
      <div className="panel pipeline-panel">
        <div className="panel-heading"><div><h2>Pipeline overview</h2><p>Deal value by stage</p></div><button className="icon-button small-dots" aria-label="Pipeline options"><Icon name="dots" /></button></div>
        <div className="pipeline-total"><strong>{formatCurrency(pipelineTotal)}</strong><span><i className="legend-dot actual" /> Total pipeline</span></div>
        <div className="pipeline-bars">{stageOrder.map((stage, index) => {
          const amount = deals.filter((item) => item.stage === stage).reduce((sum, item) => sum + item.value, 0);
          const max = Math.max(...stageOrder.map((name) => deals.filter((item) => item.stage === name).reduce((sum, item) => sum + item.value, 0)));
          return <div className="pipeline-row" key={stage}><div className="pipeline-row-label"><span>{stage}</span><strong>{formatCurrency(amount)}</strong></div><div className="pipeline-track"><span className={`stage-fill stage-${index}`} style={{ width: `${Math.max(12, amount / max * 100)}%` }} /></div></div>;
        })}</div>
        <button className="panel-link" onClick={() => onNavigate("Deals")}>View pipeline <Icon name="arrow-right" size={15} /></button>
      </div>
    </section>
    <section className="bottom-grid">
      <div className="panel deals-panel">
        <div className="panel-heading"><div><h2>Recent deals</h2><p>Your team&apos;s latest opportunities</p></div><button className="text-link" onClick={() => onNavigate("Deals")}>View all <Icon name="arrow-right" size={14} /></button></div>
        <div className="table-scroll"><table className="data-table deals-table"><thead><tr><th>Deal name</th><th>Stage</th><th>Value</th><th>Owner</th></tr></thead><tbody>{deals.slice(0, 4).map((deal) => <tr key={deal.id}><td><div className="identity-cell"><span className="company-mark" style={{ backgroundColor: deal.color }}>{deal.initials}</span><span><strong>{deal.name}</strong><small>{deal.company}</small></span></div></td><td><StagePill stage={deal.stage} /></td><td className="money-cell">{formatCurrency(deal.value)}</td><td><div className="owner-cell"><Avatar initials={deal.owner.split(" ").map((part) => part[0]).join("")} color={deal.owner === "Sofia Chen" ? "#e7dcff" : deal.owner === "Marcus Lee" ? "#d8eee5" : "#ffe7d9"} size="sm" /><span>{deal.owner.split(" ")[0]}</span></div></td></tr>)}</tbody></table></div>
      </div>
      <div className="panel activity-panel">
        <div className="panel-heading"><div><h2>Recent activity</h2><p>Keep up with your team</p></div><button className="icon-button small-dots" aria-label="Activity options"><Icon name="dots" /></button></div>
        <ActivityList compact />
        <button className="panel-link" onClick={() => onNavigate("Activities")}>View all activity <Icon name="arrow-right" size={15} /></button>
      </div>
    </section>
  </>;
}

function MetricCard({ label, value, change, detail, icon, tone, chart }: { label: string; value: string; change: string; detail: string; icon: IconName; tone: string; chart: number[] }) {
  return <article className="metric-card"><div className="metric-top"><span className={`metric-icon tone-${tone}`}><Icon name={icon} size={17} /></span><button className="icon-button metric-menu" aria-label={`${label} options`}><Icon name="dots" size={18} /></button></div><div className="metric-label">{label}</div><div className="metric-value">{value}</div><div className="metric-bottom"><span className="metric-change"><Icon name="arrow-up" size={13} />{change}</span><span className="metric-detail">{detail}</span><MiniChart values={chart} /></div></article>;
}

function MiniChart({ values }: { values: number[] }) {
  const points = values.map((value, index) => `${(index / (values.length - 1)) * 72},${27 - value * 0.25}`).join(" ");
  return <svg className="mini-chart" viewBox="0 0 72 30" aria-hidden="true"><polyline points={points} fill="none" stroke="#6871e8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function RevenueChart() {
  const points = monthlyRevenue.map((item, index) => `${38 + index * 69},${164 - item.actual * 1.3}`).join(" ");
  const target = monthlyRevenue.map((item, index) => `${38 + index * 69},${164 - item.target * 1.3}`).join(" ");
  return <div className="revenue-chart"><div className="y-axis"><span>$100k</span><span>$75k</span><span>$50k</span><span>$25k</span><span>$0</span></div><svg viewBox="0 0 660 180" preserveAspectRatio="none" role="img" aria-label="Revenue trend rising through the year"><defs><linearGradient id="area-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#6871e8" stopOpacity=".16" /><stop offset="100%" stopColor="#6871e8" stopOpacity="0" /></linearGradient></defs><path className="chart-grid-line" d="M0 34H660M0 66H660M0 98H660M0 130H660M0 162H660" /><polyline points={target} fill="none" stroke="#c9cce4" strokeWidth="2" strokeDasharray="5 6" vectorEffect="non-scaling-stroke" /><polygon points={`38,164 ${points} 659,164`} fill="url(#area-fill)" /><polyline points={points} fill="none" stroke="#6871e8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" /><circle cx="659" cy={164 - monthlyRevenue.at(-1)!.actual * 1.3} r="4.5" fill="#6871e8" stroke="white" strokeWidth="3" vectorEffect="non-scaling-stroke" /></svg></div>;
}

function StagePill({ stage }: { stage: DealStage }) {
  return <span className={`stage-pill stage-pill-${stage.toLowerCase()}`}><i />{stage}</span>;
}

function ContactsView({ contacts, filter, setFilter, onAdd, onExport, query }: { contacts: Contact[]; filter: string; setFilter: (filter: string) => void; onAdd: () => void; onExport: () => void; query: string }) {
  return <>
    <PageHeading eyebrow="RELATIONSHIPS" title="Contacts" description="Manage your people and keep every relationship moving."><Button onClick={onExport} icon="download">Export</Button><Button onClick={onAdd} variant="primary" icon="plus">Add contact</Button></PageHeading>
    <div className="summary-strip"><div><span className="summary-dot lavender-dot" /><span>All contacts</span><strong>2,486</strong></div><div><span className="summary-dot green-dot" /><span>Customers</span><strong>1,204</strong></div><div><span className="summary-dot orange-dot" /><span>Leads</span><strong>846</strong></div><div><span className="summary-dot blue-dot" /><span>Prospects</span><strong>436</strong></div></div>
    <div className="panel list-panel"><div className="list-toolbar"><div className="tabs"><button className={filter === "All contacts" ? "selected" : ""} onClick={() => setFilter("All contacts")}>All contacts</button><button className={filter === "Leads" ? "selected" : ""} onClick={() => setFilter("Leads")}>Leads</button><button className={filter === "Prospects" ? "selected" : ""} onClick={() => setFilter("Prospects")}>Prospects</button></div><div className="toolbar-actions"><span className="row-count">{query ? `${contacts.length} results` : `${contacts.length} shown`}</span><button className="button button-small button-secondary" onClick={onExport}><Icon name="download" size={15} /> Export</button></div></div>
      <div className="table-scroll"><table className="data-table contacts-table"><thead><tr><th><input aria-label="Select all contacts" type="checkbox" /></th><th>Name <span className="sort-mark">↑</span></th><th>Company</th><th>Status</th><th>Owner</th><th>Last active</th><th /></tr></thead><tbody>{contacts.map((contact) => <tr key={contact.id}><td><input aria-label={`Select ${contact.name}`} type="checkbox" /></td><td><div className="identity-cell"><Avatar initials={contact.initials} color={contact.color} /><span><strong>{contact.name}</strong><small>{contact.email}</small></span></div></td><td><div className="company-cell"><span className="company-avatar" style={{ backgroundColor: contact.color }}>{contact.company[0]}</span>{contact.company}<small className="contact-role">{contact.role}</small></div></td><td><StatusPill status={contact.status} /></td><td><div className="owner-cell"><Avatar initials={contact.owner.split(" ").map((part) => part[0]).join("")} color={contact.owner === "Sofia Chen" ? "#e7dcff" : contact.owner === "Marcus Lee" ? "#d8eee5" : "#ffe7d9"} size="sm" /><span>{contact.owner}</span></div></td><td className="muted-cell">{contact.lastActive}</td><td><button className="icon-button row-menu" aria-label={`More actions for ${contact.name}`}><Icon name="dots" /></button></td></tr>)}</tbody></table>{contacts.length === 0 && <EmptyState query={query} kind="contacts" />}</div>
      <div className="pagination"><span>Showing <strong>{contacts.length ? 1 : 0}–{contacts.length}</strong> of <strong>{contacts.length}</strong> contacts</span><div><button className="button button-small button-secondary" disabled>Previous</button><button className="button button-small button-secondary" disabled>Next</button></div></div>
    </div>
  </>;
}

function StatusPill({ status }: { status: Contact["status"] }) {
  return <span className={`status-pill status-${status.toLowerCase()}`}><i />{status}</span>;
}

function LeadsView({ contacts, onAdd, onExport, query }: { contacts: Contact[]; onAdd: () => void; onExport: () => void; query: string }) {
  const columns: Contact["status"][] = ["Lead", "Prospect", "Customer"];
  return <>
    <PageHeading eyebrow="GROW YOUR PIPELINE" title="Leads" description="Keep promising conversations moving toward a meaningful next step."><Button onClick={onExport} icon="download">Export</Button><Button onClick={onAdd} variant="primary" icon="plus">Add lead</Button></PageHeading>
    <div className="lead-summary"><div><span className="lead-summary-label">New this month</span><strong>42</strong><span className="metric-change"><Icon name="arrow-up" size={13} />16.8%</span></div><div><span className="lead-summary-label">Needs follow-up</span><strong>18</strong><span className="followup-caption"><span className="summary-dot orange-dot" /> Due this week</span></div><div><span className="lead-summary-label">Qualified</span><strong>26</strong><span className="followup-caption">62% qualification rate</span></div></div>
    <div className="lead-board">{columns.map((column) => {
      const rows = contacts.filter((contact) => contact.status === column);
      return <div className="lead-column" key={column}><div className="lead-column-heading"><div><span className={`kanban-dot ${column.toLowerCase()}`} /><strong>{column}</strong><small>{rows.length}</small></div><button className="icon-button" aria-label={`Add ${column.toLowerCase()}`} onClick={onAdd}><Icon name="plus" size={16} /></button></div><div className="lead-card-list">{rows.map((contact, index) => <article className="lead-card" key={contact.id}><div className="lead-card-top"><Avatar initials={contact.initials} color={contact.color} /><button className="icon-button" aria-label="Lead options"><Icon name="dots" size={16} /></button></div><strong>{contact.name}</strong><span className="lead-role">{contact.role}</span><div className="lead-company"><span className="company-avatar" style={{ backgroundColor: contact.color }}>{contact.company[0]}</span>{contact.company}</div><div className="lead-card-bottom"><span><Icon name="clock" size={13} />{index === 0 ? "Follow up today" : contact.lastActive}</span><Avatar initials={contact.owner.split(" ").map((part) => part[0]).join("")} color="#e7dcff" size="sm" /></div></article>)}</div></div>;
    })}</div>
    {query && contacts.length === 0 && <div className="panel"><EmptyState query={query} kind="leads" /></div>}
  </>;
}

function CompaniesView({ companies: rows, query, onAdd }: { companies: typeof companies; query: string; onAdd: () => void }) {
  return <>
    <PageHeading eyebrow="YOUR NETWORK" title="Companies" description="Understand every account and the relationships around it."><Button onClick={() => emitToast("Company export is coming soon")} icon="download">Export</Button><Button onClick={onAdd} variant="primary" icon="plus">Add company</Button></PageHeading>
    <div className="company-stats"><div><span>Total companies</span><strong>384</strong><small>Across all industries</small></div><div><span>Active accounts</span><strong>216</strong><small>56% of your network</small></div><div><span>Open pipeline</span><strong>$486,200</strong><small><span className="metric-change"><Icon name="arrow-up" size={12} />9.2%</span> this quarter</small></div><div><span>New this month</span><strong>24</strong><small>Up from 18 last month</small></div></div>
    <div className="panel list-panel"><div className="list-toolbar"><div><h2 className="toolbar-title">All companies <span className="count-badge">{rows.length}</span></h2><p className="toolbar-subtitle">Your most recently active accounts</p></div><button className="button button-small button-secondary"><Icon name="filter" size={15} /> Filters</button></div><div className="table-scroll"><table className="data-table companies-table"><thead><tr><th>Company</th><th>Industry</th><th>People</th><th>Open deals</th><th>Pipeline value</th><th /></tr></thead><tbody>{rows.map((company) => <tr key={company.name}><td><div className="identity-cell"><span className="company-mark company-mark-lg" style={{ backgroundColor: company.color }}>{company.initials}</span><span><strong>{company.name}</strong><small>{company.domain}</small></span></div></td><td><span className="category-pill">{company.category}</span></td><td>{company.people}</td><td>{company.deals}</td><td className="money-cell">{formatCurrency(company.value)}</td><td><button className="icon-button row-menu" aria-label={`More actions for ${company.name}`}><Icon name="dots" /></button></td></tr>)}</tbody></table>{rows.length === 0 && <EmptyState query={query} kind="companies" />}</div><div className="pagination"><span>Showing <strong>{rows.length}</strong> companies</span><div><button className="button button-small button-secondary" disabled>Previous</button><button className="button button-small button-secondary" disabled>Next</button></div></div></div>
  </>;
}

function emitToast(message: string) { window.dispatchEvent(new CustomEvent("crm-toast", { detail: message })); }

function DealsView({ deals, onAdd, onExport, query }: { deals: Deal[]; onAdd: () => void; onExport: () => void; query: string }) {
  const total = deals.reduce((sum, deal) => sum + deal.value, 0);
  return <>
    <PageHeading eyebrow="SALES PIPELINE" title="Deals" description="A shared view of every opportunity and where it stands."><Button onClick={onExport} icon="download">Export</Button><Button onClick={onAdd} variant="primary" icon="plus">New deal</Button></PageHeading>
    <div className="deal-summary"><div><span>Pipeline value</span><strong>{formatCurrency(total)}</strong><small><span className="metric-change"><Icon name="arrow-up" size={12} />12.4%</span> from last month</small></div><div><span>Open deals</span><strong>{deals.length}</strong><small>Across 4 stages</small></div><div><span>Weighted forecast</span><strong>{formatCurrency(total * 0.64)}</strong><small>64% probability weighted</small></div><div><span>Avg. deal size</span><strong>{formatCurrency(deals.length ? total / deals.length : 0)}</strong><small>Across active opportunities</small></div></div>
    <div className="deal-toolbar"><div className="tabs"><button className="selected">Pipeline</button><button onClick={() => emitToast("List view is coming soon")}>List view</button></div><div className="toolbar-actions"><button className="button button-small button-secondary" onClick={onExport}><Icon name="download" size={15} /> Export</button></div></div>
    <div className="deal-board">{stageOrder.map((stage, index) => {
      const stageDeals = deals.filter((deal) => deal.stage === stage);
      const value = stageDeals.reduce((sum, deal) => sum + deal.value, 0);
      return <section className="deal-column" key={stage}><div className="deal-column-heading"><span className={`stage-marker marker-${index}`} /><strong>{stage}</strong><small>{stageDeals.length}</small><button className="icon-button" aria-label={`Add deal to ${stage}`} onClick={onAdd}><Icon name="plus" size={15} /></button></div><div className="deal-stage-value">{formatCurrency(value)} <span>total value</span></div><div className="deal-card-list">{stageDeals.map((deal) => <article className="deal-card" key={deal.id}><div className="deal-card-head"><span className="company-mark" style={{ backgroundColor: deal.color }}>{deal.initials}</span><button className="icon-button" aria-label="Deal options"><Icon name="dots" size={16} /></button></div><strong>{deal.name}</strong><span className="deal-company-name">{deal.company}</span><div className="deal-card-value">{formatCurrency(deal.value)}</div><div className="deal-card-bottom"><span><Icon name="calendar" size={13} />{deal.due}</span><Avatar initials={deal.owner.split(" ").map((part) => part[0]).join("")} color="#e7dcff" size="sm" /></div></article>)}</div></section>;
    })}</div>{query && deals.length === 0 && <div className="panel"><EmptyState query={query} kind="deals" /></div>}
  </>;
}

function ActivitiesView() {
  const filters = ["All activity", "Calls", "Emails", "Notes"];
  const [filter, setFilter] = useState("All activity");
  const rows = activities.filter((item) => filter === "All activity" || (filter === "Calls" && item.kind === "call") || (filter === "Emails" && item.kind === "email") || (filter === "Notes" && item.kind === "note"));
  return <>
    <PageHeading eyebrow="TEAM MOMENTUM" title="Activities" description="A timeline of the conversations that move relationships forward."><Button onClick={() => window.dispatchEvent(new CustomEvent("crm-toast", { detail: "Log activity is coming soon" }))} variant="primary" icon="plus">Log activity</Button></PageHeading>
    <div className="activity-summary"><div><span className="summary-icon lavender"><Icon name="activity" size={17} /></span><span><small>Activities this week</small><strong>84 <em>+12.5%</em></strong></span></div><div><span className="summary-icon peach"><Icon name="phone" size={17} /></span><span><small>Calls completed</small><strong>32 <em>+8.2%</em></strong></span></div><div><span className="summary-icon mint"><Icon name="check" size={17} /></span><span><small>Tasks completed</small><strong>48 <em>+16.4%</em></strong></span></div></div>
    <div className="panel activity-feed-panel"><div className="list-toolbar"><div className="tabs">{filters.map((item) => <button key={item} className={filter === item ? "selected" : ""} onClick={() => setFilter(item)}>{item}</button>)}</div><button className="button button-small button-secondary"><Icon name="calendar" size={15} /> This week <Icon name="chevron" size={13} /></button></div><div className="activity-feed"><div className="feed-date">Today <span>Friday, October 9</span></div><ActivityList compact={false} items={rows.filter((item) => item.time.startsWith("Today"))} /><div className="feed-date">Yesterday <span>Thursday, October 8</span></div><ActivityList compact={false} items={rows.filter((item) => item.time.startsWith("Yesterday"))} /></div></div>
  </>;
}

function ActivityList({ compact, items = activities }: { compact: boolean; items?: typeof activities }) {
  return <div className={`activity-list ${compact ? "activity-list-compact" : ""}`}>{items.map((item, index) => <div className="activity-item" key={`${item.title}-${index}`}><div className={`activity-type type-${item.kind}`}><Icon name={item.kind === "call" ? "phone" : item.kind === "email" ? "mail" : item.kind === "note" ? "note" : "target"} size={15} /></div><Avatar initials={item.initials} color={item.color} size="sm" /><div className="activity-copy"><strong>{item.title}</strong><span>{item.detail}</span>{!compact && <small><Avatar initials="SC" color="#e7dcff" size="sm" /> Sofia Chen</small>}</div><time>{compact ? item.time.replace(", 2025", "") : item.time}</time></div>)}</div>;
}

function EmptyState({ query, kind }: { query: string; kind: string }) {
  return <div className="empty-state"><span><Icon name="search" size={21} /></span><strong>No {kind} found</strong><p>{query ? `We couldn't find anything matching “${query}”. Try another search.` : `There are no ${kind} here yet.`}</p></div>;
}

function Modal({ title, subtitle, onClose, children }: { title: string; subtitle: string; onClose: () => void; children: ReactNode }) {
  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div className="modal-head"><span className="modal-icon"><Icon name="spark" size={19} /></span><button className="icon-button" onClick={onClose} aria-label="Close dialog"><Icon name="close" /></button></div><h2 id="modal-title">{title}</h2><p>{subtitle}</p>{children}</section></div>;
}
