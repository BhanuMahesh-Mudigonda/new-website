export default function TermsOfService() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Terms of Service</h1>
          <p>Our terms and conditions</p>
        </div>
      </section>

      <section className="section legal-content">
        <div className="container">
          <div className="legal-text">
            <h2>Terms of Service</h2>
            <p>Last updated: {new Date().toLocaleDateString()}</p>

            <h3>1. Agreement to Terms</h3>
            <p>
              By accessing and using PB Photography's website and services, you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h3>2. Use License</h3>
            <p>
              You are granted a limited license to access and make personal use of this website and its content. You may not, without prior written consent, modify the materials or use them for any commercial purpose.
            </p>

            <h3>3. Disclaimer</h3>
            <p>
              The materials on PB Photography's website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>

            <h3>4. Limitations</h3>
            <p>
              In no event shall PB Photography or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on PB Photography's website.
            </p>

            <h3>5. Revisions and Errors</h3>
            <p>
              The materials appearing on PB Photography's website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on our website are accurate, complete, or current.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
