import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Contact | Faisal",
  description: "Get in touch with Faisal about projects, collaboration or questions about this site.",
};

// Set to a real address to show an email link on the page
const CONTACT_EMAIL = "";

export default function Contact() {
  return (
    <PageShell title="Contact">
      <p>
        I&apos;m happy to hear about projects, collaboration or questions about this site. Here is how to reach me:
      </p>
      <ul>
        {CONTACT_EMAIL && (
          <li>
            Email: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </li>
        )}
        <li>
          GitHub: <a href="https://github.com/IamFaisal11">github.com/IamFaisal11</a>
        </li>
      </ul>
      <p>I usually reply within a few days.</p>
    </PageShell>
  );
}
