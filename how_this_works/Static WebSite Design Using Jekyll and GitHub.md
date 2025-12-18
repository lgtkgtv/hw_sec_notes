# Static WebSite Design Using Jekyll and GitHub 

- clone the repo  
  git clone https://github.com/lgtkgtv/hw_sec_notes.git  
- Create a folder structure  
- Write notes in simple Markdown format (.md files)  
- Configure Jekyll with a `_config.yml` file  
- Push it to GitHub  
- GitHub's robot (GitHub Actions) automatically builds the website  
- Website appears at https://lgtkgtv.github.io/hw_sec_notes/  

Jekyll          = A robot that takes your simple text files and turns them into a beautiful website  
GitHub Pages    = A free place to host (show) your website to the world  
Your Content    = The LEGO blocks (text files written in Markdown)  
Theme           = The instruction manual that tells the robot how to make everything look pretty  

## Typical Jekyll/GitHub Pages sites

```
hw_sec_notes/
├── _config.yml            # Jekyll configuration (the robot's settings)
├── index.md or README.md  # Home page
├── docs/                  # Your hardware security notes
│   ├── secure-boot.md
│   ├── tpm.md
│   └── ... (other notes)
├── assets/              # Images, CSS, JavaScript
└── _layouts/            # (Optional) Custom page templates
```


## Running the Site Locally (On Your Desktop)  -- Optional 

**Prerequisites**

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

**Clone and Run Your Site**

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

What just happened?

bundle install = Download all the LEGO pieces (Ruby gems) needed  
jekyll serve = Start the robot that builds and shows your site  
--livereload = Automatically refresh your browser when you change files  


## How GitHub Pages Works   

When you push to GitHub, this happens automatically:

```yaml
# This is what GitHub does behind the scenes (simplified):
1. Detect _config.yml → "Oh, this is a Jekyll site!"
2. Run: jekyll build
3. Take the generated _site/ folder
4. Publish it to: https://lgtkgtv.github.io/hw_sec_notes/
```


To enable GitHub Pages:
```
Go to your repository on GitHub
Click **Settings → Pages**
Under "Source", select **Deploy from a branch**
Choose branch (usually `main`) and folder (usually `/ (root)`)
Click **Save**
```



## 


-----------------------------------------------------------------------

## actual 

```
├── assets
│   ├── css
│   │   ├── interactive.css
│   │   └── main.css
│   ├── img
│   └── js
│       ├── main.js
│       └── progress-tracker.js
├── CLAUDE.md
├── _config.yml
├── default.html
├── DEPLOYMENT.md
├── Gemfile
├── index.html
├── index.md
├── _layouts
│   └── default.html
├── modules
│   ├── module-0-crypto
│   │   ├── crypto-demo.js
│   │   └── index.html
│   ├── module-1-hardware-rot
│   │   ├── boot-simulator.html
│   │   ├── hardware-rot-demo.js
│   │   └── index.html
│   ├── module-2-gpu-security
│   │   └── gpu-memory-demo.html
│   └── module-3-cloud-security
│       └── bmc-assessment.html
└── README.md
```





