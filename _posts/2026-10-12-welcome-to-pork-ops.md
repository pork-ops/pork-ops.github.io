---
layout: post
title: "Welcome to pork-ops"
date: 2026-10-12 10:00:00 +0200
categories: meta
---

This is a sample post to show how the blog looks.

## Writing is just markdown

- Create a file in `_posts/` named `YYYY-MM-DD-my-title.md`
- Add the front matter (title, date) at the top
- Write markdown, push — GitHub Pages builds it

```bash
_posts/2026-10-12-welcome-to-pork-ops.md
```

## What's next

Try editing this file, or copy it as a template for your first real post.

## Sample image

Images live in `assets/images/` and are referenced by path:

![Sample deploy flow: write markdown, push, site rebuilds](/assets/images/deploy-flow.svg)

## Coloured text

You can colour inline text with a small HTML span (works in any markdown file):

- This is <span style="color: #0d6efd;">blue text</span> for emphasis.
- This is <span style="color: #198754;">green text</span> for good news.
- This is <span style="color: #dc3545;">red text</span> for danger.

## Info / warning panels

Confluence-style callouts are plain `<div>` blocks styled by `assets/main.scss`.
Copy-paste any of these into a post:

<div class="notice notice--info" markdown="1">
**Info:** this is an info panel — good for context, links, and background.
</div>

<div class="notice notice--success" markdown="1">
**Success:** this is a success panel — good for "it worked" summaries.
</div>

<div class="notice notice--warning" markdown="1">
**Warning:** this is a warning panel — good for gotchas and things that will bite you.
</div>

<div class="notice notice--danger" markdown="1">
**Danger:** this is a danger panel — good for destructive commands and irreversible steps.
</div>

You can publish posts from the GitHub app! 
