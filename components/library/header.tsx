export default function Header() {
  return (
    <header className="text-center mb-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
        Libre Books
      </h1>
      <p className="text-base sm:text-lg text-muted-foreground mt-3 max-w-2xl mx-auto leading-relaxed">
        Discover 30,000+ free public-domain books. Curated, searchable, and ready to read.
      </p>
    </header>
  );
}
