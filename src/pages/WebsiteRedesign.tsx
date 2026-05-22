import SharedServicePage from '../components/SharedServicePage';

export default function WebsiteRedesign() {
  return (
    <SharedServicePage
      breadcrumb="Website Redesign"
      headline={"Give your website\nthe upgrade it deserves."}
      subtext="Design audit, full migration, and SEO preservation — we modernise your site without losing what you've built."
      highlights={[
        { value: "Design", label: "Audit" },
        { value: "SEO", label: "Preserved" },
        { value: "Content", label: "Migration" },
        { value: "Speed", label: "Performance Boost" },
      ]}
      metrics={[
        { value: "2x Faster", label: "Average Speed Gain" },
        { value: "100%", label: "SEO Preserved" },
        { value: "Zero", label: "Data Loss" },
      ]}
      features={[
        { num: "01", tag: "Analysis", title: "Design Audit & Strategy", desc: "We analyse your current site's design, speed, SEO, and conversion rate, then build a clear improvement strategy." },
        { num: "02", tag: "Migration", title: "Full Content Migration", desc: "Every page, blog post, image, and product is transferred to the new site with zero data loss." },
        { num: "03", tag: "SEO Safety", title: "SEO Signal Preservation", desc: "301 redirects, metadata continuity, and link structure are maintained so your Google rankings remain intact after launch." },
        { num: "04", tag: "Speed", title: "Performance Boost", desc: "Modern code, optimised assets, and a CDN-ready architecture typically double page speed compared to your existing site." },
        { num: "05", tag: "Mobile-First", title: "Mobile-First Rebuild", desc: "Your redesigned site is engineered for mobile from the ground up, delivering a seamless experience on every device." },
        { num: "06", tag: "Insights", title: "Analytics & Reporting Setup", desc: "We configure Google Analytics 4, Search Console, and conversion tracking so you can measure growth from day one." },
      ]}
      steps={[
        { num: "01", title: "Audit", desc: "We conduct a full audit of your existing site covering design, performance, SEO, and content to define the redesign scope." },
        { num: "02", title: "Rebuild", desc: "Your new site is designed and developed from scratch, with all content migrated and SEO signals carefully preserved." },
        { num: "03", title: "Relaunch", desc: "We deploy the modernised site, configure all redirects, and verify analytics are tracking before handing over full control." },
      ]}
      ctaHeadline="Your site deserves better — let's fix it."
      ctaSub="A faster, modern website with your SEO rankings and content fully intact."
      ctaPrimary="Get Started"
      heroLayout="right"
    />
  );
}
