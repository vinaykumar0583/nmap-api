// 1st method
const express = require('express');
const app = express();
const { exec } = require('child_process');

app.post('/scan', (req, res) => {
    const  target  = "google.com";
      if (!target) {
    return res.status(400).send('Target parameter is missing');
  }

  // Run nmap command
  exec(`nmap ${target}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing nmap: ${error}`);
      return res.status(500).send('Internal server error');
    }
    if (stderr) {
      console.error(`nmap error: ${stderr}`);
      return res.status(400).send('Invalid target parameter');
    }
    res.send(stdout);
  });
});

// Start the server
const port = process.env.PORT || 80;
const httpsPort = process.env.HTTPS_PORT || 443;
app.listen(httpsPort, () => {
  console.log(`Server started on port ${httpsPort}`);
});


// 2nd method
// const express = require('express');
// const app = express();
// const nmap = require('node-nmap');

// app.post('/scan', (req, res) => {
//   const target = "google.com";
//   const options = {
//     flags: ['-sS', '-p 1-65535'],
//     range: [target]
//   };
  
//   const scan = new nmap.OsAndPortScan(options.range[0]);
//   scan.on('complete', (data) => {
//     res.json(data);
//   });
//   scan.startScan();
// });

// app.listen(80, () => {
//   console.log('Server listening on port 80');
// });

// app.listen(443, () => {
//   console.log('Server listening on port 443');
// });
