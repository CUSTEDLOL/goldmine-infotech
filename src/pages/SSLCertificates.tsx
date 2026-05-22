import SharedServicePage from '../components/SharedServicePage';

export default function SSLCertificates() {
  return (
    <SharedServicePage
      breadcrumb="SSL Certificates"
      headline={"Secure your site.\nProtect your users."}
      subtext="Domain, organisation, and extended validation certificates — issued in minutes, auto-renewed, free installation."
      highlights={[
        { value: "256-bit", label: "Encryption" },
        { value: "< 10 min", label: "Issuance" },
        { value: "99.9%", label: "Browser Trust" },
        { value: "Free", label: "Installation" },
      ]}
      metrics={[
        { value: "256-bit", label: "Encryption" },
        { value: "< 10 min", label: "Issuance Time" },
        { value: "99.9%", label: "Browser Trust" },
      ]}
      features={[
        { num: "01", tag: "Basic SSL", title: "Domain Validation (DV)", desc: "Issued in minutes, DV certificates encrypt your site and activate the padlock for instant visitor confidence." },
        { num: "02", tag: "Business SSL", title: "Organisation Validation (OV)", desc: "OV certificates verify your business identity, adding a stronger trust signal for commercial websites." },
        { num: "03", tag: "Max Trust", title: "Extended Validation (EV)", desc: "EV certificates display your verified company name and deliver the highest level of user trust for e-commerce and finance." },
        { num: "04", tag: "Sub-domains", title: "Wildcard SSL", desc: "Secure your root domain and all sub-domains under a single certificate, simplifying management and reducing cost." },
        { num: "05", tag: "Multi-site", title: "Multi-Domain SSL", desc: "Cover multiple domains and sub-domains with one SAN certificate — ideal for businesses running several web properties." },
        { num: "06", tag: "Hands-free", title: "Auto-Renewal", desc: "We automate renewal and reinstallation so your certificate never lapses and your padlock stays permanently green." },
      ]}
      steps={[
        { num: "01", title: "Choose Certificate", desc: "Select DV, OV, or EV based on your site type, and pick single-domain, wildcard, or multi-domain coverage." },
        { num: "02", title: "Verify Domain", desc: "Complete a quick domain or business verification — DV takes minutes; OV and EV typically within one to three days." },
        { num: "03", title: "Install & Go Live", desc: "We install and configure the certificate on your server, then confirm encryption is active across every page." },
      ]}
      ctaHeadline="Secure your website today."
      ctaSub="SSL certificates issued fast, installed free, and renewed automatically — zero hassle."
      ctaPrimary="Get Started"
    />
  );
}
