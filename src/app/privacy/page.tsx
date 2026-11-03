import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Privacy Policy | Faisal",
  description: "How this portfolio site handles visitor data, cookies and Google AdSense advertising.",
};

export default function Privacy() {
  return (
    <PageShell title="Privacy Policy">
      <p>Last updated: 3 November 2026</p>
      <p>
        This policy explains what happens to your information when you visit this portfolio website. I keep it simple:
        the site has no accounts, no comment sections and no forms that collect personal details.
      </p>
      <h2>Information I collect</h2>
      <p>
        I do not directly collect names, email addresses or other personal data through this site. If you email me, I
        only use your message and address to reply to you.
      </p>
      <h2>Cookies and advertising</h2>
      <p>
        This site uses Google AdSense to show ads. Google and its partners use cookies and similar technologies to
        serve ads based on your visits to this and other websites, and to measure how ads perform. This may include
        personalised advertising, depending on your region and settings.
      </p>
      <ul>
        <li>
          You can manage or turn off personalised ads in your{" "}
          <a href="https://adssettings.google.com">Google Ads Settings</a>.
        </li>
        <li>
          You can learn how Google uses data from sites that use its services at{" "}
          <a href="https://policies.google.com/technologies/partner-sites">policies.google.com/technologies/partner-sites</a>.
        </li>
        <li>You can also block or delete cookies in your browser settings.</li>
      </ul>
      <p>
        This site also uses Monetag, an advertising network, to show ads and notifications. Monetag may use cookies,
        device identifiers and similar technologies to deliver and measure ads, and may send you push notifications if
        you choose to allow them. You can block or remove these in your browser settings, including notification
        permissions for this site.
      </p>
      <h2>Third-party links</h2>
      <p>
        Pages on this site may link to other websites, such as GitHub. I am not responsible for how those sites handle
        your data, so please read their own policies.
      </p>
      <h2>Changes to this policy</h2>
      <p>I may update this policy from time to time. The date at the top shows when it last changed.</p>
      <h2>Contact</h2>
      <p>
        If you have questions about this policy, please use the <Link href="/contact">contact page</Link>.
      </p>
    </PageShell>
  );
}
