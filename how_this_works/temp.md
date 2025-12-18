# Building Static Websites with Jekyll and GitHub Pages

Let me break this down into simple concepts that a 12-year-old can understand, then we'll get into the technical details.

## The Big Picture (For a 12-Year-Old)

Think of building a website like building with LEGO blocks:

1. **Jekyll** = A robot that takes your simple text files and turns them into a beautiful website
2. **GitHub Pages** = A free place to host (show) your website to the world
3. **Your Content** = The LEGO blocks (text files written in Markdown)
4. **Theme** = The instruction manual that tells the robot how to make everything look pretty

### How Your Example Site Was Built

Looking at your repository `https://github.com/lgtkgtv/hw_sec_notes`, here's what happened:

1. Someone (or AI) created a folder structure
2. They wrote notes in simple Markdown format (`.md` files)
3. They configured Jekyll with a `_config.yml` file
4. They pushed it to GitHub
5. GitHub's robot (GitHub Actions) automatically built the website
6. The website appeared at `https://lgtkgtv.github.io/hw_sec_notes/`

---

## Part 1: Understanding Your Existing Site

Let me fetch your repository to analyze its structure:

```bash
# Let's look at what's in your repository
git clone https://github.com/lgtkgtv/hw_sec_notes.git
cd hw_sec_notes
ls -la
```

Based on typical Jekyll/GitHub Pages sites, your repository likely contains:

```
hw_sec_notes/
├── _config.yml          # Jekyll configuration (the robot's settings)
├── index.md or README.md # Home page
├── docs/                # Your hardware security notes
│   ├── secure-boot.md
│   ├── tpm.md
│   └── ... (other notes)
├── assets/              # Images, CSS, JavaScript
└── _layouts/            # (Optional) Custom page templates
```

---

## Part 2: Running the Site Locally (On Your Desktop)

### Prerequisites

You need to install Jekyll on your Ubuntu 24.04 WSL2:

```bash
# Install Ruby and dependencies
sudo apt update
sudo apt install ruby-full build-essential zlib1g-dev git

# Configure Ruby gems to install in your home directory (not system-wide)
echo '# Install Ruby Gems to ~/gems' >> ~/.bashrc
echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc
echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# Install Jekyll and Bundler
gem install jekyll bundler
```

### Clone and Run Your Site

```bash
# 1. Clone your repository (if you haven't already)
cd ~
git clone https://github.com/lgtkgtv/hw_sec_notes.git
cd hw_sec_notes

# 2. Install dependencies
bundle install

# 3. Serve the site locally
bundle exec jekyll serve --livereload

# Your site is now running at: http://localhost:4000/hw_sec_notes/
```

**What just happened?**
- `bundle install` = Download all the LEGO pieces (Ruby gems) needed
- `jekyll serve` = Start the robot that builds and shows your site
- `--livereload` = Automatically refresh your browser when you change files

---

## Part 3: How GitHub Pages Works

When you push to GitHub, this happens automatically:

```yaml
# This is what GitHub does behind the scenes (simplified):
1. Detect _config.yml → "Oh, this is a Jekyll site!"
2. Run: jekyll build
3. Take the generated _site/ folder
4. Publish it to: https://lgtkgtv.github.io/hw_sec_notes/
```

To enable GitHub Pages:
1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select **Deploy from a branch**
4. Choose branch (usually `main`) and folder (usually `/ (root)`)
5. Click **Save**

---

## Part 4: Hosting on Your Custom Domain (www.aig3n.com)

Since `aig3n.com` is on AWS, you have two main options:

### Option A: GitHub Pages with Custom Domain (Recommended for Static Sites)

**Advantages:** Free hosting, free SSL, automatic deployments

```bash
# Step 1: Configure GitHub Pages
# Add a file named CNAME to your repository root:
echo "www.aig3n.com" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push
```

```bash
# Step 2: Configure DNS in AWS Route 53
# Add these DNS records:

# For www.aig3n.com
Type: CNAME
Name: www
Value: lgtkgtv.github.io

# For aig3n.com (apex domain)
Type: A
Name: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153
```

**In GitHub Settings:**
1. Go to Settings → Pages
2. Enter `www.aig3n.com` in Custom Domain
3. Check "Enforce HTTPS" (after DNS propagates)

---

### Option B: Host on AWS S3 + CloudFront (More Control)

**Advantages:** Full AWS integration, better for complex deployments

```bash
# Step 1: Build the site locally
cd ~/hw_sec_notes
bundle exec jekyll build
# This creates a _site/ folder with your complete website

# Step 2: Create S3 bucket and configure for static hosting
aws s3 mb s3://www.aig3n.com
aws s3 website s3://www.aig3n.com \
    --index-document index.html \
    --error-document 404.html

# Step 3: Set bucket policy for public read
cat > bucket-policy.json <<'EOF'
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicReadGetObject",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::www.aig3n.com/*"
  }]
}
EOF

aws s3api put-bucket-policy \
    --bucket www.aig3n.com \
    --policy file://bucket-policy.json

# Step 4: Upload your site
aws s3 sync _site/ s3://www.aig3n.com/ --delete

# Step 5: Create CloudFront distribution (for HTTPS and CDN)
# This is more complex - typically done via AWS Console
# Point Route 53 to CloudFront distribution
```

---

## Part 5: How AI Generated Your Site

The AI likely did this:

```python
# Pseudo-code of what an AI agent might do:

def generate_hardware_security_site():
    # 1. Create repository structure
    create_directory("hw_sec_notes")
    
    # 2. Generate _config.yml
    config = {
        "title": "Hardware Security Notes",
        "theme": "jekyll-theme-minimal",  # or another theme
        "baseurl": "/hw_sec_notes",
        "url": "https://lgtkgtv.github.io"
    }
    write_yaml("_config.yml", config)
    
    # 3. Generate content pages
    topics = [
        "Secure Boot Process",
        "TPM Architecture", 
        "Intel Boot Guard",
        # ... etc
    ]
    
    for topic in topics:
        content = generate_markdown_content(topic)
        write_file(f"docs/{sanitize(topic)}.md", content)
    
    # 4. Create navigation structure
    generate_index_page(topics)
    
    # 5. Initialize git and push
    git_init()
    git_add_all()
    git_commit("Initial site generation")
    git_push("github.com/lgtkgtv/hw_sec_notes")
```

---

## Part 6: Best Practices for Your Use Case

Since you're focused on **professional, secure, modular** development:

### Project Structure Template

```
your-jekyll-site/
├── _config.yml           # Site configuration
├── _config_dev.yml       # Development overrides
├── Gemfile               # Ruby dependencies
├── Gemfile.lock          # Locked versions
├── .gitignore            # Don't commit _site/, .jekyll-cache/
├── README.md             # Documentation
├── index.md              # Home page
├── _posts/               # Blog posts (YYYY-MM-DD-title.md)
├── _pages/               # Static pages
├── _layouts/             # Custom layouts
│   ├── default.html
│   └── post.html
├── _includes/            # Reusable components
│   ├── header.html
│   └── footer.html
├── assets/               # Static files
│   ├── css/
│   ├── js/
│   └── images/
├── _data/                # Data files (YAML, JSON, CSV)
│   └── navigation.yml
└── docs/                 # Documentation or content
```

### Security Best Practices

```yaml
# _config.yml - Security settings
plugins:
  - jekyll-seo-tag
  - jekyll-sitemap
  - jekyll-feed

# Content Security
strict_front_matter: true

# Don't expose these
exclude:
  - Gemfile
  - Gemfile.lock
  - vendor
  - .env
  - secrets/
```

### Automation with GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy Jekyll Site

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.2'
          bundler-cache: true
      
      - name: Build site
        run: bundle exec jekyll build
        
      - name: Test site
        run: |
          bundle exec htmlproofer ./_site \
            --disable-external \
            --allow-hash-href
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./_site
```

---

## Summary: Three Paths Forward

1. **Keep it on GitHub Pages** (Simplest)
   - Free hosting, automatic builds
   - Custom domain via DNS configuration
   - Perfect for documentation sites

2. **Move to AWS S3/CloudFront** (More Control)
   - Full AWS integration
   - Better for enterprise requirements
   - More complex deployment pipeline

3. **Hybrid Approach** (Best of Both)
   - Develop with GitHub Pages
   - Auto-deploy to AWS for production
   - Use GitHub Actions as CI/CD

---

## Next Steps for You

1. **Try running your site locally** using the commands in Part 2
2. **Experiment with content** - edit a `.md` file and see changes live
3. **Study the theme** - look at how `_config.yml` controls appearance
4. **Build a test site** - create a simple personal site to understand the workflow

Would you like me to create a complete starter template with CI/CD pipeline, security best practices, and AWS deployment automation? I can generate working code you can use as a "production-ready template" for future projects.
