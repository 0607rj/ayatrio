const  programs  = require("../data/programs.json");

function findProgram(question) {
  const q = question.toLowerCase();

   return programs.programs.find(p =>
    q.includes(p.id) ||
    q.includes("mba") && p.id === "mba" ||
    q.includes("pgdm") && p.id === "pgdm" ||
    q.includes("executive") ||
    q.includes("product growth")
  );
}

module.exports = findProgram;