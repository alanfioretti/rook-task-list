# Rook Tasklist

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-3f3f3f?style=for-the-badge&logo=vite&logoColor=FFD62E)
![JavaScript](https://img.shields.io/badge/JavaScript-1a1a1a?style=for-the-badge&logo=javascript)
![CSS3](https://img.shields.io/badge/CSS-1f1f1f?style=for-the-badge&logo=css3&logoColor=2965f1)
![Status](https://img.shields.io/badge/Project%20Type-Sandbox-7A1CAC?style=for-the-badge)

A small interactive React project that mimics the feel of an old-school terminal UI.
Users can add tasks, mark them as completed, restore them, and toggle between three personality “modes” that change how the system reacts.
Designed as a playful micro-interaction for my portfolio.

Built with **React** + **Vite**.

### Features

- Terminal-Inspired Interface
- Green-on-black CRT-style UI
- Blinking cursor vibes
- Scrollable task viewport with smooth behavior

#### Personality Modes
Choose how your tasklist behaves:

- **Gremlin:** sarcastic, chaotic energy
- **Corporate:** formal, efficiency-oriented responses with zero emotional overhead
- **Golden Retriever:** aggressively supportive

Each personality has unique reactions to adding or completing tasks.

#### Task Management
- Add tasks via input or Enter key
- Complete tasks with "[-]" controls
- Completed tasks display separately as "[x] TaskName [restore]"
- Restore tasks back to active list

#### Smart Scrolling
- Always scrolls to bottom when appropriate
- Gentle auto-nudge when working high in a long list
- Does **not** force-scroll when restoring tasks
- Scrolls to top/bottom when toggling completed section

#### Completed Tasks Toggle
A bottom-right utility button reveals/hides completed tasks.

### Tech Focus

This sandbox highlights:

- React controlled inputs
- List rendering & state transitions
- Conditional UI
- Scroll management with auto & partial scrolling
- Architectural state decisions
- Aesthetic design & mood-based behavior

### Part of the Rook Sandbox Collection

This project is one of several small, self-contained UI demos that accompany  
my main portfolio at **https://afioretti.dev**