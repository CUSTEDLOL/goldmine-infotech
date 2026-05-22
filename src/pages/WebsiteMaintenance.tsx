import SharedServicePage from '../components/SharedServicePage'

export default function WebsiteMaintenance() {
  return (
    <SharedServicePage
      breadcrumb="Website Maintenance"
      headline={"Your website,\nalways at its best."}
      subtext="Regular updates, security patches, performance monitoring, and content changes — handled every month."
      highlights={[
        { value: 'Monthly', label: 'Updates' },
        { value: 'Security', label: 'Patches' },
        { value: 'Uptime', label: 'Monitoring' },
        { value: 'Content', label: 'Changes' },
      ]}
      metrics={[
        { value: '99.9%', label: 'Uptime Guarantee' },
        { value: 'Monthly', label: 'Maintenance Cycle' },
        { value: '24/7', label: 'Monitoring' },
      ]}
      features={[
        { num: '01', tag: 'Always Current', title: 'Regular Software Updates', desc: 'We keep your CMS, plugins, and frameworks updated so your site runs on the latest, most stable versions.' },
        { num: '02', tag: 'Zero Vulnerabilities', title: 'Security Patching', desc: 'Critical security patches are applied as soon as they are released, keeping your site safe from known exploits.' },
        { num: '03', tag: 'Real-Time', title: 'Performance Monitoring', desc: 'Continuous tracking of page speed, server response times, and resource usage with instant alerts on anomalies.' },
        { num: '04', tag: 'On Request', title: 'Content Updates', desc: 'Need a banner changed or a page updated? Submit a request and we handle it within the agreed turnaround.' },
        { num: '05', tag: '24/7', title: 'Uptime Monitoring & Alerts', desc: 'Your site is checked every minute. If it goes down, we are notified instantly and work to restore it immediately.' },
        { num: '06', tag: 'Full Visibility', title: 'Monthly Health Reports', desc: 'Receive a detailed monthly report covering updates applied, uptime stats, performance scores, and tasks completed.' },
      ]}
      steps={[
        { num: '01', title: 'Onboard', desc: 'We audit your current website, document its stack, and set up monitoring and access in a smooth onboarding session.' },
        { num: '02', title: 'Maintain', desc: 'Every month we apply updates, patches, and content changes — proactively, without you needing to follow up.' },
        { num: '03', title: 'Report', desc: 'You receive a clear monthly health report so you always know what was done and how your site is performing.' },
      ]}
      ctaHeadline="Keep your website healthy."
      ctaSub="We maintain it so you never have to worry about outdated software or broken pages."
    />
  )
}
