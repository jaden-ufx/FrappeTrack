document.addEventListener('DOMContentLoaded', async () => {
  const data = await window.electronAPI.getUserData();
  console.log('User data:', data);

  document.getElementById('username').innerText =data?.message?.user?.name;
  document.getElementById('designation').innerText =data.message.user.employee.designation;
  document.getElementById('email').innerText =data.message.user.email;
  document.getElementById('empImage').src = data.message.user.employee.image;
  document.getElementById('empId').innerText = data.message.employee.name;

});
