// renderer-templates.js
const path = require('path');
const templatesJsonPath = path.join(__dirname, 'templates.json');

// Read the .json file
fs.readFile(templatesJsonPath, 'utf8', (err, data) => {
  if (err) throw err;
  let templates = JSON.parse(data);

// Get the elements from the templates.html page
const templateEditor1 = document.getElementById('templateEditor1');
const templateEditor2 = document.getElementById('templateEditor2');
const templateEditor3 = document.getElementById('templateEditor3');
const saveTemplateBtn1 = document.getElementById('saveTemplateBtn1');
const saveTemplateBtn2 = document.getElementById('saveTemplateBtn2');
const saveTemplateBtn3 = document.getElementById('saveTemplateBtn3');
const fs = require('fs');

// Function to save templates to the templates.json file
function saveTemplatesToFile(templates) {
  fs.writeFile('templates.json', JSON.stringify(templates), (err) => {
    if (err) throw err;
    alert('Templates saved successfully!');
    // Set focus to templateEditor1 after saving
    templateEditor1.focus();
  });
}
});

// Event listeners for the "Save" buttons
saveTemplateBtn1.addEventListener('click', () => {
  fs.readFile(templatesJsonPath, 'utf8', (err, data) => {
    if (err) throw err;
    let templates = JSON.parse(data);
    templates[0].content = templateEditor1.value; // Update the content of Template 1
    saveTemplatesToFile(templates);
  });
});

saveTemplateBtn2.addEventListener('click', () => {
  fs.readFile(templatesJsonPath, 'utf8', (err, data) => {
    if (err) throw err;
    let templates = JSON.parse(data);
    templates[1].content = templateEditor2.value; // Update the content of Template 2
    saveTemplatesToFile(templates);
  });
});

saveTemplateBtn3.addEventListener('click', () => {
  fs.readFile(templatesJsonPath, 'utf8', (err, data) => {
    if (err) throw err;
    let templates = JSON.parse(data);
    templates[2].content = templateEditor3.value; // Update the content of Template 3
    saveTemplatesToFile(templates);
  });
});

// Load templates from JSON file and display them in the text areas
fs.readFile(templatesJsonPath, 'utf8', (err, data) => {
  if (err) throw err;
  let templates = JSON.parse(data);
  templateEditor1.value = templates[0].content;
  templateEditor2.value = templates[1].content;
  templateEditor3.value = templates[2].content;
});

// Load theme preference from localStorage and apply it
const currentTheme = localStorage.getItem('theme'); // Use key 'theme'
if (currentTheme === 'dark') {
  document.body.classList.add('dark-mode');
}

// Get the toggleThemeBtn from the templates.html page
const toggleThemeBtnTemplates = document.getElementById('toggleThemeBtnTemplates');

// Update toggleThemeBtn event listener to save theme preference in localStorage
toggleThemeBtnTemplates.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  // Save theme preference in localStorage
  const isDarkMode = document.body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light'); // Use key 'theme'
});
