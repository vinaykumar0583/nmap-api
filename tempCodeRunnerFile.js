const express = require('express');
const app = express();
const nmap = require('node-nmap');

app.post('/scan', (req, res) => {
  const target = "google.com";
  const options = {
    flags: ['-sS', '-p 1-65535'],
    range: [target]
  };
  
  const scan = new nmap.OsAndPortScan(options.range[0]);
  scan.on('complete', (data) => {
    res.json(data);
  });
  scan.startScan();
});

app.listen(80, () => {
  console.log('Server listening on port 80');
});

app.listen(443, () => {
  console.log('Server listening on port 443');
});
