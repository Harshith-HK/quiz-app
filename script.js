const questions = [
  {
    question: "Which standard protocol is commonly used by RESTful Web Services?",
    options: ["HTTP", "FTP", "Telnet", "DNS"],
    answer: "A"
  },
  {
    question: "SOAP-based Web Services primarily rely on which data format?",
    options: ["CSV", "YAML", "XML", "JSON"],
    answer: "C"
  },
  {
    question: "Which of the following is NOT a key benefit of Web Services?",
    options: ["Scalability", "Reusability", "Tight coupling", "Interoperability"],
    answer: "C"
  },
  {
    question: "REST Web Services typically use which standard HTTP methods?",
    options: ["GET, POST, PUT, DELETE", "GET, POST, CONNECT, TRACE", "PATCH, HEAD, OPTION, HELP", "PUSH, PULL, FETCH, SEND"],
    answer: "A"
  },
  {
    question: "Which of the following advancements directly contributed to the evolution of server-side architecture into web services?",
    options: ["IPv4", "REST and SOAP protocols", "Client-side cookies", "Static HTML forms"],
    answer: "B"
  },
  {
    question: "Which architecture is characterized by stateless services using HTTP and JSON/XML?",
    options: ["Monolithic architecture", "RESTful services", "Mainframe architecture", "Distributed architecture"],
    answer: "B"
  },
  {
    question: "What is a major advantage of microservices architecture?",
    options: ["Centralized processing", "Vertical scalability only", "Fault isolation and independent deployment", "Single codebase management"],
    answer: "C"
  },
  {
    question: "What is the main difference between the Internet and the World Wide Web?",
    options: ["They are the same thing", "The Internet is the infrastructure; the Web is a service built on top of it", "The Web is the infrastructure; the Internet is a service", "Both only focus on email communication"],
    answer: "B"
  },
  {
    question: "Which architecture uses REST APIs with JSON over HTTP?",
    options: ["SOA", "Microservices", "RESTful API-based Architecture", "Dumb terminal"],
    answer: "C"
  },
  {
    question: "What is a key advantage of three-tier architecture?",
    options: ["Combines UI, logic, and database in one layer", "Better separation of concerns and easier maintenance", "Heavy client-side resource usage", "Limited scalability"],
    answer: "B"
  },
  {
    question: "Which client type typically uses HTML, CSS, JavaScript, and runs inside a browser?",
    options: ["Thick client", "Thin client", "Browser-based client", "Dumb terminal"],
    answer: "C"
  },
  {
    question: "Which client type is designed to run natively on smartphones and tablets with device integration features?",
    options: ["Dumb terminal", "Browser-based client", "Mobile client", "Thin client"],
    answer: "C"
  },
  {
    question: "Which protocol is commonly used to transport SOAP messages?",
    options: ["FTP", "SMTP", "HTTP", "SSH"],
    answer: "C"
  },
  {
    question: "Which language is used to describe the inputs, outputs, and location of a web service?",
    options: ["HTML", "XML Schema", "WSDL", "JSON"],
    answer: "C"
  },
  {
    question: "Which of the following is a key advantage of web services?",
    options: ["Vendor lock-in", "Tight coupling between systems", "Platform independence", "Higher processing overhead"],
    answer: "C"
  },
  {
    question: "Which registry is used for storing and discovering web services?",
    options: ["CSS", "JSON", "UDDI", "SQL"],
    answer: "C"
  },
  {
    question: "Which component provides additional info in XML?",
    options: ["Elements", "Attributes", "Entities", "Declarations"],
    answer: "B"
  },
  {
    question: "What does the XML declaration include?",
    options: ["Only version info", "Only encoding info", "Version and encoding info", "Only document type"],
    answer: "C"
  },
  {
    question: "Which character entity is used for the ampersand (&) in XML?",
    options: ["&amp;amp;", "&amp;", "∧", "&amp;a;"],
    answer: "B"
  },
  {
    question: "What ensures an XML document follows a defined schema structure?",
    options: ["Well-formedness", "Validation", "Nesting", "Tag closing"],
    answer: "B"
  }
];

let currentQuestionIndex = 0;
const form = document.getElementById('quizForm');
const resultBox = document.getElementById('result');

function updateURL(index) {
  history.pushState({ questionIndex: index }, '', `?q=${index + 1}`);
}

function renderQuestion(index) {
  const q = questions[index];
  const qNum = index + 1;
  form.innerHTML = '';

  const div = document.createElement('div');
  div.className = 'question';
  div.innerHTML = `<div>${qNum}. ${q.question}<div class="options">
    ${q.options.map((opt, i) => {
      const letter = String.fromCharCode(65 + i);
      return `<label><input type="radio" name="q${qNum}" value="${letter}"> ${letter}) ${opt}</label>`;
    }).join('')}
  </div></div>`;
  form.appendChild(div);

  const nav = document.createElement('div');
  nav.style.marginTop = '20px';
  nav.innerHTML = `
    ${index > 0 ? '<button type="button" id="backBtn" class="submit-btn">Back</button>' : ''}
    ${index < questions.length - 1 ? '<button type="button" id="nextBtn" class="submit-btn">Next</button>' : '<button type="submit" class="submit-btn">Submit</button>'}
  `;
  form.appendChild(nav);

  const saved = sessionStorage.getItem(`q${qNum}`);
  if (saved) {
    const input = form.querySelector(`input[value="${saved}"]`);
    if (input) input.checked = true;
  }

  form.querySelectorAll('input[type=radio]').forEach(input => {
    input.addEventListener('change', () => {
      sessionStorage.setItem(`q${qNum}`, input.value);
    });
  });

  document.getElementById('nextBtn')?.addEventListener('click', () => {
    currentQuestionIndex++;
    updateURL(currentQuestionIndex);
    renderQuestion(currentQuestionIndex);
  });

  document.getElementById('backBtn')?.addEventListener('click', () => {
    currentQuestionIndex--;
    updateURL(currentQuestionIndex);
    renderQuestion(currentQuestionIndex);
  });
}

function handleSubmit(e) {
  e.preventDefault();
  let score = 0;

  questions.forEach((q, i) => {
    const selected = sessionStorage.getItem(`q${i + 1}`);
    if (selected === q.answer) score++;
  });

  resultBox.style.display = 'block';
  form.style.display = 'none';
  resultBox.innerHTML = `
    <h3>🎓 Score Card</h3>
    <p>You scored <b>${score}</b> out of <b>${questions.length}</b>!</p>
    <button id="retryBtn" class="retry-btn">Try Again</button>
  `;

  document.getElementById('retryBtn').addEventListener('click', () => {
    sessionStorage.clear();
    resultBox.style.display = 'none';
    form.style.display = 'block';
    currentQuestionIndex = 0;
    updateURL(currentQuestionIndex);
    renderQuestion(currentQuestionIndex);
  });
}

window.onpopstate = (e) => {
  if (e.state && typeof e.state.questionIndex === 'number') {
    currentQuestionIndex = e.state.questionIndex;
    renderQuestion(currentQuestionIndex);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const urlParam = new URLSearchParams(window.location.search).get('q');
  currentQuestionIndex = urlParam ? parseInt(urlParam, 10) - 1 : 0;
  updateURL(currentQuestionIndex);
  renderQuestion(currentQuestionIndex);
  form.addEventListener('submit', handleSubmit);
});