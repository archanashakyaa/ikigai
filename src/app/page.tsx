import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import CoreFeatures from "@/components/CoreFeatures";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CallToAction from "@/components/CallToAction";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <CoreFeatures />
      <Pricing />
      <FAQ />
      <CallToAction />

      {/* Footer Placeholder for now */}
      <footer style={{
        background: '#1a202c',
        color: 'white',
        padding: '64px 0',
        marginTop: '0'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '32px' }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '16px' }}>MindFit</h3>
            <p style={{ color: '#a0aec0', maxWidth: '300px' }}>
              A judgment-free mental fitness companion for students.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
            <div>
              <h4 style={{ fontWeight: 'bold', marginBottom: '16px' }}>About</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: '#a0aec0' }}>
                <a href="#">Our Story</a>
                <a href="#">Safety</a>
                <a href="#">Research</a>
              </div>
            </div>
            <div>
              <h4 style={{ fontWeight: 'bold', marginBottom: '16px' }}>Crisis Support</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a href="#" style={{ color: '#fc8181', fontWeight: 'bold' }}>🆘 988 (US)</a>
                <a href="#" style={{ color: '#fc8181', fontWeight: 'bold' }}>🆘 116 123 (UK)</a>
              </div>
            </div>
          </div>
        </div>
        <div className="container" style={{ borderTop: '1px solid #2d3748', marginTop: '48px', paddingTop: '24px', textAlign: 'center', color: '#718096' }}>
          &copy; {new Date().getFullYear()} MindFit. Built for improved mental wellness.
        </div>
      </footer>
    </main>
  );
}
