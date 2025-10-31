# Social Media Content Generator Skill

## Summary

This skill generates optimized social media preview images and Open Graph metadata for each page in the intelligent textbook, ensuring attractive, informative previews when pages are shared on social platforms, and creates a social media promotion campaign to increase textbook visibility.

## Order

This skill should be executed:

1. After chapter content is substantially complete (70%+ chapters written)
2. After glossary and key pages exist
3. Before major marketing or promotion efforts
4. Can be re-run when content updates significantly

The generator creates custom social cards and promotional content, so it needs actual content to visualize and promote.

## Inputs

### Primary Input Files

1. **All Markdown Content** (`docs/**/*.md`)
   - Extracts titles, descriptions, key concepts
   - Identifies visual elements to feature
   - Quality check: Pages should have clear titles and meaningful content

2. **Learning Graph** (`docs/learning-graph/03-concept-dependencies.csv`)
   - Visualizes concept relationships in social cards
   - Highlights key concepts for promotion
   - Quality check: Valid graph structure

3. **MicroSims** (`docs/sims/*/`)
   - Screenshots or animated previews for social sharing
   - Highlights interactive features
   - Quality check: All MicroSims functional

4. **Course Description** (`docs/course-description.md`)
   - Source for course overview messaging
   - Target audience identification
   - Quality check: Clear, compelling description

5. **Site Configuration** (`mkdocs.yml`)
   - Site title, author, URL
   - Existing social media configuration
   - Quality check: Complete metadata fields

6. **Branding Assets** (`docs/img/`)
   - Logo for social cards
   - Brand colors and style guide
   - Quality check: Logo exists in high resolution

### Optional Input Files

7. **Social Media Strategy** (`docs/social-media-strategy.json`)
   - Target platforms (Twitter, LinkedIn, Facebook, Reddit)
   - Posting frequency and schedule
   - Hashtag strategy
   - Audience demographics

8. **Existing Social Cards** (`docs/img/social/`)
   - Previous cards for consistency checking
   - Quality check: Consistent style maintained

### Input Quality Metrics (Scale 1-100)

**Content Readiness Score:**
- 90-100: Complete content, clear structure, compelling descriptions
- 70-89: Most content ready, some pages lack descriptions
- 50-69: Basic content but many pages lack compelling hooks
- Below 50: Insufficient content for effective social promotion

**Quality Checks:**

1. Page count: 20+ pages = good baseline for promotion
2. Metadata completeness: Titles and descriptions for 90%+ pages
3. Visual assets: Logo, favicon, cover image present
4. Compelling hooks: Key value propositions clear in content
5. Target audience: Clearly defined in course description

**User Dialog Triggers:**
- Score < 60: "Limited content or metadata. Social cards may be generic. Continue or improve content first?"
- No logo: "No logo found. Generate text-based social cards or provide logo first?"
- No course description: "No compelling course description. Social promotion will be limited. Add description?"
- Incomplete metadata: "[N] pages missing titles/descriptions. Generate with defaults or update content?"

## Outputs

### Social Media Assets

1. **Custom Social Cards** (`docs/img/social/[page-path].png`)
   - One 1200x630px image per important page
   - Includes: page title, key visual, logo, branding
   - Follows consistent design template
   - Optimized for Open Graph and Twitter Cards

2. **Open Graph Metadata** (injected into markdown frontmatter)
   - Updates each markdown file with:
     ```yaml
     ---
     title: "Page Title"
     description: "Compelling 155-character description"
     image: img/social/page-path.png
     ---
     ```

3. **MicroSim Preview Videos/GIFs** (`docs/img/social/sims/[sim-name].gif`)
   - Animated previews of interactive simulations
   - 10-15 second loops showing key interactions
   - Optimized file size for fast loading

### Promotional Content

4. **Social Media Posts** (`docs/social-media/posts.md`)
   - 20-30 pre-written posts for different platforms
   - Organized by topic/chapter
   - Includes hashtags, emojis, calls-to-action
   - Platform-specific versions (Twitter, LinkedIn, Facebook, Reddit)

5. **Launch Campaign** (`docs/social-media/launch-campaign.md`)
   - Week-by-week rollout plan
   - Sequence of posts building anticipation
   - Highlights key features (MicroSims, learning graph, etc.)
   - Engagement strategies

6. **Visual Quote Cards** (`docs/img/social/quotes/`)
   - 10-15 shareable images with key insights
   - Branded design template
   - Text overlays with important concepts
   - Attribution and textbook link

### Analytics & Tracking

7. **UTM Link Library** (`docs/social-media/utm-links.csv`)
   - Tracked links for each social post
   - Campaign, medium, source parameters
   - Organized by platform and content type
   - For Google Analytics integration

8. **Social Media Analytics Template** (`docs/social-media/analytics-template.md`)
   - Metrics to track (clicks, shares, engagement)
   - Reporting template
   - Success criteria

### Output Quality Metrics (Scale 1-100)

**Social Card Quality Score:**

- **Visual Design** (25 points):
  - Professional, branded appearance
  - Readable text (minimum 30pt font)
  - High contrast for visibility
  - Consistent style across all cards
  - Proper logo placement
  - No text/image cutoff issues

- **Content Effectiveness** (25 points):
  - Title clearly visible and compelling
  - Key visual supports the topic
  - Description provides value preview
  - Call-to-action implied or explicit
  - Unique for each page (not generic template)

- **Technical Quality** (25 points):
  - Correct dimensions (1200x630px for OG, 1200x675px for Twitter)
  - File size < 1MB for fast loading
  - High resolution (300 DPI source, 72 DPI web)
  - Proper format (PNG or JPG)
  - Valid Open Graph markup

- **Platform Optimization** (25 points):
  - Works on all major platforms (Facebook, Twitter, LinkedIn, Reddit)
  - Mobile preview looks good
  - Text readable at small sizes
  - Safe zones respected (no important content in edges)
  - Preview test successful on all platforms

**Promotional Content Quality Score:**

- **Messaging Effectiveness** (30 points):
  - Clear value proposition
  - Engaging hooks and headlines
  - Benefits-focused (not feature-focused)
  - Appropriate tone for audience
  - Compelling calls-to-action
  - No jargon (unless target audience expects it)

- **Platform Appropriateness** (25 points):
  - Character counts fit platform (Twitter 280, LinkedIn 3000, etc.)
  - Hashtag strategy appropriate (#education, #elearning, etc.)
  - Emoji use matches platform norms
  - Content style matches platform culture
  - Visual/text balance appropriate

- **Campaign Coherence** (25 points):
  - Consistent narrative across posts
  - Logical sequence and pacing
  - Variety in content types (features, benefits, testimonials, visuals)
  - Strategic timing recommendations
  - Cross-promotion opportunities identified

- **Engagement Potential** (20 points):
  - Questions and interactive elements
  - Share-worthy content (quotes, stats, visuals)
  - Conversation starters
  - Community building opportunities
  - User-generated content hooks

### Social Media Post Categories

**Feature Highlights (30%):**

- "Check out our interactive MicroSims for [topic]!"
- "Navigate your learning path with our concept graph"
- "Every term clearly defined in our comprehensive glossary"

**Educational Content (25%):**

- "Did you know? [Interesting fact from textbook]"
- "Quick tip: [Practical advice from content]"
- "Concept breakdown: [Complex topic explained simply]"

**Visual Content (20%):**

- MicroSim demonstrations
- Learning graph visualizations
- Infographics from chapters
- Quote cards with key insights

**Social Proof (15%):**

- User testimonials (when available)
- Usage statistics
- Case study highlights
- Community contributions

**Engagement Posts (10%):**

- Questions to community
- Polls and surveys
- Challenges and exercises
- Discussion prompts

### Platform-Specific Templates

**Twitter/X:**
```
🎓 [Compelling hook]

[Key benefit in 1 sentence]

✨ Features:
• [Feature 1]
• [Feature 2]
• [Feature 3]

🔗 [Tracked link]

#EdTech #Education #[TopicSpecific] #OpenEducation
```

**LinkedIn:**
```
[Professional headline]

[2-3 paragraph description of value]

Key Features:
→ [Feature with professional benefit]
→ [Feature with professional benefit]
→ [Feature with professional benefit]

This resource is perfect for:
• [Audience 1]
• [Audience 2]
• [Audience 3]

Explore now: [Tracked link]

#ProfessionalDevelopment #Education #[Topic]
```

**Reddit (r/education, r/EdTech, topic-specific subs):**
```
[Authentic, informative title]

[Detailed, helpful description]

[What makes it unique/valuable]

[Link with context about being creator/contributor]

[Engage with comments genuinely]
```

**Facebook:**
```
[Friendly, accessible tone]

[Emotional hook or story]

[Key benefits]

[Visual content embedded]

[Call to action with link]

#[RelevantHashtags]
```

### Quality Checks Performed

1. **Social Card Validation:**
   - Dimensions correct for each platform
   - File size optimized
   - Text readable at thumbnail size
   - Logo clearly visible
   - No cut-off content
   - Colors accessible (WCAG AA contrast)

2. **Open Graph Testing:**
   - Metadata valid in all frontmatter
   - Preview test on Facebook Sharing Debugger
   - Preview test on Twitter Card Validator
   - Preview test on LinkedIn Post Inspector
   - All images load correctly

3. **Content Review:**
   - No spelling/grammar errors
   - Character counts within limits
   - Hashtags relevant and not excessive (3-5 per post)
   - Links tracked with UTM parameters
   - Tone appropriate for platform and audience

4. **Brand Consistency:**
   - Visual style matches brand guidelines
   - Messaging aligns with course values
   - Logo usage correct
   - Colors from brand palette
   - Font choices consistent

5. **Accessibility:**
   - Alt text for all images
   - Color contrast sufficient
   - Text readable without images
   - Captions for videos/GIFs
   - Screen reader friendly

### Success Criteria

**Social Cards:**
- Overall quality score > 75
- 100% technical compliance (dimensions, file size)
- Preview test successful on 4+ platforms
- Consistent branding across all cards
- Unique designs for major pages

**Promotional Content:**
- Overall quality score > 70
- 20+ posts across multiple content types
- Platform-specific optimization
- Clear campaign strategy
- Engagement hooks in 80%+ posts

**Campaign Readiness:**
- Launch sequence defined (2-4 weeks)
- Content calendar populated
- UTM tracking configured
- Analytics template ready
- Success metrics defined

### Additional Outputs

9. **Influencer Outreach List** (`docs/social-media/influencer-outreach.md`)
   - Relevant educators and EdTech influencers
   - Personalized pitch templates
   - Collaboration opportunities

10. **Community Engagement Guide** (`docs/social-media/community-engagement.md`)
   - How to respond to comments
   - Building community around textbook
   - User-generated content strategies
   - Moderation guidelines

11. **A/B Testing Framework** (`docs/social-media/ab-testing.md`)
   - Headline variations to test
   - Visual alternatives
   - Call-to-action options
   - Metrics to compare

12. **Evergreen Content Calendar** (`docs/social-media/evergreen-calendar.md`)
   - Posts that can be reused periodically
   - Seasonal content opportunities
   - Anniversary/milestone posts
   - Update and refresh schedule

## Configuration Options

**Social Card Styles:**

- Minimal (text + logo + color)
- Visual (concept illustration + text)
- Data (graph visualization + stats)
- Screenshot (MicroSim preview + description)

**Campaign Intensity:**

- Soft launch (1-2 posts/week, 4 weeks)
- Standard launch (3-5 posts/week, 3 weeks)
- Blitz launch (daily posts, 2 weeks)

**Target Platforms:**

- Academic focus (Twitter, LinkedIn, Reddit academic subs)
- General education (Facebook, Instagram, Pinterest)
- Technical audience (Hacker News, dev.to, technical subs)
- All platforms (comprehensive strategy)

**Automation Level:**

- Full automation (scheduled posts via Buffer/Hootsuite)
- Semi-automated (drafts prepared, manual posting)
- Manual (content created, posting strategy provided)
