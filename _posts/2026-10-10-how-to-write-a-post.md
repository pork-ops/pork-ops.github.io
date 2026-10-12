---
layout: post
title: "How to write a post"
date: 2026-10-10 10:00:00 +0200
categories: guide
---

Publishing here takes about a minute:

1. Create `_posts/YYYY-MM-DD-title.md`, e.g. `_posts/2026-10-15-ssh-tips.md`
2. Paste this template at the top:

```markdown
---
layout: post
title: "My title"
date: 2026-10-15 10:00:00 +0200
categories: ops
---

Your content here.
```

3. Commit and push:

```bash
git add _posts/2026-10-15-ssh-tips.md
git commit -m "Add ssh tips post"
git push
```

GitHub Pages rebuilds the site in ~1 minute. That's it — no local build needed.
