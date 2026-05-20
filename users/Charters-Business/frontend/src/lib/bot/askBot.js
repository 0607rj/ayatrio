import programsData from "@/lib/data/programs.json";
import institute from "@/lib/data/institute.json";
import faculty from "@/lib/data/faculty.json";

const programs = programsData.programs;

/* ---------------- FOOTER ---------------- */
function admissionFooter() {
  return `

---

💬 **Need personalized career guidance?**

Our admission experts can help you choose the right path.

 [📞 WhatsApp](https://wa.me/91XXXXXXXXXX)
 
 [Apply Now](https://chartersbusiness.com/apply)
`;
}

/* ---------------- FIND PROGRAM ---------------- */
function findProgram(question) {
  const q = question.toLowerCase();

  return programs.find(
    (p) =>
      q.includes(p.id) ||
      q.includes(p.name.toLowerCase()) ||
      (p.id === "executive" &&
        (q.includes("executive") || q.includes("product growth")))
  );
}

/* ---------------- PROGRAM LIST ---------------- */
function buildProgramList() {
  return programs.map((p) => `• **${p.name}**`).join("\n");
}

/* ---------------- FACT REPLIES ---------------- */
function getFactReply(question, program) {
  const q = question.toLowerCase();
  if (!program) return null;

  // FEES
  if (q.includes("fee") || q.includes("cost") || q.includes("emi")) {
    return `
## 💰 ${program.name} — Fee Details

• **EMI Starts:** ${program.fees.emi_start}  
• **EMI Duration:** ${program.fees.emi_duration}  
• **No-Cost EMI:** ${program.fees.no_cost_emi}  
• **Scholarship:** ${program.fees.scholarship}

${admissionFooter()}
`;
  }

  // DURATION
  if (q.includes("duration")) {
    return `
## ⏱ ${program.name}

The program duration is **${program.duration}**.
`;
  }

  // ELIGIBILITY
  if (q.includes("eligibility")) {
    return `
## 📝 Eligibility — ${program.name}

${program.eligibility}

${admissionFooter()}
`;
  }

  // PLACEMENT SUPPORT
  if (q.includes("placement support")) {
    return `
## 📊 ${program.name} — Placement Support

Yes 👍 placement assistance is available.

• Resume building  
• Mock interviews  
• Career coaching  
• Placement drives & recruiter access

${admissionFooter()}
`;
  }

  // PLACEMENT STATS
  if (q.includes("placement") || q.includes("salary") || q.includes("ctc")) {
    const p = program.placement || program.career_growth;

    return `
## 📈 ${program.name} — Placement Highlights

• **Placement Rate:** ${p.placement_rate || p.promotion_rate}  
• **Average CTC:** ${p.average_ctc}  
• **Salary Range:** ${p.salary_range}

${admissionFooter()}
`;
  }

  // FORMAT
  if (q.includes("format") || q.includes("online") || q.includes("offline")) {
    return `
## 💻 Program Format

${program.name} is conducted in **${program.format}** format.
`;
  }

  return null;
}

/* ---------------- AI SAFE REPLY ---------------- */
async function getAIReply(question, program) {
  try {
    const programNames = programs.map((p) => p.name).join(", ");

    const context = program
      ? `
Program: ${program.name}
Duration: ${program.duration}
Format: ${program.format}
Global Exposure: ${program.global_exposure?.join(", ")}
`
      : `
Institute Overview: ${institute.overview}
Global Presence: ${institute.global_presence.join(", ")}
Faculty: ${faculty.faculty_overview}
`;

    const res = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content: `
You are an admission counselor.



STRICT RULES:
• Only answer using provided data
• Do NOT invent courses
• Keep replies structured
• Use headings (##)
• Highlight important values using **bold**
• If availability asked → start with YES or NO
• If info missing → say:
"I can help with programs, fees, placements, or admissions."

STRICT FORMAT RULES:

• Use markdown headings:
   ## Main Heading
   ### Sub Heading

• Use bullet lists:
   - Point 1
   - Point 2

• Do NOT write plain text headings.
• Keep structure clean.

${context}
`,
            },
            { role: "user", content: question },
          ],
          temperature: 0.2,
        }),
      }
    );

    const data = await res.json();
    const reply =
      data?.choices?.[0]?.message?.content ||
      "I can help with programs, fees, placements, or admissions.";

    return reply + admissionFooter();
  } catch {
    return "Please contact our counselor for more details.";
  }
}

/* ---------------- MAIN FUNCTION ---------------- */
export default async function askBot(question) {
  const q = question.toLowerCase().trim();

  if (/^(hi|hello|hey|hii|namaste)/.test(q)) {
    return `
👋 Hello! Welcome to **Charters Union**.

I can help you with:
• Programs  
• Fees  
• Placements  
• Admissions  

How can I assist you today?
`;
  }

 if (q.includes("program") || q.includes("course") || q.includes("offer")) {
  return `
## 🎓 Available Programs

- **Master of Business Administration (MBA)**
- **Post Graduate Diploma in Management (PGDM)**
- **Executive MBA (Product Growth Engineering)**

Reply with a program name to get details.
`;
}

  const program = findProgram(q);

  const factReply = getFactReply(q, program);
  if (factReply) return factReply;

  if (!program && /(bba|bcom|bca|phd|degree)/i.test(q)) {
    return `
We currently offer:

${buildProgramList()}

Would you like details about one of these?
`;
  }

  return await getAIReply(question, program);
}