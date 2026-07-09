import { mockSchoolLifeEvents } from "./mock-school-life-events";
import SchoolLifePlanning from "../../../components/SchoolLifePlanning";

export default function HubNews() {
  return (
    <div className="page">
        <SchoolLifePlanning events={mockSchoolLifeEvents} />
    </div>
  );
}