import re

# Read the current index.html
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Skills Section Replacements
skills_replacements = [
    (r'<h3>Frontend Development</h3>[\s\S]*?<span class="skill-tag">Tailwind CSS</span>',
     '''<h3>Marketing & Analytics</h3>
                    <div class="skill-tags">
                        <span class="skill-tag">Meta Ads</span>
                        <span class="skill-tag">Google Ads</span>
                        <span class="skill-tag">Audience Segmentation</span>
                        <span class="skill-tag">Bid/Budget Optimization</span>
                        <span class="skill-tag">A/B Testing</span>
                        <span class="skill-tag">Marketing Automation</span>
                        <span class="skill-tag">Pricing Analysis</span>
                        <span class="skill-tag">Cohort Analysis</span>'''),
    
    (r'<h3>Backend Development</h3>[\s\S]*?<span class="skill-tag">GraphQL</span>',
     '''<h3>Technical Skills</h3>
                    <div class="skill-tags">
                        <span class="skill-tag">Power BI</span>
                        <span class="skill-tag">Retool</span>
                        <span class="skill-tag">React</span>
                        <span class="skill-tag">Python</span>
                        <span class="skill-tag">Pandas</span>
                        <span class="skill-tag">SQL/MySQL</span>
                        <span class="skill-tag">Firebase</span>
                        <span class="skill-tag">Git</span>'''),
    
    (r'<h3>Database & Cloud</h3>[\s\S]*?<span class="skill-tag">Docker</span>',
     '''<h3>Research & UX</h3>
                    <div class="skill-tags">
                        <span class="skill-tag">Usability Testing</span>
                        <span class="skill-tag">Interviews/Focus Groups</span>
                        <span class="skill-tag">Thematic Analysis</span>
                        <span class="skill-tag">Participatory Design</span>
                        <span class="skill-tag">Prototyping</span>
                        <span class="skill-tag">User Research</span>'''),
    
    (r'<h3>Machine Learning & AI</h3>[\s\S]*?<span class="skill-tag">NumPy</span>',
     '''<h3>AI & Machine Learning</h3>
                    <div class="skill-tags">
                        <span class="skill-tag">Machine Learning</span>
                        <span class="skill-tag">AI Solutions</span>
                        <span class="skill-tag">Data Analysis</span>
                        <span class="skill-tag">Predictive Analytics</span>
                        <span class="skill-tag">Python</span>
                        <span class="skill-tag">Research</span>'''),
    
    (r'<h3>Tools & Others</h3>[\s\S]*?<span class="skill-tag">Linux</span>',
     '''<h3>Business Analysis</h3>
                    <div class="skill-tags">
                        <span class="skill-tag">Product Analysis</span>
                        <span class="skill-tag">Performance Metrics</span>
                        <span class="skill-tag">ROAS Analysis</span>
                        <span class="skill-tag">Lead Generation</span>
                        <span class="skill-tag">Campaign Management</span>
                        <span class="skill-tag">Excel/Spreadsheets</span>'''),
    
    (r'<h3>Programming Languages</h3>[\s\S]*?<span class="skill-tag">SQL</span>',
     '''<h3>Soft Skills</h3>
                    <div class="skill-tags">
                        <span class="skill-tag">Communication</span>
                        <span class="skill-tag">Mentorship</span>
                        <span class="skill-tag">Cross-functional Collaboration</span>
                        <span class="skill-tag">Problem Solving</span>
                        <span class="skill-tag">Leadership</span>
                        <span class="skill-tag">Strategic Thinking</span>'''),
]

# Apply skills replacements
for pattern, replacement in skills_replacements:
    content = re.sub(pattern, replacement, content, flags=re.DOTALL)

# Experience Section Replacement
experience_old = r'<div class="timeline">.*?</div>\s*</div>\s*</section>\s*<!-- Education Section -->'
experience_new = '''<div class="timeline">
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <div class="timeline-date">May 2025 - Present</div>
                        <h3>Business Analyst</h3>
                        <h4>FutureEd Corporation Ltd</h4>
                        <p>Leading business analysis and digital marketing initiatives, driving product strategy and revenue growth through data-driven insights.</p>
                        <ul>
                            <li>Generated 21.4K leads (+133.9%) with 161.6% growth in paid conversions</li>
                            <li>Achieved 146M total content views (+146.7%) and 761.8K link clicks (+246.6%) through Meta and Google Ads</li>
                            <li>Conducted product performance analysis using Power BI, increasing visits to 721.3K (+25.8%) and reach to 848.3K</li>
                            <li>Managed 63+ campaigns optimized for CPL and engagement, ranking above 75th percentile</li>
                            <li>Built lead nurturing playbooks and conducted training for sales teams</li>
                        </ul>
                    </div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <div class="timeline-date">2023 - 2024</div>
                        <h3>Research Assistant</h3>
                        <h4>NSUHCI-DIAL, North South University</h4>
                        <p>Conducted qualitative research and developed user-centered applications for accessibility and assistive technology.</p>
                        <ul>
                            <li>Conducted in-depth interviews and focus group discussions with end-users for usability research</li>
                            <li>Employed thematic analysis to extract key design insights and inform iterative design process</li>
                            <li>Developed mobile app using React for communication support for children with autism</li>
                            <li>Designed web platform for mental health support featuring mood tracking and counseling advice</li>
                            <li>Built flash-flood detection device using ESP32 and Arduino with real-time Firebase integration</li>
                            <li>Published research papers in CSCW'24 (First Author) and Compass 2024 (Co-Author)</li>
                        </ul>
                    </div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <div class="timeline-date">Ongoing</div>
                        <h3>Co-Founder</h3>
                        <h4>Shohayota (Non-profit Organization)</h4>
                        <p>Co-founded a non-profit organization dedicated to bridging acts of kindness with individuals in need.</p>
                        <ul>
                            <li>Led student-driven initiative at North South University</li>
                            <li>Fostering a more inclusive and compassionate society</li>
                            <li>Coordinating community outreach programs</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Education Section -->'''

content = re.sub(experience_old, experience_new, content, flags=re.DOTALL)

# Education Section
content = re.sub(r'<h4>BRAC University</h4>', '<h4>North South University</h4>', content)
content = re.sub(r'<p class="education-date">2020 - 2024 \(Expected\)</p>', '<p class="education-date">2020 - 2025</p>', content)
content = re.sub(r'Major in Computer Science and Engineering with focus on Software Engineering, Machine Learning,\s*and Data Structures & Algorithms\.',
                'Major in AI & Machine Learning. Focused on developing expertise in artificial intelligence, machine learning algorithms, data analysis, and software engineering.', content)
content = re.sub(r'<p><strong>CGPA:</strong> 3.8/4.0</p>\s*<p><strong>Relevant Coursework:</strong> Data Structures, Algorithms, Database Systems, Machine\s*Learning, Web Technologies, Software Engineering</p>',
                '''<p><strong>Specialization:</strong> AI & Machine Learning</p>
                        <p><strong>Relevant Coursework:</strong> Machine Learning, Data Structures, Algorithms, Database Systems, Software Engineering, Artificial Intelligence, Data Mining</p>
                        <p><strong>Research:</strong> Published papers in CSCW'24 and Compass 2024</p>''', content, flags=re.DOTALL)

content = re.sub(r'<h4>Your College Name</h4>', '<h4>Notre Dame College, Dhaka</h4>', content)
content = re.sub(r'<p class="education-date">2018 - 2020</p>', '<p class="education-date">2019</p>', content)
content = re.sub(r'<p><strong>GPA:</strong> 5.0/5.0</p>\s*<p><strong>Major:</strong> Science</p>',
                '<p><strong>Major:</strong> Science</p>', content, flags=re.DOTALL)

# Write the updated content
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Portfolio updated successfully with CV-accurate information!")
print("✅ Skills section updated")
print("✅ Experience section updated")
print("✅ Education section updated")
