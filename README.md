# Koushik's VLSI Lab

Build a modern, clean, attractive personal website called “Koushik’s VLSI Space”.

The website should combine:

A personal VLSI/Physical Design portfolio

A learning/knowledge space for VLSI students

A professional showcase for VLSI/Physical Design engineers and recruiters

The overall design must be simple, professional, technical, and visually attractive. Do NOT make it look like a generic developer portfolio or an overly flashy website.

DESIGN DIRECTION

Use a modern semiconductor / chip / Physical Design inspired visual style.

Prefer:

Dark or dark-blue technical theme

Clean typography

Plenty of whitespace

Subtle circuit/chip-inspired visual elements

Small, tasteful animations

Smooth scrolling

Professional cards

Clear visual hierarchy

Avoid:

Excessive animations

Too many colors

Huge amounts of text

Stock-photo-heavy design

Generic software-developer imagery

Overly complicated layouts

The website should feel like a personal VLSI lab / engineering space, not just an online resume.

NAVIGATION

Create a simple navigation bar:

Home | About | PD Journey | Projects | VLSI Knowledge | Activities | Resume | Contact

Keep navigation clean and easy to use on desktop and mobile.

HOME PAGE

Create a strong hero section.

Display:

KOUSHIK

VLSI PHYSICAL DESIGN ENGINEER

Supporting text:

“Exploring Physical Design, from RTL to a complete physical implementation.”

Include two buttons:

Explore My VLSI Journey

View My Projects

Below the hero, create a subtle visual representation of the Physical Design flow:

RTL → Synthesis → Floorplanning → Power Planning → Placement → CTS → Routing → STA

Make each stage visually distinct and potentially clickable.

Below that, show three feature cards:

PROJECTS
Practical Physical Design projects and implementation experience.

VLSI KNOWLEDGE
Simple explanations of VLSI and Physical Design concepts.

MY JOURNEY
What I am learning, experimenting with, and improving.

ABOUT ME

Create a clean About section.

Content:

Name: Koushik

Education:
B.Tech — Electronics and Communication Engineering
Completed in 2026

VLSI Training:
Physical Design training at Takshila VLSI Institute.

Introduce me as a beginner/early-career VLSI Physical Design engineer who is developing practical knowledge of the complete Physical Design flow.

Keep the writing professional but natural.

Do not exaggerate my experience or claim professional industry experience that I have not provided.

PD JOURNEY

Create a visually attractive Physical Design journey section.

Show the major stages:

Floorplanning

Power Planning

Placement

Clock Tree Synthesis

Routing

Static Timing Analysis

DRC / Physical Verification

Each stage should have:

Short explanation

Key concepts

Relevant tools/commands where appropriate

Option to expand for more information

The goal is to make this section useful to VLSI students while still looking professional to engineers.

PROJECTS

Create a dedicated Projects section with attractive project cards.

Project 1:

RAVEN WRAPPER

Tool:
IC Compiler II (ICC2)

Technology:
45nm

Instances:
~21K

Metal Layers:
10

Frequency:
250 MHz

Clocks:
3

Responsibilities:

Floorplanning

IO port placement

Power planning

Placement

CTS reviews

Routing

DRC checks

Timing analysis/reviews

Create a detailed project page/expandable section where screenshots, reports, observations and learning points can later be added.

Project 2:

NAND

Physical Design training/project work.

Project 3:

ORCA TOP

Physical Design training/project work.

Do not invent technical specifications for NAND or ORCA TOP. Leave placeholders where information has not yet been provided.

VLSI KNOWLEDGE

This should be one of the important parts of the website.

Create a knowledge section where I can publish simple VLSI explanations.

Organize topics into categories such as:

Physical Design

Floorplanning

Power Planning

Placement

CTS

Routing

STA

Congestion

IR Drop

Electromigration

Digital Design

Combinational Logic

Sequential Logic

Flip-Flops

Latches

Registers

Timing concepts

Tools

ICC2

Cadence Virtuoso

Vivado

OpenROAD

OpenLane

Linux / TCL

Linux commands

TCL scripting

Useful ICC2 commands

Create the UI so that I can easily add new articles/topics later.

Each article should have:

Title

Short introduction

Main explanation

Practical example

Key takeaway

VLSI ACTIVITIES

Create a section called:

“What I’m Working On”

This should look like a simple activity/learning timeline.

Example entries:

Learning Physical Design

Studying Placement and Congestion

Exploring Power Planning

Learning CTS and Clock Optimization

Practicing STA

Learning TCL and Linux for VLSI

Make it easy for me to add new activities later.

TECHNICAL SKILLS

Create a clean skills section.

Include:

VLSI / Physical Design

Floorplanning

Power Planning

Placement

CTS

Routing

STA

DRC

Tools

Synopsys ICC2

Cadence Virtuoso

Vivado

OpenROAD

OpenLane

Languages / Scripting

Verilog

TCL

Linux / Shell

Display these as clean skill cards or tags rather than progress bars.

Do NOT use fake percentage skill levels.

RESUME

Create a simple Resume section with:

Download Resume

and

View Resume

Use a placeholder for the resume file that I can replace later.

CONTACT

Create a minimal contact section.

Include placeholders for:

Email

LinkedIn

GitHub

Do not invent contact information.

IMPORTANT CONTENT PRINCIPLE

The website should communicate:

“I am building practical knowledge in VLSI Physical Design, and this website documents my journey and projects.”

It should NOT falsely present me as an experienced industry engineer.

Make the website useful to two audiences:

VLSI STUDENTS

They should be able to learn concepts and understand the Physical Design flow.

VLSI PROFESSIONALS / RECRUITERS

They should quickly understand my education, training, tools, projects and technical exposure.

USER EXPERIENCE

Make the website:

Fully responsive

Fast

Easy to navigate

Mobile friendly

Accessible

Professional

Easy for me to update later

Use subtle hover effects and animations, but keep them restrained.

The homepage should immediately communicate:

Koushik → VLSI → Physical Design → Projects → Learning

Do not add unnecessary features at this stage.

Build the first version with clean reusable sections so that I can expand the website later.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ae969a57-3a75-40a1-bd39-81f8f5f513f1).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
