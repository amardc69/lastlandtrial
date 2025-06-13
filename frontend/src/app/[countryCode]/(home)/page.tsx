import Head from "next/head";
import HeroSection from "./_components/HeroSection";
import FeaturesSection from "./_components/FeaturesSection";
import AboutSection from "./_components/AboutSection";
import CallToActionSection from "./_components/CallToActionSection";
import Footer from "./_components/Footer";


export default function HomePage() {

  return (
    <>
      <Head>
        <title>Last Land | Innovating the Future</title>
        <meta
          name="description"
          content="Welcome to Last Land, where innovation meets excellence. Discover our services, solutions, and how we can help your business thrive."
        />
        <meta
          name="keywords"
          content="Last Land, Innovation, Business Solutions, Technology, Excellence"
        />
        <meta
          property="og:title"
          content="Last Land | Innovating the Future"
        />
        <meta
          property="og:description"
          content="Welcome to Last Land, where innovation meets excellence. Discover our services, solutions, and how we can help your business thrive."
        />
        <meta property="og:image" content="/images/og-image.png" /> {/* Ensure this image exists in public/images */}
        <meta property="og:url" content="https://www.lastland.com" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main> {/* Assuming your Navbar has a height that mt-16 compensates for */}
        <HeroSection />
        <FeaturesSection />
        <AboutSection />
        <CallToActionSection />
      </main>
      <div className="bg-gray-300">
        <Footer />
      </div>
    </>
  );
}
