import SharedServicePage from '../components/SharedServicePage'

export default function ITConsultation() {
  return (
    <SharedServicePage
      breadcrumb="IT Consultation"
      headline={"The right tech advice.\nAt the right time."}
      subtext="Infrastructure audits, technology roadmaps, vendor selection, and cost optimisation — from advisors who've built it all."
      highlights={[
        { value: 'Infra', label: 'Audit' },
        { value: 'Tech', label: 'Roadmap' },
        { value: 'Vendor', label: 'Selection' },
        { value: 'Cost', label: 'Optimisation' },
      ]}
      metrics={[
        { value: '15+', label: 'Years Experience' },
        { value: '200+', label: 'Clients Advised' },
        { value: '40%', label: 'Average Cost Saved' },
      ]}
      features={[
        { num: '01', tag: 'Full Assessment', title: 'Infrastructure Audit', desc: 'A thorough review of your current hardware, software, network, and security posture — with a clear gap analysis.' },
        { num: '02', tag: '3–5 Year Plan', title: 'Technology Roadmap', desc: 'A prioritised, phased roadmap that aligns your technology investments with your actual business growth plans.' },
        { num: '03', tag: 'Best Deals', title: 'Vendor Selection & Negotiation', desc: 'We evaluate vendors objectively, negotiate on your behalf, and make sure you get the right product at the right price.' },
        { num: '04', tag: 'Cut Waste', title: 'Cost Optimisation Review', desc: 'We identify redundant subscriptions, over-provisioned infrastructure, and licence waste — then fix it.' },
        { num: '05', tag: 'Stay Safe', title: 'Security & Compliance Review', desc: 'Assessment of your security controls against industry standards — with practical recommendations, not just a checklist.' },
        { num: '06', tag: 'On-Demand', title: 'Ongoing Advisory Retainer', desc: 'Retain our consultants on a monthly basis for ongoing guidance as your business evolves and new decisions arise.' },
      ]}
      steps={[
        { num: '01', title: 'Audit', desc: 'We start with a structured discovery session and audit of your current technology environment and business goals.' },
        { num: '02', title: 'Plan', desc: 'We deliver a clear report with findings, recommendations, and a prioritised roadmap you can act on immediately.' },
        { num: '03', title: 'Implement', desc: 'We can guide or manage implementation — from vendor onboarding to infrastructure changes — so plans become reality.' },
      ]}
      ctaHeadline="Get the right advice."
      ctaSub="One conversation with our consultants can save months of wrong decisions and wasted budget."
    />
  )
}
