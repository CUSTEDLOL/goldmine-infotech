import SharedServicePage from '../components/SharedServicePage';

export default function EmailSolutions() {
  return (
    <SharedServicePage
      breadcrumb="Email Solutions"
      headline={"Professional email\nfor your brand."}
      subtext="Custom domain email, anti-spam filtering, and full mobile sync — everything your team needs to communicate."
      highlights={[
        { value: "Custom", label: "Domain" },
        { value: "Anti-Spam", label: "Filter" },
        { value: "Mobile", label: "Sync" },
        { value: "99.9%", label: "Uptime" },
      ]}
      metrics={[
        { value: "50 GB", label: "Mailbox Storage" },
        { value: "99.9%", label: "Uptime SLA" },
        { value: "10x", label: "Spam Reduction" },
      ]}
      features={[
        { num: "01", tag: "Branding", title: "Custom Domain Email", desc: "Send and receive on yourname@yourdomain.com — a branded address that builds trust with every message." },
        { num: "02", tag: "Security", title: "Anti-Spam & Security", desc: "Advanced filters block spam, phishing, and malware before they reach your inbox, keeping your team protected." },
        { num: "03", tag: "Anywhere Access", title: "Webmail Access", desc: "Access your full inbox from any browser, anywhere in the world — no software installation required." },
        { num: "04", tag: "Protocol Support", title: "IMAP & POP3 Support", desc: "Seamlessly connect your preferred desktop client — Outlook, Thunderbird, Apple Mail — via IMAP or POP3." },
        { num: "05", tag: "Teamwork", title: "Team Collaboration", desc: "Shared calendars, group inboxes, and team contacts keep your entire organisation coordinated and in sync." },
        { num: "06", tag: "Mobile", title: "Mobile Sync", desc: "Real-time sync across iOS and Android ensures your email, calendar, and contacts are always up to date on every device." },
      ]}
      steps={[
        { num: "01", title: "Choose Plan", desc: "Pick a mailbox plan that suits your team size, storage requirements, and collaboration needs." },
        { num: "02", title: "Configure Domain", desc: "We update your DNS records and configure MX, SPF, DKIM, and DMARC for reliable, authenticated delivery." },
        { num: "03", title: "Start Sending", desc: "Your team's branded email accounts are live — access via webmail, mobile app, or any desktop client." },
      ]}
      ctaHeadline="Give your team email that means business."
      ctaSub="Professional, secure, and branded — set up in hours, not days."
      ctaPrimary="Get Started"
      heroLayout="right"
    />
  );
}
