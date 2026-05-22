import SharedServicePage from '../components/SharedServicePage'

export default function Panoramic360View() {
  return (
    <SharedServicePage
      breadcrumb="Panoramic 360° View"
      headline={"Show every angle.\nSell faster."}
      subtext="Interactive 360° virtual tours for properties, showrooms, and venues — embedded on your website or shared as a link."
      highlights={[
        { value: 'Interactive Tour', label: 'Interactive Tour' },
        { value: 'Mobile Ready', label: 'Mobile Ready' },
        { value: 'Fast Loading', label: 'Fast Loading' },
        { value: 'Hotspot Support', label: 'Hotspot Support' },
      ]}
      metrics={[
        { value: '360°', label: 'Full Coverage' },
        { value: '3x', label: 'More Engagement' },
        { value: '100%', label: 'Mobile Compatible' },
      ]}
      features={[
        {
          num: '01',
          tag: 'On-Site',
          title: '360° Photography Shoot',
          desc: 'Our team visits your location and captures every room, corner, and angle with professional 360° equipment — no prep work needed from you.',
        },
        {
          num: '02',
          tag: 'Click & Explore',
          title: 'Interactive Virtual Tour',
          desc: 'Visitors navigate freely through your space, clicking from room to room in a smooth, immersive experience that feels like being there.',
        },
        {
          num: '03',
          tag: 'Rich Detail',
          title: 'Hotspot & Info Points',
          desc: 'Add clickable hotspots to highlight features — room dimensions, product specs, prices, or links — directly inside the tour.',
        },
        {
          num: '04',
          tag: 'One Line of Code',
          title: 'Website Embed',
          desc: 'Embed your virtual tour into any webpage with a single line of code. Works with WordPress, Webflow, custom sites, and landing pages.',
        },
        {
          num: '05',
          tag: 'Any Device',
          title: 'Mobile & VR Ready',
          desc: 'Tours are fully interactive on smartphones, tablets, desktops, and VR headsets — no app download required.',
        },
        {
          num: '06',
          tag: 'CDN Hosted',
          title: 'Fast-Loading Delivery',
          desc: 'Tours are hosted on a global CDN for near-instant load times, even on mobile connections — no lag, no drop-offs.',
        },
      ]}
      steps={[
        {
          num: '01',
          title: 'Shoot',
          desc: 'We visit your property or venue and capture a complete 360° photographic record of every space — typically completed in a single session.',
        },
        {
          num: '02',
          title: 'Build Tour',
          desc: 'We stitch the imagery, add navigation, configure hotspots, and assemble a fully interactive tour ready for review within days.',
        },
        {
          num: '03',
          title: 'Embed & Share',
          desc: 'We deliver an embed code for your website and a shareable link you can use in listings, emails, and social media immediately.',
        },
      ]}
      ctaHeadline="Let customers explore before they visit."
      ctaSub="360° virtual tours that drive enquiries, reduce site visits, and close deals faster."
    />
  )
}
