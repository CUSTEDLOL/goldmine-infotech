import SharedServicePage from '../components/SharedServicePage'

export default function OnlineQuotationTools() {
  return (
    <SharedServicePage
      breadcrumb="Online Quotation Tools"
      headline={"Quote fast.\nClose faster."}
      subtext="Custom quotation tools with PDF generation, client portals, real-time pricing, and digital signatures."
      highlights={[
        { value: 'PDF', label: 'Generation' },
        { value: 'Client', label: 'Portal' },
        { value: 'Digital', label: 'Signature' },
        { value: 'CRM', label: 'Integration' },
      ]}
      metrics={[
        { value: '5 min', label: 'To Build a Quote' },
        { value: '100%', label: 'Custom Branded' },
        { value: '3x', label: 'Faster Close Rate' },
      ]}
      features={[
        { num: '01', tag: 'Your Brand', title: 'Custom Quote Templates', desc: 'Fully branded quote templates with your logo, colours, terms, and line-item structure — no generic look.' },
        { num: '02', tag: 'Instant', title: 'PDF Generation', desc: 'One click generates a polished, professional PDF quote ready to send to your client — no manual formatting.' },
        { num: '03', tag: '24/7 Access', title: 'Client Self-Service Portal', desc: 'Clients log in to view, download, and approve their quotes any time — reducing back-and-forth emails.' },
        { num: '04', tag: 'Always Accurate', title: 'Real-Time Pricing Engine', desc: 'Connect your product catalogue and pricing rules so every quote reflects live, accurate pricing automatically.' },
        { num: '05', tag: 'Sign Anywhere', title: 'Digital Signature', desc: 'Clients sign quotes digitally from any device — legally valid, instant, and no printing required.' },
        { num: '06', tag: 'Synced', title: 'CRM & ERP Integration', desc: 'Accepted quotes flow directly into your CRM or ERP — no double entry, no delays, no data gaps.' },
      ]}
      steps={[
        { num: '01', title: 'Configure', desc: 'We set up your quote templates, pricing rules, and branding — tailored exactly to how your sales team works.' },
        { num: '02', title: 'Share Quote', desc: 'Your team builds and sends a quote in minutes. Clients receive a branded link or PDF and can view it instantly.' },
        { num: '03', title: 'Close Deal', desc: 'The client signs digitally, the deal is logged in your CRM, and your team can move straight to fulfilment.' },
      ]}
      ctaHeadline="Close deals faster."
      ctaSub="Custom quotation tools that make your sales process look as professional as your product."
      heroLayout="right"
    />
  )
}
