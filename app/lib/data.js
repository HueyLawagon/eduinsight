import fs from 'fs';
import path from 'path';

// Simple CSV parser assuming no quoted commas and a header row.
function parseCsv(csvString) {
  const lines = csvString.trim().split('\n');
  const headers = lines.shift().split(',').map(h => h.trim());
  return lines.map(line => {
    const values = line.split(',');
    const obj = {};
    headers.forEach((h, i) => {
      // try to coerce numeric values
      const val = values[i];
      const num = parseFloat(val);
      obj[h] = isNaN(num) ? val : num;
    });
    return obj;
  });
}

function computeMetrics(rows) {
  const totalStudents = rows.length;
  const classAverage =
    totalStudents > 0
      ? rows.reduce((sum, r) => sum + (r.grade || 0), 0) / totalStudents
      : 0;
  const avgAttendance =
    totalStudents > 0
      ? rows.reduce((sum, r) => sum + (r.attendance || 0), 0) / totalStudents
      : 0;

  // average score per subject (assumes columns math, science, history, english)
  const subjects = ['math', 'science', 'history', 'english'];
  const avgScore = subjects.map(subj => {
    const total = rows.reduce((sum, r) => sum + (r[subj] || 0), 0);
    return total / totalStudents;
  });

  // risk distribution: low, medium, high
  const riskDistribution = [0, 0, 0];
  rows.forEach(r => {
    if (typeof r.risk === 'string') {
      const lower = r.risk.toLowerCase();
      if (lower.includes('low')) riskDistribution[0]++;
      else if (lower.includes('medium')) riskDistribution[1]++;
      else if (lower.includes('high')) riskDistribution[2]++;
    }
  });

  // grade distribution ranges
  const gradeDistribution = [0, 0, 0, 0];
  rows.forEach(r => {
    const g = r.grade;
    if (g >= 90) gradeDistribution[0]++;
    else if (g >= 80) gradeDistribution[1]++;
    else if (g >= 70) gradeDistribution[2]++;
    else gradeDistribution[3]++;
  });

  // return as raw numbers or fixed decimals if you prefer
  return {
    totalStudents,
    classAverage: parseFloat(classAverage.toFixed(1)),
    avgAttendance: parseFloat(avgAttendance.toFixed(1)),
    avgScore: avgScore.map(n => parseFloat(n.toFixed(1))),
    riskDistribution,
    gradeDistribution,
  };
}

export async function getDashboardData() {
  // read csv file from disk
  const csvPath = path.join(process.cwd(), 'app', 'Data', 'Data.csv');
  let csv;
  try {
    csv = fs.readFileSync(csvPath, 'utf8');
  } catch (e) {
    console.error('Failed to read Data.csv:', e);
    return {
      totalStudents: 0,
      classAverage: 0,
      avgAttendance: 0,
      avgScore: [0, 0, 0, 0],
      riskDistribution: [0, 0, 0],
      gradeDistribution: [0, 0, 0, 0],
      students: [],
    };
  }

  const rows = parseCsv(csv);
  const metrics = computeMetrics(rows);

  // map rows into student objects that match earlier placeholder format
  const students = rows.map(r => ({
    name: r.name,
    risk: r.risk,
    grade: r.grade,
    attendance: r.attendance,
    missing: r.missing,
    predicted: r.predicted,
    // include subjects if needed
    math: r.math,
    science: r.science,
    history: r.history,
    english: r.english,
  }));

  return { ...metrics, students };
}
