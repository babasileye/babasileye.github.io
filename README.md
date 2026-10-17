# Dr. Sileye Ba — Personal & Academic Website

A modern, responsive, high-performance personal portfolio and academic website for **Dr. Sileye Ba**, Senior Machine Learning Scientist & Tech Lead at L'Oréal Research & Innovation and Adjunct Professor at NEOMA Business School Paris.

Designed with an elegant **Obsidian & Champagne Gold** aesthetic directly harmonized with the custom **L'Oréal Research & Innovation** banner.

---

## 🌟 Highlights & Features

1. **Refined Profile & Visual Identity**:
   - Clean, elevated hero card spotlighting Dr. Sileye Ba's portrait (`profile_photo.jpeg`), affiliation, research badges, and instant links.
   - Dark mode (Obsidian Slate + Champagne Gold) by default with a one-click Clean Light Mode switcher and `localStorage` persistence.

2. **Interactive Publications Engine**:
   - Contains all **52 publications** (12 Journal Papers, 38 Conference Papers, 2 Theses).
   - Instant live search by keyword, title, author, venue, or year.
   - Interactive category tabs: `All (52)`, `Journals (12)`, `Conferences (38)`, `Theses (2)`.
   - One-click **BibTeX generator & copier** with interactive toast feedback.
   - Direct links to **Google Scholar** searches for every paper.

3. **Complete Career & Academic Timeline**:
   - Chronological interactive experience timeline covering L'Oréal R&I, NEOMA Business School, Dailymotion, VideoStitch, INRIA, RN3D, Télécom Bretagne, and IDIAP.
   - Education cards highlighting Ph.D. from EPFL and Master (MVA) from ENS Cachan.

4. **Mentorship & Supervision**:
   - Filterable tabs for **Doctoral Students (6)**, **Master Interns (6)**, and **Student Projects (4)**.

5. **Keynotes, Talks & Teaching**:
   - Direct video links to Eurographics 2022, CVC Barcelona, IndabaX Senegal, etc.
   - Course listings for NEOMA (Machine Learning & AI, Generative AI, Option Pricing, Index Tracking) and Télécom Bretagne.

6. **Zero Dependencies & Blazing Fast**:
   - Built with clean semantic HTML5, modern CSS3 variables, and vanilla JavaScript.
   - No external npm build steps or bulky frameworks needed. Works offline and loads instantaneously.

---

## 🚀 How to View Locally

You can open `index.html` directly in your web browser, or run a local HTTP server:

```bash
cd website
python3 -m http.server 8080
```

Then open your browser at:
```
http://localhost:8080
```

---

## 🌐 Free 1-Minute Deployment Options

### Option A: GitHub Pages (Recommended — matches github.com/babasileye)
1. Create a repository on your GitHub account named `babasileye.github.io` (or `website`).
2. Push the files in this `website/` directory to the repository:
   ```bash
   cd website
   git init
   git branch -M main
   git remote add origin https://github.com/babasileye/babasileye.github.io.git
   git add .
   git commit -m "Initial commit of new portfolio website"
   git push -u origin main
   ```
3. Your site will automatically go live at **`https://babasileye.github.io`** with free HTTPS!

### Option B: Netlify / Vercel
- Simply drag and drop the `website` folder into [Netlify Drop](https://app.netlify.com/drop) or import from GitHub on Vercel for instant free deployment.

---

## 🛠️ How to Update Your Google Site (sites.google.com/site/sileyeoba/home)

If you also wish to refresh your existing Google Site:

1. **Upload the Banner**:
   - Open your site in edit mode at [Google Sites](https://sites.google.com/site/sileyeoba/home).
   - Hover over the top header and click **Change image** > **Upload**.
   - Select `website/banner_photo.jpeg`.
   - Choose **Header type** > **Large banner** or **Cover** so the full graphic renders without cropping.

2. **Add a Link to Your New Portfolio**:
   - Add a prominent button or banner text: *"Visit my updated portfolio and publications repository at https://babasileye.github.io"*.
