# Plan 005: Migrate the blog to content collections and add an RSS feed

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 5abb562..HEAD -- src/pages/blog.astro src/pages/posts/ src/layouts/BlogPostLayout.astro src/layouts/Layout.astro astro.config.mjs package.json`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: MED (URL stability is the risk; the link check from plan 001 and
  the explicit URL assertions below are the mitigation)
- **Depends on**: 001 (link check gates URL stability)
- **Category**: migration
- **Planned at**: commit `5abb562`, 2026-07-07

## Why this matters

The blog uses the pre-collections Astro pattern: raw `import.meta.glob` over
`src/pages/posts/*.md` with a hand-written frontmatter type. Nothing
validates frontmatter — a typo'd `pubDate` silently produces `Invalid Date`
at sort time instead of failing the build. Content collections give a
Zod-validated schema, typed `getCollection` access, and make an RSS feed
(`@astrojs/rss`) nearly free. The blog has one post today, so this is the
cheapest moment the migration will ever be — the cost scales with post count.

**Hard constraint: every existing URL must keep working.** The live post URL
is `/posts/personal-website-with-astro/` and the index is `/blog/`.

## Current state

- `src/pages/blog.astro:4-11` — the index page collects posts via glob:

  ```ts
  const allPosts = Object.values(
      import.meta.glob<{
          url: string;
          frontmatter: { title: string; pubDate: string };
      }>("./posts/*.md", { eager: true }),
  ).sort(
      (a, b) => +new Date(b.frontmatter.pubDate) - +new Date(a.frontmatter.pubDate),
  );
  ```

  and renders `<li><a href={post.url}>{post.frontmatter.title}</a></li>`
  (line 23). Keep the page's markup/SCSS otherwise unchanged.
- One post exists: `src/pages/posts/personal-website-with-astro.md`, with
  frontmatter:

  ```yaml
  layout: ../../layouts/BlogPostLayout.astro
  title: 'Personal Website with Astro'
  pubDate: 2023-05-07
  description: 'Creating a Personal Website with Astro'
  author: 'Rebecca Clair'
  image:
      url: '/images/posts/fb9c0c69-7730-4ce9-b267-e68db31feb75.webp'
      alt: 'Abstract Astro and React'
  tags: ["astro", "website", "react", "vercel", "blogging"]
  ```

- `src/layouts/BlogPostLayout.astro` — receives `Astro.props.frontmatter`
  and uses `frontmatter.title/description/image?.url/image?.alt/pubDate/author`
  (lines 5–15), rendering `ogType="article"` meta through `Layout.astro`.
  It calls `new Date(frontmatter.pubDate)` (lines 14, 38), which works for
  both string and `Date` inputs — so passing collection data through as
  `frontmatter` needs no layout change.
- `src/layouts/Layout.astro` — site shell; `<head>` block at lines 47–95.
  RSS discovery link goes here (Step 5).
- There is NO `src/content/` directory and NO `src/content.config.ts` yet.
- `astro.config.mjs` sets `site: "https://heliasar.com"` — required by
  `@astrojs/rss`, already in place.
- The resume pages (`src/pages/resume.md`, `resume-print.md`) also use
  `layout:` frontmatter but are **generated files and NOT part of this
  migration** — they are pages, not content.
- Astro version: `^7.0.4` (collections use the `glob()` loader from
  `astro/loaders` and a `src/content.config.ts` file; entries expose
  `id` (slug from filename), `data` (validated frontmatter), and are
  rendered via `render(entry)` from `astro:content`).
- Conventions: tabs, Biome, pnpm. TypeScript in frontmatter blocks.

## Commands you will need

| Purpose   | Command                        | Expected on success |
|-----------|--------------------------------|---------------------|
| Install   | `pnpm install`                 | exit 0              |
| Add dep   | `pnpm add @astrojs/rss`        | exit 0, latest ^4   |
| Lint      | `pnpm exec biome ci`           | exit 0              |
| Typecheck | `pnpm check:types`             | exit 0              |
| Build     | `pnpm build`                   | exit 0              |
| Links     | `pnpm check:links`             | exit 0 (if plan 001 landed) |

## Scope

**In scope** (the only files you should modify/create/move):
- `src/content.config.ts` (create)
- `src/content/blog/personal-website-with-astro.md` (moved from
  `src/pages/posts/`, `layout:` line removed)
- `src/pages/posts/[id].astro` (create — preserves `/posts/<slug>/` URLs)
- `src/pages/blog.astro` (swap glob → `getCollection`)
- `src/pages/rss.xml.js` (create)
- `src/layouts/Layout.astro` (ONE line: RSS discovery `<link>`)
- `package.json`, `pnpm-lock.yaml` (add `@astrojs/rss`)

**Out of scope** (do NOT touch):
- `src/pages/resume.md`, `src/pages/resume-print.md` — generated pages, not
  collection content.
- `src/pages/projects/*.astro` — hand-authored pages; migrating projects to
  a collection was considered and deferred (they're rich bespoke layouts,
  not uniform content).
- `src/layouts/BlogPostLayout.astro` — works as-is with passed-through data.
- URL structure — do not "improve" `/posts/...` to `/blog/...`.

## Git workflow

- Branch: `advisor/005-content-collections-rss`
- Two commits suggested: `refactor(blog): migrate posts to content collections`
  then `feat(blog): add RSS feed`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Define the collection

Create `src/content.config.ts`:

```ts
import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
    schema: z.object({
        title: z.string(),
        pubDate: z.coerce.date(),
        description: z.string(),
        author: z.string(),
        image: z
            .object({
                url: z.string(),
                alt: z.string(),
            })
            .optional(),
        tags: z.array(z.string()).default([]),
    }),
});

export const collections = { blog };
```

**Verify**: `pnpm check:types` → exit 0 (an empty collection dir warning is
fine at this point).

### Step 2: Move the post

```
mkdir -p src/content/blog
git mv src/pages/posts/personal-website-with-astro.md src/content/blog/
```

Then edit the moved file: delete ONLY the `layout: ../../layouts/BlogPostLayout.astro`
frontmatter line (collections don't use layout frontmatter; the dynamic
route wraps it). Change nothing else.

**Verify**: `ls src/pages/posts/` → only the new `[id].astro` will live here
(empty right now); `grep -c "layout:" src/content/blog/personal-website-with-astro.md` → 0.

### Step 3: Create the dynamic route (URL-preserving)

Create `src/pages/posts/[id].astro`:

```astro
---
import { getCollection, render } from "astro:content";
import BlogPostLayout from "../../layouts/BlogPostLayout.astro";

export async function getStaticPaths() {
    const posts = await getCollection("blog");
    return posts.map((post) => ({
        params: { id: post.id },
        props: { post },
    }));
}

const { post } = Astro.props;
const { Content } = await render(post);
---

<BlogPostLayout frontmatter={post.data}>
    <Content />
</BlogPostLayout>
```

The filename-derived `post.id` for the moved file is
`personal-website-with-astro`, so the route emits
`/posts/personal-website-with-astro/` — identical to the old page-based URL.

**Verify**: `pnpm build` → exit 0 AND
`test -f dist/posts/personal-website-with-astro/index.html` → exit 0.

### Step 4: Swap blog.astro to getCollection

Replace lines 4–11 of `src/pages/blog.astro` with:

```ts
import { getCollection } from "astro:content";

const allPosts = (await getCollection("blog")).sort(
    (a, b) => +b.data.pubDate - +a.data.pubDate,
);
```

and the list item (line 23) with:

```astro
<li><a href={`/posts/${post.id}/`}>{post.data.title}</a></li>
```

Keep everything else (markup, SCSS) unchanged.

**Verify**: `pnpm build` → exit 0;
`grep -c "personal-website-with-astro" dist/blog/index.html` → ≥ 1.

### Step 5: Add the RSS feed

1. `pnpm add @astrojs/rss` (research note: latest major is v4; take latest).
2. Create `src/pages/rss.xml.js`:

```js
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
    const posts = await getCollection("blog");
    return rss({
        title: "Rebecca Clair — Blog",
        description:
            "Writing on software engineering, web development, and building things.",
        site: context.site,
        items: posts.map((post) => ({
            title: post.data.title,
            pubDate: post.data.pubDate,
            description: post.data.description,
            link: `/posts/${post.id}/`,
        })),
    });
}
```

3. In `src/layouts/Layout.astro`, next to the existing sitemap link
   (line 58: `<link rel="sitemap" href="/sitemap-index.xml" />`), add:

```html
<link rel="alternate" type="application/rss+xml" title="Rebecca Clair — Blog" href="/rss.xml" />
```

**Verify**: `pnpm build` → exit 0; `test -f dist/rss.xml` → exit 0;
`grep -c "personal-website-with-astro" dist/rss.xml` → ≥ 1;
`grep -c "rss.xml" dist/index.html` → ≥ 1.

### Step 6: Full gate — URL stability

**Verify**, in order:
1. `pnpm exec biome ci` → exit 0
2. `pnpm check:types` → exit 0
3. `pnpm build` → exit 0
4. `test -f dist/posts/personal-website-with-astro/index.html` → exit 0
   (THE critical assertion — old URL preserved)
5. `test -f dist/blog/index.html` → exit 0
6. `pnpm check:links` → exit 0 (if plan 001 landed)
7. `grep -c "og:type" dist/posts/personal-website-with-astro/index.html`
   → ≥ 1 and the page contains `article:published_time` (article meta still
   flows through `BlogPostLayout` → `Layout`).

## Test plan

The schema IS the new test layer: invalid frontmatter now fails
`astro check`/build instead of silently mis-sorting. Prove it once
(don't commit): temporarily change `pubDate` in the moved post to
`pubDate: not-a-date`, run `pnpm build` → must FAIL with a Zod error;
revert; `pnpm build` → exit 0. Plus the URL-stability assertions in Step 6.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] All seven checks in Step 6 pass
- [ ] `src/pages/posts/` contains only `[id].astro`
- [ ] `grep -rn "import.meta.glob" src/pages/blog.astro` → no matches
- [ ] `dist/rss.xml` exists and lists the post
- [ ] Negative test in "Test plan" performed and reverted
- [ ] `git status --porcelain` touches only in-scope files
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- The built post URL is anything other than
  `dist/posts/personal-website-with-astro/index.html` (e.g. the loader
  produced a different `id`) — do not add redirects to compensate.
- `astro:content` / `astro/loaders` imports fail on the installed Astro 7
  version (API drift) — report the actual error rather than downgrading.
- `BlogPostLayout` renders wrongly with `post.data` passed as `frontmatter`
  (e.g. date formatting breaks because `pubDate` is now a `Date`).
- More `.md` files exist under `src/pages/posts/` than the one listed here
  (posts added since this plan was written) — migrate-ability must be
  re-checked per post; report first.

## Maintenance notes

- New posts now go in `src/content/blog/` (no `layout:` frontmatter); the
  filename becomes the URL slug. Update README/CLAUDE.md if they documented
  the old location (plan 002 may have).
- The `tags` field is validated but unused — a tag-filter UI is a natural
  follow-up now that `getCollection` is typed. Deferred deliberately.
- If projects ever become uniform enough, the same pattern (a `projects`
  collection) applies — deferred because the three project pages are
  bespoke.
- Reviewer: scrutinize Step 6.4 and 6.7 output — URL and article-meta
  regressions are the only real risks here.
