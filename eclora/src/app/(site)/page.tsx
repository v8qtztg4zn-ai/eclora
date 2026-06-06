import { Hero } from "@/components/home/Hero";
import { ScrollStory } from "@/components/home/ScrollStory";
import { CollectionShowcase } from "@/components/home/CollectionShowcase";
import { AboutPreview } from "@/components/home/AboutPreview";
import { Sustainability } from "@/components/home/Sustainability";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ScrollStory />
      <CollectionShowcase />
      <AboutPreview />
      <Sustainability />
    </>
  );
}
