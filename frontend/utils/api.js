// async function validateApiKey(apiKey, apiSecret) {
//   const response = await fetch('http://127.0.0.1:8000/app/use/', {
//     method: 'GET',
//     headers: {
//       'Authorization': `token ${apiKey}:${apiSecret}`,
//       'Content-Type': 'application/json'
//     }
//   });

//   if (!response.ok) throw new Error('Invalid API key or secret');
//   return response.json(); // JSON data from ERPNext
// }

// module.exports = { validateApiKey };
