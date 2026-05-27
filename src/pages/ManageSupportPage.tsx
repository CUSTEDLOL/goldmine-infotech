import SharedServicePage from '../components/SharedServicePage';
import { useContactModal } from '../context/ContactModalContext';

export default function ManageSupportPage() {
  const { openModal } = useContactModal();
  return (
    <SharedServicePage
      breadcrumb="Manage & Support"
      headline={"Ongoing support,\nalways on call."}
      subtext="Website maintenance, annual contracts, payment gateway setup, custom quotation tools, strategic IT consultation, and remote support — everything you need to keep running smoothly."
      highlights={[
        { value: "AMC", label: "Annual Contracts" },
        { value: "Same", label: "Day Response" },
        { value: "Remote", label: "Support Ready" },
        { value: "Expert", label: "IT Consultants" },
      ]}
      metrics={[
        { value: "200+", label: "AMC Clients" },
        { value: "<2hr", label: "Avg Response" },
        { value: "98%", label: "Issue Resolution" },
      ]}
      features={[
        { num: "01", tag: "Maintenance", title: "Website Maintenance", desc: "Regular content updates, plugin and CMS upgrades, security patches, and performance audits to keep your site healthy and fast." },
        { num: "02", tag: "AMC", title: "Annual Maintenance (AMC)", desc: "Predictable, fixed-cost annual contracts covering hardware, software, and IT infrastructure — budgeted support with guaranteed SLAs." },
        { num: "03", tag: "Payments", title: "Payment Gateway Setup", desc: "Integrate Razorpay, PayU, CCAvenue, and other gateways into your website or app with compliance checks and test-mode walkthroughs." },
        { num: "04", tag: "Tools", title: "Online Quotation Tools", desc: "Custom web-based quotation builders that let your sales team generate accurate, branded quotes in minutes — no spreadsheets required." },
        { num: "05", tag: "Strategy", title: "IT Consultation", desc: "Unbiased advisory on technology stack, infrastructure, licensing, and digital roadmap — helping you make smart IT investments." },
        { num: "06", tag: "Remote Support", title: "Remote Support", desc: "Instant remote desktop assistance for software issues, configuration problems, and user training — resolved without an on-site visit." },
      ]}
      steps={[
        { num: "01", title: "Raise a Request", desc: "Log a ticket via phone, email, or our portal — our support team acknowledges and triages your issue within the hour." },
        { num: "02", title: "Diagnose & Resolve", desc: "Our engineers connect remotely or dispatch on-site, diagnose the root cause, and implement a fix with minimal disruption to your workflow." },
        { num: "03", title: "Document & Review", desc: "Every resolution is documented, and AMC clients receive monthly health reports so you always know the state of your IT environment." },
      ]}
      ctaHeadline="Keep your business running without IT headaches."
      ctaSub="Ask about our AMC plans and get a support package tailored to your team size and infrastructure."
      ctaPrimary="Get a Support Plan"
      onCtaPrimary={() => openModal({
        badge: 'Manage & Support',
        badgeColor: 'green',
        title: 'Get a Support Plan',
        subtitle: 'We\'ll match you with the right maintenance and support plan for your business.',
        prefillMessage: 'Hi, I\'m interested in a website maintenance and support plan. Please share details.',
      })}
      heroLayout="right"
    />
  );
}
