source "https://rubygems.org"

# GitHub Pages gem includes Jekyll and approved plugins
gem "github-pages", "~> 228", group: :jekyll_plugins

# Platform-specific dependencies
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

platforms :mingw, :x64_mingw, :mswin do
  gem "wdm", "~> 0.1"
end

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]