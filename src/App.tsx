import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import LogoBar from './components/LogoBar'
import PersonasSection from './components/PersonasSection'
import CtaBanner from './components/CtaBanner'
import BadgesStrip from './components/BadgesStrip'
import TestimonialsGrid from './components/TestimonialsGrid'
import Footer from './components/Footer'

// Service pages — Web & Hosting
import DomainRegistration from './pages/DomainRegistration'
import WebHostingVPS from './pages/WebHostingVPS'
import SSLCertificates from './pages/SSLCertificates'
import EmailSolutions from './pages/EmailSolutions'
import WebsiteDesign from './pages/WebsiteDesign'
import WebsiteRedesign from './pages/WebsiteRedesign'

// Service pages — Build & Deploy
import ECommerceWebsites from './pages/ECommerceWebsites'
import CMSWebsites from './pages/CMSWebsites'
import MobileAppDevelopment from './pages/MobileAppDevelopment'
import BulkSMSService from './pages/BulkSMSService'
import Panoramic360View from './pages/Panoramic360View'
import ENACHIntegration from './pages/ENACHIntegration'

// Overview pages
import SoftwareOverview from './pages/SoftwareOverview'
import ElectronicsPage from './pages/ElectronicsPage'
import SecurityPage from './pages/SecurityPage'

// Electronics product pages
import LaptopsPage from './pages/LaptopsPage'
import DesktopsPage from './pages/DesktopsPage'
import PrintersPage from './pages/PrintersPage'
import TelevisionsPage from './pages/TelevisionsPage'
import MobilesPage from './pages/MobilesPage'

// Software pages
import JewellerySuite from './pages/JewellerySuite'
import CarRentalSoftware from './pages/CarRentalSoftware'
import QuotationSoftware from './pages/QuotationSoftware'
import PhotographerPortal from './pages/PhotographerPortal'
import DesignsStock from './pages/DesignsStock'
import MemberManagement from './pages/MemberManagement'
import BillingInvoicing from './pages/BillingInvoicing'
import BookingScheduling from './pages/BookingScheduling'
import InventoryTracking from './pages/InventoryTracking'
import ClientPortals from './pages/ClientPortals'

// Security sub-pages
import CCTVCamerasPage from './pages/CCTVCamerasPage'
import InstallationsPage from './pages/InstallationsPage'
import BiometricPage from './pages/BiometricPage'

// Free Tools
import ToolsPage from './pages/ToolsPage'
import GSTInvoiceTool from './pages/tools/GSTInvoiceTool'
import PaymentReceiptTool from './pages/tools/PaymentReceiptTool'
import CompoundInterestTool from './pages/tools/CompoundInterestTool'
import BarcodeTool from './pages/tools/BarcodeTool'
import DomainFinderTool from './pages/tools/DomainFinderTool'
import QRCodeTool from './pages/tools/QRCodeTool'

function HomePage() {
  return (
    <>
      <Hero />
      <LogoBar />
      <PersonasSection />
      <CtaBanner />
      <BadgesStrip />
      <TestimonialsGrid />
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Web & Hosting */}
        <Route path="/services/domain-registration" element={<DomainRegistration />} />
        <Route path="/services/web-hosting-vps" element={<WebHostingVPS />} />
        <Route path="/services/ssl-certificates" element={<SSLCertificates />} />
        <Route path="/services/email-solutions" element={<EmailSolutions />} />
        <Route path="/services/website-design" element={<WebsiteDesign />} />
        <Route path="/services/website-redesign" element={<WebsiteRedesign />} />

        {/* Build & Deploy */}
        <Route path="/services/ecommerce-websites" element={<ECommerceWebsites />} />
        <Route path="/services/cms-websites" element={<CMSWebsites />} />
        <Route path="/services/mobile-app-development" element={<MobileAppDevelopment />} />
        <Route path="/services/bulk-sms-service" element={<BulkSMSService />} />
        <Route path="/services/panoramic-360-view" element={<Panoramic360View />} />
        <Route path="/services/enach-integration" element={<ENACHIntegration />} />

        {/* Overview pages */}
        <Route path="/software"      element={<SoftwareOverview />} />
        <Route path="/electronics"   element={<ElectronicsPage />} />
        <Route path="/security"      element={<SecurityPage />} />

        {/* Electronics product pages */}
        <Route path="/electronics/laptops"      element={<LaptopsPage />} />
        <Route path="/electronics/desktops"     element={<DesktopsPage />} />
        <Route path="/electronics/printers"     element={<PrintersPage />} />
        <Route path="/electronics/televisions"  element={<TelevisionsPage />} />
        <Route path="/electronics/mobiles"      element={<MobilesPage />} />

        {/* Software */}
        <Route path="/software/jewellery-suite" element={<JewellerySuite />} />
        <Route path="/software/car-rental-software" element={<CarRentalSoftware />} />
        <Route path="/software/quotation-software" element={<QuotationSoftware />} />
        <Route path="/software/photographer-portal" element={<PhotographerPortal />} />
        <Route path="/software/designs-stock" element={<DesignsStock />} />
        <Route path="/software/member-management" element={<MemberManagement />} />
        <Route path="/software/billing-invoicing" element={<BillingInvoicing />} />
        <Route path="/software/booking-scheduling" element={<BookingScheduling />} />
        <Route path="/software/inventory-tracking" element={<InventoryTracking />} />
        <Route path="/software/client-portals" element={<ClientPortals />} />

        {/* Security sub-pages */}
        <Route path="/security/cctv-cameras"  element={<CCTVCamerasPage />} />
        <Route path="/security/installations" element={<InstallationsPage />} />
        <Route path="/security/biometric"     element={<BiometricPage />} />

        {/* Free Tools */}
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/tools/gst-invoice" element={<GSTInvoiceTool />} />
        <Route path="/tools/payment-receipt" element={<PaymentReceiptTool />} />
        <Route path="/tools/compound-interest" element={<CompoundInterestTool />} />
        <Route path="/tools/barcode" element={<BarcodeTool />} />
        <Route path="/tools/domain-finder" element={<DomainFinderTool />} />
        <Route path="/tools/qr-code" element={<QRCodeTool />} />
      </Routes>
    </>
  )
}
