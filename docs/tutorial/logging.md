# Logging Textbook Usage

<!--
Please create a detailed chapter that discusses the concept of logging online textbook usage.  First discuss how Google Analytics can be used to understand what users are using what pages and when.

Next, discuss the concept of putting more detailed logging into an intelligent textbook.  This would include logging search terms, what questions are asked of a chatbot, what MicroSims were used and for how long and what sections of the textbook are underutilized.  Here is a suggested outline, but feel free to add new sections.

Structure the response like this

# Logging Textbook Usage

## Using Web Analytics

## Derailed Logging

## Logging User-Specific Activities

## Regulatory Compliance

## Building an Analytics Dashboard
-->


Intelligent textbooks offer tremendous educational possibilities, but understanding 
how users interact with these resources is essential for continuous improvement. 
Let's explore comprehensive logging strategies that can help you measure engagement 
and optimize your intelligent textbooks.

## Using Web Analytics

Google Analytics provides a solid foundation for understanding basic usage patterns in your intelligent textbook sites. The mkdocs-material theme makes integration straightforward:

### Setting Up Google Analytics

1.  **Create a Google Analytics 4 Property** - Sign up for a Google Analytics account if you don't already have one, and create a new property for your intelligent textbook site.

2.  **Get Your Measurement ID** - After setting up your property, you'll receive a measurement ID (format: G-XXXXXXXXXX).

3.  **Configure mkdocs.yml** - Add the following to your `mkdocs.yml` file:

```
extra:
  analytics:
    provider: google
    property: G-XXXXXXXXXX  # Replace with your actual measurement ID

```

As seen in your configuration file, you're already using the property ID `G-D7X1XT7Z19`.

### Key Metrics to Track

With Google Analytics successfully implemented, you can track:

-   **Page Views** - Which pages are most frequently visited
-   **Session Duration** - How long users spend on each page
-   **User Flow** - How users navigate through your content
-   **Bounce Rate** - The percentage of visitors who leave after viewing only one page
-   **Geographic Data** - Where your users are located
-   **Device Information** - What devices and browsers are being used

### Creating Custom Events

Beyond the default tracking, you can implement custom events to track specific interactions:

```js
// In your js/extra.js file
document.addEventListener('DOMContentLoaded', function() {
  // Track clicks on MicroSim launch buttons
  const simButtons = document.querySelectorAll('.microsim-launch');
  simButtons.forEach(button => {
    button.addEventListener('click', function() {
      const simName = this.getAttribute('data-sim-name');
      gtag('event', 'launch_microsim', {
        'sim_name': simName
      });
    });
  });
});

```

## Detailed Logging

While Google Analytics provides excellent high-level insights, intelligent textbooks benefit from more detailed logging capabilities, especially for tracking interactive elements like MicroSims and quiz interactions.

### Setting Up a Logging Backend

1.  **API Endpoint Creation** - Establish a simple API that can receive and store interaction events:

```python
# Example Flask backend for logging
from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import datetime

app = Flask(__name__)
CORS(app)

@app.route('/log', methods=['POST'])
def log_event():
    data = request.json
    data['timestamp'] = datetime.datetime.now().isoformat()

    # Add to log file
    with open('interaction_logs.jsonl', 'a') as f:
        f.write(json.dumps(data) + '\n')

    return jsonify({"success": True})

if __name__ == '__main__':
    app.run(debug=True)

```

2.  **Client-Side Implementation** - Create JavaScript functions for event logging:

```js
// In js/extra.js
function logInteraction(eventType, eventData) {
  const payload = {
    eventType: eventType,
    eventData: eventData,
    page: window.location.pathname,
    timestamp: new Date().toISOString()
  };

  fetch('https://your-logging-endpoint.com/log', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  }).catch(err => console.error('Logging error:', err));
}

```

### MicroSim Specific Logging

For MicroSims, track detailed usage patterns:

```js
// For p5.js based MicroSims
function setupMicroSimLogging(simId) {
  // Log start time
  const startTime = new Date();
  logInteraction('microsim_start', {
    simId: simId,
    startTime: startTime.toISOString()
  });

  // Setup interval monitoring for active usage
  let lastInteractionTime = startTime;
  const interactionInterval = setInterval(() => {
    // If user hasn't interacted in 2 minutes, consider session ended
    const currentTime = new Date();
    if (currentTime - lastInteractionTime > 120000) {
      clearInterval(interactionInterval);
      logInteraction('microsim_end', {
        simId: simId,
        startTime: startTime.toISOString(),
        endTime: lastInteractionTime.toISOString(),
        duration: (lastInteractionTime - startTime) / 1000
      });
    }
  }, 10000);

  // Update last interaction time on user input
  document.getElementById(simId).addEventListener('mousemove', () => {
    lastInteractionTime = new Date();
  });
}
```

## Logging Search Terms and Questions

For built-in search functionality or AI chatbots integrated with your intelligent textbook:

```js
// Log search queries
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.querySelector('.md-search__input');
  if (searchInput) {
    searchInput.addEventListener('keyup', function(e) {
      if (e.key === 'Enter') {
        logInteraction('search_query', {
          query: this.value
        });
      }
    });
  }

  // For AI chatbot logging
  const chatForm = document.querySelector('.chatbot-form');
  if (chatForm) {
    chatForm.addEventListener('submit', function(e) {
      const userQuestion = document.querySelector('.chatbot-input').value;
      logInteraction('chatbot_question', {
        question: userQuestion
      });
    });
  }
});

```

## Logging User-Specific Activities

For personalized learning experiences, implementing user-specific logging provides 
valuable insights into individual learning patterns.

### Anonymous vs. Authenticated Logging

You can implement both options:

1.  **Anonymous Session Tracking** - Use browser storage to maintain 
consistency across a single user session:

```js
// Generate anonymous user ID if not present
let userId = localStorage.getItem('anonymous_user_id');
if (!userId) {
  userId = 'anon_' + Math.random().toString(36).substring(2, 15);
  localStorage.setItem('anonymous_user_id', userId);
}

// Include in all logging events
function enhancedLogInteraction(eventType, eventData) {
  const payload = {
    userId: userId,
    eventType: eventType,
    eventData: eventData,
    page: window.location.pathname,
    timestamp: new Date().toISOString()
  };

  // Logging code...
}

```

2.  **Authenticated User Tracking** - For classroom or institutional settings where users log in:

```js
// Assuming currentUser is set on login
function userLogInteraction(eventType, eventData) {
  if (!window.currentUser) return; // Don't log if not logged in

  const payload = {
    userId: window.currentUser.id,
    username: window.currentUser.username,
    eventType: eventType,
    eventData: eventData,
    page: window.location.pathname,
    timestamp: new Date().toISOString()
  };

  // Logging code...
}

```

### Progress Tracking

For comprehensive learning progress analysis:

```js
// Track completion of chapters/sections
function markAsCompleted(sectionId) {
  logInteraction('section_completed', {
    sectionId: sectionId,
    completionTime: new Date().toISOString()
  });

  // Update UI to show completion status
  document.querySelector(`#${sectionId} .completion-indicator`)
    .classList.add('completed');
}

// Track quiz performance
function logQuizResult(quizId, score, maxPossible) {
  logInteraction('quiz_completed', {
    quizId: quizId,
    score: score,
    maxPossible: maxPossible,
    percentage: (score / maxPossible) * 100
  });
}

```

## Regulatory Compliance

When implementing logging systems, especially for educational purposes, 
adherence to privacy regulations is critical.

### GDPR Compliance

For users in the European Union, the General Data Protection Regulation (GDPR) applies:

1.  **Explicit Consent** - Implement a consent banner:

```js
// Cookie consent implementation
function showConsentBanner() {
  const banner = document.createElement('div');
  banner.className = 'consent-banner';
  banner.innerHTML = `
    <p>This site uses cookies and logging to improve your learning experience.
    We track how you use our educational materials to make them better.</p>
    <button id="accept-consent">Accept</button>
    <button id="reject-consent">Reject</button>
  `;
  document.body.appendChild(banner);

  document.getElementById('accept-consent').addEventListener('click', () => {
    localStorage.setItem('consent_given', 'true');
    banner.remove();
    initializeLogging();
  });

  document.getElementById('reject-consent').addEventListener('click', () => {
    localStorage.setItem('consent_given', 'false');
    banner.remove();
  });
}

// Check if consent already given
if (localStorage.getItem('consent_given') === 'true') {
  initializeLogging();
} else if (localStorage.getItem('consent_given') === null) {
  showConsentBanner();
}
```

### Data Minimization** - Only collect what's necessary:

```js
// Example of data minimization in logging
function logMinimalData(eventType, eventData) {
  // Remove any personally identifiable information
  const sanitizedData = {...eventData};
  delete sanitizedData.email;
  delete sanitizedData.fullName;

  // Log only essential data
  logInteraction(eventType, sanitizedData);
}

```

### COPPA and FERPA Compliance

For educational materials that might be used by children or in educational institutions in the US:

1.  **Children's Online Privacy Protection Act (COPPA)** - For users under 13:

```js
// Age verification for COPPA compliance
function checkAgeCompliance() {
  const userAge = localStorage.getItem('user_age');

  if (!userAge) {
    const age = prompt("Please enter your age for compliance purposes:");
    localStorage.setItem('user_age', age);

    if (parseInt(age) < 13) {
      // Disable personal data collection for under 13
      window.loggingLevel = 'minimal';
    } else {
      window.loggingLevel = 'standard';
    }
  }
}

```

2.  **Family Educational Rights and Privacy Act (FERPA)** - For educational institutions:

```js
// Example of FERPA compliant logging
function educationalLogging(eventType, eventData) {
  // Use institution-assigned ID instead of personal identifiers
  const payload = {
    institutionId: window.institutionId,
    courseId: window.courseId,
    studentId: window.studentId, // Institution-assigned, not PII
    eventType: eventType,
    eventData: eventData
  };

  // Logging code...
}

```

## Building an Analytics Dashboard

Once you've collected detailed usage data, a dashboard helps visualize patterns and gain actionable insights.

### Dashboard Implementation

1.  **Data Processing Pipeline**:

```python
# Example data processing script for dashboard
import pandas as pd
import json

# Load the log data
logs = []
with open('interaction_logs.jsonl', 'r') as f:
    for line in f:
        logs.append(json.loads(line))

# Convert to pandas DataFrame
df = pd.DataFrame(logs)

# Process by event type
microsim_usage = df[df['eventType'] == 'microsim_end'].groupby('eventData.simId').agg({
    'eventData.duration': ['count', 'mean', 'median', 'min', 'max']
})

# Generate insights
underutilized_pages = df.groupby('page').size().sort_values().head(10)
popular_pages = df.groupby('page').size().sort_values(ascending=False).head(10)
popular_search_terms = df[df['eventType'] == 'search_query']['eventData.query'].value_counts().head(20)

# Export for dashboard
microsim_usage.to_csv('dashboard_data/microsim_usage.csv')
underutilized_pages.to_csv('dashboard_data/underutilized_pages.csv')
popular_pages.to_csv('dashboard_data/popular_pages.csv')
popular_search_terms.to_csv('dashboard_data/popular_search_terms.csv')

```

### Dashboard Visualization

```js
// Using a library like Chart.js for the dashboard
function loadDashboard() {
  // MicroSim usage chart
  fetch('dashboard_data/microsim_usage.json')
    .then(response => response.json())
    .then(data => {
      const ctx = document.getElementById('microsim-usage-chart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(data),
          datasets: [{
            label: 'Average Usage Time (seconds)',
            data: Object.values(data).map(item => item.mean),
            backgroundColor: 'rgba(54, 162, 235, 0.5)'
          }]
        }
      });
    });

  // Other dashboard charts...
}

```

### Real-time Monitoring

For real-time insights into active usage:

```js
// Server-side with Socket.io for real-time dashboard
const io = require('socket.io')(server);

// When logging an event
app.post('/log', (req, res) => {
  const data = req.body;

  // Save to database...

  // Emit for real-time dashboard
  io.emit('new_event', data);

  res.json({success: true});
});

// Client-side dashboard updates
const socket = io.connect('https://your-logging-server.com');
socket.on('new_event', (data) => {
  // Update dashboard in real-time
  updateDashboardMetrics(data);
});

```

### Intelligent Content Recommendations

Use your logging data to power a recommendation engine:

```js
# Simplified recommendation engine
def generate_recommendations(user_id):
    # Get user's recent activity
    user_logs = db.query(f"SELECT * FROM logs WHERE user_id = '{user_id}' ORDER BY timestamp DESC LIMIT 100")

    # Extract concepts and topics the user has engaged with
    user_concepts = extract_concepts_from_logs(user_logs)

    # Find related content that hasn't been viewed
    recommendations = db.query(f"""
        SELECT page_id, title FROM content
        WHERE primary_concept IN ({','.join(user_concepts)})
        AND page_id NOT IN (
            SELECT page FROM logs WHERE user_id = '{user_id}' AND eventType = 'page_view'
        )
        LIMIT 5
    """)

    return recommendations

```

## Identifying Underutilized Content

One key advantage of comprehensive logging is identifying which sections of your intelligent textbook aren't receiving adequate attention.

### Content Engagement Analysis

```ps
# Analyze content engagement
def analyze_content_engagement(logs_df, threshold=0.1):
    # Get all pages
    all_pages = get_all_pages_from_site_map()

    # Count views per page
    page_views = logs_df[logs_df['eventType'] == 'page_view'].groupby('page').size()

    # Calculate total views
    total_views = page_views.sum()

    # Find pages with less than threshold% of total views
    underutilized = []
    for page in all_pages:
        if page not in page_views or page_views[page] / total_views < threshold:
            underutilized.append({
                'page': page,
                'views': page_views.get(page, 0),
                'percentage': (page_views.get(page, 0) / total_views) * 100 if total_views > 0 else 0
            })

    return sorted(underutilized, key=lambda x: x['views'])

```

By implementing these detailed logging strategies, you'll gain valuable insights 
into how users interact with your intelligent textbooks. 
This data will guide your content development efforts, helping you create
more engaging and effective educational resources that truly meet your learners' needs.