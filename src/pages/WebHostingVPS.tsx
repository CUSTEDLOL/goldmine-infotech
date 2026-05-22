import SharedServicePage from '../components/SharedServicePage';

export default function WebHostingVPS() {
  return (
    <SharedServicePage
      breadcrumb="Web Hosting & VPS"
      headline={"Fast, reliable hosting\nfor your business."}
      subtext="Shared hosting, VPS, and dedicated solutions — managed, secured, and backed by 99.9% uptime SLA."
      highlights={[
        { value: "99.9%", label: "Uptime SLA" },
        { value: "NVMe", label: "SSD Storage" },
        { value: "Free", label: "SSL Included" },
        { value: "Daily", label: "Backups" },
      ]}
      metrics={[
        { value: "99.9%", label: "Uptime" },
        { value: "10x", label: "Faster" },
        { value: "24/7", label: "Support" },
      ]}
      features={[
        { num: "01", tag: "Control Panel", title: "cPanel Access", desc: "Manage files, databases, and email from a single, industry-standard dashboard with full cPanel access." },
        { num: "02", tag: "Reliability", title: "99.9% Uptime SLA", desc: "Enterprise-grade infrastructure with automatic failover guarantees your site stays online around the clock." },
        { num: "03", tag: "Data Safety", title: "Daily Backups", desc: "Automated daily backups with one-click restore keep your data protected and always recoverable." },
        { num: "04", tag: "Managed VPS", title: "Managed VPS", desc: "Fully managed virtual servers with root access, proactive monitoring, and security patching handled by our team." },
        { num: "05", tag: "Flexibility", title: "Scalable Resources", desc: "Upgrade CPU, RAM, and storage instantly as traffic grows — no downtime, no complex migrations." },
        { num: "06", tag: "Easy Setup", title: "One-click Installs", desc: "Deploy WordPress, Joomla, Magento, and 400+ apps in a single click using our integrated installer." },
      ]}
      steps={[
        { num: "01", title: "Choose Plan", desc: "Select the shared, VPS, or dedicated plan that matches your traffic volume and resource needs." },
        { num: "02", title: "Deploy", desc: "We configure your server, install your preferred stack, and migrate existing content securely." },
        { num: "03", title: "Go Live", desc: "Point your domain, verify SSL, and launch — your site runs on enterprise-grade infrastructure from day one." },
      ]}
      ctaHeadline="Ready for hosting that just works?"
      ctaSub="Get started today with a plan built around your business needs."
      ctaPrimary="Get Started"
      heroLayout="right"
    />
  );
}
