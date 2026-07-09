import { mockSchoolLifeEvents } from "./mock-school-life-events";
import SchoolLifePlanning from "../../../components/SchoolLifePlanning";

export default function HubNews() {
  return (
    <div className="mx-auto w-full max-w-5xl px-5 pt-6 font-body">
      <SchoolLifePlanning events={mockSchoolLifeEvents} />
    </div>
  );
}