chrome.storage.local.get({ jobs: [] }, (result) => {
  const jobs = result.jobs;
  const now = new Date();

  // 1. ALL YOUR EXISTING COUNTER LOGIC (Today, Week, Month, etc.)
  const isToday = (d) => d.toDateString() === now.toDateString();
  const isThisWeek = (d) => {
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    return d >= startOfWeek;
  };
  const isThisMonth = (d) => d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  const isThisYear = (d) => d.getFullYear() === now.getFullYear();

  let counts = { day: 0, week: 0, month: 0, year: 0 };

// Inside chrome.storage.local.get({ jobs: [] }, (result) => { ...

jobs.forEach((job, index) => { // Added 'index' here to track which job we are editing
  const jobDate = new Date(job.date);
  
  // Define our possible statuses
  const statuses = ["Applied", "Interviewing", "Offered", "Rejected"];
  
  // Create the dropdown HTML
  let optionsHtml = statuses.map(s => 
    `<option value="${s}" ${job.status === s ? 'selected' : ''}>${s}</option>`
  ).join('');

  const row = `<tr>
    <td>${jobDate.toLocaleDateString()}</td>
    <td>${job.company}</td>
    <td>${job.role}</td>
    <td>
      <select class="status-updater" data-index="${index}">
        ${optionsHtml}
      </select>
    </td>
	<td>
      <button class="delete-btn" data-index="${index}">Delete</button>
    </td>
  </tr>`;
  
  document.querySelector('#jobTable tbody').insertAdjacentHTML('beforeend', row);
});

// Add the event listener for the dropdowns
document.querySelectorAll('.status-updater').forEach(select => {
  select.addEventListener('change', (e) => {
    const index = e.target.getAttribute('data-index');
    const newStatus = e.target.value;
    updateJobStatus(index, newStatus);
  });
});

// ... (rest of your existing code)

  // Update Big Number UI
  document.getElementById('dayCount').innerText = counts.day;
  document.getElementById('weekCount').innerText = counts.week;
  document.getElementById('monthCount').innerText = counts.month;
  document.getElementById('yearCount').innerText = counts.year;

  // 2. CALL THE CHART FUNCTION HERE
  renderChart(jobs); 
});

// 3. DEFINE THE FUNCTION AT THE BOTTOM (Outside the storage block)
function renderChart(jobs) {
  const canvas = document.getElementById('trendChart');
  if (!canvas) return; // Safety check

  const ctx = canvas.getContext('2d');
  
  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toLocaleDateString();
  }).reverse();

  const countsByDay = last7Days.map(dateStr => {
    return jobs.filter(j => new Date(j.date).toLocaleDateString() === dateStr).length;
  });

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: last7Days,
      datasets: [{
        label: 'Applications',
        data: countsByDay,
        backgroundColor: '#2563eb',
        borderRadius: 5
      }]
    },
    options: { 
      responsive: true,
      scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
    }
  });
}

document.getElementById('clearData').addEventListener('click', () => {
  if (confirm("Are you sure you want to delete all job tracking data? This cannot be undone.")) {
    chrome.storage.local.set({ jobs: [] }, () => {
      location.reload(); // Refreshes the page to show 0 stats
    });
  }
});

function updateJobStatus(index, newStatus) {
  chrome.storage.local.get({ jobs: [] }, (result) => {
    let jobs = result.jobs;
    
    // Update the specific job at the provided index
    jobs[index].status = newStatus;
    
    // Save it back to storage
    chrome.storage.local.set({ jobs }, () => {
      console.log('Status updated!');
      // Refresh the page so the Big Numbers and Chart update immediately
      location.reload(); 
    });
  });
}

function deleteJob(index) {
  if (confirm("Remove this job from your history?")) {
    chrome.storage.local.get({ jobs: [] }, (result) => {
      let jobs = result.jobs;
      
      // Remove 1 item at the specified index
      jobs.splice(index, 1);
      
      chrome.storage.local.set({ jobs }, () => {
        location.reload(); // Refresh to update charts and list
      });
    });
  }
}