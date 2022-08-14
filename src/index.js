let filter = {
  major: 'ALL',
  grade: 'ALL',
}

const doFilter = (major, grade) => {
  if (filter.major !== 'ALL' && filter.major !== major) {
    return false;
  }
  if (filter.grade !== 'ALL' && filter.grade !== grade) {
    return false;
  }
  return true;
}

const changeFilter = (changed) => {
  filter = { ...filter, ...changed }
}

const bigTable = document.querySelector('table[width="960"]');
if (bigTable) {
  function update() {
    const tableTr = bigTable.querySelectorAll('tbody > tr');
    for (const tr of tableTr) {
      const td = tr.querySelectorAll('td');
      if (td.length === 0) continue;
      if (td[0].className === 'BoxLabel_1') continue;
      const major = td[2].innerText;
      const grade = td[8].innerText;
      tr.style.display = doFilter(major, grade) ? '' : 'none';
    }
  }

  const tableHeader = bigTable.querySelectorAll('tbody > tr')[0];
  const tableHeaderTd = tableHeader.querySelectorAll('td');

  const majorTd = tableHeaderTd[2]
  majorTd.innerHTML = `${majorTd.innerHTML}
  <select>
    <option value="ALL">전체</option>
    <option value="Y (Y)">Y (Y)</option>
    <option value="Y (N)">Y (N)</option>
    <option value="N (N)">N (N)</option>
  </select>
  `
  majorTd.querySelector('select').addEventListener('change', (e) => {
    changeFilter({ major: e.target.value });
    update();
  });

  const gradeTd = tableHeaderTd[8]
  gradeTd.innerHTML = `${gradeTd.innerHTML}
  <select>
    <option value="ALL">전체</option>
    <option value="1">1학년</option>
    <option value="2">2학년</option>
    <option value="3">3학년</option>
    <option value="4">4학년</option>
  </select>
  `
  gradeTd.querySelector('select').addEventListener('change', (e) => {
    changeFilter({ grade: e.target.value });
    update();
  });
}

