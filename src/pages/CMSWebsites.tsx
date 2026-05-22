import SharedServicePage from '../components/SharedServicePage'

export default function CMSWebsites() {
  return (
    <SharedServicePage
      breadcrumb="CMS Websites"
      headline={"Content you control.\nDesign you'll love."}
      subtext="WordPress and custom CMS websites — easy to edit, hard to break, built to grow with your business."
      highlights={[
        { value: 'Easy Editing', label: 'Easy Editing' },
        { value: 'Role Management', label: 'Role Management' },
        { value: 'SEO Tools', label: 'SEO Tools' },
        { value: 'Media Library', label: 'Media Library' },
      ]}
      metrics={[
        { value: '100%', label: 'Editable Without Code' },
        { value: 'Zero', label: 'Developer Dependency' },
        { value: '24/7', label: 'Content Access' },
      ]}
      features={[
        {
          num: '01',
          tag: 'Your Brand',
          title: 'Custom CMS Design',
          desc: 'A fully designed website built around your brand — not a generic theme. Every layout and colour choice is deliberate.',
        },
        {
          num: '02',
          tag: 'No-Code',
          title: 'Easy Content Editing',
          desc: 'Update pages, blog posts, images, and text yourself without touching a single line of code. Simple, intuitive, and safe.',
        },
        {
          num: '03',
          tag: 'Multi-User',
          title: 'Role & Permission Management',
          desc: 'Assign editors, authors, and admins with controlled access levels so the right people can only do what they need to.',
        },
        {
          num: '04',
          tag: 'Rank Ready',
          title: 'Built-In SEO Tools',
          desc: 'Manage meta titles, descriptions, sitemaps, and canonical tags directly from the CMS — no plugins or third-party tools required.',
        },
        {
          num: '05',
          tag: 'Organised',
          title: 'Media Library & Assets',
          desc: 'A centralised media library for images, documents, and videos — organised, searchable, and always one click away.',
        },
        {
          num: '06',
          tag: 'Always Safe',
          title: 'Version History & Rollback',
          desc: 'Every change is saved and versioned. Accidentally delete something? Roll back to any previous version in seconds.',
        },
      ]}
      steps={[
        {
          num: '01',
          title: 'Design & Build',
          desc: 'We design your site, configure the CMS, and build every page to your brand standards before staging for review.',
        },
        {
          num: '02',
          title: 'Train Your Team',
          desc: 'A focused handover session walks your team through editing, publishing, and managing content confidently from day one.',
        },
        {
          num: '03',
          title: 'Publish',
          desc: 'We launch your site, verify performance and SEO settings, and remain available for questions in the weeks after go-live.',
        },
      ]}
      ctaHeadline="Take control of your content."
      ctaSub="We build it, you run it. No developer needed for day-to-day updates."
      heroLayout="right"
    />
  )
}
