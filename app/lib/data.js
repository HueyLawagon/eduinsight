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

function computeRisk(grade) {
  if (grade >= 80) return 'Low Risk';
  if (grade >= 70) return 'Medium Risk';
  return 'High Risk';
}

function computeGrade(row) {
  const subjects = ['math', 'science', 'history', 'english'];
  const subjectAvg = subjects.reduce((sum, subj) => sum + (row[subj] || 0), 0) / subjects.length;
  
  let penalty = 0;
  
  // Attendance penalty
  if (row.attendance < 80) penalty += 10;
  else if (row.attendance < 90) penalty += 5;
  
  // Missing assignments penalty (2 points per missing)
  penalty += (row.missing || 0) * 2;
  
  // Ensure grade doesn't go below 0
  const finalGrade = Math.max(0, subjectAvg - penalty);
  
  return finalGrade;
}

function computeMetrics(rows) {
  const totalStudents = rows.length;
  // Compute grades for each student
  const studentGrades = rows.map(r => computeGrade(r));
  const classAverage =
    totalStudents > 0
      ? studentGrades.reduce((sum, g) => sum + g, 0) / totalStudents
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
  studentGrades.forEach(grade => {
    const risk = computeRisk(grade);
    if (risk === 'Low Risk') riskDistribution[0]++;
    else if (risk === 'Medium Risk') riskDistribution[1]++;
    else if (risk === 'High Risk') riskDistribution[2]++;
  });

  // grade distribution ranges
  const gradeDistribution = [0, 0, 0, 0];
  studentGrades.forEach(g => {
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
    risk: computeRisk(computeGrade(r)),
    grade: parseFloat(computeGrade(r).toFixed(1)),
    attendance: r.attendance,
    missing: r.missing,
    // include subjects if needed
    math: r.math,
    science: r.science,
    history: r.history,
    english: r.english,
  }));

  return { ...metrics, students };
}
