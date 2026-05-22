import SharedServicePage from '../components/SharedServicePage'

export default function MobileAppDevelopment() {
  return (
    <SharedServicePage
      breadcrumb="Mobile App Development"
      headline={"Apps built for\nhow people actually use them."}
      subtext="iOS and Android apps with native performance, polished UI, and seamless API integrations — from idea to App Store."
      highlights={[
        { value: 'iOS & Android', label: 'iOS & Android' },
        { value: 'Native Performance', label: 'Native Performance' },
        { value: 'App Store Ready', label: 'App Store Ready' },
        { value: 'Post-Launch Support', label: 'Post-Launch Support' },
      ]}
      metrics={[
        { value: '2', label: 'Platforms (iOS + Android)' },
        { value: '100%', label: 'Native Performance' },
        { value: '4.8+', label: 'Average App Rating' },
      ]}
      features={[
        {
          num: '01',
          tag: 'Both Platforms',
          title: 'iOS & Android Development',
          desc: 'Single codebase, two platforms — your app runs natively on iPhone and Android with consistent performance and feel.',
        },
        {
          num: '02',
          tag: 'Pixel Perfect',
          title: 'UI/UX Design',
          desc: 'Every screen is designed for clarity, speed, and delight. We follow platform design guidelines so your app feels at home on any device.',
        },
        {
          num: '03',
          tag: 'Seamless',
          title: 'API & Backend Integration',
          desc: 'We connect your app to REST or GraphQL APIs, third-party services, and databases — reliably and securely.',
        },
        {
          num: '04',
          tag: 'Handled',
          title: 'App Store Submission',
          desc: 'We prepare metadata, screenshots, and compliance requirements, then manage the full submission process on the App Store and Google Play.',
        },
        {
          num: '05',
          tag: 'Re-Engage Users',
          title: 'Push Notifications',
          desc: 'Targeted push notifications to bring users back — promotions, reminders, and updates delivered directly to the lock screen.',
        },
        {
          num: '06',
          tag: 'Post-Launch',
          title: 'Ongoing Maintenance',
          desc: 'OS updates, bug fixes, and performance improvements handled on an ongoing basis so your app stays fast and store-compliant.',
        },
      ]}
      steps={[
        {
          num: '01',
          title: 'Design & Prototype',
          desc: 'We translate your idea into clickable wireframes and high-fidelity designs, validated with real user flows before a single line of code is written.',
        },
        {
          num: '02',
          title: 'Build & Test',
          desc: 'Development sprints with regular builds shared for your review. Rigorous QA on real devices before we move to submission.',
        },
        {
          num: '03',
          title: 'Submit & Launch',
          desc: 'We handle App Store and Google Play submission, manage review responses, and support you through the go-live window.',
        },
      ]}
      ctaHeadline="Build your app with us."
      ctaSub="From wireframe to App Store — we handle the full development lifecycle."
    />
  )
}
