import SharedServicePage from '../components/SharedServicePage';
import { useContactModal } from '../context/ContactModalContext';

export default function BuildDeployPage() {
  const { openModal } = useContactModal();
  return (
    <SharedServicePage
      breadcrumb="Build & Deploy"
      headline={"Build it right,\ndeploy it fast."}
      subtext="End-to-end development for e-commerce stores, content-driven sites, mobile apps, SMS campaigns, immersive 360° experiences, and automated payment collections."
      highlights={[
        { value: "6+", label: "Build Services" },
        { value: "100+", label: "Apps Shipped" },
        { value: "Fast", label: "Time-to-Market" },
        { value: "Full", label: "Stack Team" },
      ]}
      metrics={[
        { value: "100+", label: "Projects Delivered" },
        { value: "3x", label: "Faster Deployment" },
        { value: "24/7", label: "Support" },
      ]}
      features={[
        { num: "01", tag: "E-Commerce", title: "E-Commerce Websites", desc: "Feature-rich online stores with product catalogues, secure checkout, order management, and payment gateway integration built to scale." },
        { num: "02", tag: "CMS", title: "CMS Websites", desc: "WordPress, Joomla, and headless CMS solutions that let your team publish, update, and manage content without writing a line of code." },
        { num: "03", tag: "Mobile Apps", title: "Mobile App Development", desc: "Native and cross-platform iOS and Android apps designed around your users, with clean UX and backend API integration from day one." },
        { num: "04", tag: "Messaging", title: "Bulk SMS", desc: "Transactional and promotional SMS campaigns delivered at scale — OTP flows, order alerts, reminders, and marketing blasts via DLT-registered routes." },
        { num: "05", tag: "Immersive", title: "Panoramic 360°", desc: "Interactive 360° virtual tours for real estate, hospitality, and showrooms — embeddable on your website and shareable on any device." },
        { num: "06", tag: "Payments", title: "eNACH Integration", desc: "Automate recurring collections with RBI-compliant eNACH mandates — seamless setup for subscriptions, EMIs, and SIP-style billing." },
      ]}
      steps={[
        { num: "01", title: "Scope & Design", desc: "We gather requirements, wireframe key flows, and agree on a tech stack and timeline before a single line of code is written." },
        { num: "02", title: "Develop & Test", desc: "Agile sprints deliver working features incrementally — with QA, performance testing, and your sign-off at every milestone." },
        { num: "03", title: "Deploy & Hand Over", desc: "We deploy to production, configure CI/CD pipelines, train your team, and hand over full documentation and source code." },
      ]}
      ctaHeadline="Ready to build your next digital product?"
      ctaSub="Share your idea and we'll scope it, price it, and ship it — on time, on budget."
      ctaPrimary="Start a Project"
      onCtaPrimary={() => openModal({
        badge: 'Build & Deploy',
        badgeColor: 'purple',
        title: 'Start a Project',
        subtitle: 'Tell us about your project and we\'ll get back with a plan and estimate.',
        prefillMessage: 'Hi, I\'d like to start a project with Goldmine Infotech. Please share a plan and estimate.',
      })}
      heroLayout="left"
    />
  );
}
