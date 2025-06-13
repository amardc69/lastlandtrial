// page.tsx

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-black text-white px-6 md:px-12 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-400">
            Welcome to <span className="font-semibold">The Great Company</span>. These Terms of Service govern your use of our platform and services.
          </p>
        </header>

        <Separator className="my-8 bg-gray-700" />

        {/* Acceptance of Terms */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
          <p className="text-gray-300 leading-relaxed">
            By accessing or using our services, you agree to be bound by these Terms. If you do not agree, please refrain from using our services.
          </p>
        </section>

        {/* Modifications to Terms */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Modifications to Terms</h2>
          <p className="text-gray-300 leading-relaxed">
            We reserve the right to modify these Terms at any time. Changes will be effective upon posting. Continued use of our services constitutes acceptance of the revised Terms.
          </p>
        </section>

        {/* User Responsibilities */}
        <Accordion type="single" collapsible className="mb-12">
          <AccordionItem value="user-responsibilities">
            <AccordionTrigger className="text-xl font-medium">
              User Responsibilities
            </AccordionTrigger>
            <AccordionContent>
              <ul className="text-gray-300 list-disc pl-6 mt-2">
                <li>Provide accurate and current information during registration.</li>
                <li>Maintain the confidentiality of your account credentials.</li>
                <li>Notify us immediately of any unauthorized use of your account.</li>
                <li>Comply with all applicable laws and regulations.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Prohibited Activities */}
        <Accordion type="single" collapsible className="mb-12">
          <AccordionItem value="prohibited-activities">
            <AccordionTrigger className="text-xl font-medium">
              Prohibited Activities
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-300 mt-2">
                You agree not to:
              </p>
              <ul className="text-gray-300 list-disc pl-6 mt-2">
                <li>Engage in any activity that disrupts or interferes with our services.</li>
                <li>Use our services for any fraudulent or unlawful purposes.</li>
                <li>Infringe upon the intellectual property rights of others.</li>
                <li>Transmit any harmful or malicious code.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Termination */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Termination</h2>
          <p className="text-gray-300 leading-relaxed">
            We may terminate or suspend your access to our services without prior notice for conduct that we believe violates these Terms or is harmful to other users or us.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
          <p className="text-gray-300 leading-relaxed">
            To the fullest extent permitted by law, <span className="font-semibold">The Great Company</span> shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services.
          </p>
        </section>

        {/* Governing Law */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
          <p className="text-gray-300 leading-relaxed">
            These Terms are governed by and construed in accordance with the laws of the jurisdiction in which <span className="font-semibold">The Great Company</span> operates, without regard to its conflict of law principles.
          </p>
        </section>

        <Separator className="my-8 bg-gray-700" />

        {/* Contact Information */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-300">
            If you have any questions or concerns about these Terms, please contact us at:
          </p>
          <p className="text-gray-300 mt-4">
            <span className="font-semibold">Email:</span> support@thegreatcompany.com
          </p>
          <p className="text-gray-300">
            <span className="font-semibold">Address:</span> 123 Great Street, Tech City, TG 45678
          </p>
        </section>
      </div>
    </main>
  );
}
