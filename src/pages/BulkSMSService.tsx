import SharedServicePage from '../components/SharedServicePage'

export default function BulkSMSService() {
  return (
    <SharedServicePage
      breadcrumb="Bulk SMS Service"
      headline={"Reach thousands.\nIn seconds."}
      subtext="DLT-compliant bulk SMS with instant delivery, real-time reports, OTP gateway, and full API access."
      highlights={[
        { value: 'Instant Delivery', label: 'Instant Delivery' },
        { value: 'DLT Compliant', label: 'DLT Compliant' },
        { value: 'OTP Gateway', label: 'OTP Gateway' },
        { value: 'API Access', label: 'API Access' },
      ]}
      metrics={[
        { value: '< 3 sec', label: 'Average Delivery Time' },
        { value: '98%', label: 'Delivery Rate' },
        { value: '24/7', label: 'Gateway Uptime' },
      ]}
      features={[
        {
          num: '01',
          tag: '< 3 Seconds',
          title: 'Instant Bulk Delivery',
          desc: 'Send millions of messages in minutes. Our high-throughput gateway ensures delivery in under 3 seconds across all major operators.',
        },
        {
          num: '02',
          tag: 'Fully Compliant',
          title: 'DLT Registered',
          desc: 'Fully registered with TRAI\'s DLT platform. All sender IDs and templates pre-approved so your messages reach the inbox, not the spam bin.',
        },
        {
          num: '03',
          tag: 'Secure',
          title: 'OTP & Transactional SMS',
          desc: 'Dedicated high-priority routes for OTP and transactional messages — delivered in seconds, every time, with fallback handling built in.',
        },
        {
          num: '04',
          tag: 'Plan Ahead',
          title: 'Scheduled Campaigns',
          desc: 'Schedule SMS campaigns days or weeks in advance. Set the date, time, and audience — the platform handles the rest automatically.',
        },
        {
          num: '05',
          tag: 'Track Results',
          title: 'Real-Time Analytics',
          desc: 'Live delivery reports, click tracking, and campaign-level analytics so you can measure performance and optimise future sends.',
        },
        {
          num: '06',
          tag: 'Integrate Anywhere',
          title: 'REST API Access',
          desc: 'A clean, well-documented REST API to integrate SMS into your website, app, or internal system in under an hour.',
        },
      ]}
      steps={[
        {
          num: '01',
          title: 'Register & Upload',
          desc: 'Complete DLT registration, upload your sender ID and message templates, and add your contact lists — we guide you through every step.',
        },
        {
          num: '02',
          title: 'Compose & Schedule',
          desc: 'Write your message, select your audience, and either send immediately or schedule for the perfect moment.',
        },
        {
          num: '03',
          title: 'Send & Track',
          desc: 'Your campaign goes out and real-time delivery reports flow in — every send tracked, every failure flagged.',
        },
      ]}
      ctaHeadline="Start sending smarter."
      ctaSub="Compliant, fast, and reliable SMS delivery for businesses of every size."
      heroLayout="right"
    />
  )
}
