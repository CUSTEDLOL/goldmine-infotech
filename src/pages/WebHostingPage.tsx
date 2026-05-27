import SharedServicePage from '../components/SharedServicePage';
import { useContactModal } from '../context/ContactModalContext';

export default function WebHostingPage() {
  const { openModal } = useContactModal();
  return (
    <SharedServicePage
      breadcrumb="Web & Hosting"
      headline={"Web presence,\nfully managed."}
      subtext="From registering your domain to deploying SSL, designing your site, and keeping your inbox running — every layer of your online presence handled under one roof."
      highlights={[
        { value: "Free", label: "SSL Certificates" },
        { value: "99.9%", label: "Uptime SLA" },
        { value: "24/7", label: "Email Support" },
        { value: "1-Day", label: "Go-Live Target" },
      ]}
      metrics={[
        { value: "500+", label: "Domains Registered" },
        { value: "99.9%", label: "Uptime" },
        { value: "24/7", label: "Support" },
      ]}
      features={[
        { num: "01", tag: "Domain Registration", title: "Domain Registration", desc: "Search, register, and manage .com, .in, .net, and 200+ TLDs — with DNS management and auto-renewal included." },
        { num: "02", tag: "Web Hosting & VPS", title: "Web Hosting & VPS", desc: "Shared hosting, managed VPS, and dedicated plans with NVMe SSD storage, cPanel access, and daily backups." },
        { num: "03", tag: "Security", title: "SSL Certificates", desc: "Free Let's Encrypt SSL or premium DV/OV/EV certificates installed and auto-renewed to keep every page secure." },
        { num: "04", tag: "Email Solutions", title: "Professional Email", desc: "Business email on your own domain — hosted, spam-filtered, and accessible on any device via webmail or IMAP." },
        { num: "05", tag: "Website Design", title: "Website Design", desc: "Custom-designed responsive websites that reflect your brand, convert visitors, and rank well on search engines." },
        { num: "06", tag: "Website Redesign", title: "Website Redesign", desc: "Modernise an outdated site with a fresh look, faster load times, and a mobile-first layout — no data lost." },
      ]}
      steps={[
        { num: "01", title: "Consult & Plan", desc: "We assess your current online presence, register your domain if needed, and map out a hosting and design plan that fits your budget." },
        { num: "02", title: "Build & Secure", desc: "Our team sets up hosting, installs SSL, configures professional email, and designs or redesigns your website to spec." },
        { num: "03", title: "Launch & Support", desc: "We go live, verify all services end-to-end, and provide ongoing support so your web presence stays fast, secure, and up to date." },
      ]}
      ctaHeadline="Your entire web presence — one team, zero headaches."
      ctaSub="Talk to us today and get a free audit of your current domain, hosting, and website setup."
      ctaPrimary="Get a Free Audit"
      onCtaPrimary={() => openModal({
        badge: 'Web & Hosting',
        badgeColor: 'blue',
        title: 'Get a Free Audit',
        subtitle: 'We\'ll review your domain, hosting, SSL, and email setup at no charge.',
        prefillMessage: 'Hi, I\'d like a free audit of my web presence — domain, hosting, SSL, and email setup.',
      })}
      heroLayout="right"
    />
  );
}
