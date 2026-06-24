import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Feel Connect</h3>
            <p className="text-sm text-muted-foreground">
              Supporting mental health and wellbeing through humanitarian assistance
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about">
                  <a className="text-sm text-muted-foreground hover:text-foreground">
                    About Us
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/sustainable">
                  <a className="text-sm text-muted-foreground hover:text-foreground">
                    Sustainable Development
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/referral">
                  <a className="text-sm text-muted-foreground hover:text-foreground">
                    Get Help
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/sources">
                  <a className="text-sm text-muted-foreground hover:text-foreground">
                    Sources
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/data">
                  <a className="text-sm text-muted-foreground hover:text-foreground">
                    Data & Statistics
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/csr">
                  <a className="text-sm text-muted-foreground hover:text-foreground">
                    CSR
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Contact</h4>
            <address className="not-italic text-sm text-muted-foreground">
              <p>Email: contact@feelconnect.org</p>
              <p>Phone: +380 44 123 4567</p>
            </address>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Feel Connect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
