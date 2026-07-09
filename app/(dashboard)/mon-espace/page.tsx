import TodoList from "@/components/TodoList";

export default function MonEspace() {
  return (
    <div className="mx-auto w-full max-w-[480px] px-5 pt-6 font-body">
      <h1 className="font-heading text-2xl font-bold text-ink">Mon espace</h1>
      <p className="mt-1 font-body text-sm text-ink-muted">
        Tes tâches, synchronisées avec l&apos;accueil.
      </p>

      <div className="mt-6">
        <TodoList />
      </div>
    </div>
  );
}
