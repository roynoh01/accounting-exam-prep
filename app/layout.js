import "./globals.css";

export const metadata = {
  title: "Managerial Accounting — Midterm Prep",
  description:
    "Cheat sheet and practice test for BIZ3108 Principles of Accounting (II): Cost Concepts, Job-Order Costing, Process Costing, and CVP Relationships.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans text-slate-900">
        <div className="min-h-screen flex flex-col">{children}</div>
      </body>
    </html>
  );
}
