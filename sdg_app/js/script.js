/* js/script.js */

/*
  Ορισμός των 34 δεικτών με τα βάρη τους και όρια για δυναμική ανατροφοδότηση.
  Για τους δείκτες:
    - I1, I2, I4, I5, I6, I7, I20, I31, I34: αν η τιμή στο "Σύνολο" είναι 0 έως 2.25 τότε
      εμφανίζεται το μήνυμα "Περισσότερα μπορούν να γίνουν."
    - I10, I11, I12, I14, I15, I16, I19, I21, I22, I23, I26, I27, I28, I29, I33: αν η τιμή στο "Σύνολο" είναι 0 έως 2 τότε
      εμφανίζεται το ίδιο μήνυμα.
  Οι δείκτες με custom input (I3, I8, I9, I13, I17, I18, I24, I30) παραμένουν ως έχουν.
*/
const indicators = [
    { id: 'I1',  weight: 0.784, threshold: 2.25 },
    { id: 'I2',  weight: 0.56,  threshold: 2.25 },
    { id: 'I3',  weight: 0.6,   threshold: null },   // Custom input: Kg / Pop
    { id: 'I4',  weight: 0.65,  threshold: 2.25 },
    { id: 'I5',  weight: 0.72,  threshold: 2.25 },
    { id: 'I6',  weight: 0.5,   threshold: 2.25 },
    { id: 'I7',  weight: 0.6,   threshold: 2.25 },
    { id: 'I8',  weight: 0.55,  threshold: null },   // Custom input: First-year / Graduates
    { id: 'I9',  weight: 0.62,  threshold: null },   // Custom input: Female senior academic / Senior academic
    { id: 'I10', weight: 0.58,  threshold: 2 },
    { id: 'I11', weight: 0.6,   threshold: 2 },
    { id: 'I12', weight: 0.63,  threshold: 2 },
    { id: 'I13', weight: 0.57,  threshold: null },   // Custom input: Water (m³) / Population of campus
    { id: 'I14', weight: 0.59,  threshold: 2 },
    { id: 'I15', weight: 0.61,  threshold: 2 },
    { id: 'I16', weight: 0.64,  threshold: 2 },
    { id: 'I17', weight: 0.56,  threshold: null },   // Custom input: Energy (GJ) / Floor space (m²)
    { id: 'I18', weight: 0.54,  threshold: null },   // Custom input: Research income / Academic staff
    { id: 'I19', weight: 0.55,  threshold: 2 },
    { id: 'I20', weight: 0.58,  threshold: 2.25 },
    { id: 'I21', weight: 0.53,  threshold: 2 },
    { id: 'I22', weight: 0.52,  threshold: 2 },
    { id: 'I23', weight: 0.57,  threshold: 2 },
    { id: 'I24', weight: 0.6,   threshold: null },   // Custom input: Waste recycled / Waste generated
    { id: 'I25', weight: 0.62,  threshold: 2.25 },    // Custom input: 1 field
    { id: 'I26', weight: 0.61,  threshold: 2 },
    { id: 'I27', weight: 0.63,  threshold: 2 },
    { id: 'I28', weight: 0.64,  threshold: 2 },
    { id: 'I29', weight: 0.55,  threshold: 2 },
    { id: 'I30', weight: 0.58,  threshold: null },   // Custom input: Publications / Academic staff
    { id: 'I31', weight: 0.32,  threshold: 2.25 },
    { id: 'I32', weight: 0.18,  threshold: 2.25 },
    { id: 'I33', weight: 0.11,  threshold: 2.25 },
    { id: 'I34', weight: 0.14,  threshold: 2.25 }
  ];
  
  // Ορισμός των select inputs που δεν έχουν custom input.
  // Για τους δείκτες που δεν ανήκουν στην ομάδα I1, I2, I4, I5, I6, I7, I20, I31, I34, όλες οι τιμές στα 3 select είναι 0 ή 1.
  // Για τους δείκτες I1, I2, I4, I5, I6, I7, I20, I31, I34, στο πρώτο select συμπεριλαμβάνεται το 0.25.
  const optionsWith025 = `
    <option value="0">0</option>
    <option value="0.25">0.25</option>
    <option value="1">1</option>
  `;
  const options01 = `
    <option value="0">0</option>
    <option value="1">1</option>
  `;
  // Ορίζουμε τη λίστα των δεικτών που επιτρέπουν το 0.25 μόνο στο πρώτο select.
  const threeSelectWith025 = ["I1", "I2", "I4", "I5", "I6", "I7", "I20", "I31", "I34"];
  
  // Δημιουργία των γραμμών του πίνακα
  let rows = '';
  indicators.forEach(indicator => {
    rows += `<tr>
      <td>${indicator.id}</td>`;
    
    // Έλεγχος για δείκτες με custom input
    if (indicator.id === "I3") {
      // I3: Kg / Pop
      rows += `<td>
                 <div style="font-size:0.9em; text-align:left;">
                   <strong>Ref:</strong> Kg: <input type="number" id="kg_ref_I3" step="0.01">
                   Pop: <input type="number" id="pop_ref_I3" step="1">
                 </div>
                 <div style="font-size:0.9em; text-align:left; margin-top:4px;">
                   <strong>Eval:</strong> Kg: <input type="number" id="kg_eval_I3" step="0.01">
                   Pop: <input type="number" id="pop_eval_I3" step="1">
                 </div>
               </td>`;
    }
    else if (indicator.id === "I8") {
      // I8: First-year students / Graduates
      rows += `<td>
                 <div style="font-size:0.9em; text-align:left;">
                   <strong>Ref:</strong> First-year: <input type="number" id="first_ref_I8" step="1">
                   Graduates: <input type="number" id="grad_ref_I8" step="1">
                 </div>
                 <div style="font-size:0.9em; text-align:left; margin-top:4px;">
                   <strong>Eval:</strong> First-year: <input type="number" id="first_eval_I8" step="1">
                   Graduates: <input type="number" id="grad_eval_I8" step="1">
                 </div>
               </td>`;
    }
    else if (indicator.id === "I9") {
      // I9: Female senior academic / Senior academic
      rows += `<td>
                 <div style="font-size:0.9em; text-align:left;">
                   <strong>Ref:</strong> Female senior staff: <input type="number" id="female_ref_I9" step="1">
                   Senior academic: <input type="number" id="senior_ref_I9" step="1">
                 </div>
                 <div style="font-size:0.9em; text-align:left; margin-top:4px;">
                   <strong>Eval:</strong> Female senior staff: <input type="number" id="female_eval_I9" step="1">
                   Senior academic: <input type="number" id="senior_eval_I9" step="1">
                 </div>
               </td>`;
    }
    else if (indicator.id === "I13") {
      // I13: Water (m³) / Population of campus
      rows += `<td>
                 <div style="font-size:0.9em; text-align:left;">
                   <strong>Ref:</strong> Water (m³): <input type="number" id="water_ref_I13" step="0.01">
                   Population: <input type="number" id="pop_ref_I13" step="1">
                 </div>
                 <div style="font-size:0.9em; text-align:left; margin-top:4px;">
                   <strong>Eval:</strong> Water (m³): <input type="number" id="water_eval_I13" step="0.01">
                   Population: <input type="number" id="pop_eval_I13" step="1">
                 </div>
               </td>`;
    }
    else if (indicator.id === "I17") {
      // I17: Energy (GJ) / Floor space (m²)
      rows += `<td>
                 <div style="font-size:0.9em; text-align:left;">
                   <strong>Ref:</strong> Energy (GJ): <input type="number" id="energy_ref_I17" step="0.01">
                   Floor space (m²): <input type="number" id="floor_ref_I17" step="0.01">
                 </div>
                 <div style="font-size:0.9em; text-align:left; margin-top:4px;">
                   <strong>Eval:</strong> Energy (GJ): <input type="number" id="energy_eval_I17" step="0.01">
                   Floor space (m²): <input type="number" id="floor_eval_I17" step="0.01">
                 </div>
               </td>`;
    }
    else if (indicator.id === "I18") {
      // I18: Research income / Academic staff
      rows += `<td>
                 <div style="font-size:0.9em; text-align:left;">
                   <strong>Ref:</strong> Research income: <input type="number" id="research_ref_I18" step="0.01">
                   Academic staff: <input type="number" id="staff_ref_I18" step="1">
                 </div>
                 <div style="font-size:0.9em; text-align:left; margin-top:4px;">
                   <strong>Eval:</strong> Research income: <input type="number" id="research_eval_I18" step="0.01">
                   Academic staff: <input type="number" id="staff_eval_I18" step="1">
                 </div>
               </td>`;
    }
    else if (indicator.id === "I24") {
      // I24: Waste recycled / Waste generated
      rows += `<td>
                 <div style="font-size:0.9em; text-align:left;">
                   <strong>Ref:</strong> Waste recycled: <input type="number" id="waste_recycled_ref_I24" step="0.01">
                   Waste generated: <input type="number" id="waste_generated_ref_I24" step="0.01">
                 </div>
                 <div style="font-size:0.9em; text-align:left; margin-top:4px;">
                   <strong>Eval:</strong> Waste recycled: <input type="number" id="waste_recycled_eval_I24" step="0.01">
                   Waste generated: <input type="number" id="waste_generated_eval_I24" step="0.01">
                 </div>
               </td>`;
    }
    else if (indicator.id === "I25") {
      // I25: Μόνο ένα πεδίο εισόδου
      rows += `<td>
                 <input type="number" id="score_I25" step="any">
               </td>`;
    }
    else if (indicator.id === "I30") {
      // I30: Publications / Academic staff
      rows += `<td>
                 <div style="font-size:0.9em; text-align:left;">
                   <strong>Ref:</strong> Publications: <input type="number" id="publications_ref_I30" step="1">
                   Academic staff: <input type="number" id="staff_ref_I30" step="1">
                 </div>
                 <div style="font-size:0.9em; text-align:left; margin-top:4px;">
                   <strong>Eval:</strong> Publications: <input type="number" id="publications_eval_I30" step="1">
                   Academic staff: <input type="number" id="staff_eval_I30" step="1">
                 </div>
               </td>`;
    }
    else {
      // Για τους υπόλοιπους δείκτες (χωρίς custom input)
      // Έλεγχος αν ο δείκτης είναι από την ομάδα που επιτρέπει και 0.25 στο πρώτο select:
      if (threeSelectWith025.includes(indicator.id)) {
        rows += `<td>
                   <select id="score_eval_${indicator.id}_1">${optionsWith025}</select>
                   <select id="score_eval_${indicator.id}_2">${options01}</select>
                   <select id="score_eval_${indicator.id}_3">${options01}</select>
                 </td>`;
      } else {
        // Για τους υπόλοιπους, όλες οι επιλογές είναι 0 ή 1
        rows += `<td>
                   <select id="score_eval_${indicator.id}_1">${options01}</select>
                   <select id="score_eval_${indicator.id}_2">${options01}</select>
                   <select id="score_eval_${indicator.id}_3">${options01}</select>
                 </td>`;
      }
    }
    
    // Προσθήκη στηλών "Σύνολο", "Βάρος", "Σταθμισμένη Τιμή", "Ποσοστιαία Μεταβολή" και "Ανάγκη Βελτίωσης"
    rows += `<td><span id="sum_${indicator.id}">0.00</span></td>
             <td><input type="number" id="w_${indicator.id}" value="${indicator.weight}" readonly></td>
             <td><span id="weighted_${indicator.id}">0.00</span></td>
             <td><span id="change_${indicator.id}">N/A</span></td>
             <td><span id="feedback_${indicator.id}">-</span></td>
           </tr>`;
  });
  document.getElementById('indicatorsBody').innerHTML = rows;
  
  // Ενημέρωση της ετικέτας του έτους αξιολόγησης
  function updateYearLabels() {
    document.getElementById('evalYearLabel').textContent = document.getElementById('evalYear').value;
  }
  document.getElementById('evalYear').addEventListener('input', updateYearLabels);
  
  // Επεξεργασία υποβολής της φόρμας
  document.getElementById('sdgForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let totalWeightedScore = 0;
    
    indicators.forEach(indicator => {
      let evalScore = 0;
      if (indicator.id === "I3") {
        const kgRef = parseFloat(document.getElementById("kg_ref_I3").value) || 0;
        const popRef = parseFloat(document.getElementById("pop_ref_I3").value) || 0;
        const kgEval = parseFloat(document.getElementById("kg_eval_I3").value) || 0;
        const popEval = parseFloat(document.getElementById("pop_eval_I3").value) || 0;
        const ratioRef = (popRef !== 0 ? (kgRef / popRef) : 0);
        const ratioEval = (popEval !== 0 ? (kgEval / popEval) : 0);
        const r = (ratioRef !== 0 ? (ratioEval / ratioRef) : 0);
        document.getElementById("change_I3").textContent = r.toFixed(2);
        if (r > 1) {
          evalScore = 0;
        } else if (r !== 0) {
          evalScore = 1 / r;
        } else {
          evalScore = 0;
        }
      }
      else if (indicator.id === "I8") {
        const firstRef = parseFloat(document.getElementById("first_ref_I8").value) || 0;
        const gradRef = parseFloat(document.getElementById("grad_ref_I8").value) || 0;
        const firstEval = parseFloat(document.getElementById("first_eval_I8").value) || 0;
        const gradEval = parseFloat(document.getElementById("grad_eval_I8").value) || 0;
        const ratioRef = (gradRef !== 0 ? (firstRef / gradRef) : 0);
        const ratioEval = (gradEval !== 0 ? (firstEval / gradEval) : 0);
        const r = (ratioRef !== 0 ? (ratioEval / ratioRef) : 0);
        document.getElementById("change_I8").textContent = r.toFixed(2);
        evalScore = (r < 1 ? 0 : r);
      }
      else if (indicator.id === "I9") {
        const femaleRef = parseFloat(document.getElementById("female_ref_I9").value) || 0;
        const seniorRef = parseFloat(document.getElementById("senior_ref_I9").value) || 0;
        const femaleEval = parseFloat(document.getElementById("female_eval_I9").value) || 0;
        const seniorEval = parseFloat(document.getElementById("senior_eval_I9").value) || 0;
        const ratioRef = (seniorRef !== 0 ? (femaleRef / seniorRef) : 0);
        const ratioEval = (seniorEval !== 0 ? (femaleEval / seniorEval) : 0);
        const r = (ratioRef !== 0 ? (ratioEval / ratioRef) : 0);
        document.getElementById("change_I9").textContent = r.toFixed(2);
        evalScore = (r < 1 ? 0 : r);
      }
      else if (indicator.id === "I13") {
        const waterRef = parseFloat(document.getElementById("water_ref_I13").value) || 0;
        const popRef = parseFloat(document.getElementById("pop_ref_I13").value) || 0;
        const waterEval = parseFloat(document.getElementById("water_eval_I13").value) || 0;
        const popEval = parseFloat(document.getElementById("pop_eval_I13").value) || 0;
        const ratioRef = (popRef !== 0 ? (waterRef / popRef) : 0);
        const ratioEval = (popEval !== 0 ? (waterEval / popEval) : 0);
        const r = (ratioRef !== 0 ? (ratioEval / ratioRef) : 0);
        document.getElementById("change_I13").textContent = r.toFixed(2);
        if (r > 1) {
          evalScore = 0;
        } else if (r !== 0) {
          evalScore = 1 / r;
        } else {
          evalScore = 0;
        }
      }
      else if (indicator.id === "I17") {
        const energyRef = parseFloat(document.getElementById("energy_ref_I17").value) || 0;
        const floorRef = parseFloat(document.getElementById("floor_ref_I17").value) || 0;
        const energyEval = parseFloat(document.getElementById("energy_eval_I17").value) || 0;
        const floorEval = parseFloat(document.getElementById("floor_eval_I17").value) || 0;
        const ratioRef = (floorRef !== 0 ? (energyRef / floorRef) : 0);
        const ratioEval = (floorEval !== 0 ? (energyEval / floorEval) : 0);
        const r = (ratioRef !== 0 ? (ratioEval / ratioRef) : 0);
        document.getElementById("change_I17").textContent = r.toFixed(2);
        if (r > 1) {
          evalScore = 0;
        } else if (r !== 0) {
          evalScore = 1 / r;
        } else {
          evalScore = 0;
        }
      }
      else if (indicator.id === "I18") {
        const researchRef = parseFloat(document.getElementById("research_ref_I18").value) || 0;
        const staffRef = parseFloat(document.getElementById("staff_ref_I18").value) || 0;
        const researchEval = parseFloat(document.getElementById("research_eval_I18").value) || 0;
        const staffEval = parseFloat(document.getElementById("staff_eval_I18").value) || 0;
        const ratioRef = (staffRef !== 0 ? (researchRef / staffRef) : 0);
        const ratioEval = (staffEval !== 0 ? (researchEval / staffEval) : 0);
        const r = (ratioRef !== 0 ? (ratioEval / ratioRef) : 0);
        document.getElementById("change_I18").textContent = r.toFixed(2);
        evalScore = (r < 1 ? 0 : r);
      }
      else if (indicator.id === "I24") {
        const wasteRecycledRef = parseFloat(document.getElementById("waste_recycled_ref_I24").value) || 0;
        const wasteGeneratedRef = parseFloat(document.getElementById("waste_generated_ref_I24").value) || 0;
        const wasteRecycledEval = parseFloat(document.getElementById("waste_recycled_eval_I24").value) || 0;
        const wasteGeneratedEval = parseFloat(document.getElementById("waste_generated_eval_I24").value) || 0;
        const ratioRef = (wasteGeneratedRef !== 0 ? (wasteRecycledRef / wasteGeneratedRef) : 0);
        const ratioEval = (wasteGeneratedEval !== 0 ? (wasteRecycledEval / wasteGeneratedEval) : 0);
        const r = (ratioRef !== 0 ? (ratioEval / ratioRef) : 0);
        document.getElementById("change_I24").textContent = r.toFixed(2);
        if (r > 1) {
          evalScore = 0;
        } else if (r !== 0) {
          evalScore = 1 / r;
        } else {
          evalScore = 0;
        }
      }
      else if (indicator.id === "I25") {
        evalScore = parseFloat(document.getElementById("score_I25").value) || 0;
      }
      else if (indicator.id === "I30") {
        const publicationsRef = parseFloat(document.getElementById("publications_ref_I30").value) || 0;
        const staffRef = parseFloat(document.getElementById("staff_ref_I30").value) || 0;
        const publicationsEval = parseFloat(document.getElementById("publications_eval_I30").value) || 0;
        const staffEval = parseFloat(document.getElementById("staff_eval_I30").value) || 0;
        const ratioRef = (staffRef !== 0 ? (publicationsRef / staffRef) : 0);
        const ratioEval = (staffEval !== 0 ? (publicationsEval / staffEval) : 0);
        const r = (ratioRef !== 0 ? (ratioEval / ratioRef) : 0);
        document.getElementById("change_I30").textContent = r.toFixed(2);
        evalScore = (r < 1 ? 0 : r);
      }
      else {
        // Για τους υπόλοιπους δείκτες (με 3 select inputs)
        const s1 = parseFloat(document.getElementById(`score_eval_${indicator.id}_1`).value) || 0;
        const s2 = parseFloat(document.getElementById(`score_eval_${indicator.id}_2`).value) || 0;
        const s3 = parseFloat(document.getElementById(`score_eval_${indicator.id}_3`).value) || 0;
        evalScore = s1 + s2 + s3;
      }
      
      // Εμφάνιση της τιμής στο "Σύνολο"
      document.getElementById(`sum_${indicator.id}`).textContent = evalScore.toFixed(2);
      
      // Υπολογισμός σταθμισμένης τιμής (Σύνολο × Βάρος)
      const weight = parseFloat(document.getElementById(`w_${indicator.id}`).value) || indicator.weight;
      const weighted = evalScore * weight;
      totalWeightedScore += weighted;
      document.getElementById(`weighted_${indicator.id}`).textContent = weighted.toFixed(2);
      
      // Δυναμική ανατροφοδότηση βασισμένη στο "Σύνολο"
      if (indicator.threshold !== null) {
        if (evalScore <= indicator.threshold) {
          document.getElementById(`feedback_${indicator.id}`).textContent = "Περισσότερα μπορούν να γίνουν.";
        } else {
          document.getElementById(`feedback_${indicator.id}`).textContent = "Δεν απαιτείται βελτίωση.";
        }
      } else {
        document.getElementById(`feedback_${indicator.id}`).textContent = "-";
      }
    });
    
    // Εμφάνιση της συνολικής σταθμισμένης αξιολόγησης
    document.getElementById('finalScore').textContent = totalWeightedScore.toFixed(2);
  });
  