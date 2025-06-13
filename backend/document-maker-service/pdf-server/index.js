// Import puppeteer, Node.js file system/path modules, and Resend
const puppeteer = require('puppeteer');
const fs = require('fs').promises; // Using promises version of fs for async/await
const path = require('path');
const { Resend } = require('resend'); // Import Resend

// --- Configuration ---
const outputDir = path.join(__dirname, 'output_agreements_puppeteer');
const pdfFileName = 'Stylish_Influencer_Agreement.pdf';
const fullPdfPath = path.join(outputDir, pdfFileName);

// --- Email Configuration ---
const RESEND_API_KEY = 're_DRKb8iHE_2d4y7ytsUUn5rDy7BxsjxEVK'; // IMPORTANT: Manage API keys securely, not hardcoded in production!
const RECIPIENT_EMAIL = 'amardc204@gmail.com';
const SENDER_EMAIL = 'Last Land <onboarding@resend.dev>'; // Replace with your verified Resend sender email

// Instantiate Resend with your API key
const resend = new Resend(RESEND_API_KEY);

// --- Document Content Details (Content remains the same) ---
const businessDetails = {
    name: "Awesome Products Pvt. Ltd.",
    registeredName: "Awesome Products Private Limited",
    address: "123 Business Avenue, Tech Park, Bangalore, Karnataka 560001, India",
    representative: "Ms. Priya Sharma",
    title: "Marketing Director",
    logoUrl: "https://placehold.co/150x50/4A00E0/FFFFFF?text=AwesomeLogo&font=sans-serif"
};

const influencerDetails = {
    legalName: "Mr. Rohan Kumar",
    displayName: "Rohan Vlogs",
    address: "456 Creative Lane, Media City, Mumbai, Maharashtra 400050, India",
    socialHandles: [
        { platform: "Instagram", handle: "@RohanVlogsOfficial", followers: "500K" },
        { platform: "YouTube", handle: "RohanVlogsYT", subscribers: "300K" },
        { platform: "Twitter", handle: "@RohanTweets", followers: "150K" }
    ]
};

const agreementDetails = {
    agreementId: `AGR-${new Date().getFullYear()}-${String(Math.random()).slice(2, 8)}`,
    date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
    effectiveDate: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
    scope: [
        { platform: "Instagram", type: "1 Reel (min. 60 seconds), 3 Static Posts, 5 Stories (min. 3 frames each)", details: "Focus on Product X: unboxing, key features demonstration, user benefits, and a clear call-to-action." },
        { platform: "YouTube", type: "1 Dedicated Video (5-7 minutes)", details: "In-depth review, tutorial, and personal experience with Product X. Link to product page in description and end screen." },
        { platform: "Twitter (X)", type: "5 Tweets/Posts", details: "Teaser for YouTube video, sharing Instagram content, direct engagement with audience questions about Product X." }
    ],
    compensation: {
        amountNumeric: 150000,
        amountText: "One Lakh Fifty Thousand Indian Rupees",
        currencySymbol: "₹",
        currencyCode: "INR",
        paymentTerms: "50% of the total fee (₹75,000) payable upon signing this Agreement and submission of approved content calendar. Remaining 50% (₹75,000) payable within 7 (seven) business days of successful publication of all deliverables and submission of performance insights.",
        additionalNotes: "All payments are exclusive of applicable GST, which will be paid by the Business upon submission of a valid tax invoice. TDS, if applicable, will be deducted as per prevailing government norms."
    },
    timeline: "All content to be conceptualized, created, approved by Business, and published within 4 (four) weeks from the Effective Date. A detailed content calendar with specific posting dates and times shall be mutually agreed upon by both Parties within 3 (three) business days of the Effective Date.",
    contentGuidelines: [
        "Disclosure: All promotional content must be clearly and conspicuously disclosed as an advertisement in accordance with ASCI guidelines and platform policies (e.g., using #ad, #sponsored, #PaidPartnership, or platform's branded content tools).",
        "Branding: Business's official social media handle (@AwesomeProductHandle) and relevant campaign hashtags (e.g., #AwesomeProductX) must be tagged/included in all posts as specified by the Business.",
        "Messaging: Content must accurately represent Product X and its benefits as outlined in the product brief provided by the Business. No false or misleading claims.",
        "Originality: All content must be original, created by the Influencer, and not infringe upon any third-party intellectual property rights.",
        "Approval: Drafts of all content (including captions, visuals, and scripts) must be submitted to the Business for written approval at least 3 (three) business days prior to the scheduled publication date. Business shall provide feedback within 2 (two) business days of submission."
    ],
    reporting: "Influencer agrees to provide Business with a performance report within 5 (five) business days after the completion of the campaign (or at mutually agreed intervals). This report should include key metrics such as reach, impressions, engagement rate, views, clicks (if trackable), and relevant audience feedback for each piece of content.",
    ownership: "Influencer grants Business an exclusive, worldwide, royalty-free, perpetual license to use, reproduce, distribute, and display the promotional Content on Business's own digital channels (including but not limited to website, social media platforms, email marketing) and for internal archival purposes. For any paid media amplification of the Content by the Business, terms and compensation shall be discussed and agreed upon separately in writing. Influencer retains ownership of their original underlying intellectual property in the Content.",
    confidentiality: "Both Parties agree to maintain the confidentiality of the terms of this Agreement and any proprietary or non-public information disclosed by one Party to the other in connection with this Agreement, for a period of 3 (three) years from the Effective Date.",
    termination: "Either Party may terminate this Agreement with 15 (fifteen) days written notice if the other Party materially breaches any of its obligations hereunder and fails to cure such breach within 7 (seven) days of receiving written notice. The Business reserves the right to terminate this Agreement immediately if the Influencer engages in any conduct that, in the reasonable opinion of the Business, is detrimental to the Business's brand or reputation.",
    governingLaw: "This Agreement shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with this Agreement shall be subject to the exclusive jurisdiction of the competent courts in Bangalore, Karnataka."
};

// --- HTML & CSS for the PDF (Content remains the same) ---
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Influencer Promotional Content Agreement</title>
    <style>
        /* Import Google Fonts */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Playfair+Display:wght@700&display=swap');

        :root {
            --primary-color-dark: #4A00E0; /* Deep Purple */
            --primary-color-light: #8E2DE2; /* Lighter Purple */
            --accent-color: #D4AF37; /* Gold-ish accent */
            --text-color-dark: #222222;
            --text-color-light: #555555;
            --bg-color-light: #f8f9fa;
            --border-color: #e0e0e0;
            --font-main: 'Inter', sans-serif;
            --font-headings: 'Playfair Display', serif;
        }

        body {
            font-family: var(--font-main);
            font-size: 10pt;
            line-height: 1.7;
            color: var(--text-color-dark);
            margin: 0;
            padding: 0;
            -webkit-print-color-adjust: exact; /* Important for Puppeteer to print backgrounds */
        }

        .page-container {
            width: 210mm; /* A4 width */
            min-height: 297mm; /* A4 height - content might flow to multiple pages */
            padding: 15mm 18mm; /* Margins applied via container padding */
            box-sizing: border-box;
            background-color: #fff; /* Ensure page background is white if not printing body background */
        }

        .header-block {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 10mm;
            border-bottom: 2px solid;
            border-image-slice: 1;
            border-image-source: linear-gradient(to right, var(--primary-color-dark), var(--primary-color-light));
            margin-bottom: 8mm;
        }

        .header-block .logo img {
            max-height: 50px;
            max-width: 150px;
        }

        .header-block .agreement-title {
            font-family: var(--font-headings);
            font-size: 20pt;
            color: var(--primary-color-dark);
            text-align: right;
        }

        .section {
            margin-bottom: 7mm;
            /* Ensure sections don't break across pages awkwardly if possible */
            page-break-inside: avoid;
        }
         .section:last-of-type { /* Less margin for the very last section before signatures */
             margin-bottom: 4mm;
         }


        .section-title {
            font-family: var(--font-headings);
            font-size: 14pt;
            color: var(--primary-color-dark);
            margin-bottom: 4mm;
            padding-bottom: 2mm;
            border-bottom: 1px solid var(--primary-color-light);
            display: flex;
            align-items: center;
        }
        .section-title svg { 
            margin-right: 8px;
            fill: var(--primary-color-light);
            width: 18px; /* Explicit width for SVG */
            height: 18px; /* Explicit height for SVG */
        }

        p, li {
            text-align: justify;
            color: var(--text-color-light);
            margin-bottom: 2.5mm;
        }
        
        strong, b {
          color: var(--text-color-dark);
          font-weight: 500; 
        }

        ul {
            list-style: none;
            padding-left: 5mm;
        }

        ul li::before {
            content: "•";
            color: var(--primary-color-light);
            font-weight: bold;
            display: inline-block;
            width: 1em;
            margin-left: -1em;
        }
        
        .party-details-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10mm;
            margin-bottom: 7mm;
        }

        .party-box {
            border: 1px solid var(--border-color);
            padding: 4mm;
            border-radius: 8px;
            background-color: var(--bg-color-light);
        }
        .party-box h4 {
            font-family: var(--font-main);
            font-weight: 700; 
            font-size: 11pt;
            color: var(--primary-color-dark);
            margin-top: 0;
            margin-bottom: 2mm;
            border-bottom: 1px solid var(--accent-color);
            padding-bottom: 1mm;
        }
        .party-box p { margin-bottom: 1mm; }


        .signature-section {
            margin-top: 10mm; /* Reduced margin for signature section if it's tight */
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15mm;
            padding-top: 5mm;
            border-top: 1px dashed var(--border-color);
            page-break-before: auto; /* Allow break before if necessary, but try to keep with previous section */
        }

        .signature-block {
            padding-top: 5mm;
        }
        .signature-block p { margin-bottom: 2mm; font-size: 9pt;}
        .signature-line {
            height: 40px; 
            border-bottom: 1px solid var(--text-color-dark);
            margin-bottom: 2mm;
        }
        .signature-block .party-name { font-weight: 700; font-size: 10pt; }

    </style>
</head>
<body>
    <div class="page-container">
        <div class="header-block">
            <div class="logo">
                <img src="${businessDetails.logoUrl}" alt="${businessDetails.name} Logo" onerror="this.style.display='none'">
            </div>
            <div class="agreement-title">
                Promotional Content<br>Agreement
            </div>
        </div>

        <div class="section">
            <p><strong>Agreement ID:</strong> ${agreementDetails.agreementId}</p>
            <p>This Promotional Content Agreement (hereinafter referred to as the "<strong>Agreement</strong>") is entered into as of this <strong>${agreementDetails.date}</strong> (the "<strong>Effective Date</strong>"),</p>
            <p><strong>BETWEEN:</strong></p>
            <div class="party-details-grid">
                <div class="party-box">
                    <h4>THE BUSINESS:</h4>
                    <p><strong>${businessDetails.registeredName}</strong></p>
                    <p>${businessDetails.address}</p>
                    <p>Represented by: ${businessDetails.representative}</p>
                    <p>Title: ${businessDetails.title}</p>
                </div>
                <div class="party-box">
                    <h4>THE INFLUENCER:</h4>
                    <p><strong>${influencerDetails.legalName}</strong></p>
                    <p>(Professionally known as: ${influencerDetails.displayName})</p>
                    <p>${influencerDetails.address}</p>
                </div>
            </div>
            <p>(Each a "<strong>Party</strong>" and collectively the "<strong>Parties</strong>").</p>
        </div>

        <div class="section">
            <h3 class="section-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z"/></svg>
              1. Scope of Work & Deliverables
            </h3>
            <p>The Influencer agrees to create, produce, and publish original promotional content (the "<strong>Content</strong>") for the Business, promoting its products/services (specifically "Product X" for this campaign), across the Influencer's designated social media platforms as detailed below:</p>
            ${agreementDetails.scope.map(item => `
                <div style="margin-left: 10mm; margin-bottom: 3mm;">
                    <p><strong>Platform: ${item.platform}</strong> (${influencerDetails.socialHandles.find(h => h.platform === item.platform || (item.platform === "Twitter (X)" && h.platform === "Twitter"))?.handle || ''})</p>
                    <ul>
                        <li><strong>Content Type:</strong> ${item.type}</li>
                        <li><strong>Specific Details:</strong> ${item.details}</li>
                    </ul>
                </div>
            `).join('')}
        </div>

        <div class="section">
            <h3 class="section-title">2. Content Guidelines & Approval</h3>
            <p>The Influencer shall adhere strictly to the following guidelines:</p>
            <ul>
                ${agreementDetails.contentGuidelines.map(guideline => `<li>${guideline}</li>`).join('')}
            </ul>
        </div>

        <div class="section">
            <h3 class="section-title">3. Timeline</h3>
            <p>${agreementDetails.timeline}</p>
        </div>

        <div class="section">
            <h3 class="section-title">4. Compensation & Payment Terms</h3>
            <p>In full consideration for the services rendered and the rights granted herein, the Business shall pay the Influencer a total fee of <strong>${agreementDetails.compensation.currencySymbol}${agreementDetails.compensation.amountNumeric.toLocaleString('en-IN')}</strong> (${agreementDetails.compensation.amountText}, ${agreementDetails.compensation.currencyCode}).</p>
            <p><strong>Payment Terms:</strong> ${agreementDetails.compensation.paymentTerms}</p>
            ${agreementDetails.compensation.additionalNotes ? `<p><em>${agreementDetails.compensation.additionalNotes}</em></p>` : ''}
        </div>
        
        <div class="section">
            <h3 class="section-title">5. Performance Reporting</h3>
            <p>${agreementDetails.reporting}</p>
        </div>

        <div class="section">
            <h3 class="section-title">6. Content Ownership & Usage Rights</h3>
            <p>${agreementDetails.ownership}</p>
        </div>

        <div class="section">
            <h3 class="section-title">7. Confidentiality</h3>
            <p>${agreementDetails.confidentiality}</p>
        </div>

        <div class="section">
            <h3 class="section-title">8. Termination</h3>
            <p>${agreementDetails.termination}</p>
        </div>

        <div class="section">
            <h3 class="section-title">9. Governing Law & Jurisdiction</h3>
            <p>${agreementDetails.governingLaw}</p>
        </div>

        <div class="section">
            <p><strong>IN WITNESS WHEREOF</strong>, the Parties hereto have executed this Agreement by their duly authorized representatives as of the Effective Date.</p>
        </div>

        <div class="signature-section">
            <div class="signature-block">
                <p><strong>FOR AND ON BEHALF OF THE BUSINESS:</strong></p>
                <p class="party-name">${businessDetails.registeredName}</p>
                <div class="signature-line"></div>
                <p>Name: ${businessDetails.representative}</p>
                <p>Title: ${businessDetails.title}</p>
                <p>Date: </p>
            </div>
            <div class="signature-block">
                <p><strong>FOR AND ON BEHALF OF THE INFLUENCER:</strong></p>
                <p class="party-name">${influencerDetails.legalName}</p>
                <div class="signature-line"></div>
                <p>Name: ${influencerDetails.legalName}</p>
                <p>(as ${influencerDetails.displayName})</p>
                <p>Date: </p>
            </div>
        </div>
    </div>
</body>
</html>
`;


// --- Function to Send Email with Resend ---
async function sendEmailWithResendPkg(pdfFilePath, recipientEmail) {
    console.log(`Preparing to send email to ${recipientEmail} using 'resend' package...`);
    try {
        const pdfDataBuffer = await fs.readFile(pdfFilePath);
        // The resend package expects the attachment content as a Buffer directly for binary files like PDFs.
        // No need to convert to Base64 manually for the 'resend' package.

        const { data, error } = await resend.emails.send({
            from: SENDER_EMAIL,
            to: [recipientEmail],
            subject: `Influencer Agreement: ${businessDetails.name} & ${influencerDetails.displayName} (via Resend SDK)`,
            html: `
                <p>Dear ${influencerDetails.displayName} and ${businessDetails.name},</p>
                <p>Please find attached the Promotional Content Agreement (ID: ${agreementDetails.agreementId}).</p>
                <p>This document outlines the terms of our collaboration.</p>
                <p>Best regards,</p>
                <p>Automated Notification System</p>
            `,
            attachments: [
                {
                    filename: path.basename(pdfFilePath),
                    content: pdfDataBuffer, // Pass the Buffer directly
                },
            ],
        });

        if (error) {
            console.error('Error sending email via Resend package:', error);
            throw error; // Re-throw the error to be caught by the caller
        }

        console.log('Email sent successfully via Resend package:', data);
        return data;

    } catch (err) {
        console.error('An exception occurred in sendEmailWithResendPkg:', err);
        throw err; // Re-throw the error
    }
}


// --- Puppeteer PDF Generation ---
async function generateStyledPdfAndEmail() {
    console.log('Initializing PDF generation with Puppeteer...');

    try {
        await fs.mkdir(outputDir, { recursive: true });
        console.log(`Output directory ensured: ${outputDir}`);
    } catch (err) {
        if (err.code !== 'EEXIST') {
            console.error(`Error creating/accessing directory '${outputDir}':`, err);
            return;
        }
    }
    
    let browser;
    try {
        console.log('Launching Puppeteer browser...');
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none']
        });
        const page = await browser.newPage();
        console.log('Browser launched and new page created.');

        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
        console.log('HTML content set. Waiting for network idle (fonts, images)...');
        
        await page.emulateMediaType('screen');

        const footerTemplateHtml = `
            <div style="width:100%; font-size:8pt; padding: 0 18mm; box-sizing: border-box; color: #777; display:flex; justify-content:space-between; align-items:center;">
                <div style="height:2px; background:linear-gradient(to right, var(--primary-color-dark, #4A00E0), var(--primary-color-light, #8E2DE2)); flex-grow:1; margin-right:10px; margin-left:10px;"></div>
                <div>
                    <span class="pageNumber"></span> / <span class="totalPages"></span>
                </div>
                 <div style="height:2px; background:linear-gradient(to right, var(--primary-color-dark, #4A00E0), var(--primary-color-light, #8E2DE2)); flex-grow:1; margin-left:10px; margin-right:10px;"></div>
            </div>`;
            
        console.log('Generating PDF...');
        await page.pdf({
            path: fullPdfPath,
            format: 'A4',
            printBackground: true,
            margin: {
                top: '0mm',
                right: '0mm',
                bottom: '15mm', 
                left: '0mm'
            },
            displayHeaderFooter: true,
            headerTemplate: '<div></div>', 
            footerTemplate: footerTemplateHtml,
            timeout: 120000
        });

        console.log(`PDF successfully generated: ${fullPdfPath}`);

        // After PDF generation, send the email using the resend package
        await sendEmailWithResendPkg(fullPdfPath, RECIPIENT_EMAIL);


    } catch (error) {
        console.error('Error in PDF generation or emailing process:', error);
    } finally {
        if (browser) {
            await browser.close();
            console.log('Puppeteer browser closed.');
        }
    }
}

// --- Execute PDF Generation & Emailing ---
generateStyledPdfAndEmail();

// --- How to Run This Code ---
// 1. Ensure you have Node.js installed.
// 2. Save this code in a file (e.g., `createAndEmailAgreementResendPkg.js`).
// 3. Open your terminal or command prompt.
// 4. Navigate to the directory where you saved the file.
// 5. Install dependencies: 
//    npm install puppeteer resend
//    (Puppeteer might take a while as it downloads Chromium).
// 6. IMPORTANT: 
//    - Replace 'YourCompanyName <onboarding@resend.dev>' in SENDER_EMAIL with your verified Resend sender email.
//    - For production, manage RESEND_API_KEY using environment variables, not hardcoding.
// 7. Run the script: node createAndEmailAgreementResendPkg.js
// 8. After execution, the PDF will be saved and an email attempt will be made. Check your console for logs.
