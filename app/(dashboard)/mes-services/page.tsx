import Agenda from "@/components/Agenda";
import ExternalWorkbench, { ExternalWorkbenchItem } from "@/components/ExternalWorkbench";
import DeliverableArea, { DeliverableItem } from "@/components/DeliverableArea";
import GradeArea, { GradeItem } from "@/components/GradeArea";

export default function MesServices() {
  const workbenchItems: ExternalWorkbenchItem[] = [
    { id: 'orthodidacte', name: 'Orthodidacte', logoSrc: '/icons/orthodidacte.svg' },
    { id: 'seira', name: 'Seira', logoSrc: '/icons/seira.svg' },
    { id: 'gofluent', name: 'GOFLUENT', logoSrc: '/icons/gofluent.svg' },
  ];

  const deliverableItems: DeliverableItem[] = [
    {
      id: 'audit-ux',
      title: 'Audit UX',
      dueLabel: 'A rendre le 7 Juillet pour 23h59',
      subtitle: 'M1 Expert UX/UI Design',
    },
    {
      id: 'business-plan',
      title: 'Business plan',
      dueLabel: 'A rendre le 13 Juillet pour 23h59',
      subtitle: 'M1 Expert UX/UI Design',
    },
    {
      id: 'rapport-stage',
      title: 'Rapport de stage',
      dueLabel: 'A rendre le 18 Juillet pour 18h00',
      subtitle: 'M1 Expert UX/UI Design',
    },
    {
      id: 'portfolio',
      title: 'Portfolio final',
      dueLabel: 'A rendre le 25 Juillet pour 23h59',
      subtitle: 'M1 Expert UX/UI Design',
    },
    {
      id: 'memoire-recherche',
      title: 'Mémoire de recherche',
      dueLabel: 'A rendre le 2 Août pour 23h59',
      subtitle: 'Tronc commun',
    },
    {
      id: 'projet-tuteure',
      title: 'Projet tutoré',
      dueLabel: 'A rendre le 9 Août pour 23h59',
      subtitle: 'Tronc commun',
    },
  ];

  const gradeItems: GradeItem[] = [
    { id: 'gamification', subject: 'Gamification', date: '7 Juillet', grade: 14 },
    { id: 'rapport-entreprise', subject: "Rapport d'entreprise", date: '2 Juillet', grade: 14 },
    { id: 'design-responsable-1', subject: 'Design responsable', date: '28 Juin', grade: 14 },
    { id: 'design-responsable-2', subject: 'Design responsable', date: '28 Juin', grade: 14 },
    { id: 'ux-research', subject: 'UX Research', date: '24 Juin', grade: 16 },
    { id: 'anglais', subject: 'Anglais', date: '20 Juin', grade: 12 },
    { id: 'business-model', subject: 'Business model', date: '15 Juin', grade: 15 },
    { id: 'design-interface', subject: "Design d'interface", date: '10 Juin', grade: 17 },
  ];

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
    <div className="mx-auto w-full max-w-[480px] px-5 pt-6 font-body">
      <h1>Mes Services</h1>
      <ExternalWorkbench items={workbenchItems} />
      <Agenda title={"Mon Agenda"} type="course" items={agendaItems} ></Agenda>
      <DeliverableArea title="Prochains livrables" items={deliverableItems} />
      <GradeArea title="Dernières notes" items={gradeItems} />
    </div>
  );
}