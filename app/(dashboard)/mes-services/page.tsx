import Agenda from "@/components/Agenda";

export default function MesServices() {
  const agendaItems: AgendaItem[] = [
  {
    source: 'course',
    id: 'course-1',
    name: "Design d'interface",
    type: 'Cours',
    description: 'Atelier sur les principes de design UI/UX',
    startDate: '2026-07-09T09:00:00+02:00',
    endDate: '2026-07-09T12:30:00+02:00',
    referent: 'Julie Clabault',
    isActive: true,
    room: 'Salle 302',
  },
  {
    source: 'course',
    id: 'course-2',
    name: 'Anglais',
    type: 'Cours',
    description: 'Cours de renforcement linguistique',
    startDate: '2026-07-09T13:30:00+02:00',
    endDate: '2026-07-09T17:00:00+02:00',
    referent: 'Julie Clabault',
    isActive: true,
    room: 'Salle 302',
  },
  {
    source: 'course',
    id: 'course-3',
    name: "Design d'interface",
    type: 'Cours',
    description: 'Atelier sur les principes de design UI/UX',
    startDate: '2026-07-10T09:00:00+02:00',
    endDate: '2026-07-10T12:30:00+02:00',
    referent: 'Julie Clabault',
    isActive: true,
    room: 'Salle 302',
  },
  {
    source: 'course',
    id: 'course-4',
    name: "Design d'interface",
    type: 'Cours',
    description: 'Atelier sur les principes de design UI/UX',
    startDate: '2026-07-11T09:00:00+02:00',
    endDate: '2026-07-11T12:30:00+02:00',
    referent: 'Julie Clabault',
    isActive: true,
    room: 'Salle 302',
  },
  {
  source: 'event',
  id: 'event-1',
  name: 'Portes ouvertes',
  type: 'Événement école',
  description: "Journée portes ouvertes pour les futurs étudiants",
  startDate: '2026-07-12T10:00:00+02:00',
  endDate: '2026-07-12T16:00:00+02:00',
  referent: 'Marc Lefèvre',
  isActive: true,
},
{
  source: 'event',
  id: 'event-2',
  name: 'Réunion pédagogique',
  type: 'Réunion',
  description: "Point sur l'avancée des projets de fin d'année",
  startDate: '2026-07-14T14:00:00+02:00',
  referent: 'Claire Dubois',
  isActive: false,
},
];
  return (
    <div className="page">
      <h1 className="font-heading text-2xl font-bold text-ink">Mes services</h1>
      <Agenda title={"Mon Agenda"} type="event" items={agendaItems} ></Agenda>
    </div>
  );
}
