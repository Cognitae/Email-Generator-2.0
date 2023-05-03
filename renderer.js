const path = require('path');
const templatesJsonPath = path.join(__dirname, 'templates.json');

// Load templates from JSON file
let templates = [];
fetch(templatesJsonPath)
  .then(response => response.json())
  .then(data => {
    templates = data;
  })
  .catch(error => {
    console.error('Error loading templates:', error);
  });

const companyNameInput = document.getElementById('companyName');
const clientNameInput = document.getElementById('clientName');
const numImagesInput = document.getElementById('numImages');
const craftTypeInput = document.getElementById('craftType');
const moduleInput = document.getElementById('module');
const emailContentTextarea = document.getElementById('emailContent');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const toggleThemeBtn = document.getElementById('toggleThemeBtn');

// Function to generate email content based on selected template and input values
function generateEmailContent() {
  const companyName = companyNameInput.value;
  const clientName = clientNameInput.value;
  const numImages = parseInt(numImagesInput.value, 10); // Parse to integer
  const craftType = craftTypeInput.value;
  const module = moduleInput.value;

  // Determine the text based on the number of images
  const imageText = numImages === 1 ? 'this image' : 'these images';
  const imagText = numImages === 1 ? 'image' : 'images';
  const someText = numImages === 1 ? 'a' : 'some';
  // Generate 'hereText' based on the number of images
  let hereText;
  if (numImages > 2) {
    hereText = Array(numImages - 1).fill('Here').join(', ') + ', and Here';
  } else if (numImages === 2) {
    hereText = 'Here and Here';
  } else {
    hereText = 'Here';
  }

  // Get the selected template radio button
  const selectedTemplateRadio = document.querySelector('input[name="emailTemplate"]:checked');
  const selectedTemplateId = parseInt(selectedTemplateRadio.value);
  const selectedTemplate = templates.find(t => t.id === selectedTemplateId);

  // Generate the email content based on the input values and selected template
  if (selectedTemplate) {
    const emailContent = selectedTemplate.content
      .replace(/{clientName}/g, clientName)
      .replace(/{numImages}/g, numImages)
      .replace(/{craftType}/g, craftType)
      .replace(/{module}/g, module)
      .replace(/{companyName}/g, companyName)
      .replace(/{imageText}/g, imageText)
      .replace(/{imagText}/g, imagText)
      .replace(/{someText}/g, someText)
      .replace(/{hereText}/g, hereText);

    // Update the text area with the generated email content
    emailContentTextarea.value = emailContent;
  }
}

// Function to save input field values to localStorage
function saveInputValuesToLocalStorage() {
  localStorage.setItem('companyName', companyNameInput.value);
  localStorage.setItem('clientName', clientNameInput.value);
  localStorage.setItem('numImages', numImagesInput.value);
  localStorage.setItem('craftType', craftTypeInput.value);
  localStorage.setItem('module', moduleInput.value);
}

// Load input field values from localStorage
function loadInputValuesFromLocalStorage() {
  companyNameInput.value = localStorage.getItem('companyName') || '';
  clientNameInput.value = localStorage.getItem('clientName') || '';
  numImagesInput.value = localStorage.getItem('numImages') || '';
  craftTypeInput.value = localStorage.getItem('craftType') || '';
  moduleInput.value = localStorage.getItem('module') || '';
  }
  
  // Event listeners
  generateBtn.addEventListener('click', generateEmailContent);
  
  copyBtn.addEventListener('click', () => {
  emailContentTextarea.select();
  document.execCommand('copy');
  });
  
  toggleThemeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  });
  
  // Code for handling dark mode persistence across pages
  toggleThemeBtn.addEventListener('click', () => {
  const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem('theme', currentTheme);
  });
  
  window.addEventListener('DOMContentLoaded', () => {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'dark') {
  document.body.classList.add('dark-mode');
  } else {
  document.body.classList.remove('dark-mode');
  }
  // Call the function to load input field values from localStorage
  loadInputValuesFromLocalStorage();
  });
  
  // Add event listener to save input field values to localStorage before leaving the page
  window.addEventListener('beforeunload', saveInputValuesToLocalStorage);
