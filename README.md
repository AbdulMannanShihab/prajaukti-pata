# প্রযুক্তি পাতা 🇧🇩

বাংলাদেশের সেরা টেক রিসোর্স, টিউটোরিয়াল ও কমিউনিটি প্ল্যাটফর্ম।

Built with **Nuxt 4** + **Supabase** + **Tailwind CSS**.

---

## ✅ Features

- 🔐 **Auth** — Sign up, sign in, password reset, email confirmation
- 📤 **Resource upload** — Title, type, URL, description, tags, thumbnail
- ❤️ **Like & save** — Per-user likes and saves with live counts
- 💬 **Comments** — Per-resource comment threads
- 🔍 **Search & filter** — Full-text search, type filter, tag filter
- 👤 **Profile** — Edit name/bio/username, view own resources, view saved
- 📱 **Responsive** — Mobile-first, sticky navbar, mobile menu
- 🌐 **Bangla-first** — Hind Siliguri + Noto Serif Bengali fonts throughout

---

## 🚀 Setup

### 1. Clone & install

```bash
git clone <your-repo>
cd prajaukti-pata
npm install
```

### 2. Configure Supabase

Create a project at [supabase.com](https://supabase.com), then run the schema:

```bash
# In Supabase SQL Editor, paste and run:
supabase/schema.sql
```

### 3. Environment variables

```bash
cp .env.example .env
```

Edit `.env`:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
```

Both values are in **Supabase Dashboard → Project Settings → API**.

### 4. Run dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
app/
├── assets/css/main.css        # Global styles + Tailwind layers
├── components/
│   ├── auth/
│   │   ├── AuthModal.vue      # Sign in / sign up / reset modal
│   │   └── UploadModal.vue    # Add / edit resource modal
│   ├── layout/
│   │   ├── AppNavbar.vue      # Sticky nav with auth state
│   │   └── AppFooter.vue
│   ├── resource/
│   │   ├── ResourceCard.vue   # Card with like/save actions
│   │   └── ResourceSkeleton.vue
│   └── ui/
│       └── ToastContainer.vue
├── composables/
│   ├── useAuth.ts             # signIn/signUp/signOut/resetPassword
│   ├── useResources.ts        # CRUD + like/save toggles
│   ├── useProfile.ts          # get/update profile
│   └── useToast.ts            # Global toast notifications
├── layouts/
│   └── default.vue
├── middleware/
│   └── auth.ts                # Route guard for /profile pages
├── pages/
│   ├── index.vue              # Home — hero, resource grid, platforms
│   ├── resources.vue          # All resources — search/filter/paginate
│   ├── learning.vue           # Learning platforms directory
│   ├── channels.vue           # YouTube channels directory
│   ├── blogs.vue              # Blogs & news directory
│   ├── resource/[id].vue      # Resource detail + comments
│   ├── profile/
│   │   ├── index.vue          # Edit profile
│   │   ├── resources.vue      # My uploaded resources
│   │   └── saved.vue          # Saved resources
│   └── auth/
│       ├── confirm.vue        # Email verification callback
│       └── update-password.vue
└── types/index.ts             # TypeScript types + constants
```

---

## 🗄️ Database Schema

| Table       | Purpose                       |
|-------------|-------------------------------|
| `profiles`  | User profiles (auto-created)  |
| `resources` | Community-shared resources    |
| `likes`     | Per-user likes on resources   |
| `saves`     | Per-user saved resources      |
| `comments`  | Per-resource comments         |

All tables have **Row Level Security** enabled.

---

## 🛠️ Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| Nuxt | 3.x (compat v4) | Full-stack framework |
| Supabase | latest | Auth + PostgreSQL + RLS |
| Tailwind CSS | 3.x | Utility-first styles |
| @nuxt/icon | latest | Icon component (Heroicons) |
| @nuxt/image | latest | Optimized images |
| @vueuse/nuxt | latest | useDebounceFn, onClickOutside |

---

## 🚢 Deployment

### Vercel (recommended)

```bash
npm i -g vercel
vercel
```

Set env vars in Vercel dashboard: `SUPABASE_URL` and `SUPABASE_KEY`.

### Netlify

```bash
npm run generate
# deploy dist/
```

---

## 🔜 Possible Next Steps

- Admin panel for resource moderation
- Tag-based resource browsing page
- Email notifications for comments/likes
- Social auth (Google, GitHub)
- Resource submission approval flow
- Sitemap & SEO improvements
