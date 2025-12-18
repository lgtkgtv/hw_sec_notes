// DataCenter vs CSP Relationship Analysis Interactive Demonstrations
// Hardware Security Course - Module 1: DataCenter Architecture

function showBusinessModelAnalysis() {
    const outputDiv = document.getElementById('relationship-analysis-output');
    outputDiv.style.display = 'block';
    outputDiv.scrollIntoView({ behavior: 'smooth' });

    outputDiv.innerHTML = `
        <div class="demo-output">
            <h3>📊 Business Model Deep Dive Analysis</h3>
            <div id="business-model-analysis"></div>
        </div>
    `;

    const analysisDiv = document.getElementById('business-model-analysis');

    analysisDiv.innerHTML = `
        <div class="business-analysis">
            <h4>💼 DataCenter vs CSP Business Model Comparison</h4>

            <div class="model-comparison-grid">
                <div class="datacenter-model">
                    <h5>🏢 DataCenter Provider Business Model</h5>
                    <div class="model-breakdown">
                        <div class="revenue-stream">
                            <h6>💰 Revenue Streams</h6>
                            <div class="revenue-chart">
                                <div class="revenue-item">
                                    <span class="stream-name">Colocation Services:</span>
                                    <span class="revenue-bar">
                                        <span class="bar-fill" style="width: 45%; background: #8b5cf6;">45%</span>
                                    </span>
                                    <span class="revenue-amount">$11.3B annually</span>
                                </div>
                                <div class="revenue-item">
                                    <span class="stream-name">Interconnection:</span>
                                    <span class="revenue-bar">
                                        <span class="bar-fill" style="width: 25%; background: #06b6d4;">25%</span>
                                    </span>
                                    <span class="revenue-amount">$6.3B annually</span>
                                </div>
                                <div class="revenue-item">
                                    <span class="stream-name">Managed Services:</span>
                                    <span class="revenue-bar">
                                        <span class="bar-fill" style="width: 20%; background: #10b981;">20%</span>
                                    </span>
                                    <span class="revenue-amount">$5.0B annually</span>
                                </div>
                                <div class="revenue-item">
                                    <span class="stream-name">Cloud Enablement:</span>
                                    <span class="revenue-bar">
                                        <span class="bar-fill" style="width: 10%; background: #f59e0b;">10%</span>
                                    </span>
                                    <span class="revenue-amount">$2.5B annually</span>
                                </div>
                            </div>
                        </div>

                        <div class="cost-structure">
                            <h6>💸 Cost Structure</h6>
                            <div class="cost-breakdown">
                                <div class="cost-item">
                                    <strong>Real Estate & Construction:</strong> 35-40%<br>
                                    <em>Land acquisition, building construction, permits</em>
                                </div>
                                <div class="cost-item">
                                    <strong>Power & Utilities:</strong> 25-30%<br>
                                    <em>Electricity, cooling, backup power systems</em>
                                </div>
                                <div class="cost-item">
                                    <strong>Network & Connectivity:</strong> 15-20%<br>
                                    <em>Fiber, carrier relationships, peering agreements</em>
                                </div>
                                <div class="cost-item">
                                    <strong>Operations & Security:</strong> 15-20%<br>
                                    <em>Staff, security systems, monitoring, maintenance</em>
                                </div>
                            </div>
                        </div>

                        <div class="kpi-metrics">
                            <h6>📈 Key Performance Indicators</h6>
                            <div class="kpi-grid">
                                <div class="kpi-card">
                                    <strong>Utilization Rate</strong><br>
                                    <span class="kpi-value">85-95%</span><br>
                                    <em>Occupancy of available space</em>
                                </div>
                                <div class="kpi-card">
                                    <strong>Power Usage Effectiveness</strong><br>
                                    <span class="kpi-value">1.15-1.25</span><br>
                                    <em>Energy efficiency ratio</em>
                                </div>
                                <div class="kpi-card">
                                    <strong>Customer Churn Rate</strong><br>
                                    <span class="kpi-value">< 5%</span><br>
                                    <em>Annual customer retention</em>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="csp-model">
                    <h5>☁️ Cloud Service Provider Business Model</h5>
                    <div class="model-breakdown">
                        <div class="revenue-stream">
                            <h6>💰 Revenue Streams</h6>
                            <div class="revenue-chart">
                                <div class="revenue-item">
                                    <span class="stream-name">Infrastructure (IaaS):</span>
                                    <span class="revenue-bar">
                                        <span class="bar-fill" style="width: 50%; background: #ef4444;">50%</span>
                                    </span>
                                    <span class="revenue-amount">$300B annually</span>
                                </div>
                                <div class="revenue-item">
                                    <span class="stream-name">Platform (PaaS):</span>
                                    <span class="revenue-bar">
                                        <span class="bar-fill" style="width: 25%; background: #f97316;">25%</span>
                                    </span>
                                    <span class="revenue-amount">$150B annually</span>
                                </div>
                                <div class="revenue-item">
                                    <span class="stream-name">Software (SaaS):</span>
                                    <span class="revenue-bar">
                                        <span class="bar-fill" style="width: 20%; background: #eab308;">20%</span>
                                    </span>
                                    <span class="revenue-amount">$120B annually</span>
                                </div>
                                <div class="revenue-item">
                                    <span class="stream-name">Professional Services:</span>
                                    <span class="revenue-bar">
                                        <span class="bar-fill" style="width: 5%; background: #84cc16;">5%</span>
                                    </span>
                                    <span class="revenue-amount">$30B annually</span>
                                </div>
                            </div>
                        </div>

                        <div class="cost-structure">
                            <h6>💸 Cost Structure</h6>
                            <div class="cost-breakdown">
                                <div class="cost-item">
                                    <strong>Infrastructure & DataCenters:</strong> 40-45%<br>
                                    <em>Servers, storage, networking, datacenter leases</em>
                                </div>
                                <div class="cost-item">
                                    <strong>Software Development:</strong> 25-30%<br>
                                    <em>R&D, platform development, service innovation</em>
                                </div>
                                <div class="cost-item">
                                    <strong>Sales & Marketing:</strong> 15-20%<br>
                                    <em>Customer acquisition, partner programs</em>
                                </div>
                                <div class="cost-item">
                                    <strong>Operations & Support:</strong> 10-15%<br>
                                    <em>Customer support, SRE, security operations</em>
                                </div>
                            </div>
                        </div>

                        <div class="kpi-metrics">
                            <h6>📈 Key Performance Indicators</h6>
                            <div class="kpi-grid">
                                <div class="kpi-card">
                                    <strong>Service Uptime</strong><br>
                                    <span class="kpi-value">99.9-99.99%</span><br>
                                    <em>Service availability SLA</em>
                                </div>
                                <div class="kpi-card">
                                    <strong>Customer Growth Rate</strong><br>
                                    <span class="kpi-value">20-40%</span><br>
                                    <em>Annual customer base growth</em>
                                </div>
                                <div class="kpi-card">
                                    <strong>Revenue Per Customer</strong><br>
                                    <span class="kpi-value">$10K-1M</span><br>
                                    <em>Annual customer value</em>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="competitive-dynamics">
                <h4>⚔️ Competitive Dynamics & Market Forces</h4>
                <div class="dynamics-analysis">
                    <div class="market-force">
                        <h5>🎯 DataCenter Provider Advantages</h5>
                        <ul>
                            <li><strong>Geographic Monopolies:</strong> Limited prime real estate in key markets</li>
                            <li><strong>High Switching Costs:</strong> Physical infrastructure migration is expensive</li>
                            <li><strong>Long-term Contracts:</strong> 7-15 year customer commitments</li>
                            <li><strong>Network Effects:</strong> Interconnection value increases with more tenants</li>
                            <li><strong>Regulatory Barriers:</strong> Zoning, permits, environmental approvals</li>
                        </ul>
                    </div>

                    <div class="market-force">
                        <h5>⚡ CSP Competitive Advantages</h5>
                        <ul>
                            <li><strong>Software Innovation:</strong> Rapid feature development and deployment</li>
                            <li><strong>Platform Lock-in:</strong> API compatibility and service integration</li>
                            <li><strong>Economic Scale:</strong> Global scale drives cost advantages</li>
                            <li><strong>Data Network Effects:</strong> More data improves AI/ML services</li>
                            <li><strong>Ecosystem Development:</strong> Partner and developer communities</li>
                        </ul>
                    </div>

                    <div class="market-force">
                        <h5>🔄 Symbiotic Relationship Benefits</h5>
                        <ul>
                            <li><strong>Risk Sharing:</strong> DCs handle infrastructure risk, CSPs handle technology risk</li>
                            <li><strong>Capital Efficiency:</strong> Shared infrastructure reduces total industry capex</li>
                            <li><strong>Innovation Speed:</strong> CSPs can focus on software, not facilities</li>
                            <li><strong>Market Expansion:</strong> DCs enable CSPs to enter new geographies quickly</li>
                            <li><strong>Specialization:</strong> Each party focuses on core competencies</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function visualizeCSPStrategy() {
    const outputDiv = document.getElementById('relationship-analysis-output');
    outputDiv.style.display = 'block';
    outputDiv.scrollIntoView({ behavior: 'smooth' });

    outputDiv.innerHTML = `
        <div class="demo-output">
            <h3>🗺️ CSP Geographic Strategy Visualization</h3>
            <div id="csp-strategy-analysis"></div>
        </div>
    `;

    const strategyDiv = document.getElementById('csp-strategy-analysis');

    strategyDiv.innerHTML = `
        <div class="strategy-analysis">
            <h4>🌐 Multi-DataCenter Strategy Implementation</h4>

            <div class="strategy-comparison">
                <div class="csp-strategy aws-strategy">
                    <h5>🟠 AWS Global Strategy</h5>
                    <div class="strategy-metrics">
                        <div class="metric-row">
                            <strong>Regions:</strong> 31 launched + 4 planned<br>
                            <strong>Availability Zones:</strong> 99 AZs across regions<br>
                            <strong>Edge Locations:</strong> 400+ CloudFront locations<br>
                            <strong>DataCenter Strategy:</strong> Mix of owned + leased
                        </div>

                        <div class="datacenter-breakdown">
                            <h6>🏗️ AWS DataCenter Approach</h6>
                            <div class="approach-grid">
                                <div class="approach-item owned">
                                    <strong>Owned Facilities (60%)</strong><br>
                                    • Hyperscale datacenters<br>
                                    • Custom Nitro hardware<br>
                                    • Optimized for AWS services<br>
                                    • Long-term cost control
                                </div>
                                <div class="approach-item leased">
                                    <strong>Leased/Colocation (40%)</strong><br>
                                    • Rapid market entry<br>
                                    • Premium locations<br>
                                    • Regulatory compliance<br>
                                    • Risk mitigation
                                </div>
                            </div>
                        </div>

                        <div class="geographic-priorities">
                            <h6>📍 Geographic Expansion Priorities</h6>
                            <div class="priority-timeline">
                                <div class="timeline-phase">
                                    <strong>Phase 1 (2006-2012):</strong> US dominance<br>
                                    <em>Focus: us-east-1, us-west-2 massive scale</em>
                                </div>
                                <div class="timeline-phase">
                                    <strong>Phase 2 (2013-2018):</strong> Global expansion<br>
                                    <em>Focus: Europe, Asia-Pacific key markets</em>
                                </div>
                                <div class="timeline-phase">
                                    <strong>Phase 3 (2019-2024):</strong> Edge & compliance<br>
                                    <em>Focus: Data residency, edge computing</em>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="csp-strategy azure-strategy">
                    <h5>🔵 Microsoft Azure Strategy</h5>
                    <div class="strategy-metrics">
                        <div class="metric-row">
                            <strong>Regions:</strong> 60+ regions globally<br>
                            <strong>Availability Zones:</strong> 3+ zones per region<br>
                            <strong>Edge Locations:</strong> 140+ edge sites<br>
                            <strong>DataCenter Strategy:</strong> Enterprise + wholesale focus
                        </div>

                        <div class="datacenter-breakdown">
                            <h6>🏗️ Azure DataCenter Approach</h6>
                            <div class="approach-grid">
                                <div class="approach-item enterprise">
                                    <strong>Enterprise Focus (70%)</strong><br>
                                    • Compliance-first design<br>
                                    • Hybrid cloud integration<br>
                                    • Government certifications<br>
                                    • Industry-specific solutions
                                </div>
                                <div class="approach-item wholesale">
                                    <strong>Wholesale Partnerships (30%)</strong><br>
                                    • Large-scale dedicated facilities<br>
                                    • Custom build-to-suit<br>
                                    • Strategic DC partnerships<br>
                                    • Cost-optimized deployment
                                </div>
                            </div>
                        </div>

                        <div class="competitive-advantages">
                            <h6>🎯 Azure Competitive Positioning</h6>
                            <div class="advantage-list">
                                <div class="advantage-item">
                                    <strong>Hybrid Integration:</strong> Seamless on-premises to cloud<br>
                                    <em>Azure Stack, Azure Arc, Windows Server integration</em>
                                </div>
                                <div class="advantage-item">
                                    <strong>Enterprise Compliance:</strong> Industry-leading certifications<br>
                                    <em>FedRAMP, HIPAA, SOX, GDPR compliance</em>
                                </div>
                                <div class="advantage-item">
                                    <strong>Microsoft Ecosystem:</strong> Office 365 and productivity integration<br>
                                    <em>1.3B Office users drive Azure adoption</em>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="csp-strategy gcp-strategy">
                    <h5>🌐 Google Cloud Strategy</h5>
                    <div class="strategy-metrics">
                        <div class="metric-row">
                            <strong>Regions:</strong> 35+ regions globally<br>
                            <strong>Zones:</strong> 100+ zones worldwide<br>
                            <strong>Network:</strong> Private global fiber network<br>
                            <strong>DataCenter Strategy:</strong> Custom-built + sustainability focus
                        </div>

                        <div class="datacenter-breakdown">
                            <h6>🏗️ GCP DataCenter Innovation</h6>
                            <div class="approach-grid">
                                <div class="approach-item custom">
                                    <strong>Custom Hardware (80%)</strong><br>
                                    • TPU for AI/ML workloads<br>
                                    • Custom server designs<br>
                                    • Liquid cooling systems<br>
                                    • Carbon-neutral operations
                                </div>
                                <div class="approach-item sustainability">
                                    <strong>Sustainability Leadership (20%)</strong><br>
                                    • 100% renewable energy<br>
                                    • Advanced cooling technology<br>
                                    • Waste reduction programs<br>
                                    • Green building certifications
                                </div>
                            </div>
                        </div>

                        <div class="technology-advantages">
                            <h6>🚀 Technology Differentiation</h6>
                            <div class="tech-advantage">
                                <strong>AI/ML Infrastructure:</strong><br>
                                • Custom TPU processors for machine learning<br>
                                • TensorFlow optimization throughout stack<br>
                                • AutoML and AI Platform services<br>
                                • Quantum computing research integration
                            </div>
                            <div class="tech-advantage">
                                <strong>Network Performance:</strong><br>
                                • Private global fiber network<br>
                                • Premium tier routing optimization<br>
                                • Edge computing with CDN integration<br>
                                • Low-latency global connectivity
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="expansion-analysis">
                <h4>📈 Market Expansion Patterns</h4>
                <div class="expansion-timeline">
                    <div class="expansion-phase">
                        <h5>🎯 Market Entry Strategy Comparison</h5>
                        <div class="entry-comparison">
                            <div class="entry-method">
                                <strong>AWS Approach:</strong> Own + scale rapidly<br>
                                <em>Build large regional presence, then expand globally</em>
                            </div>
                            <div class="entry-method">
                                <strong>Azure Approach:</strong> Enterprise + compliance first<br>
                                <em>Target enterprise customers, emphasize governance</em>
                            </div>
                            <div class="entry-method">
                                <strong>GCP Approach:</strong> Technology + sustainability differentiation<br>
                                <em>Lead with AI/ML capabilities and green operations</em>
                            </div>
                        </div>
                    </div>

                    <div class="market-dynamics">
                        <h5>🔄 Competitive Response Patterns</h5>
                        <div class="response-pattern">
                            <div class="response-scenario">
                                <strong>Scenario:</strong> New geographic market entry<br>
                                <strong>AWS Response:</strong> Rapid scaling, price competition<br>
                                <strong>Azure Response:</strong> Enterprise partnerships, compliance focus<br>
                                <strong>GCP Response:</strong> Technology differentiation, sustainability messaging
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function analyzeDataCenterStrategy() {
    const outputDiv = document.getElementById('relationship-analysis-output');
    outputDiv.style.display = 'block';
    outputDiv.scrollIntoView({ behavior: 'smooth' });

    outputDiv.innerHTML = `
        <div class="demo-output">
            <h3>🏢 DataCenter Multi-CSP Strategy Analysis</h3>
            <div id="datacenter-strategy-analysis"></div>
        </div>
    `;

    const dcStrategyDiv = document.getElementById('datacenter-strategy-analysis');

    dcStrategyDiv.innerHTML = `
        <div class="datacenter-analysis">
            <h4>🎯 DataCenter Provider Strategic Positioning</h4>

            <div class="provider-strategies">
                <div class="provider-analysis equinix-analysis">
                    <h5>🌐 Equinix: Global Interconnection Leader</h5>
                    <div class="strategy-framework">
                        <div class="strategic-pillar">
                            <h6>📍 Geographic Coverage</h6>
                            <ul>
                                <li><strong>Global Reach:</strong> 240+ datacenters across 70 markets</li>
                                <li><strong>Strategic Locations:</strong> Financial hubs, cloud regions, content centers</li>
                                <li><strong>Market Penetration:</strong> #1 or #2 position in 90% of markets</li>
                                <li><strong>Expansion Strategy:</strong> Acquire local leaders, build premium facilities</li>
                            </ul>
                        </div>

                        <div class="customer-diversification">
                            <h6>👥 Customer Portfolio Strategy</h6>
                            <div class="customer-mix">
                                <div class="customer-segment">
                                    <strong>Cloud Service Providers (35%)</strong><br>
                                    • AWS, Microsoft, Google, Oracle<br>
                                    • Long-term wholesale agreements<br>
                                    • High-density, high-power deployments
                                </div>
                                <div class="customer-segment">
                                    <strong>Enterprise (30%)</strong><br>
                                    • Fortune 500 IT infrastructure<br>
                                    • Hybrid cloud deployments<br>
                                    • Compliance and connectivity focus
                                </div>
                                <div class="customer-segment">
                                    <strong>Network Providers (20%)</strong><br>
                                    • Telecom carriers and ISPs<br>
                                    • Content delivery networks<br>
                                    • Internet exchange points
                                </div>
                                <div class="customer-segment">
                                    <strong>Digital Services (15%)</strong><br>
                                    • SaaS providers, gaming companies<br>
                                    • Media and content companies<br>
                                    • Financial services firms
                                </div>
                            </div>
                        </div>

                        <div class="revenue-optimization">
                            <h6>💰 Revenue Diversification Model</h6>
                            <div class="revenue-streams">
                                <div class="stream-analysis">
                                    <strong>Colocation Revenue (45% - $3.2B)</strong><br>
                                    • Recurring monthly revenue from space, power, cooling<br>
                                    • 7-15 year customer contracts provide stability<br>
                                    • Premium pricing in key financial centers
                                </div>
                                <div class="stream-analysis">
                                    <strong>Interconnection Services (25% - $1.8B)</strong><br>
                                    • Cross-connects between customers<br>
                                    • Internet exchange participation<br>
                                    • Private peering facilitation
                                </div>
                                <div class="stream-analysis">
                                    <strong>Managed Services (20% - $1.4B)</strong><br>
                                    • Remote hands support<br>
                                    • Managed network services<br>
                                    • Cloud connectivity solutions
                                </div>
                                <div class="stream-analysis">
                                    <strong>Edge Services (10% - $0.7B)</strong><br>
                                    • Edge computing infrastructure<br>
                                    • 5G network support<br>
                                    • IoT connectivity hubs
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="provider-analysis digitalrealty-analysis">
                    <h5>🏗️ Digital Realty: Hyperscale Specialist</h5>
                    <div class="strategy-framework">
                        <div name="hyperscale-focus">
                            <h6>⚡ Hyperscale Customer Strategy</h6>
                            <div class="hyperscale-advantages">
                                <div class="advantage-item">
                                    <strong>Large-Scale Deployments:</strong><br>
                                    • 50MW+ single-customer facilities<br>
                                    • Custom build-to-suit capabilities<br>
                                    • Wholesale pricing models<br>
                                    • Rapid deployment timelines
                                </div>
                                <div class="advantage-item">
                                    <strong>Strategic Locations:</strong><br>
                                    • Proximity to renewable energy sources<br>
                                    • High-capacity power grid access<br>
                                    • Fiber connectivity convergence points<br>
                                    • Available land for expansion
                                </div>
                            </div>
                        </div>

                        <div class="technology-innovation">
                            <h6>🚀 Technology & Sustainability Innovation</h6>
                            <ul>
                                <li><strong>Advanced Cooling:</strong> Liquid cooling, free air cooling systems</li>
                                <li><strong>Power Efficiency:</strong> Target PUE below 1.15 for new facilities</li>
                                <li><strong>Renewable Energy:</strong> 100% renewable energy commitment by 2030</li>
                                <li><strong>Automation:</strong> AI-driven facility management and optimization</li>
                            </ul>
                        </div>

                        <div class="market-positioning">
                            <h6>📊 Competitive Positioning</h6>
                            <div class="positioning-metrics">
                                <div class="metric-item">
                                    <strong>Market Share:</strong> #2 globally in hyperscale datacenter space<br>
                                    <strong>Revenue Growth:</strong> 8-12% annually driven by cloud demand<br>
                                    <strong>Customer Concentration:</strong> Top 10 customers = 60% of revenue
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="multi-csp-benefits">
                <h4>🔄 Multi-CSP Strategy Benefits Analysis</h4>
                <div class="benefits-framework">
                    <div class="benefit-category">
                        <h5>💰 Financial Benefits</h5>
                        <div class="financial-metrics">
                            <div class="metric-comparison">
                                <div class="single-tenant">
                                    <strong>Single-CSP Facility</strong><br>
                                    • Utilization: 70-80%<br>
                                    • Revenue Risk: High concentration<br>
                                    • Contract Terms: 10-15 years<br>
                                    • Pricing Power: Limited
                                </div>
                                <div class="multi-tenant">
                                    <strong>Multi-CSP Facility</strong><br>
                                    • Utilization: 85-95%<br>
                                    • Revenue Risk: Diversified<br>
                                    • Contract Mix: 3-15 years<br>
                                    • Pricing Power: Premium for connectivity
                                </div>
                            </div>

                            <div class="roi-analysis">
                                <h6>📈 Return on Investment Comparison</h6>
                                <div class="roi-metrics">
                                    <div class="roi-item">
                                        <strong>Single-CSP ROI:</strong> 12-15% IRR<br>
                                        <em>Lower risk, predictable returns</em>
                                    </div>
                                    <div class="roi-item">
                                        <strong>Multi-CSP ROI:</strong> 18-22% IRR<br>
                                        <em>Higher complexity, better returns</em>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="benefit-category">
                        <h5>🛡️ Risk Management Benefits</h5>
                        <div class="risk-mitigation">
                            <div class="risk-factor">
                                <strong>Customer Concentration Risk:</strong><br>
                                • Single CSP: 100% revenue dependency<br>
                                • Multi-CSP: Diversified revenue streams<br>
                                • Mitigation: No single customer >25% revenue
                            </div>
                            <div class="risk-factor">
                                <strong>Technology Obsolescence Risk:</strong><br>
                                • Single CSP: Specialized for one platform<br>
                                • Multi-CSP: Technology-agnostic infrastructure<br>
                                • Mitigation: Flexible power and cooling systems
                            </div>
                            <div class="risk-factor">
                                <strong>Market Volatility Risk:</strong><br>
                                • Single CSP: Dependent on one company's growth<br>
                                • Multi-CSP: Benefits from overall cloud growth<br>
                                • Mitigation: Exposure to different market segments
                            </div>
                        </div>
                    </div>

                    <div class="benefit-category">
                        <h5>🌐 Strategic Benefits</h5>
                        <div class="strategic-advantages">
                            <div class="advantage">
                                <strong>Network Effects:</strong><br>
                                • More CSPs attract more enterprises<br>
                                • Interconnection opportunities increase<br>
                                • Ecosystem development accelerates
                            </div>
                            <div class="advantage">
                                <strong>Innovation Acceleration:</strong><br>
                                • CSPs drive infrastructure improvements<br>
                                • Competitive pressure drives efficiency<br>
                                • New service development opportunities
                            </div>
                            <div class="advantage">
                                <strong>Market Intelligence:</strong><br>
                                • Insights into cloud market trends<br>
                                • Understanding of CSP growth patterns<br>
                                • Early visibility into new technologies
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="future-trends">
                <h4>🔮 Future Evolution of DataCenter-CSP Relationships</h4>
                <div class="trend-analysis">
                    <div class="trend-category">
                        <h5>⚡ Emerging Trends</h5>
                        <div class="trend-list">
                            <div class="trend-item">
                                <strong>Edge Computing Proliferation:</strong><br>
                                • 1000+ micro-datacenters per CSP by 2027<br>
                                • 5G network integration requirements<br>
                                • IoT device processing demand
                            </div>
                            <div class="trend-item">
                                <strong>Sustainability Requirements:</strong><br>
                                • Carbon neutral commitments from all major CSPs<br>
                                • Renewable energy procurement partnerships<br>
                                • Advanced cooling and efficiency technologies
                            </div>
                            <div class="trend-item">
                                <strong>AI/ML Infrastructure Demands:</strong><br>
                                • Specialized GPU and TPU clusters<br>
                                • High-performance networking requirements<br>
                                • Liquid cooling for dense compute
                            </div>
                        </div>
                    </div>

                    <div class="future-predictions">
                        <h5>📊 2030 Market Predictions</h5>
                        <div class="prediction-grid">
                            <div class="prediction">
                                <strong>Market Size:</strong><br>
                                DataCenter: $400B<br>
                                Cloud Services: $1.2T<br>
                                <em>Continued symbiotic growth</em>
                            </div>
                            <div class="prediction">
                                <strong>Relationship Model:</strong><br>
                                • 60% hybrid owned/leased<br>
                                • 30% pure partnership<br>
                                • 10% acquisition/vertical integration
                            </div>
                            <div class="prediction">
                                <strong>Technology Focus:</strong><br>
                                • Edge computing infrastructure<br>
                                • Quantum computing readiness<br>
                                • Autonomous datacenter operations
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function showPartnershipEconomics() {
    const outputDiv = document.getElementById('relationship-analysis-output');
    outputDiv.style.display = 'block';
    outputDiv.scrollIntoView({ behavior: 'smooth' });

    outputDiv.innerHTML = `
        <div class="demo-output">
            <h3>💰 Partnership Economics Deep Analysis</h3>
            <div id="partnership-economics-analysis"></div>
        </div>
    `;

    const economicsDiv = document.getElementById('partnership-economics-analysis');

    economicsDiv.innerHTML = `
        <div class="economics-analysis">
            <h4>📊 Economic Model Analysis: DataCenter-CSP Partnerships</h4>

            <div class="economic-frameworks">
                <div class="framework-analysis">
                    <h5>💼 Partnership Economic Models</h5>

                    <div class="model-comparison-detailed">
                        <div class="economic-model colocation-model">
                            <h6>🏗️ Colocation Model Economics</h6>
                            <div class="model-metrics">
                                <div class="cost-structure">
                                    <strong>CSP Investment:</strong><br>
                                    • Initial: $10-50M (equipment only)<br>
                                    • Operating: $2-5M annually (power, space)<br>
                                    • Scaling: Pay-as-you-grow model
                                </div>
                                <div class="revenue-sharing">
                                    <strong>DataCenter Revenue:</strong><br>
                                    • Space: $200-400/sq ft annually<br>
                                    • Power: $0.08-0.15/kWh markup<br>
                                    • Services: $50-200/hr remote hands
                                </div>
                                <div class="roi-metrics">
                                    <strong>Financial Returns:</strong><br>
                                    • CSP ROI: 25-40% (rapid deployment)<br>
                                    • DC ROI: 15-20% (steady returns)<br>
                                    • Payback: 3-5 years for both parties
                                </div>
                            </div>

                            <div class="success-metrics">
                                <h6>📈 Success Case Study: AWS + Equinix</h6>
                                <div class="case-study">
                                    <div class="case-metrics">
                                        <strong>Partnership Scale:</strong><br>
                                        • 50+ Equinix facilities globally<br>
                                        • $500M+ annual spend by AWS<br>
                                        • 7-year average contract terms<br>
                                        • 95% contract renewal rate
                                    </div>
                                    <div class="mutual-benefits">
                                        <strong>Mutual Value Creation:</strong><br>
                                        • AWS: 40% faster time-to-market<br>
                                        • Equinix: 25% revenue from AWS globally<br>
                                        • Combined: $2B+ economic value created
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="economic-model wholesale-model">
                            <h6>🤝 Wholesale Model Economics</h6>
                            <div class="model-metrics">
                                <div class="cost-structure">
                                    <strong>CSP Investment:</strong><br>
                                    • Initial: $100-300M (entire facility)<br>
                                    • Operating: $50-100M annually<br>
                                    • Scaling: Block capacity additions
                                </div>
                                <div class="revenue-sharing">
                                    <strong>DataCenter Revenue:</strong><br>
                                    • Fixed lease: $10-30M annually<br>
                                    • Power: Cost-plus model<br>
                                    • Management: 5-10% of opex
                                </div>
                                <div class="roi-metrics">
                                    <strong>Financial Returns:</strong><br>
                                    • CSP ROI: 20-30% (control + scale)<br>
                                    • DC ROI: 12-18% (stable, predictable)<br>
                                    • Payback: 5-8 years for both parties
                                </div>
                            </div>

                            <div class="success-metrics">
                                <h6>📈 Success Case Study: Microsoft + Digital Realty</h6>
                                <div class="case-study">
                                    <div class="case-metrics">
                                        <strong>Partnership Scale:</strong><br>
                                        • 20+ dedicated facilities<br>
                                        • $2B+ in facility investments<br>
                                        • 10-15 year contract terms<br>
                                        • 15 countries with presence
                                    </div>
                                    <div class="mutual-benefits">
                                        <strong>Strategic Advantages:</strong><br>
                                        • Microsoft: 50% cost reduction vs owned<br>
                                        • Digital Realty: 40% of revenue from hyperscale<br>
                                        • Combined: Global expansion acceleration
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="economic-model build-to-suit-model">
                            <h6>🏢 Build-to-Suit Model Economics</h6>
                            <div class="model-metrics">
                                <div class="cost-structure">
                                    <strong>CSP Investment:</strong><br>
                                    • Initial: $300M-1B+ (custom facility)<br>
                                    • Operating: $100-300M annually<br>
                                    • Scaling: Purpose-built expansion
                                </div>
                                <div class="revenue-sharing">
                                    <strong>DataCenter Revenue:</strong><br>
                                    • Development fee: 10-15% of capex<br>
                                    • Long-term lease: $50-150M annually<br>
                                    • Operations: Full-service management
                                </div>
                                <div class="roi-metrics">
                                    <strong>Financial Returns:</strong><br>
                                    • CSP ROI: 18-25% (optimized design)<br>
                                    • DC ROI: 14-20% (long-term stability)<br>
                                    • Payback: 7-12 years for both parties
                                </div>
                            </div>

                            <div class="success-metrics">
                                <h6>📈 Success Case Study: Google + Various Partners</h6>
                                <div class="case-study">
                                    <div class="case-metrics">
                                        <strong>Partnership Scale:</strong><br>
                                        • $10B+ in custom facilities<br>
                                        • 15+ strategic partnerships<br>
                                        • 15-25 year lease commitments<br>
                                        • Carbon neutral operations
                                    </div>
                                    <div class="mutual-benefits">
                                        <strong>Innovation Benefits:</strong><br>
                                        • Google: Custom AI/ML infrastructure<br>
                                        • Partners: Technology advancement<br>
                                        • Industry: Sustainability leadership
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="market-dynamics-economics">
                    <h5>⚖️ Market Forces & Economic Drivers</h5>

                    <div class="economic-forces">
                        <div class="supply-demand">
                            <h6>📊 Supply & Demand Dynamics</h6>
                            <div class="dynamics-analysis">
                                <div class="supply-factors">
                                    <strong>Supply Constraints:</strong><br>
                                    • Prime real estate scarcity<br>
                                    • Power grid capacity limitations<br>
                                    • Zoning and regulatory approval delays<br>
                                    • Skilled workforce availability<br>
                                    • Environmental compliance requirements
                                </div>
                                <div class="demand-drivers">
                                    <strong>Demand Accelerators:</strong><br>
                                    • Digital transformation initiatives<br>
                                    • AI/ML workload growth (300% annually)<br>
                                    • Edge computing expansion<br>
                                    • Regulatory data localization<br>
                                    • 5G network infrastructure needs
                                </div>
                            </div>

                            <div class="price-trends">
                                <h6>💰 Pricing Trend Analysis</h6>
                                <div class="pricing-data">
                                    <div class="price-trend">
                                        <strong>Colocation Pricing (per sq ft/year):</strong><br>
                                        2020: $180 → 2024: $240 (33% increase)<br>
                                        <em>Driven by power density and connectivity demands</em>
                                    </div>
                                    <div class="price-trend">
                                        <strong>Wholesale Pricing (per MW/year):</strong><br>
                                        2020: $8M → 2024: $12M (50% increase)<br>
                                        <em>Driven by hyperscale competition and scarcity</em>
                                    </div>
                                    <div class="price-trend">
                                        <strong>Power Costs (per kWh):</strong><br>
                                        2020: $0.08 → 2024: $0.12 (50% increase)<br>
                                        <em>Driven by grid modernization and renewable transition</em>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="competitive-economics">
                            <h6>⚔️ Competitive Economic Pressures</h6>
                            <div class="competitive-analysis">
                                <div class="csp-pressures">
                                    <strong>CSP Cost Pressures:</strong><br>
                                    • Customer demand for lower cloud pricing<br>
                                    • Infrastructure scaling requirements<br>
                                    • Competitive pricing wars<br>
                                    • R&D investment needs<br>
                                    • Regulatory compliance costs
                                </div>
                                <div class="dc-pressures">
                                    <strong>DataCenter Cost Pressures:</strong><br>
                                    • Rising construction and land costs<br>
                                    • Energy price volatility<br>
                                    • Technology refresh requirements<br>
                                    • Sustainability investment needs<br>
                                    • Skilled workforce competition
                                </div>
                            </div>

                            <div class="value-optimization">
                                <h6>🎯 Joint Value Optimization Strategies</h6>
                                <div class="optimization-approaches">
                                    <div class="efficiency-gains">
                                        <strong>Operational Efficiency:</strong><br>
                                        • Shared best practices and innovation<br>
                                        • Joint procurement and vendor management<br>
                                        • Standardized designs and processes<br>
                                        • Automated operations and monitoring
                                    </div>
                                    <div class="risk-sharing">
                                        <strong>Risk Sharing Models:</strong><br>
                                        • Revenue sharing based on utilization<br>
                                        • Joint investment in new technologies<br>
                                        • Shared sustainability commitments<br>
                                        • Collaborative market expansion
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="future-economics">
                    <h5>🔮 Future Economic Evolution</h5>
                    <div class="future-economic-trends">
                        <div class="trend-prediction">
                            <h6>📈 2025-2030 Economic Projections</h6>
                            <div class="projection-data">
                                <div class="market-growth">
                                    <strong>Market Size Evolution:</strong><br>
                                    • Global DC market: $250B → $400B (60% growth)<br>
                                    • CSP market: $600B → $1.2T (100% growth)<br>
                                    • Partnership value: $200B → $350B (75% growth)
                                </div>
                                <div class="model-evolution">
                                    <strong>Partnership Model Evolution:</strong><br>
                                    • Colocation: 40% → 35% (maturity)<br>
                                    • Wholesale: 35% → 30% (efficiency)<br>
                                    • Build-to-suit: 25% → 35% (specialization)
                                </div>
                            </div>
                        </div>

                        <div class="disruptive-factors">
                            <h6>⚡ Potential Economic Disruptors</h6>
                            <div class="disruptor-analysis">
                                <div class="technology-disruption">
                                    <strong>Technology Disruptions:</strong><br>
                                    • Quantum computing infrastructure needs<br>
                                    • Advanced AI chip requirements<br>
                                    • Liquid cooling mass adoption<br>
                                    • Edge computing proliferation
                                </div>
                                <div class="regulatory-disruption">
                                    <strong>Regulatory Changes:</strong><br>
                                    • Carbon pricing and environmental regulations<br>
                                    • Data sovereignty and localization requirements<br>
                                    • Antitrust scrutiny of large partnerships<br>
                                    • Grid modernization and energy policy
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// CSS styling for relationship analysis demonstrations
const style = document.createElement('style');
style.textContent = `
    .demo-output {
        background: linear-gradient(135deg, #1e293b, #334155);
        border: 1px solid #475569;
        border-radius: 10px;
        padding: 20px;
        margin: 20px 0;
        color: #e2e8f0;
    }

    .model-comparison-grid, .strategy-comparison, .provider-strategies {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 20px;
        margin: 20px 0;
    }

    .datacenter-model, .csp-model, .csp-strategy, .provider-analysis {
        background: #2d3748;
        border: 1px solid #4a5568;
        border-radius: 8px;
        padding: 20px;
    }

    .aws-strategy { border-left: 4px solid #ff9900; }
    .azure-strategy { border-left: 4px solid #0078d4; }
    .gcp-strategy { border-left: 4px solid #4285f4; }
    .equinix-analysis { border-left: 4px solid #8b5cf6; }
    .digitalrealty-analysis { border-left: 4px solid #06b6d4; }

    .revenue-chart, .revenue-streams {
        margin: 15px 0;
    }

    .revenue-item, .stream-analysis {
        display: flex;
        align-items: center;
        margin: 10px 0;
        flex-wrap: wrap;
    }

    .stream-name {
        min-width: 150px;
        font-weight: bold;
    }

    .revenue-bar {
        flex: 1;
        height: 25px;
        background: #374151;
        border-radius: 12px;
        margin: 0 10px;
        position: relative;
        overflow: hidden;
        min-width: 150px;
    }

    .bar-fill {
        display: block;
        height: 100%;
        border-radius: 12px;
        text-align: center;
        line-height: 25px;
        font-size: 12px;
        font-weight: bold;
        color: #000;
    }

    .revenue-amount {
        min-width: 120px;
        font-size: 14px;
        color: #94a3b8;
    }

    .kpi-grid, .approach-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
        margin: 15px 0;
    }

    .kpi-card, .approach-item {
        background: #374151;
        border: 1px solid #6b7280;
        border-radius: 6px;
        padding: 12px;
        text-align: center;
    }

    .kpi-value {
        font-size: 18px;
        font-weight: bold;
        color: #22c55e;
        display: block;
        margin: 5px 0;
    }

    .approach-item.owned { border-left: 3px solid #22c55e; }
    .approach-item.leased { border-left: 3px solid #3b82f6; }
    .approach-item.enterprise { border-left: 3px solid #8b5cf6; }
    .approach-item.wholesale { border-left: 3px solid #f59e0b; }
    .approach-item.custom { border-left: 3px solid #ef4444; }
    .approach-item.sustainability { border-left: 3px solid #10b981; }

    .timeline-phase, .advantage-item, .risk-factor {
        background: #374151;
        border: 1px solid #6b7280;
        border-radius: 6px;
        padding: 12px;
        margin: 10px 0;
    }

    .customer-mix, .customer-segment {
        background: #1e293b;
        border-radius: 6px;
        padding: 12px;
        margin: 8px 0;
    }

    .metric-comparison {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin: 15px 0;
    }

    .single-tenant, .multi-tenant, .single-csp, .multi-csp {
        background: #374151;
        border-radius: 6px;
        padding: 15px;
    }

    .single-tenant { border-left: 3px solid #ef4444; }
    .multi-tenant { border-left: 3px solid #22c55e; }

    .roi-metrics, .pricing-data {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
        margin: 15px 0;
    }

    .roi-item, .price-trend {
        background: #2d3748;
        border-radius: 6px;
        padding: 12px;
        text-align: center;
    }

    .case-study {
        background: #1a202c;
        border-radius: 6px;
        padding: 15px;
        margin: 15px 0;
    }

    .case-metrics, .mutual-benefits {
        background: #374151;
        border-radius: 4px;
        padding: 10px;
        margin: 10px 0;
    }

    .economic-model {
        background: #2d3748;
        border: 1px solid #4a5568;
        border-radius: 8px;
        padding: 20px;
        margin: 20px 0;
    }

    .colocation-model { border-left: 4px solid #8b5cf6; }
    .wholesale-model { border-left: 4px solid #06b6d4; }
    .build-to-suit-model { border-left: 4px solid #10b981; }

    .model-metrics {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 15px;
        margin: 15px 0;
    }

    .cost-structure, .revenue-sharing, .roi-metrics {
        background: #374151;
        border-radius: 6px;
        padding: 12px;
    }

    .dynamics-analysis, .competitive-analysis {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
        margin: 20px 0;
    }

    .supply-factors, .demand-drivers, .csp-pressures, .dc-pressures {
        background: #2d3748;
        border-radius: 6px;
        padding: 15px;
    }

    .projection-data, .disruptor-analysis {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 15px;
        margin: 15px 0;
    }

    .market-growth, .model-evolution, .technology-disruption, .regulatory-disruption {
        background: #374151;
        border-radius: 6px;
        padding: 12px;
    }
`;

document.head.appendChild(style);