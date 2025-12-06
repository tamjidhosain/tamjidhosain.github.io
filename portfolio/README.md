# 🚀 Tamjid Hosain - Portfolio Website

A modern, responsive portfolio website showcasing my skills, projects, and experience as a Computer Science student and developer.

![Portfolio Preview](preview.png)

## ✨ Features

- 🎨 **Modern Design**: Sleek dark theme with glassmorphism effects and gradient accents
- 📱 **Fully Responsive**: Optimized for all devices (mobile, tablet, desktop)
- ⚡ **Smooth Animations**: Engaging scroll animations and transitions
- 🎯 **SEO Optimized**: Proper meta tags and semantic HTML
- 💬 **Interactive Contact Form**: Form validation and user-friendly interface
- 🎭 **Typewriter Effect**: Dynamic role display in hero section
- 🎪 **Smooth Scrolling**: One-page navigation with active section highlighting

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Flexbox, Grid, animations
- **JavaScript**: Vanilla JS for interactivity
- **Google Fonts**: Inter font family

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── style.css           # Stylesheet with design system
├── script.js           # JavaScript for interactivity
└── README.md           # This file
```

## 🚀 Quick Start

### Local Development

1. **Clone or download** this repository
2. **Open `index.html`** in your web browser
3. That's it! No build process required.

### Using Live Server (Recommended)

If you have VS Code installed:

1. Install the "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 🌐 Hosting Guide

### Option 1: GitHub Pages (FREE & Recommended)

GitHub Pages is perfect for hosting static websites like this portfolio.

#### Step-by-Step Instructions:

1. **Create a GitHub Account** (if you don't have one)
   - Go to [github.com](https://github.com)
   - Sign up for free

2. **Create a New Repository**
   - Click the "+" icon in the top right
   - Select "New repository"
   - Name it: `your-username.github.io` (replace with your actual username)
   - Make it public
   - Click "Create repository"

3. **Upload Your Files**
   
   **Method A: Using GitHub Desktop (Easier)**
   - Download and install [GitHub Desktop](https://desktop.github.com/)
   - Clone your repository
   - Copy all portfolio files into the repository folder
   - Commit and push the changes
   
   **Method B: Using Git Command Line**
   ```bash
   # Navigate to your portfolio folder
   cd portfolio
   
   # Initialize git
   git init
   
   # Add your files
   git add .
   
   # Commit
   git commit -m "Initial portfolio commit"
   
   # Connect to GitHub
   git remote add origin https://github.com/your-username/your-username.github.io.git
   
   # Push to GitHub
   git branch -M main
   git push -u origin main
   ```

4. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click "Settings"
   - Scroll to "Pages" in the left sidebar
   - Under "Source", select "main" branch
   - Click "Save"

5. **Access Your Site**
   - Your site will be live at: `https://your-username.github.io`
   - It may take a few minutes to deploy

#### Custom Domain (Optional)
- Buy a domain from Namecheap, GoDaddy, etc.
- In repository settings > Pages, add your custom domain
- Update your domain's DNS settings to point to GitHub Pages

---

### Option 2: Netlify (FREE)

Netlify offers easy drag-and-drop deployment with automatic HTTPS.

#### Step-by-Step Instructions:

1. **Create a Netlify Account**
   - Go to [netlify.com](https://www.netlify.com)
   - Sign up for free (can use GitHub account)

2. **Deploy Your Site**
   
   **Method A: Drag & Drop (Easiest)**
   - Log in to Netlify
   - Scroll to the bottom where it says "Want to deploy a new site without connecting to Git?"
   - Drag your entire `portfolio` folder onto the drop area
   - Your site will be live in seconds!
   
   **Method B: Connect to Git Repository**
   - Push your code to GitHub (see GitHub instructions above)
   - In Netlify, click "New site from Git"
   - Choose GitHub and select your repository
   - Click "Deploy site"

3. **Access Your Site**
   - Netlify will give you a random URL like `random-name-12345.netlify.app`
   - You can change this in Site settings > Domain management

4. **Custom Domain** (Optional)
   - Go to Domain settings
   - Click "Add custom domain"
   - Follow the instructions to update your DNS

---

### Option 3: Vercel (FREE)

Vercel is another excellent hosting platform with instant deployment.

#### Step-by-Step Instructions:

1. **Create a Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Deploy**
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect the configuration
   - Click "Deploy"

3. **Access Your Site**
   - You'll get a URL like `portfolio-username.vercel.app`
   - Can add custom domain in project settings

---

### Option 4: Other Options

- **Render**: Similar to Netlify, easy deployment
- **Firebase Hosting**: Google's hosting solution
- **Cloudflare Pages**: Fast global CDN
- **Surge**: Simple command-line deployment

## 🎨 Customization

### Update Your Information

1. **Personal Details**
   - Edit `index.html`
   - Update name, bio, education, experience sections

2. **Social Links**
   - Find the social links section in `index.html`
   - Update GitHub, LinkedIn, email URLs

3. **Projects**
   - Replace project cards with your own projects
   - Update project images, descriptions, and links
   - Modify `projectLinks` object in `script.js`

4. **Skills**
   - Update the skills section with technologies you know
   - Add or remove skill categories as needed

5. **Colors** (Optional)
   - Edit CSS custom properties in `style.css`
   - Look for `:root` at the top of the file
   - Change `--accent-primary`, `--accent-secondary`, etc.

### Add Your Photos

1. **Profile Photo**
   - Replace the placeholder by adding `profile.jpg` to the portfolio folder
   - Or update the `src` attribute in the About section

2. **Project Images**
   - Add your project screenshots as `project1.jpg`, `project2.jpg`, etc.
   - Or update the image paths in `index.html`

## 📧 Contact Form Setup

The contact form currently shows an alert. To make it functional:

### Option 1: EmailJS (Recommended)

1. Sign up at [emailjs.com](https://www.emailjs.com)
2. Get your Service ID and Template ID
3. Uncomment and configure the EmailJS code in `script.js`
4. Add the EmailJS SDK to `index.html`:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
   ```

### Option 2: FormSpree

1. Sign up at [formspree.io](https://formspree.io)
2. Update the form action in `index.html`:
   ```html
   <form action="https://formspree.io/f/your-form-id" method="POST">
   ```

### Option 3: Backend API

Create your own backend API with Node.js/Express or use serverless functions.

## 🔧 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 📝 License

This project is open source and available for personal use. Feel free to fork and customize!

## 🤝 Contributing

If you have suggestions for improvements:

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## 💡 Tips for Success

1. **Keep it Updated**: Regularly add new projects and skills
2. **Use Real Images**: Replace placeholders with actual screenshots
3. **SEO**: Update meta tags with relevant keywords
4. **Analytics**: Add Google Analytics to track visitors
5. **Performance**: Optimize images before uploading
6. **Mobile First**: Always test on mobile devices

## 📞 Support

If you need help with customization or deployment:
- 📧 Email: tamjid.hosain@example.com
- 💼 LinkedIn: [Your LinkedIn]
- 🐙 GitHub: [Your GitHub]

---

Built with ❤️ by Tamjid Hosain

**Last Updated**: December 2024
