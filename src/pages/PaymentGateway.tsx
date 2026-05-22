import SharedServicePage from '../components/SharedServicePage'

export default function PaymentGateway() {
  return (
    <SharedServicePage
      breadcrumb="Payment Gateway Setup"
      headline={"Accept payments.\nThe right way."}
      subtext="Multi-gateway integration with UPI, cards, net banking, and wallets — secure checkout built for Indian businesses."
      highlights={[
        { value: 'UPI +', label: 'Cards' },
        { value: 'Secure', label: 'Checkout' },
        { value: 'Easy', label: 'Integration' },
        { value: 'Auto', label: 'Reconciliation' },
      ]}
      metrics={[
        { value: '150+', label: 'Payment Methods' },
        { value: '99.9%', label: 'Gateway Uptime' },
        { value: '< 1 day', label: 'Integration Time' },
      ]}
      features={[
        { num: '01', tag: 'Best Rates', title: 'Multi-Gateway Integration', desc: 'We integrate Razorpay, PayU, Cashfree, or whichever gateway offers you the best rates and feature fit.' },
        { num: '02', tag: 'Instant', title: 'UPI & QR Payments', desc: 'Accept UPI payments and generate dynamic QR codes — the preferred payment method for Indian customers.' },
        { num: '03', tag: 'All Banks', title: 'Cards & Net Banking', desc: 'Visa, Mastercard, RuPay, and net banking from all major Indian banks — no customer is left without a payment option.' },
        { num: '04', tag: 'Compliant', title: 'Secure PCI-DSS Checkout', desc: 'Your checkout is built to PCI-DSS standards with tokenisation and 3D Secure authentication for every transaction.' },
        { num: '05', tag: 'Any Platform', title: 'Easy API Integration', desc: 'Clean API and webhook integration for any platform — WordPress, custom builds, or your existing business software.' },
        { num: '06', tag: 'Daily', title: 'Reconciliation & Reports', desc: 'Daily automated reconciliation reports so your accounts team always knows exactly what came in and what settled.' },
      ]}
      steps={[
        { num: '01', title: 'Choose Gateway', desc: 'We assess your business volume and needs, then recommend and help you open the right payment gateway account.' },
        { num: '02', title: 'Integrate', desc: 'Our team handles the full technical integration — API setup, webhooks, checkout UI, and sandbox testing.' },
        { num: '03', title: 'Go Live', desc: 'After final checks and compliance sign-off, your payment gateway goes live and you start collecting payments.' },
      ]}
      ctaHeadline="Start accepting payments today."
      ctaSub="We integrate the right payment gateway for your business — fast, secure, and compliant."
    />
  )
}
