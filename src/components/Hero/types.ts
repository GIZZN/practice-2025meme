export interface Feature {
  number: string;
  text: string;
}

export interface HeroProps {
  className?: string;
  title?: string;
  subtitle?: string;
  features?: Feature[];
} 