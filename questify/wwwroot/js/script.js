let currentUser = null
let currentSection = "begin-quest"
const quests = {
  inbox: [],
  today: [
    {
      id: 1,
      title: "Post Schedule on Team Dashboard",
      description: "Add updated weekly goals and tasks to the workspace.",
      date: "June 25",
      type: "side-quest",
      xp: 50,
      completed: false,
      guild: "Guild",
    },
    {
      id: 2,
      title: "Print Attendance Sheet",
      date: "June 25",
      type: "mini-quest",
      xp: 15,
      completed: false,
    },
    {
      id: 3,
      title: "Clear Desktop Icons",
      date: "June 25",
      type: "mini-quest",
      xp: 15,
      completed: false,
    },
  ],
  mainQuests: [
    {
      id: 4,
      title: "Write Talk Script for Webinar",
      date: "June 27",
      type: "main-quest",
      xp: 100,
      completed: false,
    },
    {
      id: 5,
      title: "Finalize Capstone Proposal",
      date: "June 28",
      type: "main-quest",
      xp: 100,
      completed: false,
    },
    {
      id: 6,
      title: "Deploy Beta Version of Questify",
      date: "June 29",
      type: "main-quest",
      xp: 100,
      completed: false,
    },
    {
      id: 7,
      title: "Event Teaser Video",
      date: "June 30",
      type: "main-quest",
      xp: 100,
      completed: false,
    },
  ],
  sideQuests: [
    {
      id: 8,
      title: "Post Schedule on Team Dashboard",
      date: "June 25",
      type: "side-quest",
      xp: 50,
      completed: false,
    },
    {
      id: 9,
      title: "Create Social Media Countdown",
      date: "June 26",
      type: "side-quest",
      xp: 50,
      completed: false,
    },
    {
      id: 10,
      title: "Coordinate Food Orders for Team Meeting",
      date: "June 26",
      type: "side-quest",
      xp: 50,
      completed: false,
    },
    {
      id: 11,
      title: "Update Slide Deck for Client Pitch",
      date: "June 28",
      type: "side-quest",
      xp: 50,
      completed: false,
    },
  ],
  miniQuests: [
    {
      id: 12,
      title: "Print Attendance Sheet",
      date: "June 25",
      type: "mini-quest",
      xp: 15,
      completed: false,
    },
    {
      id: 13,
      title: "Clear Desktop Icons",
      date: "June 26",
      type: "mini-quest",
      xp: 15,
      completed: false,
    },
    {
      id: 14,
      title: "Charge Camera Batteries",
      date: "June 26",
      type: "mini-quest",
      xp: 15,
      completed: false,
    },
  ],
  guildQuests: [
    {
      id: 15,
      title: "Set Up Event QR Check-In Form",
      date: "June 26",
      author: "Katarina",
      xp: 15,
      completed: false,
    },
    {
      id: 16,
      title: "Mock Interview with Teammate",
      date: "June 27",
      author: "Seraphine",
      xp: 100,
      completed: false,
    },
    {
      id: 17,
      title: "Upload Documentation to Repository",
      date: "June 29",
      author: "Karma",
      xp: 50,
      completed: false,
    },
  ],
}

function showSignup() {
  window.location.href = "signup.html"
}

function login() {
  const email = document.getElementById("loginEmail").value
  const password = document.getElementById("loginPassword").value

  if (email && password) {
    currentUser = {
      username: "Nem",
      level: 15,
      email: email,
    }

    localStorage.setItem("questifyUser", JSON.stringify(currentUser))

    window.location.href = "dashboard.html"
  } else {
    alert("Please enter both email and password")
  }
}

function handleSignup(event) {
  event.preventDefault()

  const formData = new FormData(event.target)
  const userData = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  }

  if (userData.password !== userData.confirmPassword) {
    alert("Passwords do not match")
    return
  }

  currentUser = {
    username: userData.username,
    level: 1,
    email: userData.email,
  }

  localStorage.setItem("questifyUser", JSON.stringify(currentUser))

  alert("Account created successfully! Welcome to Questify!")
  window.location.href = "dashboard.html"
}

function logout() {
  localStorage.removeItem("questifyUser")
  window.location.href = "index.html"
}

function showSection(sectionName) {
  const sections = document.querySelectorAll(".content-section")
  sections.forEach((section) => {
    section.classList.remove("active")
  })

  const navItems = document.querySelectorAll(".nav-item")
  navItems.forEach((item) => {
    item.classList.remove("active")
  })

  const targetSection = document.getElementById(sectionName + "-section")
  if (targetSection) {
    targetSection.classList.add("active")
    targetSection.classList.add("fade-in")
  }

  const clickedNavItem = event.target.closest(".nav-item")
  if (clickedNavItem) {
    clickedNavItem.classList.add("active")
  }

  currentSection = sectionName

  if (sectionName === "faerie-court") {
    showGuildSection("faerie-court")
  }
}

function showGuildSection(guildName) {
  const sections = document.querySelectorAll(".content-section")
  sections.forEach((section) => {
    section.classList.remove("active")
  })

  const guildSection = document.getElementById(guildName + "-section")
  if (guildSection) {
    guildSection.classList.add("active")
    guildSection.classList.add("fade-in")
  }
}

function addQuestForm() {
  const questForms = document.querySelector(".quest-forms")
  const newForm = document.createElement("div")
  newForm.className = "quest-form-card fade-in"
  newForm.innerHTML = `
        <input type="text" placeholder="Quest name" class="quest-title-input">
        <textarea placeholder="Description" class="quest-description"></textarea>
        <div class="quest-options">
            <button class="btn btn-option"><i class="fas fa-calendar"></i> Date</button>
            <button class="btn btn-option"><i class="fas fa-flag"></i> Priority</button>
        </div>
        <div class="quest-actions">
            <select class="form-select">
                <option>Inbox</option>
                <option>Today</option>
                <option>Main quests</option>
                <option>Side quests</option>
                <option>Mini quests</option>
            </select>
            <button class="btn btn-cancel" onclick="removeQuestForm(this)">Cancel</button>
            <button class="btn btn-begin-quest" onclick="createQuest(this)">Begin quest <i class="fas fa-times"></i></button>
        </div>
    `

  questForms.appendChild(newForm)
}

function removeQuestForm(button) {
  const form = button.closest(".quest-form-card")
  form.style.animation = "fadeOut 0.3s ease-in-out"
  setTimeout(() => {
    form.remove()
  }, 300)
}

function createQuest(button) {
  const form = button.closest(".quest-form-card")
  const title = form.querySelector(".quest-title-input").value
  const description = form.querySelector(".quest-description").value
  const category = form.querySelector(".form-select").value

  if (!title.trim()) {
    alert("Please enter a quest name")
    return
  }

  const newQuest = {
    id: Date.now(),
    title: title,
    description: description,
    date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric" }),
    type: category.toLowerCase().replace(" ", "-"),
    xp: getXPByType(category),
    completed: false,
  }

  const categoryKey = getCategoryKey(category)
  quests[categoryKey].push(newQuest)

  showNotification("Quest created successfully!", "success")

  form.querySelector(".quest-title-input").value = ""
  form.querySelector(".quest-description").value = ""

  updateQuestCounts()
}

function getXPByType(type) {
  switch (type.toLowerCase()) {
    case "main quests":
      return 100
    case "side quests":
      return 50
    case "mini quests":
      return 15
    default:
      return 25
  }
}

function getCategoryKey(category) {
  switch (category.toLowerCase()) {
    case "main quests":
      return "mainQuests"
    case "side quests":
      return "sideQuests"
    case "mini quests":
      return "miniQuests"
    case "today":
      return "today"
    default:
      return "inbox"
  }
}

function updateQuestCounts() {
  const badges = {
    inbox: quests.inbox.length,
    today: quests.today.length,
    "main-quests": quests.mainQuests.length,
    "side-quests": quests.sideQuests.length,
    "mini-quests": quests.miniQuests.length,
  }

  Object.keys(badges).forEach((key) => {
    const navItem = document.querySelector(`[onclick="showSection('${key}')"] .badge`)
    if (navItem) {
      navItem.textContent = badges[key]
    }
  })
}

function completeQuest(questId, category) {
  const categoryKey = getCategoryKey(category)
  const quest = quests[categoryKey].find((q) => q.id === questId)

  if (quest) {
    quest.completed = true

    if (currentUser) {
      currentUser.xp = (currentUser.xp || 0) + quest.xp
      localStorage.setItem("questifyUser", JSON.stringify(currentUser))
    }

    showNotification(`+${quest.xp} XP gained!`, "success")

    updateLevelProgress()
  }
}

function updateLevelProgress() {
  const progressBars = document.querySelectorAll(".level-progress")
  const currentXP = (currentUser?.xp || 0) % 1000 
  const progressPercent = (currentXP / 1000) * 100

  progressBars.forEach((bar) => {
    bar.style.width = progressPercent + "%"
  })
}

function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === "success" ? "check-circle" : "info-circle"}"></i>
            <span>${message}</span>
        </div>
    `

  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "#d4edda" : "#d1ecf1"};
        color: ${type === "success" ? "#155724" : "#0c5460"};
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: slideInRight 0.3s ease-in-out;
    `

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease-in-out"
    setTimeout(() => {
      notification.remove()
    }, 300)
  }, 3000)
}

function initializeDashboard() {
  const userData = localStorage.getItem("questifyUser")
  if (!userData) {
    window.location.href = "index.html"
    return
  }

  currentUser = JSON.parse(userData)

  const usernameElement = document.querySelector(".username")
  if (usernameElement) {
    usernameElement.textContent = currentUser.username
  }

  const levelElement = document.querySelector(".level")
  if (levelElement) {
    levelElement.textContent = `LVL ${currentUser.level}`
  }

  updateQuestCounts()

  updateLevelProgress()

  document.addEventListener("change", (event) => {
    if (event.target.type === "checkbox" && event.target.closest(".quest-card")) {
      const questCard = event.target.closest(".quest-card")
      const questId = Number.parseInt(questCard.dataset.questId)
      const category = questCard.dataset.category

      if (event.target.checked) {
        completeQuest(questId, category)
        questCard.style.opacity = "0.6"
        questCard.style.textDecoration = "line-through"
      }
    }
  })
}

const style = document.createElement("style")
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; transform: scale(1); }
        to { opacity: 0; transform: scale(0.9); }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
`
document.head.appendChild(style)

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("dashboard.html")) {
    initializeDashboard()
  }

  document.documentElement.style.scrollBehavior = "smooth"

  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "n") {
      event.preventDefault()
      if (currentSection === "begin-quest") {
        addQuestForm()
      }
    }

    if (event.key === "Escape") {
      const modals = document.querySelectorAll(".modal.show")
      modals.forEach((modal) => {
        const modalId = modal.getAttribute("data-bs-target")
        const bsModal = bootstrap.Modal.getInstance(document.querySelector(modalId))

        if (bsModal) {
          bsModal.hide()
        }
      })
    }
  })
})

document.addEventListener("DOMContentLoaded", () => {
  const questCards = document.querySelectorAll(".quest-card")
  questCards.forEach((card, index) => {
    card.dataset.questId = index + 1
    card.dataset.category = getCurrentCategory()
  })
})

function getCurrentCategory() {
  const activeSection = document.querySelector(".content-section.active")
  if (activeSection) {
    return activeSection.id.replace("-section", "")
  }
  return "today"
}

window.showSignup = showSignup
window.login = login
window.handleSignup = handleSignup
window.logout = logout
window.showSection = showSection
window.addQuestForm = addQuestForm
window.removeQuestForm = removeQuestForm
window.createQuest = createQuest
