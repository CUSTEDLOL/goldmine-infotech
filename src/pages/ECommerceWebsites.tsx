import SharedServicePage from '../components/SharedServicePage'

export default function ECommerceWebsites() {
  return (
    <SharedServicePage
      breadcrumb="E-Commerce Websites"
      headline={"Sell online.\nScale without limits."}
      subtext="Full-featured e-commerce stores — product catalogues, payment gateways, order management — built to convert."
      highlights={[
        { value: 'Payment Gateway', label: 'Payment Gateway' },
        { value: 'Mobile-Optimised', label: 'Mobile-Optimised' },
        { value: 'SEO-Ready', label: 'SEO-Ready' },
        { value: 'Order Management', label: 'Order Management' },
      ]}
      metrics={[
        { value: '100%', label: 'Mobile Responsive' },
        { value: '< 2 sec', label: 'Load Time' },
        { value: '0%', label: 'Transaction Fees Added' },
      ]}
      features={[
        {
          num: '01',
          tag: 'Unlimited SKUs',
          title: 'Product Catalogue Management',
          desc: 'Manage unlimited products, variants, and categories with a clean, intuitive dashboard. Bulk uploads and real-time stock visibility included.',
        },
        {
          num: '02',
          tag: 'UPI + Cards',
          title: 'Payment Gateway Integration',
          desc: 'Accept UPI, credit/debit cards, net banking, and wallets through trusted payment partners. Fully secure and PCI-compliant.',
        },
        {
          num: '03',
          tag: 'Real-Time',
          title: 'Order & Inventory Management',
          desc: 'Track every order from placement to delivery. Automatic inventory deduction keeps stock levels accurate in real time.',
        },
        {
          num: '04',
          tag: 'Rank Ready',
          title: 'SEO-Optimised Structure',
          desc: 'Product pages built with proper schema, meta tags, and URL structures so your store ranks and attracts organic traffic.',
        },
        {
          num: '05',
          tag: 'Converts Better',
          title: 'Mobile-First Storefront',
          desc: 'Designed for thumb-friendly browsing with fast load times and streamlined checkout flows that reduce cart abandonment.',
        },
        {
          num: '06',
          tag: '1 Year',
          title: 'Post-Launch Support',
          desc: 'One full year of technical support — bug fixes, payment gateway updates, and minor feature additions included at no extra cost.',
        },
      ]}
      steps={[
        {
          num: '01',
          title: 'Plan & Design',
          desc: 'We map out your product catalogue, user journey, and brand identity to create wireframes and a design system tailored to your store.',
        },
        {
          num: '02',
          title: 'Build & Integrate',
          desc: 'Development, payment gateway setup, and third-party integrations are completed and tested end-to-end before handover.',
        },
        {
          num: '03',
          title: 'Launch & Optimise',
          desc: 'We go live, monitor performance, and fine-tune speed, SEO, and conversion touchpoints in the weeks following launch.',
        },
      ]}
      ctaHeadline="Launch your store today."
      ctaSub="We handle everything from design to payment integration. You focus on selling."
    />
  )
}
