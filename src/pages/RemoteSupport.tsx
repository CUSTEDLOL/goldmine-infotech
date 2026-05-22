import SharedServicePage from '../components/SharedServicePage'

export default function RemoteSupport() {
  return (
    <SharedServicePage
      breadcrumb="Remote Support"
      headline={"Expert help.\nWherever you are."}
      subtext="Instant remote access, screen sharing, and multi-OS support — issues resolved in minutes, not hours."
      highlights={[
        { value: 'Instant', label: 'Connect' },
        { value: 'Screen', label: 'Sharing' },
        { value: 'Multi', label: 'OS' },
        { value: 'Ticket', label: 'System' },
      ]}
      metrics={[
        { value: '< 5 min', label: 'Average Response' },
        { value: '95%', label: 'First-Call Resolution' },
        { value: '24/7', label: 'Availability' },
      ]}
      features={[
        { num: '01', tag: 'Seconds to Connect', title: 'Instant Remote Access', desc: 'Our technician connects to your device within seconds using secure remote access tools — no travel, no waiting.' },
        { num: '02', tag: 'See & Fix', title: 'Screen Sharing & Control', desc: 'We see exactly what you see, take control when needed, and walk you through every step of the resolution.' },
        { num: '03', tag: 'Secure', title: 'File Transfer', desc: 'Securely transfer files, drivers, patches, and tools directly to your machine during the support session.' },
        { num: '04', tag: 'Win, Mac, Linux', title: 'Multi-OS Support', desc: 'Full support for Windows, macOS, and Linux — plus mobile devices. Whatever your team uses, we cover it.' },
        { num: '05', tag: 'Full Audit Trail', title: 'Session Recording', desc: 'Every remote session is recorded for compliance and quality review — so you always have a full record of what was done.' },
        { num: '06', tag: 'Track Everything', title: 'Ticketing & History', desc: 'Every issue is logged in our ticketing system. See the full history of your requests, resolutions, and open tickets.' },
      ]}
      steps={[
        { num: '01', title: 'Raise Ticket', desc: 'Submit a ticket via our portal, email, or phone. Our team acknowledges it within minutes and assigns a technician.' },
        { num: '02', title: 'Connect', desc: 'The technician sends a secure connection link. Click it and we are in — no software installation required on your end.' },
        { num: '03', title: 'Resolved', desc: 'The issue is fixed remotely, the session is closed, and the ticket is updated with a full resolution summary.' },
      ]}
      ctaHeadline="Get help in minutes."
      ctaSub="Our support team connects remotely and resolves issues fast — no site visit needed."
      heroLayout="right"
    />
  )
}
