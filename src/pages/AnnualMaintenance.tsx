import SharedServicePage from '../components/SharedServicePage'

export default function AnnualMaintenance() {
  return (
    <SharedServicePage
      breadcrumb="Annual Maintenance (AMC)"
      headline={"Complete care.\nAll year round."}
      subtext="Hardware and software AMC with priority support, on-site visits, and preventive maintenance — one contract covers it all."
      highlights={[
        { value: 'Priority', label: 'Support' },
        { value: 'On-Site', label: 'Visits' },
        { value: 'Preventive', label: 'Care' },
        { value: 'Asset', label: 'Tracking' },
      ]}
      metrics={[
        { value: '4 hr', label: 'Max Response Time' },
        { value: '24/7', label: 'Support Access' },
        { value: '100%', label: 'Coverage' },
      ]}
      features={[
        { num: '01', tag: 'All Devices', title: 'Hardware AMC', desc: 'Full coverage for desktops, laptops, printers, and peripherals — repairs, replacements, and preventive servicing included.' },
        { num: '02', tag: 'All Systems', title: 'Software AMC', desc: 'Operating systems, productivity suites, and business applications kept updated, licensed, and running smoothly all year.' },
        { num: '03', tag: 'Jump the Queue', title: 'Priority Support Access', desc: 'AMC clients get priority queuing — your tickets are handled before standard requests, every single time.' },
        { num: '04', tag: 'Preventive', title: 'Scheduled On-Site Visits', desc: 'Regular planned visits to clean, inspect, and tune hardware before problems develop — not just when things break.' },
        { num: '05', tag: 'Full Visibility', title: 'Asset Inventory Tracking', desc: 'Every device under the contract is logged and tracked — serial numbers, warranty status, and service history all in one place.' },
        { num: '06', tag: 'Guaranteed', title: 'SLA-Backed Response', desc: 'Response time commitments are written into your contract. If we miss them, you are compensated — no excuses.' },
      ]}
      steps={[
        { num: '01', title: 'Sign AMC', desc: 'We audit your hardware and software assets, agree on the scope, and sign a clear annual maintenance contract.' },
        { num: '02', title: 'Schedule Visits', desc: 'Preventive maintenance visits are scheduled across the year so your systems stay in peak condition proactively.' },
        { num: '03', title: 'Ongoing Support', desc: 'Raise a ticket any time — our team responds within the SLA and resolves issues on-site or remotely.' },
      ]}
      ctaHeadline="One contract. Complete coverage."
      ctaSub="Hardware, software, and support — all under a single annual maintenance agreement."
      heroLayout="right"
    />
  )
}
