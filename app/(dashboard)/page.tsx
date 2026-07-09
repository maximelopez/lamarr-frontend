export default function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="font-heading text-4xl font-bold">Titre en Unbounded</h1>
      <p className="font-body text-base">Texte courant en Outfit.</p>
      <span className="text-tech-500 font-bold">Tech</span>{" "}
      <span className="text-ia-500 font-bold">IA</span>{" "}
      <span className="text-entreprenariat-500 font-bold">Entreprenariat</span>{" "}
      <span className="text-structure-data-500 font-bold">Data</span>{" "}
      <span className="text-creativite-500 font-bold">Créativité</span>
    </div>
  );
}