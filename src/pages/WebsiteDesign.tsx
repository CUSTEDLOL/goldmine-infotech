import SharedServicePage from '../components/SharedServicePage';

export default function WebsiteDesign() {
  return (
    <SharedServicePage
      breadcrumb="Website Design"
      headline={"Websites that work\nas hard as you do."}
      subtext="Custom-designed, mobile-first websites built for performance, SEO, and conversion — delivered on time."
      highlights={[
        { value: "Mobile-First", label: "Design" },
        { value: "SEO-Ready", label: "Structure" },
        { value: "Fast Load", label: "Performance" },
        { value: "1 Year", label: "Support Included" },
      ]}
      metrics={[
        { value: "100%", label: "Mobile Responsive" },
        { value: "< 3 sec", label: "Average Load Time" },
        { value: "1 yr", label: "Support Included" },
      ]}
      features={[
        { num: "01", tag: "Bespoke", title: "Custom Design", desc: "Every site is designed from scratch to reflect your brand identity — no generic templates, no off-the-shelf shortcuts." },
        { num: "02", tag: "Mobile-First", title: "Responsive & Mobile-First", desc: "Layouts are built for every screen size, ensuring a flawless experience on phones, tablets, and desktops alike." },
        { num: "03", tag: "Search Ready", title: "SEO-Ready Structure", desc: "Proper heading hierarchy, meta tags, schema markup, and sitemaps are built in from day one for maximum search visibility." },
        { num: "04", tag: "Easy Editing", title: "CMS Integration", desc: "We integrate a content management system so your team can update pages, blogs, and images without touching any code." },
        { num: "05", tag: "Speed", title: "Performance Optimised", desc: "Compressed assets, lazy loading, and clean code deliver fast load times and strong Core Web Vitals scores." },
        { num: "06", tag: "After Launch", title: "Post-Launch Support", desc: "One year of post-launch support covers bug fixes, minor updates, and technical guidance as your site evolves." },
      ]}
      steps={[
        { num: "01", title: "Brief & Design", desc: "We learn your goals, audience, and brand, then produce wireframes and a full visual design for your approval." },
        { num: "02", title: "Build & Test", desc: "Approved designs are developed into a responsive, performance-optimised site, tested across devices and browsers." },
        { num: "03", title: "Launch", desc: "We deploy the site, configure SSL, submit the sitemap, and hand over full access — ready to start converting visitors." },
      ]}
      ctaHeadline="Ready for a website that converts?"
      ctaSub="Custom-designed, fast, and SEO-ready — delivered on a clear timeline."
      ctaPrimary="Get Started"
    />
  );
}
