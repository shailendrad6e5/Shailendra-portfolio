/**
 * portfolioData — single source of truth.
 * Edit this file to update all content across the site.
 */
const portfolioData = {
  name: 'Shailendra',
  role: 'Student / Developer / Builder',
  tagline: 'Student / Developer / Builder',
  bio: 'I\'m a student and developer focused on learning by building. I enjoy turning ideas into useful, interactive and thoughtfully designed digital experiences.',

  social: {
    github:   'https://github.com/shailendrad6e5/',
    linkedin: 'https://www.linkedin.com/in/shailendra-kumawat/',
    email:    'shailendrdak5432@gmail.com'
  },

  skills: [
    { name: 'HTML5',              category: 'Frontend', desc: 'Semantic, accessible markup that forms the backbone of every project.', tag: 'foundation' },
    { name: 'CSS3',               category: 'Frontend', desc: 'Modern layouts, animations, and design systems without heavy dependencies.', tag: 'styling' },
    { name: 'JavaScript (ES6+)',  category: 'Frontend', desc: 'Vanilla JS for efficient DOM manipulation, event handling, and async patterns.', tag: 'logic' },
    { name: 'Responsive Design',  category: 'Frontend', desc: 'Mobile-first thinking, fluid grids, and deliberate breakpoint design.', tag: 'layout' },
    { name: 'UI / Interaction Design', category: 'Design', desc: 'Thinking through how interfaces feel, not just how they look. Micro-interactions, transitions, and usability.', tag: 'interaction' },
    { name: 'Accessibility',      category: 'Frontend', desc: 'WCAG principles, ARIA patterns, and keyboard-first interaction.', tag: 'a11y' },
    { name: 'Canvas API',         category: 'Frontend', desc: 'Building interactive, real-time 2D graphics and data-driven visualizations directly in the browser.', tag: 'graphics' },
    { name: 'Git',                category: 'Tools',    desc: 'Version control, branching strategies, and collaborative workflows.', tag: 'tooling' }
  ],

  projects: [
    {
      id:        'algo-viz',
      num:       '01',
      name:      'Algorithm Visualizer',
      shortDesc: 'An interactive web experience for visualizing algorithms and understanding how they work.',
      idea:      'Most people learn algorithms by reading pseudocode, which gives them no intuition for how the data actually moves. I wanted to build a tool that makes the logic tangible — something you can watch and understand rather than just read.',
      build:     'Built with Vanilla JS and Canvas API. Each algorithm runs as a generator function, yielding state at each comparison and swap. The renderer reads state frames and animates them at adjustable speed — no timeouts stacked on timeouts.',
      tags:      ['JavaScript', 'Canvas API', 'Data Structures', 'Algorithms'],
      github:    'https://github.com/shailendrad6e5/',
      demo:      'https://example.com',
      image:     'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=1200&h=675'
    },
    {
      id:        'dev-env',
      num:       '02',
      name:      'Minimalist Editor',
      shortDesc: 'A focused, minimal editing experience built around simplicity, clarity and usability.',
      idea:      'Most browser editors try to replace VS Code. This one doesn\'t. It\'s built for the exact moment when you want to try one idea quickly without opening a new project.',
      build:     'No frameworks, no bundler. Syntax highlighting via a hand-rolled tokenizer. State persisted in localStorage with an undo history stack. The command palette is built on a weighted fuzzy-match algorithm.',
      tags:      ['JavaScript', 'CSS3', 'Web Storage API', 'Tokenization'],
      github:    'https://github.com/shailendrad6e5/',
      demo:      'https://example.com',
      image:     'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200&h=675'
    }
  ],

  journey: [
    {
      date:  '2024',
      title: 'The beginning',
      desc:  'Started with C++ — not because it was easy, but because it was real. Data structures, pointers, and learning that code is ultimately about thinking clearly.'
    },
    {
      date:  'Early 2025',
      title: 'Discovered the web',
      desc:  'Moved into frontend development. Built increasingly complex UI components, learning the gap between "it works" and "it feels right."'
    },
    {
      date:  'Late 2025',
      title: 'Going deeper',
      desc:  'Studying interaction design patterns, browser APIs, and the craft behind thoughtful digital experiences. Building more, breaking more.'
    },
    {
      date:  'Now — 2026',
      title: 'In motion',
      desc:  'Building, experimenting and going deeper into frontend development. Open to interesting problems and things worth building.'
    }
  ]
};
