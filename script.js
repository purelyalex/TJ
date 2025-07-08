// Global state
let currentSection = "portfolio"
let currentNavSection = "home"
let isDarkMode = false
const likedPoems = new Set()
const likedQuotes = new Set()
let currentCommentItem = null

// Loading screen functionality
function handleLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen")
  const pageContent = document.body

  // Simulate loading time (you can remove this setTimeout in production)
  setTimeout(() => {
    loadingScreen.classList.add("hidden-loader")
    pageContent.classList.add("visible")

    // Remove the loading screen from DOM after transition
    setTimeout(() => {
      loadingScreen.style.display = "none"
    }, 600)
  }, 2000) // Show loading screen for 2 seconds
}

// Data
const portfolioItems = [
  {
    title: "E-Commerce Website",
    description: "Modern responsive e-commerce site built with HTML, CSS, and JavaScript",
    tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    image: "3.jpg",
  },
  {
    title: "Video Editing Portfolio",
    description: "Collection of promotional videos and short films",
    tech: ["Video Editing", "Motion Graphics", "Color Grading"],
    image: "4.jpg",
  },
  {
    title: "Mathematical Visualizations",
    description: "Interactive mathematical concepts using JavaScript",
    tech: ["JavaScript", "Canvas API", "Mathematics", "Algorithms"],
    image: "5.jpg",
  },
  {
    title: "Management System",
    description: "Full-stack web application for managing records and data",
    tech: ["HTML5", "CSS3", "JavaScript", "Local Storage"],
    image: "6.jpg",
  },
  {
    title: "Poetry Blog Platform",
    description: "Personal blog platform for sharing poems and creative writing",
    tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    image: "7.jpg",
  },
  {
    title: "Event Promotion Videos",
    description: "Professional video editing for events and celebrations",
    tech: ["Video Editing", "Color Correction", "Audio Mixing"],
    image: "8.jpg",
  },
]

const universityPoems = [
  {
    id: 1,
    title: "Maseno University Mornings",
    content: `Golden rays pierce through the morning mist,
Over Maseno's hills where dreams persist,
Students stride with books in hand,
Across this blessed academic land.

The chapel alarms ring clear and true,
As morning dew kisses grass so new,
Lecture halls await with knowledge vast,
Where future leaders' dies are cast.

Mathematics equations dance in mind,
Computer codes leave no bug behind,
In this sanctuary of learning bright,
Where darkness turns to brilliant light.

Maseno mornings, fresh and free,
You shape the minds of you and me,
With every dawn, new hopes arise,
Beneath Kenya's endless skies.`,
    image: "7.jpeg",
    likes: 24,
  },
  {
    id: 2,
    title: "Code and Dreams",
    content: `In lines of code, I find my voice,
HTML, CSS, JavaScript by choice,
Each function written, each bug I chase,
Building tomorrow's digital space.

From Nyawita's streets to campus halls,
I answer technology's beckoning calls,
Video frames I edit with care,
Stories told through pixels in the air.

Mathematics flows through every line,
Algorithms elegant and fine,
Computer science lights our way,
Through challenges of every day.

Dreams coded in binary streams,
Nothing's impossible, or so it seems,
With every project, I grow strong,
This is where my heart belongs.`,
    image: "9.jpg",
    likes: 18,
  },
  {
    id: 3,
    title: "Nairobi Nights",
    content: `City lights paint the evening sky,
As Nairobi's rhythm passes by,
From Westlands towers to Kibera's heart,
Every corner plays its part.

Matatus weave through traffic streams,
Carrying hopes and countless dreams,
Street vendors call their evening trade,
As another day begins to fade.

In this city of contrasts bright,
Where tradition meets modern light,
I find my place, I find my song,
This is where I belong.

Nairobi nights, so full of life,
Through joy and struggle, peace and strife,
You've shaped my soul, you've made me strong,
In your embrace, I've found my song.`,
    image: "10.jpg",
    likes: 31,
  },
  {
    id: 4,
    title: "Library Whispers",
    content: `In silence deep, where knowledge dwells,
Between the books, my story tells,
Of late night studies, coffee stains,
And academic growing pains.

The library holds our secret dreams,
Where nothing's quite the way it seems,
Each page turned is a step ahead,
Toward futures we've imagined in our head.

Fellow students, heads bent low,
In pursuit of what they need to know,
Together yet alone we sit,
Building futures, bit by bit.

Oh sacred halls of learning deep,
Where promises and dreams we keep,
In whispered tones and rustling pages,
We write the stories of our ages.`,
    image: "11.jpg",
    likes: 15,
  },
  {
    id: 5,
    title: "Campus Seasons",
    content: `Through seasons four, the campus changes,
From green to gold, nature rearranges,
Students come and students go,
But memories here forever grow.

In rainy days, we huddle close,
In sunny times, we love the most,
The way the light falls on the quad,
This place that feels blessed by God.

Friendships forged in lecture halls,
Love that blooms before it falls,
Every corner holds a tale,
Of triumph, joy, and times we fail.

Maseno, you're more than stone and steel,
You're every emotion that we feel,
A home away from home so true,
Forever grateful, me to you.`,
    image: "12.jpg",
    likes: 22,
  },
]

const lovePoems = [
  {
    id: 6,
    title: "Digital Hearts",
    content: `In pixels bright and screens aglow,
Our modern love begins to grow,
Through messages at 2 AM,
You've become my closest friend.

Your laugh echoes through video calls,
Your smile breaks down my guarded walls,
In this age of code and tech,
You're the bug I'll never check.

Distance measured not in miles,
But in moments between your smiles,
Love.exe running in my heart,
You're my favorite work of art.

Though we're students, young and free,
You're the future I can see,
In algorithms of the heart,
You and I will never part.`,
    image: "13.jpg",
    likes: 42,
  },
  {
    id: 7,
    title: "Campus Love",
    content: `Beneath the jacaranda trees,
Where purple petals dance in breeze,
I saw you first in morning light,
And knew that everything was right.

Your books scattered on the grass,
As other students hurry past,
But time stood still in that sweet hour,
Love bloomed like a gentle flower.

We study together, side by side,
In you, I've found my perfect guide,
Through calculus and poetry,
You make it all make sense to me.

Young love on university ground,
The sweetest melody I've found,
In lecture halls and library nooks,
You're better than all my books.`,
    image: "14.jpg",
    likes: 38,
  },
  {
    id: 8,
    title: "First Love's Echo",
    content: `Do you remember our first kiss?
A moment of pure, perfect bliss,
Behind the science building wall,
When we were young and felt so tall.

Your hand in mine, hearts beating fast,
We thought that moment there would last,
Forever young, forever true,
The world was me, the world was you.

Though seasons change and years may pass,
That memory holds like morning grass,
Wet with dew and fresh with hope,
Teaching hearts how to cope.

First love, you taught me how to feel,
That emotions can be real,
Though we've grown and gone our ways,
I treasure still those golden days.`,
    image: "15.jpg",
    likes: 29,
  },
  {
    id: 9,
    title: "Love in Mathematics",
    content: `If love were an equation,
You'd be my perfect solution,
X plus Y equals we,
A formula for harmony.

In graphs of my affection,
You're the point of intersection,
Where all my lines converge to show,
How much I need you so.

Like pi, you're infinite,
In ways that make my heart commit,
To calculations of the soul,
Where you complete and make me whole.

In this theorem of the heart,
We're proof that love's a work of art,
Mathematical and true,
My heart's equation equals you.`,
    image: "16.jpg",
    likes: 33,
  },
  {
    id: 10,
    title: "Letting You Go",
    content: `The hardest lesson love can teach,
Is when to let go, when to reach,
For something new, for someone else,
While healing our own broken selves.

I loved you with my student heart,
But we were meant to grow apart,
Like branches reaching for the sun,
Our separate journeys have begun.

In letting go, I'm setting free,
Both you and the best part of me,
Love isn't always holding tight,
Sometimes it's saying goodbye right.

Though tears may fall like autumn rain,
I know we'll both love again,
For in releasing what we had,
We honor love, both good and sad.`,
    image: "17.jpg",
    likes: 51,
  },
]

const loveQuotes = [
  {
    id: 1,
    title: "The Art of Letting Go",
    quote:
      "Sometimes the most loving thing you can do is let someone go, not because you love them less, but because you love them enough to want their happiness over your own comfort.",
    story:"I gave my all to someone who couldn't even offer me basic kindness. I kept waiting for change, for love, for something real—but all I got was confusion and pain. I lost myself trying to hold on to someone who never truly held me. But now... I'm done. I’ve chosen myself. I’m healing, learning, growing. I no longer crave their apology or approval. I found peace in letting go, and I finally feel free.",
    image: "19.jpg",
    likes: 67,
  },
  {
    id: 2,
    title: "Love in Small Moments",
    quote:
      "Love isn't always grand gestures and poetry. Sometimes it's sharing your lunch when someone forgot theirs, or staying up to help with assignments, or simply listening without trying to fix everything.",
    story:
      "The most beautiful love I've witnessed is showing care through tiny daily acts. They taught me that love lives in the ordinary moments we often overlook.",
    image: "18.jpg",
    likes: 43,
  },
  {
    id: 3,
    title: "Growing Apart, Growing Up",
    quote:
      "Not every person you love is meant to stay in your life forever. Some come to teach you about love, others to teach you about yourself, and some to teach you about letting go.",
    story:
      "University taught me that people enter our lives for different reasons. My first heartbreak felt like the end of the world, but it was actually the beginning of understanding myself better.",
    image: "22.jpg",
    likes: 89,
  },
  {
    id: 4,
    title: "Self-Love First",
    quote:
      "You cannot pour from an empty cup. Learn to love yourself first - your dreams, your flaws, your journey. Only then can you truly love another without losing yourself in the process.",
    story:
      "I used to think love meant sacrificing everything for someone else. But I learned that healthy love starts with a healthy relationship with yourself. Self-love isn't selfish; it's necessary.",
    image: "20.jpg",
    likes: 72,
  },
  {
    id: 5,
    title: "Love and Friendship",
    quote:
      "The best romantic relationships are built on solid friendships. When you can laugh together, dream together, and support each other's goals, you've found something special.",
    story:
      "Watching my friends who started as study partners become the happiest couple I know taught me that friendship is the foundation of lasting love. They still help each other with assignments!",
    image: "23.jpg",
    likes: 55,
  },
  // Adding more quotes to reach 20
  {
    id: 6,
    title: "Distance and Love",
    quote:
      "Distance doesn't kill love; lack of communication does. In our digital age, love can survive miles if hearts remain connected through consistent, honest conversation.",
    story:
      "Many of my friends maintain long-distance relationships while at university. The ones that work are those where both people make effort to stay emotionally close despite physical distance.",
    image: "24.jpg",
    likes: 61,
  },
  {
    id: 7,
    title: "Timing in Love",
    quote:
      "Sometimes you meet the right person at the wrong time. That doesn't make the connection any less real or meaningful. It just means the universe has different plans for your growth.",
    story:
      "I met someone amazing during exam season when we were both too stressed and focused on academics. We realized that timing matters, and sometimes love means waiting for the right moment.",
    image: "21.jpg",
    likes: 78,
  },
  {
    id: 8,
    title: "Love and Dreams",
    quote:
      "True love doesn't ask you to choose between your dreams and your relationship. It encourages you to pursue your goals while building something beautiful together.",
    story:
      "I've seen relationships fail because one person expected the other to give up their ambitions. Real love supports growth, even when it's challenging or requires sacrifice from both sides.",
    image: "25.jpg",
    likes: 84,
  },
  {
    id: 9,
    title: "Healing from Heartbreak",
    quote:
      "Heartbreak isn't just about losing someone; it's about losing the future you imagined with them. Healing means learning to imagine a new future where you're whole again.",
    story:
      "After my first serious breakup, I realized I wasn't just mourning the person, but all the plans we'd made. Recovery meant rediscovering my individual dreams and learning to be excited about them again.",
    image: "26.jpg",
    likes: 96,
  },
  {
    id: 10,
    title: "Love Languages in College",
    quote:
      "In university, love languages might look different. Quality time could be studying together, acts of service might be bringing coffee during all-nighters, and words of affirmation could be believing in each other's dreams.",
    story:
      "Learning about love languages helped me understand why my gestures weren't always received as I intended. Now I pay attention to how people prefer to give and receive love.",
    image: "27.jpg",
    likes: 52,
  },
  {
    id: 11,
    title: "Forgiveness in Love",
    quote:
      "Forgiveness in love isn't about forgetting what happened; it's about choosing not to let past hurts define your future relationships. It's a gift you give yourself.",
    story:
      "I had to learn to forgive not just others who hurt me, but also myself for mistakes I made in relationships. Forgiveness became the key to opening my heart again.",
    image: "28.jpg",
    likes: 69,
  },
  {
    id: 12,
    title: "Love and Growth",
    quote:
      "The right person will love you through your growth phases, not despite them. They'll celebrate your evolution and grow alongside you, not try to keep you the same.",
    story:
      "University changes us all. I'm grateful for people who loved me through my awkward phases, my career confusion, and my personal growth spurts. They saw potential when I couldn't.",
    image: "29.jpg",
    likes: 73,
  },
  {
    id: 13,
    title: "Vulnerability in Love",
    quote:
      "True intimacy requires vulnerability. It's scary to show someone your fears, your dreams, your weird habits, and your 3 AM thoughts, but that's where real connection lives.",
    story:
      "I used to think I had to be perfect to be loved. But the deepest connections I've formed were when I dared to be authentically myself, flaws and all.",
    image: "30.jpg",
    likes: 58,
  },
  {
    id: 14,
    title: "Love and Independence",
    quote:
      "Healthy love enhances your independence rather than threatening it. You should feel more yourself in a relationship, not less. Love should add to your life, not subtract from it.",
    story:
      "I learned this lesson when I realized I'd lost touch with my own interests and friends. Real love encourages you to maintain your identity while building something together.",
    image: "31.jpg",
    likes: 65,
  },
  {
    id: 15,
    title: "Second Chances",
    quote:
      "Not everyone deserves a second chance, but everyone deserves a second chance at love. Don't let one bad experience close your heart to future possibilities.",
    story:
      "After being hurt, I almost gave up on love entirely. But I learned that each relationship is unique, and past pain doesn't have to predict future joy. Hope is always worth holding onto.",
    image: "32.jpg",
    likes: 81,
  },
  {
    id: 16,
    title: "Love and Communication",
    quote:
      "In love, assumptions are relationship killers. What seems obvious to you might be completely unclear to your partner. When in doubt, communicate. When certain, communicate anyway.",
    story:
      "So many misunderstandings could be avoided with simple, honest communication. I've learned to express my needs clearly and ask questions instead of making assumptions.",
    image: "33.jpg",
    likes: 47,
  },
  {
    id: 17,
    title: "Love's Seasons",
    quote:
      "Love has seasons just like nature. There will be springs of new beginnings, summers of passion, autumns of change, and winters of challenge. All are necessary for growth.",
    story:
      "Understanding that relationships have natural cycles helped me not panic during difficult times. Sometimes love feels different, and that's okay - it doesn't mean it's dying.",
    image: "34.jpg",
    likes: 76,
  },
  {
    id: 18,
    title: "Love and Respect",
    quote:
      "Love without respect is just obsession. Respect without love is just politeness. True partnership requires both - loving someone enough to honor their autonomy and choices.",
    story:
      "I've seen relationships where there was love but no respect, and others with respect but no love. The healthiest relationships I've witnessed have both in abundance.",
    image: "35.jpg",
    likes: 88,
  },
  {
    id: 19,
    title: "Love and Patience",
    quote:
      "Love is patient, not just with others but with the process itself. Good relationships take time to build, trust takes time to develop, and healing takes time to complete.",
    story:
      "In our instant-gratification world, I had to learn that meaningful connections can't be rushed. The best things in love - trust, intimacy, understanding - develop slowly.",
    image: "36.jpg",
    likes: 63,
  },
  {
    id: 20,
    title: "Love's Legacy",
    quote:
      "Every person you love leaves a mark on your heart. Even if they don't stay, they change you. The love you shared becomes part of who you are and how you love others.",
    story:
      "Looking back on past relationships, I can see how each person taught me something valuable about love, life, or myself. Even the painful endings contributed to my growth.",
    image: "37.jpg",
    likes: 92,
  },
]

const services = [
  {
    title: "Web Development",
    description: "Custom websites using HTML, CSS, and JavaScript",
  },
  {
    title: "Video Editing",
    description: "Professional video editing for events and promotions",
  },
  {
    title: "Poetry Writing",
    description: "Custom poems for special occasions",
  },
  {
    title: "Love Letters & Quotes",
    description: "Personalized romantic writing for special moments",
  },
]

const testimonials = [
{
    name: "Ian Mutuli",
    role: "Fellow Student",
    content:
      "Working with TJ on group projects has been amazing.",
}

]

const faqItems = [
  {
    question: "What services do you offer?",
    answer:
      "I offer web development using HTML, CSS, and JavaScript, professional video editing, custom poetry writing, and personalized love letters and quotes for special occasions.",
  },
  {
    question: "How can I contact you for projects?",
    answer:
      "You can reach me via email at alexdonmoh573@gmail.com or call/text 0110582478. I'm also active on Instagram @purely.alex.",
  },
  {
    question: "Do you write custom love poems?",
    answer:
      "Yes! I create personalized poems and love letters for special occasions like anniversaries, proposals, or just to express your feelings. Each piece is unique and tailored to your story.",
  },
  {
    question: "Can you help with relationship advice?",
    answer:
      "While I'm not a professional counselor, I share insights from personal experiences and observations. My quotes and stories might offer perspective, but for serious issues, I recommend professional help.",
  },
]

// Blog posts data
const blogPosts = {
  portfolio: [
    {
      title: "10 JavaScript Tips for Beginners",
      description: "Essential JavaScript concepts every new developer should master.",
      date: "January 15, 2025",
      image: "38.jpg",
    },
    {
      title: "Mastering CSS Grid Layout",
      description: "A comprehensive guide to creating responsive layouts with CSS Grid.",
      date: "January 10, 2025",
      image: "39.jpg",
    },
    {
      title: "Video Editing Workflow",
      description: "My process for creating engaging promotional videos.",
      date: "January 5, 2025",
      image: "40.jpg",
    },
  ],
  poetry: [
    {
      title: "The Art of University Poetry",
      description: "How campus life inspires my creative writing process.",
      date: "January 12, 2025",
      image: "41.jpg",
    },
    {
      title: "Finding Inspiration in Nairobi",
      description: "The city's rhythm and energy fuel my poetic imagination.",
      date: "January 8, 2025",
      image: "42.jpg",
    },
    {
      title: "Writing Poetry as a STEM Student",
      description: "Balancing analytical thinking with creative expression.",
      date: "January 3, 2025",
      image: "43.jpg",
    },
  ],
  love: [
    {
      title: "Navigating Love in University",
      description: "Practical advice for maintaining relationships while focusing on studies.",
      date: "January 14, 2025",
      image: "45.jpg",
    },
    {
      title: "Healing from Heartbreak",
      description: "A personal journey through loss, growth, and finding love again.",
      date: "January 9, 2025",
      image: "46.jpg",
    },
    {
      title: "The Journey to Self-Love",
      description: "Why loving yourself is the foundation of all other relationships.",
      date: "January 4, 2025",
      image: "47.jpg",
    },
  ],
}

// Initialize the website
document.addEventListener("DOMContentLoaded", () => {
  // Add a class to the body to enable page transition
  document.body.classList.add("page-content")

  // Handle loading screen
  handleLoadingScreen()

  initializeWebsite()
  setupEventListeners()
  setupScrollSpy()
  loadContent()
})

function initializeWebsite() {
  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme) {
    isDarkMode = savedTheme === "dark"
    updateTheme()
  }

  // Check for saved section preference
  const savedSection = localStorage.getItem("currentSection")
  if (savedSection && ["portfolio", "poetry", "love"].includes(savedSection)) {
    currentSection = savedSection
    updateSectionContent()
  }
}

function setupEventListeners() {
  // Theme toggle
  document.getElementById("theme-toggle").addEventListener("click", toggleTheme)

  // Section toggle
  document.getElementById("section-toggle").addEventListener("click", toggleSection)
  document.getElementById("section-toggle-mobile").addEventListener("click", toggleSection)

  // Mobile menu toggle
  document.getElementById("mobile-menu-toggle").addEventListener("click", toggleMobileMenu)

  // Profile picture upload
  document.getElementById("profile-upload").addEventListener("change", handleProfileUpload)

  // Contact form
  document.getElementById("contact-form").addEventListener("submit", handleContactForm)

  // Close modal when clicking outside
  document.getElementById("comment-modal").addEventListener("click", function (e) {
    if (e.target === this) {
      closeCommentModal()
    }
  })
}

function setupScrollSpy() {
  const sections = ["home", "about", "work", "blog", "contact"]
  const options = {
    root: null,
    rootMargin: "-20% 0px -70% 0px",
    threshold: 0,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        updateActiveNavLink(entry.target.id)
      }
    })
  }, options)

  sections.forEach((sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      observer.observe(element)
    }
  })
}

function updateActiveNavLink(sectionId) {
  currentNavSection = sectionId

  // Update desktop nav
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active")
    if (link.dataset.section === sectionId) {
      link.classList.add("active")
    }
  })

  // Update mobile nav
  document.querySelectorAll(".mobile-nav-link").forEach((link) => {
    link.classList.remove("active")
    if (link.dataset.section === sectionId) {
      link.classList.add("active")
    }
  })
}

function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  // Close mobile menu
  const mobileMenu = document.getElementById("mobile-menu")
  mobileMenu.classList.remove("show")
  document.getElementById("menu-icon").className = "fas fa-bars"
}

function toggleTheme() {
  isDarkMode = !isDarkMode
  updateTheme()
  localStorage.setItem("theme", isDarkMode ? "dark" : "light")
}

function updateTheme() {
  if (isDarkMode) {
    document.body.setAttribute("data-theme", "dark")
    document.getElementById("theme-icon").className = "fas fa-sun"
    // Update loading screen for dark mode if it's still visible
    const loadingScreen = document.getElementById("loading-screen")
    if (loadingScreen) {
      loadingScreen.style.background = "linear-gradient(135deg, #111827, #1f2937)"
    }
  } else {
    document.body.removeAttribute("data-theme")
    document.getElementById("theme-icon").className = "fas fa-moon"
    // Update loading screen for light mode if it's still visible
    const loadingScreen = document.getElementById("loading-screen")
    if (loadingScreen) {
      loadingScreen.style.background = "linear-gradient(135deg, #4f46e5, #7c3aed)"
    }
  }
}

function toggleSection() {
  const sections = ["portfolio", "poetry", "love"]
  const currentIndex = sections.indexOf(currentSection)
  const nextIndex = (currentIndex + 1) % sections.length
  currentSection = sections[nextIndex]

  updateSectionContent()
  localStorage.setItem("currentSection", currentSection)
}

function updateSectionContent() {
  // Update section toggle buttons
  const nextSections = {
    portfolio: "Poetry",
    poetry: "Love & Quotes",
    love: "Portfolio",
  }

  document.getElementById("section-toggle").textContent = nextSections[currentSection]
  document.getElementById("section-toggle-mobile").textContent = `Switch to ${nextSections[currentSection]}`

  // Update badges
  const badges = {
    portfolio: "Developer",
    poetry: "Poet",
    love: "Storyteller",
  }

  document.getElementById("section-badge").textContent = badges[currentSection]

  // Update hero content
  updateHeroContent()

  // Update about content
  updateAboutContent()

  // Update work section
  updateWorkContent()

  // Update navigation labels
  updateNavigationLabels()

  // Update footer
  updateFooterContent()

  // Load appropriate content
  loadContent()
}

function updateHeroContent() {
  const heroTitle = document.getElementById("hero-title")
  const heroDescription = document.getElementById("hero-description")
  const heroCTA = document.getElementById("hero-cta")

  const content = {
    portfolio: {
      title: 'Web Developer &<br><span class="gradient-text">Digital Creator</span>',
      description:
        "Mathematics & Computer Science student at Maseno University, crafting digital experiences with code and creativity.",
      cta: "View My Work",
    },
    poetry: {
      title: 'Poet &<br><span class="gradient-text">Storyteller</span>',
      description:
        "Weaving words into verses that capture the essence of university life, dreams, and the beauty of everyday moments.",
      cta: "Read My Poems",
    },
    love: {
      title: 'Love & Life<br><span class="gradient-text">Philosopher</span>',
      description:
        "Exploring the depths of love, relationships, and life through quotes, stories, and reflections on the human experience.",
      cta: "Explore Quotes",
    },
  }

  heroTitle.innerHTML = content[currentSection].title
  heroDescription.textContent = content[currentSection].description
  heroCTA.textContent = content[currentSection].cta
}

function updateAboutContent() {
  const aboutSubtitle = document.getElementById("about-subtitle")
  const aboutDescription = document.getElementById("about-description")
  const skillsContainer = document.getElementById("skills-tags")

  const content = {
    portfolio: {
      subtitle: "Developer & Creator",
      description:
        "I'm passionate about creating digital solutions through web development and video editing. My journey in tech started with curiosity and has grown into a deep love for coding and creative problem-solving.",
      skills: ["HTML5", "CSS3", "JavaScript", "Video Editing", "Mathematics"],
    },
    poetry: {
      subtitle: "Poet & Dreamer",
      description:
        " I'm passionate about capturing life's moments through poetry. From the morning mist over Maseno's hills to the bustling streets of Nairobi, I find inspiration in everyday experiences and transform them into verses.",
      skills: ["University Life", "Nature", "Technology", "Dreams", "City Life"],
    },
    love: {
      subtitle: "Love & Life Explorer",
      description:
        "I'm passionate about exploring the complexities of love and relationships. Through personal experiences and observations, I've gathered insights about love, heartbreak, growth, and the beautiful messiness of human connections.",
      skills: ["Love & Relationships", "Letting Go", "Self-Growth", "Heartbreak & Healing", "Life Wisdom"],
    },
  }

  aboutSubtitle.textContent = content[currentSection].subtitle
  aboutDescription.textContent = content[currentSection].description

  skillsContainer.innerHTML = ""
  content[currentSection].skills.forEach((skill) => {
    const tag = document.createElement("span")
    tag.className = "skill-tag"
    tag.textContent = skill
    skillsContainer.appendChild(tag)
  })
}

function updateWorkContent() {
  const workTitle = document.getElementById("work-title")
  const titles = {
    portfolio: "My Portfolio",
    poetry: "My Poetry",
    love: "Love & Life Quotes",
  }

  workTitle.textContent = titles[currentSection]

  // Show/hide content sections
  document.getElementById("portfolio-content").style.display = currentSection === "portfolio" ? "block" : "none"
  document.getElementById("poetry-content").style.display = currentSection === "poetry" ? "block" : "none"
  document.getElementById("love-content").style.display = currentSection === "love" ? "block" : "none"
}

function updateNavigationLabels() {
  const workNavs = document.querySelectorAll("#work-nav, #work-nav-mobile, #footer-work")
  const labels = {
    portfolio: "Portfolio",
    poetry: "Poems",
    love: "Love & Quotes",
  }

  workNavs.forEach((nav) => {
    nav.textContent = labels[currentSection]
  })
}

function updateFooterContent() {
  const footerDescription = document.getElementById("footer-description")
  const descriptions = {
    portfolio: "Crafting digital experiences with passion and precision",
    poetry: "Weaving words into timeless verses",
    love: "Exploring love, life, and the human experience",
  }

  footerDescription.textContent = descriptions[currentSection]
}

function loadContent() {
  loadPortfolioContent()
  loadPoetryContent()
  loadLoveContent()
  loadBlogContent()
  loadServicesContent()
  loadTestimonialsContent()
  loadFAQContent()
}

function loadPortfolioContent() {
  const container = document.getElementById("portfolio-grid")
  container.innerHTML = ""

  portfolioItems.forEach((item) => {
    const card = createPortfolioCard(item)
    container.appendChild(card)
  })
}

function createPortfolioCard(item) {
  const card = document.createElement("div")
  card.className = "card"

  card.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="card-image">
        <div class="card-content">
            <h3 class="card-title">${item.title}</h3>
            <p class="card-description">${item.description}</p>
            <div class="tech-tags">
                ${item.tech.map((tech) => `<span class="tech-tag">${tech}</span>`).join("")}
            </div>
        </div>
    `

  return card
}

function loadPoetryContent() {
  const container = document.getElementById("poems-container")
  container.innerHTML = ""

  const allPoems = [...universityPoems, ...lovePoems]
  allPoems.forEach((poem) => {
    const card = createPoemCard(poem)
    container.appendChild(card)
  })
}

function createPoemCard(poem) {
  const card = document.createElement("div")
  card.className = "poem-card"

  const isLiked = likedPoems.has(poem.id)
  const likeCount = poem.likes + (isLiked ? 1 : 0)

  card.innerHTML = `
        <img src="${poem.image}" alt="${poem.title}" class="poem-image">
        <div class="poem-content">
            <h3 class="poem-title">${poem.title}</h3>
            <div class="poem-text">${poem.content}</div>
            <div class="card-actions">
                <div class="action-buttons">
                    <button class="action-btn ${isLiked ? "liked" : ""}" onclick="toggleLike(${poem.id}, 'poem')">
                        <i class="fas fa-heart"></i> ${likeCount}
                    </button>
                    <button class="action-btn" onclick="shareContent('${poem.title}')">
                        <i class="fas fa-share"></i> Share
                    </button>
                </div>
                <div class="social-actions">
                    <a href="https://instagram.com/purely.alex" target="_blank" class="action-btn">
                        <i class="fab fa-instagram"></i>
                    </a>
                </div>
            </div>
            <div class="comment-section">
                <textarea class="comment-textarea" placeholder="Share your thoughts on this poem..." id="comment-poem-${poem.id}"></textarea>
                <button class="btn btn-primary btn-sm" onclick="openCommentModal('poem', ${poem.id}, '${poem.title}')">Send Comment</button>
                <p class="comment-note">Comments will be sent to alexdonmoh573@gmail.com</p>
            </div>
        </div>
    `

  return card
}

function loadLoveContent() {
  const container = document.getElementById("quotes-container")
  container.innerHTML = ""

  loveQuotes.forEach((quote) => {
    const card = createQuoteCard(quote)
    container.appendChild(card)
  })
}

function createQuoteCard(quote) {
  const card = document.createElement("div")
  card.className = "quote-card"

  const isLiked = likedQuotes.has(quote.id)
  const likeCount = quote.likes + (isLiked ? 1 : 0)

  card.innerHTML = `
        <img src="${quote.image}" alt="${quote.title}" class="quote-image">
        <div class="quote-content">
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                <i class="fas fa-quote-left" style="color: var(--primary-color);"></i>
                <h3 class="quote-title">${quote.title}</h3>
            </div>
            <blockquote class="quote-text">"${quote.quote}"</blockquote>
            <div class="quote-story">
                <h4>My Story:</h4>
                <p>${quote.story}</p>
            </div>
            <div class="card-actions">
                <div class="action-buttons">
                    <button class="action-btn ${isLiked ? "liked" : ""}" onclick="toggleLike(${quote.id}, 'quote')">
                        <i class="fas fa-heart"></i> ${likeCount}
                    </button>
                    <button class="action-btn" onclick="shareContent('${quote.title}')">
                        <i class="fas fa-share"></i> Share
                    </button>
                </div>
                <div class="social-actions">
                    <a href="https://instagram.com/purely.alex" target="_blank" class="action-btn">
                        <i class="fab fa-instagram"></i>
                    </a>
                </div>
            </div>
            <div class="comment-section">
                <textarea class="comment-textarea" placeholder="Share your thoughts or similar experiences..." id="comment-quote-${quote.id}"></textarea>
                <button class="btn btn-primary btn-sm" onclick="openCommentModal('quote', ${quote.id}, '${quote.title}')">Send Comment</button>
                <p class="comment-note">Comments will be sent to alexdonmoh573@gmail.com</p>
            </div>
        </div>
    `

  return card
}

function loadBlogContent() {
  const container = document.getElementById("blog-grid")
  const blogTitle = document.getElementById("blog-title")

  const titles = {
    portfolio: "Latest Articles",
    poetry: "Poetry Blog",
    love: "Love & Life Blog",
  }

  blogTitle.textContent = titles[currentSection]
  container.innerHTML = ""

  const posts = blogPosts[currentSection] || []
  posts.forEach((post) => {
    const card = createBlogCard(post)
    container.appendChild(card)
  })
}

function createBlogCard(post) {
  const card = document.createElement("div")
  card.className = "card"

  card.innerHTML = `
        <img src="${post.image}" alt="${post.title}" class="card-image">
        <div class="card-content">
            <h3 class="card-title">${post.title}</h3>
            <p class="card-description">${post.description}</p>
            <p class="blog-date">${post.date}</p>
        </div>
    `

  return card
}

function loadServicesContent() {
  const container = document.getElementById("services-grid")
  container.innerHTML = ""

  services.forEach((service) => {
    const card = createServiceCard(service)
    container.appendChild(card)
  })
}

function createServiceCard(service) {
  const card = document.createElement("div")
  card.className = "service-card"

  card.innerHTML = `
        <h3 class="service-title">${service.title}</h3>
        <p class="service-description">${service.description}</p>
        <p class="service-price">${service.price}</p>
    `

  return card
}

function loadTestimonialsContent() {
  const container = document.getElementById("testimonials-grid")
  container.innerHTML = ""

  testimonials.forEach((testimonial) => {
    const card = createTestimonialCard(testimonial)
    container.appendChild(card)
  })
}

function createTestimonialCard(testimonial) {
  const card = document.createElement("div")
  card.className = "testimonial-card"

  card.innerHTML = `
        <p class="testimonial-text">"${testimonial.content}"</p>
        <div>
            <p class="testimonial-author">${testimonial.name}</p>
            <p class="testimonial-role">${testimonial.role}</p>
        </div>
    `

  return card
}

function loadFAQContent() {
  const container = document.getElementById("faq-container")
  container.innerHTML = ""

  faqItems.forEach((item, index) => {
    const faqItem = createFAQItem(item, index)
    container.appendChild(faqItem)
  })
}

function createFAQItem(item, index) {
  const faqItem = document.createElement("div")
  faqItem.className = "faq-item"

  faqItem.innerHTML = `
        <div class="faq-question" onclick="toggleFAQ(${index})">
            <span>${item.question}</span>
            <i class="fas fa-chevron-down faq-icon"></i>
        </div>
        <div class="faq-answer">
            <p>${item.answer}</p>
        </div>
    `

  return faqItem
}

function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu")
  const menuIcon = document.getElementById("menu-icon")

  mobileMenu.classList.toggle("show")

  if (mobileMenu.classList.contains("show")) {
    menuIcon.className = "fas fa-times"
  } else {
    menuIcon.className = "fas fa-bars"
  }
}

function toggleLike(id, type) {
  if (type === "poem") {
    if (likedPoems.has(id)) {
      likedPoems.delete(id)
    } else {
      likedPoems.add(id)
    }
    loadPoetryContent()
  } else if (type === "quote") {
    if (likedQuotes.has(id)) {
      likedQuotes.delete(id)
    } else {
      likedQuotes.add(id)
    }
    loadLoveContent()
  }
}

function shareContent(title) {
  if (navigator.share) {
    navigator
      .share({
        title: title,
        text: `Check out this ${currentSection === "love" ? "quote" : "poem"}: ${title}`,
        url: window.location.href,
      })
      .catch((err) => {
        fallbackShare(title)
      })
  } else {
    fallbackShare(title)
  }
}

function fallbackShare(title) {
  const text = `${title} - ${window.location.href}`
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Link copied to clipboard!")
      })
      .catch(() => {
        prompt("Copy this link:", text)
      })
  } else {
    prompt("Copy this link:", text)
  }
}

function openCommentModal(type, id, title) {
  const modal = document.getElementById("comment-modal")
  const modalTitle = document.getElementById("modal-title")
  const commentText = document.getElementById("comment-text")

  currentCommentItem = { type, id, title }
  modalTitle.textContent = `Comment on "${title}"`
  commentText.value = ""
  modal.style.display = "block"
}

function closeCommentModal() {
  const modal = document.getElementById("comment-modal")
  modal.style.display = "none"
  currentCommentItem = null
}

function submitComment() {
  const commentText = document.getElementById("comment-text")
  const comment = commentText.value.trim()

  if (comment && currentCommentItem) {
    // In a real application, this would send the comment to your email
    console.log(`Comment for ${currentCommentItem.type} ${currentCommentItem.id}: ${comment}`)
    alert("Comment submitted! Alex will receive your message.")
    closeCommentModal()
  }
}

function toggleFAQ(index) {
  const faqItems = document.querySelectorAll(".faq-item")
  const item = faqItems[index]

  // Close all other FAQ items
  faqItems.forEach((faq, i) => {
    if (i !== index) {
      faq.classList.remove("active")
    }
  })

  // Toggle current item
  item.classList.toggle("active")
}

function handleProfileUpload(event) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const profileImg = document.getElementById("profile-img")
      const profilePlaceholder = document.getElementById("profile-placeholder")

      profileImg.src = e.target.result
      profileImg.style.display = "block"
      profilePlaceholder.style.display = "none"

      // Save to localStorage for persistence
      localStorage.setItem("profilePicture", e.target.result)
    }
    reader.readAsDataURL(file)
  }
}

function handleContactForm(event) {
  event.preventDefault()

  // Get form data
  const formData = new FormData(event.target)
  const data = Object.fromEntries(formData)

  // In a real application, this would send the data to your server
  console.log("Contact form submitted:", data)
  alert("Message sent! Thank you for reaching out.")

  // Reset form
  event.target.reset()
}

// Load saved profile picture on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedProfilePicture = localStorage.getItem("profilePicture")
  if (savedProfilePicture) {
    const profileImg = document.getElementById("profile-img")
    const profilePlaceholder = document.getElementById("profile-placeholder")

    profileImg.src = savedProfilePicture
    profileImg.style.display = "block"
    profilePlaceholder.style.display = "none"
  }
})

// Add loading animation
window.addEventListener("load", () => {
  document.querySelectorAll(".loading").forEach((element) => {
    element.classList.add("loaded")
  })
})
