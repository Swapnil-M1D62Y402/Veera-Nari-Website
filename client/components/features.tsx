import { MapPin, MessagesSquare, ShoppingBag, ShieldCheck, Users, MessageCircle } from "lucide-react";

const features = [
  {
    name: "Real-Time Tracking",
    description: "Real-time location tracking your live location with family and friends during emergencies.",
    icon: MapPin, // Use an appropriate icon (e.g., from Lucide)
  },
  {
    name: "Community Chat",
    description: "Connect with a network of users who care about your safety, share experiences, and find help instantly.",
    icon: MessagesSquare,
  },
  {
    name: "Marketplace",
    description: "Access essential safety tools, self-defense gadgets, and trusted services.",
    icon: ShoppingBag,
  },
  {
    name: "Safety Tips & Resources",
    description: "Access expert advice and resources to stay prepared and Learn crucial self-defense techniques to empower and protect yourself.",
    icon: ShieldCheck,
  },
  {
    name: "Instant Emergency Alerts",
    description: "Send alerts to trusted contacts with just one tap.",
    icon: Users,
  },
  {
    name: "Chatbot & Safety Consultant",
    description: "Get instant help and guidance from our AI-powered chatbot or connect with a safety consultant for personalized advice.",
    icon: MessageCircle,
  },
];


export default function Features() {
  return (
    <section className="container space-y-16 py-24 md:py-32">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Cutting-Edge Features</h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
        {features.map((feature) => (
          <div key={feature.name} className="relative overflow-hidden rounded-lg border bg-[#86469C] p-8 hover:bg-[#BC7FCD] hover:backdrop-blur-md transition-all duration-500">
            <div className="flex items-center gap-4">
              <feature.icon className="h-8 w-8" />
              <h3 className="font-bold">{feature.name}</h3>
            </div>
            <p className="mt-2 text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

