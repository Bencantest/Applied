document.getElementById('saveBtn').addEventListener('click', () => {
  const company = document.getElementById('company').value;
  const role = document.getElementById('role').value;
  const date = new Date().toISOString(); // Records the exact moment applied
  const status = document.getElementById('statusSelect').value;

  if (company && role) {
    // 1. Get current list from storage
    chrome.storage.local.get({ jobs: [] }, (result) => {
      const jobs = result.jobs;
      
      // 2. Add the new job
      jobs.push({ company, role, date, status });

      // 3. Save it back
      chrome.storage.local.set({ jobs }, () => {
        document.getElementById('status').innerText = "Saved!";
        // Clear inputs
        document.getElementById('company').value = '';
        document.getElementById('role').value = '';
        
        setTimeout(() => { document.getElementById('status').innerText = ""; }, 2000);
      });
    });
  } else {
    document.getElementById('status').innerText = "Please fill all fields.";
  }
});

// Open the stats page
document.getElementById('viewStats').addEventListener('click', () => {
  chrome.tabs.create({ url: chrome.runtime.getURL('dashboard/stats.html') });
});