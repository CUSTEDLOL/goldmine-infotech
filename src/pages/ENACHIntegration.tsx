import SharedServicePage from '../components/SharedServicePage'

export default function ENACHIntegration() {
  return (
    <SharedServicePage
      breadcrumb="eNACH Integration"
      headline={"Automate recurring\npayments seamlessly."}
      subtext="NPCI-compliant eNACH mandates for auto-debit collections — reduce defaults, eliminate manual follow-up."
      highlights={[
        { value: 'NPCI Compliant', label: 'NPCI Compliant' },
        { value: 'Auto-Debit', label: 'Auto-Debit' },
        { value: 'Failure Handling', label: 'Failure Handling' },
        { value: 'API Integration', label: 'API Integration' },
      ]}
      metrics={[
        { value: '99.9%', label: 'Mandate Uptime' },
        { value: 'Zero', label: 'Manual Collection' },
        { value: '< 48 hr', label: 'Activation Time' },
      ]}
      features={[
        {
          num: '01',
          tag: 'Bank Approved',
          title: 'NPCI eNACH Compliance',
          desc: 'Fully compliant with NPCI\'s eNACH framework. All mandates registered through official bank channels — accepted by all major Indian banks.',
        },
        {
          num: '02',
          tag: 'Digital',
          title: 'Bank Mandate Setup',
          desc: 'Customers complete the mandate registration digitally via net banking or debit card — paperless, fast, and auditable.',
        },
        {
          num: '03',
          tag: 'Hands-Free',
          title: 'Auto-Debit Collections',
          desc: 'Once a mandate is active, debits happen automatically on the scheduled date — no manual intervention, no delays, no follow-up calls.',
        },
        {
          num: '04',
          tag: 'Automated',
          title: 'Failure & Retry Handling',
          desc: 'Failed debits are logged, categorised, and retried automatically per configurable rules — reducing revenue leakage without manual effort.',
        },
        {
          num: '05',
          tag: 'Real-Time',
          title: 'Collection Dashboard',
          desc: 'Monitor mandate status, upcoming debits, success rates, and failure reasons from a single real-time dashboard.',
        },
        {
          num: '06',
          tag: 'Any Platform',
          title: 'REST API Integration',
          desc: 'A clean REST API to embed eNACH mandate creation and status checks directly into your existing platform, CRM, or loan management system.',
        },
      ]}
      steps={[
        {
          num: '01',
          title: 'Integrate API',
          desc: 'We provide documentation, sandbox credentials, and integration support to connect eNACH into your platform — typically completed within 48 hours.',
        },
        {
          num: '02',
          title: 'Collect Mandates',
          desc: 'Your customers register their bank mandates digitally through your app or website — fully guided, fully compliant.',
        },
        {
          num: '03',
          title: 'Auto-Collect',
          desc: 'Debits run on schedule, failures are retried automatically, and your dashboard stays updated in real time — no manual work required.',
        },
      ]}
      ctaHeadline="Automate your collections."
      ctaSub="Set up eNACH mandates once and let the system collect on schedule — every time."
      heroLayout="right"
    />
  )
}
