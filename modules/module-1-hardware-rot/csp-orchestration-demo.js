// CSP Resource Orchestration Interactive Demonstrations
// Hardware Security Course - Module 1: DataCenter Architecture

function showAWSProvisioning() {
    const outputDiv = document.getElementById('csp-demo-output');
    outputDiv.style.display = 'block';
    outputDiv.scrollIntoView({ behavior: 'smooth' });

    outputDiv.innerHTML = `
        <div class="demo-output">
            <h3>🚀 AWS Resource Provisioning Simulation</h3>
            <div id="aws-provision-progress"></div>
        </div>
    `;

    // Simulate AWS provisioning workflow
    const steps = [
        "🔍 Analyzing workload requirements...",
        "📋 Calculating optimal instance types...",
        "🏗️ Creating VPC and network infrastructure...",
        "🔐 Setting up security groups and IAM roles...",
        "⚙️ Launching Auto Scaling Group...",
        "🌐 Configuring Application Load Balancer...",
        "📊 Setting up CloudWatch monitoring...",
        "✅ Deployment complete! Resources provisioned."
    ];

    let currentStep = 0;
    const progressDiv = document.getElementById('aws-provision-progress');

    const stepInterval = setInterval(() => {
        if (currentStep < steps.length) {
            progressDiv.innerHTML += `
                <div class="provision-step">
                    <span class="step-icon">⏳</span> ${steps[currentStep]}
                </div>
            `;

            if (currentStep === steps.length - 1) {
                setTimeout(() => {
                    progressDiv.innerHTML += `
                        <div class="provision-result">
                            <h4>📊 AWS Resource Allocation Summary</h4>
                            <div class="resource-summary">
                                <div class="summary-card">
                                    <strong>💻 Compute Resources</strong><br>
                                    • Auto Scaling Group: 10-50 instances<br>
                                    • Instance Type: c5.2xlarge (8 vCPU, 16GB RAM)<br>
                                    • Placement: Multi-AZ (us-east-1a, us-east-1b)<br>
                                    • Launch Template: AL2 + Docker
                                </div>

                                <div class="summary-card">
                                    <strong>🌐 Network Configuration</strong><br>
                                    • VPC: 10.0.0.0/16<br>
                                    • Public Subnets: 10.0.1.0/24, 10.0.2.0/24<br>
                                    • Private Subnets: 10.0.10.0/24, 10.0.20.0/24<br>
                                    • ALB: Internet-facing with SSL termination
                                </div>

                                <div class="summary-card">
                                    <strong>💾 Storage Allocation</strong><br>
                                    • EBS Root: gp3, 20GB per instance<br>
                                    • EBS Data: gp3, 100GB per instance<br>
                                    • S3 Buckets: Static assets, backups<br>
                                    • EFS: Shared file system (if needed)
                                </div>

                                <div class="summary-card">
                                    <strong>🔐 Security Implementation</strong><br>
                                    • IAM Role: EC2InstanceRole (S3, CloudWatch access)<br>
                                    • Security Groups: HTTP/HTTPS, internal communication<br>
                                    • KMS Encryption: EBS volumes, S3 buckets<br>
                                    • WAF: Protection against common attacks
                                </div>
                            </div>

                            <div class="cost-estimate">
                                <h5>💰 Monthly Cost Estimate</h5>
                                <div style="background: #1a202c; padding: 10px; border-radius: 6px;">
                                    • EC2 Instances (average 25): $2,400/month<br>
                                    • EBS Storage (2.5TB total): $250/month<br>
                                    • Load Balancer: $20/month<br>
                                    • Data Transfer: $100/month<br>
                                    <strong>Total: ~$2,770/month</strong>
                                </div>
                            </div>
                        </div>
                    `;
                }, 1000);
            }
            currentStep++;
        } else {
            clearInterval(stepInterval);
        }
    }, 800);
}

function showAzureProvisioning() {
    const outputDiv = document.getElementById('csp-demo-output');
    outputDiv.style.display = 'block';
    outputDiv.scrollIntoView({ behavior: 'smooth' });

    outputDiv.innerHTML = `
        <div class="demo-output azure-themed">
            <h3>🔷 Azure ARM Deployment Simulation</h3>
            <div id="azure-provision-progress"></div>
        </div>
    `;

    const armTemplate = {
        "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
        "contentVersion": "1.0.0.0",
        "parameters": {
            "vmSize": "Standard_D4s_v3",
            "instanceCount": 10,
            "location": "East US 2"
        },
        "resources": [
            "Microsoft.Network/virtualNetworks",
            "Microsoft.Network/loadBalancers",
            "Microsoft.Compute/virtualMachineScaleSets",
            "Microsoft.KeyVault/vaults",
            "Microsoft.Storage/storageAccounts"
        ]
    };

    const steps = [
        "📋 Validating ARM template syntax...",
        "🔍 Checking Azure subscription quotas...",
        "🏗️ Creating resource group: rg-webapp-prod...",
        "🌐 Deploying virtual network and subnets...",
        "⚖️ Setting up Azure Load Balancer...",
        "🔐 Configuring Key Vault for secrets...",
        "⚙️ Creating Virtual Machine Scale Set...",
        "📊 Enabling Azure Monitor and Log Analytics...",
        "✅ ARM deployment successful!"
    ];

    let currentStep = 0;
    const progressDiv = document.getElementById('azure-provision-progress');

    const stepInterval = setInterval(() => {
        if (currentStep < steps.length) {
            progressDiv.innerHTML += `
                <div class="provision-step azure-step">
                    <span class="step-icon">🔄</span> ${steps[currentStep]}
                </div>
            `;

            if (currentStep === steps.length - 1) {
                setTimeout(() => {
                    progressDiv.innerHTML += `
                        <div class="provision-result">
                            <h4>📊 Azure Resource Group Summary</h4>

                            <div class="arm-template-preview">
                                <h5>📝 ARM Template Structure</h5>
                                <pre class="code-block">${JSON.stringify(armTemplate, null, 2)}</pre>
                            </div>

                            <div class="azure-resources">
                                <h5>🔷 Deployed Azure Resources</h5>
                                <div class="resource-grid">
                                    <div class="azure-resource">
                                        <strong>💻 Virtual Machine Scale Set</strong><br>
                                        • VM Size: Standard_D4s_v3<br>
                                        • Instance Count: 10 (min) - 50 (max)<br>
                                        • OS: Ubuntu 20.04 LTS<br>
                                        • Auto-scaling: CPU > 75%
                                    </div>

                                    <div class="azure-resource">
                                        <strong>🌐 Networking Components</strong><br>
                                        • VNet: 10.1.0.0/16<br>
                                        • Subnet: 10.1.1.0/24 (web tier)<br>
                                        • Load Balancer: Standard SKU<br>
                                        • NSG: HTTP/HTTPS rules
                                    </div>

                                    <div class="azure-resource">
                                        <strong>🔐 Security & Identity</strong><br>
                                        • Key Vault: SSL certificates, secrets<br>
                                        • Managed Identity: VMSS access<br>
                                        • Azure AD: Authentication integration<br>
                                        • Security Center: Threat detection
                                    </div>

                                    <div class="azure-resource">
                                        <strong>📊 Monitoring & Management</strong><br>
                                        • Azure Monitor: Metrics and alerts<br>
                                        • Log Analytics: Centralized logging<br>
                                        • Application Insights: APM<br>
                                        • Automation Account: Update management
                                    </div>
                                </div>
                            </div>

                            <div class="compliance-report">
                                <h5>✅ Compliance Status</h5>
                                <div style="background: #1a202c; padding: 15px; border-radius: 6px;">
                                    • <span style="color: #22c55e;">✓</span> Azure Policy: All policies compliant<br>
                                    • <span style="color: #22c55e;">✓</span> Security Center: No high-severity issues<br>
                                    • <span style="color: #22c55e;">✓</span> Backup: Daily VM snapshots configured<br>
                                    • <span style="color: #22c55e;">✓</span> RBAC: Least privilege access implemented
                                </div>
                            </div>
                        </div>
                    `;
                }, 1000);
            }
            currentStep++;
        } else {
            clearInterval(stepInterval);
        }
    }, 900);
}

function showGCPProvisioning() {
    const outputDiv = document.getElementById('csp-demo-output');
    outputDiv.style.display = 'block';
    outputDiv.scrollIntoView({ behavior: 'smooth' });

    outputDiv.innerHTML = `
        <div class="demo-output gcp-themed">
            <h3>🌐 GKE ML Pipeline Deployment</h3>
            <div id="gcp-provision-progress"></div>
        </div>
    `;

    const steps = [
        "📋 Validating GKE cluster configuration...",
        "🔍 Checking GCP project quotas and permissions...",
        "🏗️ Creating GKE cluster with node pools...",
        "🖥️ Provisioning GPU nodes (NVIDIA Tesla V100)...",
        "🌐 Setting up VPC-native networking...",
        "🔐 Configuring Workload Identity for security...",
        "📦 Installing ML operators and CRDs...",
        "🚀 Deploying ML training and inference workloads...",
        "📊 Setting up Stackdriver monitoring...",
        "✅ GKE ML pipeline ready for production!"
    ];

    let currentStep = 0;
    const progressDiv = document.getElementById('gcp-provision-progress');

    const stepInterval = setInterval(() => {
        if (currentStep < steps.length) {
            progressDiv.innerHTML += `
                <div class="provision-step gcp-step">
                    <span class="step-icon">🔄</span> ${steps[currentStep]}
                </div>
            `;

            if (currentStep === steps.length - 1) {
                setTimeout(() => {
                    progressDiv.innerHTML += `
                        <div class="provision-result">
                            <h4>📊 GKE ML Cluster Summary</h4>

                            <div class="ml-pipeline-architecture">
                                <h5>🧠 ML Pipeline Architecture</h5>
                                <pre class="code-block">
┌─────────────────────────────────────────────────────────────────┐
│                    GKE ML Production Cluster                   │
│                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────┐│
│  │   Data Layer    │    │  Training Layer │    │ Serving     ││
│  │                 │    │                 │    │ Layer       ││
│  │ ┌─────────────┐ │    │ ┌─────────────┐ │    │┌──────────┐ ││
│  │ │Cloud Storage│ │    │ │   Kubeflow  │ │    ││TensorFlow│ ││
│  │ │   Buckets   │ │    │ │   Pipelines │ │    ││ Serving  │ ││
│  │ └─────────────┘ │    │ └─────────────┘ │    │└──────────┘ ││
│  │ ┌─────────────┐ │    │ ┌─────────────┐ │    │┌──────────┐ ││
│  │ │  BigQuery   │ │    │ │GPU Training │ │    ││  Istio   │ ││
│  │ │   Dataset   │ │    │ │    Jobs     │ │    ││ Gateway  │ ││
│  │ └─────────────┘ │    │ └─────────────┘ │    │└──────────┘ ││
│  └─────────────────┘    └─────────────────┘    └─────────────┘│
└─────────────────────────────────────────────────────────────────┘
                                </pre>
                            </div>

                            <div class="gke-resources">
                                <h5>⚙️ GKE Cluster Resources</h5>
                                <div class="resource-grid">
                                    <div class="gcp-resource">
                                        <strong>🖥️ Node Pools Configuration</strong><br>
                                        <strong>CPU Nodes:</strong> n1-standard-4 (10 nodes)<br>
                                        <strong>GPU Nodes:</strong> n1-standard-4 + V100 (5 nodes)<br>
                                        <strong>Preemptible:</strong> n1-standard-2 (20 nodes)<br>
                                        <strong>Auto-scaling:</strong> 5-100 nodes
                                    </div>

                                    <div class="gcp-resource">
                                        <strong>🌐 Network & Security</strong><br>
                                        • VPC: ml-production-vpc<br>
                                        • Subnet: 10.2.0.0/16 (VPC-native)<br>
                                        • Private cluster: Master endpoint<br>
                                        • Workload Identity: Secure pod access
                                    </div>

                                    <div class="gcp-resource">
                                        <strong>📦 ML Workloads</strong><br>
                                        • Kubeflow: ML workflow orchestration<br>
                                        • TensorFlow Serving: Model inference<br>
                                        • Jupyter Hub: Interactive development<br>
                                        • Airflow: Data pipeline scheduling
                                    </div>

                                    <div class="gcp-resource">
                                        <strong>📊 Monitoring Stack</strong><br>
                                        • Stackdriver: Metrics and logging<br>
                                        • Prometheus: Custom metrics<br>
                                        • Grafana: Dashboard visualization<br>
                                        • Jaeger: Distributed tracing
                                    </div>
                                </div>
                            </div>

                            <div class="ml-workflow-demo">
                                <h5>🔄 ML Workflow Execution</h5>
                                <div style="background: #1a202c; padding: 15px; border-radius: 6px;">
                                    <div class="workflow-step">📥 <strong>Data Ingestion:</strong> BigQuery → Cloud Storage (1TB dataset)</div>
                                    <div class="workflow-step">🔄 <strong>Data Preprocessing:</strong> Dataflow → Feature engineering</div>
                                    <div class="workflow-step">🧠 <strong>Model Training:</strong> GPU cluster → TensorFlow distributed</div>
                                    <div class="workflow-step">✅ <strong>Model Validation:</strong> Automated testing → Performance metrics</div>
                                    <div class="workflow-step">🚀 <strong>Model Deployment:</strong> TF Serving → Auto-scaling endpoints</div>
                                    <div class="workflow-step">📊 <strong>Monitoring:</strong> Prediction accuracy → Model drift detection</div>
                                </div>
                            </div>
                        </div>
                    `;
                }, 1000);
            }
            currentStep++;
        } else {
            clearInterval(stepInterval);
        }
    }, 1000);
}

function showOCIProvisioning() {
    const outputDiv = document.getElementById('csp-demo-output');
    outputDiv.style.display = 'block';
    outputDiv.scrollIntoView({ behavior: 'smooth' });

    outputDiv.innerHTML = `
        <div class="demo-output oracle-themed">
            <h3>🔴 OCI Bare Metal Enterprise Deployment</h3>
            <div id="oci-provision-progress"></div>
        </div>
    `;

    const steps = [
        "📋 Validating OCI tenancy and compartment access...",
        "🔍 Checking availability domains and shape quotas...",
        "🏗️ Creating Virtual Cloud Network (VCN)...",
        "⚡ Provisioning bare metal compute instances...",
        "💾 Configuring high-performance block storage...",
        "🔐 Setting up IAM policies and security lists...",
        "🗄️ Deploying Autonomous Database instances...",
        "🌐 Configuring FastConnect for hybrid connectivity...",
        "📊 Setting up monitoring and alerting...",
        "✅ OCI enterprise infrastructure ready!"
    ];

    let currentStep = 0;
    const progressDiv = document.getElementById('oci-provision-progress');

    const stepInterval = setInterval(() => {
        if (currentStep < steps.length) {
            progressDiv.innerHTML += `
                <div class="provision-step oracle-step">
                    <span class="step-icon">⚡</span> ${steps[currentStep]}
                </div>
            `;

            if (currentStep === steps.length - 1) {
                setTimeout(() => {
                    progressDiv.innerHTML += `
                        <div class="provision-result">
                            <h4>📊 OCI Enterprise Infrastructure Summary</h4>

                            <div class="oci-architecture">
                                <h5>🏗️ OCI Bare Metal Architecture</h5>
                                <pre class="code-block">
┌─────────────────────────────────────────────────────────────────┐
│                    OCI Tenancy: ENTERPRISE-PROD                │
│                                                                 │
│  Region: us-ashburn-1 (IAD)                                   │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────┐│
│  │      AD-1       │    │      AD-2       │    │     AD-3    ││
│  │ ┌─────────────┐ │    │ ┌─────────────┐ │    │┌──────────┐ ││
│  │ │Bare Metal   │ │    │ │Bare Metal   │ │    ││Bare Metal│ ││
│  │ │Database     │ │    │ │Application  │ │    ││ Standby  │ ││
│  │ │Primary      │ │    │ │Servers      │ │    ││ Database │ ││
│  │ └─────────────┘ │    │ └─────────────┘ │    │└──────────┘ ││
│  └─────────────────┘    └─────────────────┘    └─────────────┘│
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Autonomous Database Service                │   │
│  │  • Always Free Tier: Development/Testing               │   │
│  │  • Dedicated Infrastructure: Production workloads      │   │
│  │  • Shared Infrastructure: Cost-optimized workloads    │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                                </pre>
                            </div>

                            <div class="oci-resources">
                                <h5>⚙️ OCI Resource Allocation</h5>
                                <div class="resource-grid">
                                    <div class="oci-resource">
                                        <strong>🖥️ Bare Metal Compute</strong><br>
                                        <strong>Database Tier:</strong> BM.Standard.E4.128<br>
                                        • 128 OCPUs, 2TB RAM<br>
                                        • Dedicated tenant isolation<br>
                                        • Oracle Linux 8, Oracle Database 19c
                                    </div>

                                    <div class="oci-resource">
                                        <strong>🌐 Network Architecture</strong><br>
                                        • VCN: 10.0.0.0/16<br>
                                        • Private Subnet: Database tier<br>
                                        • Public Subnet: Application tier<br>
                                        • FastConnect: 10 Gbps dedicated
                                    </div>

                                    <div class="oci-resource">
                                        <strong>💾 High-Performance Storage</strong><br>
                                        • Block Storage: Ultra High Performance<br>
                                        • Capacity: 200TB per instance<br>
                                        • IOPS: 300,000 IOPS sustained<br>
                                        • Backup: Cross-region replication
                                    </div>

                                    <div class="oci-resource">
                                        <strong>🔐 Enterprise Security</strong><br>
                                        • IAM: Compartment-based access<br>
                                        • Vault: Customer-managed encryption<br>
                                        • Bastion: Secure SSH access<br>
                                        • Cloud Guard: Threat detection
                                    </div>
                                </div>
                            </div>

                            <div class="autonomous-db-features">
                                <h5>🗄️ Autonomous Database Configuration</h5>
                                <div style="background: #1a202c; padding: 15px; border-radius: 6px;">
                                    <div class="db-feature">🧠 <strong>Self-Driving:</strong> Automatic performance tuning and optimization</div>
                                    <div class="db-feature">🔒 <strong>Self-Securing:</strong> Automated patching and threat protection</div>
                                    <div class="db-feature">🔧 <strong>Self-Repairing:</strong> Automatic failure recovery and backup</div>
                                    <div class="db-feature">📈 <strong>Auto-Scaling:</strong> CPU and storage scaling based on demand</div>
                                    <div class="db-feature">⚡ <strong>Exadata:</strong> Optimized hardware for database workloads</div>
                                </div>
                            </div>

                            <div class="sla-guarantees">
                                <h5>📋 Enterprise SLA Guarantees</h5>
                                <div style="background: #2d3748; padding: 15px; border-radius: 6px;">
                                    • <span style="color: #22c55e;">99.995%</span> Uptime SLA for Autonomous Database<br>
                                    • <span style="color: #22c55e;">99.9%</span> Uptime SLA for Compute instances<br>
                                    • <span style="color: #22c55e;">< 1 second</span> Storage latency (Ultra High Performance)<br>
                                    • <span style="color: #22c55e;">24/7</span> Enterprise support included
                                </div>
                            </div>
                        </div>
                    `;
                }, 1000);
            }
            currentStep++;
        } else {
            clearInterval(stepInterval);
        }
    }, 950);
}

function compareCSPPatterns() {
    const outputDiv = document.getElementById('csp-demo-output');
    outputDiv.style.display = 'block';
    outputDiv.scrollIntoView({ behavior: 'smooth' });

    outputDiv.innerHTML = `
        <div class="demo-output">
            <h3>📊 CSP Orchestration Pattern Comparison</h3>
            <div class="comparison-matrix">
                <div class="comparison-header">
                    <div class="header-cell">Feature</div>
                    <div class="header-cell aws-bg">AWS</div>
                    <div class="header-cell azure-bg">Azure</div>
                    <div class="header-cell gcp-bg">GCP</div>
                    <div class="header-cell oracle-bg">Oracle</div>
                </div>

                <div class="comparison-row">
                    <div class="feature-cell"><strong>🏗️ Infrastructure Approach</strong></div>
                    <div class="value-cell">API-driven, service-oriented</div>
                    <div class="value-cell">ARM templates, resource groups</div>
                    <div class="value-cell">Declarative, resource manager</div>
                    <div class="value-cell">Bare metal focus, autonomous</div>
                </div>

                <div class="comparison-row">
                    <div class="feature-cell"><strong>⚙️ Orchestration Engine</strong></div>
                    <div class="value-cell">CloudFormation, CDK</div>
                    <div class="value-cell">Azure Resource Manager</div>
                    <div class="value-cell">Deployment Manager, Borg</div>
                    <div class="value-cell">Resource Manager, Terraform</div>
                </div>

                <div class="comparison-row">
                    <div class="feature-cell"><strong>🔄 Auto-Scaling Strategy</strong></div>
                    <div class="value-cell">EC2 Auto Scaling, target tracking</div>
                    <div class="value-cell">VMSS, scale sets</div>
                    <div class="value-cell">GKE cluster autoscaling</div>
                    <div class="value-cell">Autonomous scaling</div>
                </div>

                <div class="comparison-row">
                    <div class="feature-cell"><strong>🌐 Multi-Region Strategy</strong></div>
                    <div class="value-cell">Cross-region replication</div>
                    <div class="value-cell">Paired regions</div>
                    <div class="value-cell">Multi-region clusters</div>
                    <div class="value-cell">Availability domains</div>
                </div>

                <div class="comparison-row">
                    <div class="feature-cell"><strong>🔐 Security Integration</strong></div>
                    <div class="value-cell">IAM, KMS, Security Groups</div>
                    <div class="value-cell">AAD, Key Vault, NSGs</div>
                    <div class="value-cell">Cloud IAM, Cloud KMS</div>
                    <div class="value-cell">IAM, Vault, Security Lists</div>
                </div>

                <div class="comparison-row">
                    <div class="feature-cell"><strong>📊 Monitoring Approach</strong></div>
                    <div class="value-cell">CloudWatch, X-Ray</div>
                    <div class="value-cell">Azure Monitor, App Insights</div>
                    <div class="value-cell">Stackdriver, Operations Suite</div>
                    <div class="value-cell">Monitoring, Logging Analytics</div>
                </div>

                <div class="comparison-row">
                    <div class="feature-cell"><strong>💰 Cost Optimization</strong></div>
                    <div class="value-cell">Spot instances, Reserved</div>
                    <div class="value-cell">Spot VMs, Reserved instances</div>
                    <div class="value-cell">Preemptible VMs, Sustained use</div>
                    <div class="value-cell">Always Free, Universal Credits</div>
                </div>

                <div class="comparison-row">
                    <div class="feature-cell"><strong>🎯 Best Use Case</strong></div>
                    <div class="value-cell">Microservices, serverless</div>
                    <div class="value-cell">Enterprise, hybrid cloud</div>
                    <div class="value-cell">AI/ML, containerized apps</div>
                    <div class="value-cell">Database-centric, performance</div>
                </div>
            </div>

            <div class="orchestration-insights">
                <h4>🔍 Key Orchestration Insights</h4>
                <div class="insight-grid">
                    <div class="insight-card">
                        <h5>📈 Scaling Philosophies</h5>
                        <p><strong>AWS:</strong> Horizontal scaling with many small instances</p>
                        <p><strong>Azure:</strong> Hybrid approach with VM scale sets</p>
                        <p><strong>GCP:</strong> Container-native, Kubernetes-first</p>
                        <p><strong>Oracle:</strong> Vertical scaling with powerful bare metal</p>
                    </div>

                    <div class="insight-card">
                        <h5>🔧 Automation Maturity</h5>
                        <p><strong>AWS:</strong> Mature ecosystem, extensive APIs</p>
                        <p><strong>Azure:</strong> Enterprise integration, PowerShell</p>
                        <p><strong>GCP:</strong> Google-scale automation, SRE practices</p>
                        <p><strong>Oracle:</strong> Autonomous operations, self-healing</p>
                    </div>

                    <div class="insight-card">
                        <h5>🏗️ Architecture Patterns</h5>
                        <p><strong>AWS:</strong> Service mesh, event-driven</p>
                        <p><strong>Azure:</strong> Hub-and-spoke, enterprise patterns</p>
                        <p><strong>GCP:</strong> Cloud-native, microservices</p>
                        <p><strong>Oracle:</strong> Database-centric, high-performance</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function simulateMultiCloudWorkload() {
    const outputDiv = document.getElementById('csp-demo-output');
    outputDiv.style.display = 'block';
    outputDiv.scrollIntoView({ behavior: 'smooth' });

    outputDiv.innerHTML = `
        <div class="demo-output">
            <h3>🌐 Multi-Cloud Workload Orchestration</h3>
            <div id="multicloud-simulation"></div>
        </div>
    `;

    const simulationDiv = document.getElementById('multicloud-simulation');

    // Simulate a complex multi-cloud deployment
    simulationDiv.innerHTML = `
        <div class="multicloud-scenario">
            <h4>🎯 Scenario: Global E-commerce Platform</h4>
            <p><strong>Requirements:</strong> Global scale, data sovereignty, disaster recovery, cost optimization</p>

            <div class="multicloud-architecture">
                <h5>🏗️ Multi-Cloud Architecture Design</h5>
                <pre class="code-block">
┌─────────────────────────────────────────────────────────────────┐
│                    Global Load Balancer                        │
│                     (CloudFlare)                               │
└─────────────────────┬───────────────────────────────────────────┘
                      │
    ┌─────────────────┼─────────────────┐
    │                 │                 │
    ▼                 ▼                 ▼
┌─────────┐    ┌─────────┐    ┌─────────┐
│   AWS   │    │  Azure  │    │   GCP   │
│ US-East │    │ Europe  │    │ APAC    │
│         │    │         │    │         │
│Web Tier │    │Web Tier │    │Web Tier │
│App Tier │    │App Tier │    │App Tier │
│Cache    │    │Cache    │    │Cache    │
└─────────┘    └─────────┘    └─────────┘
    │                 │                 │
    ▼                 ▼                 ▼
┌─────────┐    ┌─────────┐    ┌─────────┐
│ Primary │    │Disaster │    │ Read    │
│Database │    │Recovery │    │Replicas │
│(RDS)    │    │(SQL DB) │    │(Cloud   │
│         │    │         │    │ SQL)    │
└─────────┘    └─────────┘    └─────────┘
                </pre>

                <div class="orchestration-workflow">
                    <h5>⚡ Orchestration Workflow</h5>
                    <div class="workflow-timeline">
                        <div class="timeline-item">
                            <strong>1. Traffic Routing</strong><br>
                            CloudFlare routes traffic based on:
                            <ul>
                                <li>Geographic location</li>
                                <li>Health checks</li>
                                <li>Load balancing policies</li>
                                <li>Data sovereignty requirements</li>
                            </ul>
                        </div>

                        <div class="timeline-item">
                            <strong>2. Regional Processing</strong><br>
                            Each CSP handles regional workloads:
                            <ul>
                                <li><strong>AWS:</strong> North America traffic, primary database</li>
                                <li><strong>Azure:</strong> European traffic, GDPR compliance</li>
                                <li><strong>GCP:</strong> Asia-Pacific, ML/AI workloads</li>
                            </ul>
                        </div>

                        <div class="timeline-item">
                            <strong>3. Data Synchronization</strong><br>
                            Cross-cloud data replication:
                            <ul>
                                <li>Event-driven sync using message queues</li>
                                <li>Eventually consistent model</li>
                                <li>Conflict resolution strategies</li>
                                <li>Backup and disaster recovery</li>
                            </ul>
                        </div>

                        <div class="timeline-item">
                            <strong>4. Resource Optimization</strong><br>
                            Dynamic workload placement:
                            <ul>
                                <li>Cost-based scheduling</li>
                                <li>Performance requirements</li>
                                <li>Compliance constraints</li>
                                <li>Capacity planning</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="multicloud-benefits">
                    <h5>✅ Multi-Cloud Benefits Realized</h5>
                    <div class="benefits-grid">
                        <div class="benefit-item">
                            <strong>🌍 Global Reach</strong><br>
                            • Low latency worldwide<br>
                            • Data sovereignty compliance<br>
                            • Local presence in all regions
                        </div>

                        <div class="benefit-item">
                            <strong>💰 Cost Optimization</strong><br>
                            • Leverage CSP pricing differences<br>
                            • Spot/preemptible instances<br>
                            • Reserved capacity optimization
                        </div>

                        <div class="benefit-item">
                            <strong>🔒 Risk Mitigation</strong><br>
                            • No single point of failure<br>
                            • Vendor lock-in avoidance<br>
                            • Regulatory compliance
                        </div>

                        <div class="benefit-item">
                            <strong>⚡ Performance</strong><br>
                            • Best-of-breed services<br>
                            • Specialized capabilities<br>
                            • Edge computing integration
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// CSS styling for interactive demonstrations
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

    .provision-step {
        background: #374151;
        border-left: 4px solid #60a5fa;
        margin: 8px 0;
        padding: 10px;
        border-radius: 4px;
        animation: slideIn 0.5s ease;
    }

    .azure-step { border-left-color: #0078d4; }
    .gcp-step { border-left-color: #4285f4; }
    .oracle-step { border-left-color: #f80000; }

    @keyframes slideIn {
        from { opacity: 0; transform: translateX(-20px); }
        to { opacity: 1; transform: translateX(0); }
    }

    .provision-result {
        background: #1a202c;
        border: 1px solid #4a5568;
        border-radius: 8px;
        padding: 20px;
        margin-top: 20px;
    }

    .resource-summary, .resource-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 15px;
        margin: 15px 0;
    }

    .summary-card, .azure-resource, .gcp-resource, .oci-resource {
        background: #2d3748;
        border: 1px solid #4a5568;
        border-radius: 6px;
        padding: 15px;
    }

    .comparison-matrix {
        display: grid;
        grid-template-columns: 200px repeat(4, 1fr);
        gap: 1px;
        background: #4a5568;
        border-radius: 8px;
        overflow: hidden;
        margin: 20px 0;
    }

    .comparison-header, .comparison-row {
        display: contents;
    }

    .header-cell, .feature-cell, .value-cell {
        background: #2d3748;
        padding: 12px;
        text-align: center;
    }

    .feature-cell {
        background: #374151;
        text-align: left;
        font-weight: bold;
    }

    .aws-bg { background-color: rgba(255, 153, 0, 0.2) !important; }
    .azure-bg { background-color: rgba(0, 120, 212, 0.2) !important; }
    .gcp-bg { background-color: rgba(66, 133, 244, 0.2) !important; }
    .oracle-bg { background-color: rgba(248, 0, 0, 0.2) !important; }

    .insight-grid, .benefits-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 15px;
        margin: 20px 0;
    }

    .insight-card, .benefit-item {
        background: #2d3748;
        border: 1px solid #4a5568;
        border-radius: 8px;
        padding: 15px;
    }

    .workflow-timeline {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
        margin: 20px 0;
    }

    .timeline-item {
        background: #374151;
        border-left: 4px solid #34d399;
        padding: 15px;
        border-radius: 6px;
    }

    .workflow-step {
        margin: 8px 0;
        padding: 8px;
        background: #374151;
        border-radius: 4px;
    }

    .db-feature {
        margin: 5px 0;
        padding: 5px 0;
        border-bottom: 1px solid #4a5568;
    }

    .db-feature:last-child {
        border-bottom: none;
    }
`;

document.head.appendChild(style);