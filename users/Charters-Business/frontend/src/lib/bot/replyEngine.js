import findProgram from "@/lib/bot/findProgram";
import home from "@/lib/data/home.json";
import institute from "@/lib/data/institute.json";
import faculty from "@/lib/data/faculty.json";

export default function replyEngine(question) {
  const q = question.toLowerCase().trim();

 
  // find program
  const program = findProgram(q);

  if (program) {

    // FEES
    if (q.includes("fee") || q.includes("cost") || q.includes("emi")) {
      return `${program.name} Fees:

EMI starts from ${program.fees.emi_start}
No-cost EMI: ${program.fees.no_cost_emi}
Success fee: ${program.fees.success_fee}
Scholarship: ${program.fees.scholarship}`;
    }

    // PLACEMENT (handles executive also)
    if (q.includes("placement") || q.includes("salary") || q.includes("ctc")) {

      const placement = program.placement || program.career_growth;

      return `${program.name} Placement:

Placement Rate: ${placement.placement_rate || placement.promotion_rate}
Average CTC: ${placement.average_ctc}
Salary Range: ${placement.salary_range}`;
    }

    // DURATION
    if (q.includes("duration")) {
      return `${program.name} duration is ${program.duration}.`;
    }

    // DEFAULT PROGRAM INFO
    return `${program.name}

Duration: ${program.duration}
Format: ${program.format}
Eligibility: ${program.eligibility}`;
  }

  // placement stats (home.json)
  if (q.includes("placement report") || q.includes("recruiters")) {
    return `Placement Highlights:

Highest CTC: ${home.placement_highlights.highest_ctc}
Average CTC: ${home.placement_highlights.average_ctc}
Recruiters: ${home.placement_highlights.recruiters}`;
  }

  // faculty info
  if (q.includes("faculty") || q.includes("mentors")) {
    return `Faculty includes experts from:

${faculty.top_institutions.join(", ")}

Mentor network: ${faculty.mentor_network}`;
  }

  // global exposure
  if (q.includes("global") || q.includes("countries") || q.includes("abroad")) {
    return `Students gain global exposure in:

${institute.global_presence.join(", ")}`;
  }

  return "I can help with programs, fees, placements, and admission guidance.";
}