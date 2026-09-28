import { PublicFooter } from '@/components/marketing/PublicFooter';
import { PublicHeader } from '@/components/marketing/PublicHeader';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <noscript>
        <style>{'[data-reveal]{opacity:1!important;transform:none!important}'}</style>
      </noscript>
      <PublicHeader />
      <main id="main">{children}</main>
      <PublicFooter />
    </>
  );
}
