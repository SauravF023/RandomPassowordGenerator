let historyList = [];

function generatePasswords() {
  const length = document.getElementById("length").value;
  const includeSpecial = document.getElementById("special").checked;
  const includeUpper = document.getElementById("uppercase").checked;

  let lower = "abcdefghijklmnopqrstuvwxyz";
  let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let numbers = "0123456789";
  let symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

  let chars = lower + numbers;
  if (includeUpper) chars += upper;
  if (includeSpecial) chars += symbols;

  function gen() {
    let password = "";
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }

  // Generate and update boxes
  for (let i = 1; i <= 4; i++) {
    const pw = gen();
    const box = document.getElementById("pw" + i);
    box.querySelector(".pw-text").textContent = pw;
    const strengthEl = box.querySelector(".strength");
    strengthEl.textContent = getStrength(pw);
    strengthEl.className = "strength " + getStrength(pw).toLowerCase();

    // Add to history
    addToHistory(pw);
  }
}

function getStrength(password) {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  if (strength <= 2) return "Weak";
  if (strength === 3 || strength === 4) return "Medium";
  return "Strong";
}

function copyPassword(id) {
  const pw = document.getElementById(id).querySelector(".pw-text").textContent;
  if (!pw) return;
  navigator.clipboard.writeText(pw).then(() => {
    const box = document.getElementById(id);
    const oldText = box.querySelector(".pw-text").textContent;
    box.querySelector(".pw-text").textContent = "✔ Copied!";
    setTimeout(() => {
      box.querySelector(".pw-text").textContent = oldText;
    }, 800);
  });
}

function addToHistory(password) {
  historyList.unshift(password);
  if (historyList.length > 5) historyList.pop();

  const historyEl = document.getElementById("history");
  historyEl.innerHTML = "";
  historyList.forEach((pw, index) => {
    const li = document.createElement("li");
    li.textContent = pw;
    const btn = document.createElement("button");
    btn.textContent = "Copy";
    btn.className = "copy-btn";
    btn.onclick = () => navigator.clipboard.writeText(pw);
    li.appendChild(btn);
    historyEl.appendChild(li);
  });
}