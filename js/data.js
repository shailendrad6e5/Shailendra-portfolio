/**
 * portfolioData — single source of truth.
 * Edit this file to update all content across the site.
 */
const portfolioData = {
  name: 'Shailendra',
  role: 'Student & Developer',
  tagline: 'Designed & built with curiosity.',
  bio: 'I\'m a student developer obsessed with the craft of frontend engineering. Not the kind that ships features fast. The kind that makes things feel exactly right.',

  social: {
    github:   'https://github.com',      // replace with real URL
    linkedin: 'https://linkedin.com',    // replace with real URL
    email:    'hello@example.com'        // replace with real email
  },

  skills: [
    { name: 'HTML5',              category: 'Frontend', desc: 'Semantic, accessible markup that forms the backbone of every project.', tag: 'foundation' },
    { name: 'CSS3',               category: 'Frontend', desc: 'Modern layouts, animations, and design systems without heavy dependencies.', tag: 'styling' },
    { name: 'JavaScript (ES6+)',  category: 'Frontend', desc: 'Vanilla JS for efficient DOM manipulation, event handling, and async patterns.', tag: 'logic' },
    { name: 'Responsive Design',  category: 'Frontend', desc: 'Mobile-first thinking, fluid grids, and deliberate breakpoint design.', tag: 'layout' },
    { name: 'Accessibility',      category: 'Frontend', desc: 'WCAG principles, ARIA patterns, and keyboard-first interaction.', tag: 'a11y' },
    { name: 'C / C++',            category: 'Systems',  desc: 'Memory management, data structures, and algorithmic problem solving.', tag: 'systems' },
    { name: 'Python',             category: 'Scripting', desc: 'Automation, data processing, and rapid prototyping.', tag: 'scripting' },
    { name: 'Git',                category: 'Tools',    desc: 'Version control, branching strategies, and collaborative workflows.', tag: 'tooling' }
  ],

  projects: [
    {
      id:        'algo-viz',
      num:       '01',
      name:      'Algorithm Visualizer',
      shortDesc: 'An interactive tool that makes sorting algorithms tangible and understandable.',
      idea:      'Most people learn algorithms by reading pseudocode, which gives them no intuition for how the data actually moves. I wanted to build a tool that makes the logic visceral.',
      build:     'Built with Vanilla JS and Canvas API. Each algorithm runs as a generator function, yielding state at each comparison/swap. The renderer reads state frames and animates them at adjustable speed — no timeouts stacked on timeouts.',
      tags:      ['JavaScript', 'Canvas API', 'Data Structures', 'Algorithms'],
      github:    'https://github.com',
      demo:      'https://example.com',
      image:     'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=1200&h=675'
    },
    {
      id:        'dev-env',
      num:       '02',
      name:      'Minimalist Editor',
      shortDesc: 'A browser-based code editor for distraction-free prototyping.',
      idea:      'Most browser editors try to replace VS Code. This one doesn\'t. It\'s built for the exact moment when you want to try one idea quickly without opening a new project.',
      build:     'No frameworks, no bundler. Syntax highlighting via a hand-rolled tokenizer. State persisted in localStorage with an undo history stack. The command palette is built on a weighted fuzzy-match algorithm.',
      tags:      ['JavaScript', 'CSS3', 'Web Storage API', 'Tokenization'],
      github:    'https://github.com',
      demo:      'https://example.com',
      image:     'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200&h=675'
    }
  ],

  journey: [
    {
      date:  '2024',
      title: 'The beginning',
      desc:  'Started with C++ — not because it was easy, but because it was real. Data structures, pointers, and learning that code is ultimately physics.'
    },
    {
      date:  'Early 2025',
      title: 'Discovered the web',
      desc:  'Moved into frontend engineering. Built increasingly complex UI components, learning the gap between "it works" and "it feels right."'
    },
    {
      date:  'Late 2025',
      title: 'Going deeper',
      desc:  'Studying systems design, interaction design patterns, and the craft behind premium digital experiences. Building more, breaking more.'
    },
    {
      date:  'Now',
      title: 'In motion',
      desc:  'Actively building, learning, and experimenting at the boundary between engineering and design. Open to interesting problems.'
    }
  ]
};
