"use client"

const clients = [
  { name: "Ceramics International", initials: "CI" },
  { name: "Glass Works Ltd", initials: "GW" },
  { name: "Paint & Coatings Co", initials: "PC" },
  { name: "Foundry Solutions", initials: "FS" },
  { name: "Construction Materials", initials: "CM" },
  { name: "Industrial Supplies", initials: "IS" },
  { name: "Global Exports", initials: "GE" },
  { name: "Mining Partners", initials: "MP" },
]

export function ClientsSection() {
  return (
    <section className="py-16 bg-card border-y border-border overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <span className="text-sm text-muted-foreground">Trusted by leading companies worldwide</span>
        </div>
        
        {/* Client logos marquee */}
        <div className="relative">
          <div className="flex animate-scroll gap-12">
            {[...clients, ...clients].map((client, index) => (
              <div
                key={index}
                className="flex items-center gap-3 flex-shrink-0 px-6 py-4 rounded-xl bg-background border border-border"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-semibold text-sm">{client.initials}</span>
                </div>
                <span className="text-sm font-medium text-foreground whitespace-nowrap">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
