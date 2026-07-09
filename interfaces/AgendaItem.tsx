interface AgendaItemBase {
  id: string;
  name: string;
  type: string;
  description: string;
  startDate: string;
  endDate?: string;
  referent: string;
  isActive: boolean;
  source: string;
}

interface EventAgendaItem extends AgendaItemBase {
  source: 'event';
}

interface CourseAgendaItem extends AgendaItemBase {
  source: 'course';
  room: string;
}

type AgendaItem = EventAgendaItem | CourseAgendaItem;