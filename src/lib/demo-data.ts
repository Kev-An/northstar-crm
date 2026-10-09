export type DealStage = "Qualification" | "Proposal" | "Negotiation" | "Won";

export type Contact = {
  id: number;
  name: string;
  role: string;
  company: string;
  email: string;
  initials: string;
  color: string;
  status: "Customer" | "Lead" | "Prospect";
  owner: string;
  lastActive: string;
};

export type Deal = {
  id: number;
  name: string;
  company: string;
  value: number;
  stage: DealStage;
  owner: string;
  due: string;
  initials: string;
  color: string;
};

export const contacts: Contact[] = [
  { id: 1, name: "Olivia Rhye", role: "Head of Design", company: "Layers", email: "olivia@layers.com", initials: "OR", color: "#ebddff", status: "Customer", owner: "Sofia Chen", lastActive: "2 hours ago" },
  { id: 2, name: "Phoenix Baker", role: "Director of Product", company: "Catalog", email: "phoenix@catalog.com", initials: "PB", color: "#ffe6d5", status: "Lead", owner: "Marcus Lee", lastActive: "Yesterday" },
  { id: 3, name: "Lana Steiner", role: "VP of Marketing", company: "Sisyphus", email: "lana@sisyphus.com", initials: "LS", color: "#d9f4eb", status: "Prospect", owner: "Sofia Chen", lastActive: "Yesterday" },
  { id: 4, name: "Demi Wilkinson", role: "Growth Lead", company: "Circooles", email: "demi@circooles.com", initials: "DW", color: "#ffe8ee", status: "Lead", owner: "Jordan Park", lastActive: "Oct 7, 2026" },
  { id: 5, name: "Candice Wu", role: "Product Manager", company: "Command+R", email: "candice@commandr.com", initials: "CW", color: "#e0ebff", status: "Customer", owner: "Marcus Lee", lastActive: "Oct 6, 2026" },
  { id: 6, name: "Natali Craig", role: "Head of Sales", company: "Hourglass", email: "natali@hourglass.com", initials: "NC", color: "#fff0c9", status: "Prospect", owner: "Jordan Park", lastActive: "Oct 4, 2026" },
  { id: 7, name: "Drew Cano", role: "Founder", company: "Quotient", email: "drew@quotient.com", initials: "DC", color: "#f0e1dd", status: "Lead", owner: "Sofia Chen", lastActive: "Oct 3, 2026" },
  { id: 8, name: "Orlando Diggs", role: "Customer Success", company: "Layers", email: "orlando@layers.com", initials: "OD", color: "#e4e0ff", status: "Customer", owner: "Marcus Lee", lastActive: "Oct 1, 2026" },
];

export const deals: Deal[] = [
  { id: 1, name: "Enterprise annual plan", company: "Layers", value: 28000, stage: "Negotiation", owner: "Sofia Chen", due: "Oct 16, 2026", initials: "L", color: "#edf0ff" },
  { id: 2, name: "Platform expansion", company: "Sisyphus", value: 18400, stage: "Proposal", owner: "Marcus Lee", due: "Oct 20, 2026", initials: "S", color: "#ffeef4" },
  { id: 3, name: "Growth workspace", company: "Catalog", value: 12600, stage: "Qualification", owner: "Jordan Park", due: "Oct 23, 2026", initials: "C", color: "#e9f8f2" },
  { id: 4, name: "Team plan · annual", company: "Circooles", value: 9200, stage: "Proposal", owner: "Sofia Chen", due: "Oct 26, 2026", initials: "C", color: "#fff1e5" },
  { id: 5, name: "New product line", company: "Hourglass", value: 24700, stage: "Negotiation", owner: "Marcus Lee", due: "Oct 29, 2026", initials: "H", color: "#f2eaff" },
  { id: 6, name: "Starter to Growth", company: "Quotient", value: 6800, stage: "Won", owner: "Jordan Park", due: "Nov 2, 2026", initials: "Q", color: "#e4f5ed" },
];

export const activities = [
  { kind: "call", title: "Discovery call with Olivia Rhye", detail: "Layers · Enterprise annual plan", time: "Today, 10:30 AM", initials: "OR", color: "#ebddff" },
  { kind: "deal", title: "Deal moved to Negotiation", detail: "Enterprise annual plan · $28,000", time: "Today, 9:14 AM", initials: "SC", color: "#e3e7ff" },
  { kind: "note", title: "Added meeting notes", detail: "Phoenix Baker · Catalog", time: "Yesterday, 4:42 PM", initials: "PB", color: "#ffe6d5" },
  { kind: "email", title: "Sent follow-up email", detail: "Lana Steiner · Sisyphus", time: "Yesterday, 2:18 PM", initials: "LS", color: "#d9f4eb" },
];

export const companies = [
  { name: "Layers", domain: "layers.com", people: 12, deals: 3, value: 48200, initials: "L", color: "#edf0ff", category: "Technology" },
  { name: "Sisyphus", domain: "sisyphus.com", people: 8, deals: 2, value: 32400, initials: "S", color: "#ffeef4", category: "Design" },
  { name: "Catalog", domain: "catalog.com", people: 6, deals: 2, value: 25800, initials: "C", color: "#e9f8f2", category: "Technology" },
  { name: "Circooles", domain: "circooles.com", people: 9, deals: 1, value: 9200, initials: "C", color: "#fff1e5", category: "Consulting" },
  { name: "Hourglass", domain: "hourglass.com", people: 4, deals: 2, value: 24700, initials: "H", color: "#f2eaff", category: "Finance" },
  { name: "Quotient", domain: "quotient.com", people: 7, deals: 2, value: 18600, initials: "Q", color: "#e4f5ed", category: "Technology" },
];

export const monthlyRevenue = [
  { month: "Mar", actual: 34, target: 46 }, { month: "Apr", actual: 44, target: 50 },
  { month: "May", actual: 39, target: 52 }, { month: "Jun", actual: 57, target: 58 },
  { month: "Jul", actual: 51, target: 60 }, { month: "Aug", actual: 72, target: 65 },
  { month: "Sep", actual: 67, target: 70 }, { month: "Oct", actual: 83, target: 74 },
  { month: "Nov", actual: 75, target: 78 }, { month: "Dec", actual: 94, target: 82 },
];

export const stageOrder: DealStage[] = ["Qualification", "Proposal", "Negotiation", "Won"];

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
