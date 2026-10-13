import ContactModals from "@/components/ContactModals";
import HeroHeader from "@/components/home/HeroHeader";
import ServicesBlock from "@/components/home/ServicesBlock";
import TrustBlock from "@/components/home/TrustBlock";
import ContactsFooter from "@/components/home/ContactsFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <ContactModals />

      <HeroHeader />

      <ServicesBlock />

      <TrustBlock />

      <ContactsFooter />

    </div>
  );
};

export default Index;
