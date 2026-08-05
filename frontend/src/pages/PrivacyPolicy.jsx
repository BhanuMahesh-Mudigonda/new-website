export default function PrivacyPolicy() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Privacy Policy</h1>
          <p>How we protect your information</p>
        </div>
      </section>

      <section className="section legal-content">
        <div className="container">
          <div className="legal-text">
            <h2>Privacy Policy</h2>
            <p>Last updated: {new Date().toLocaleDateString()}</p>

            <h3>1. Information Collection</h3>
            <p>
              PB Photography collects information you provide directly to us, such as when you book a session or contact us through our website.
            </p>

            <h3>2. How We Use Information</h3>
            <p>
              We use the information we collect to provide, maintain, and improve our services, process transactions, send you service-related announcements, and respond to your inquiries.
            </p>

            <h3>3. Information Security</h3>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h3>4. Sharing Information</h3>
            <p>
              We do not share, sell, or rent your personal information with third parties without your consent, except as required by law.
            </p>

            <h3>5. Contact Us</h3>
            <p>
              If you have questions about this Privacy Policy, please contact us at privacy@pbphotography.com.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
